import debounce = require("lodash.debounce");
import merge = require("lodash.merge");
import { HandwritingData, RecognitionResult } from "./abstract";
import { addEventListeners, removeEventListeners } from "./events";
import { Service } from "./services";
import { getQQShuruService } from "./services/qqShuru";

export interface HandwritingOptions {
  /**
   * 自动提交的间隔，单位：毫秒
   *
   * 缺省情况下禁用自动提交，这意味着客户端代码需要自行触发提交，在触发提交时，是否清除画板是可选的
   */
  autoSubmitInterval?: number;
  /**
   * 自动提交并清空画板
   *
   * 缺省情况下，会自动提交并清空画板
   */
  autoSubmitWithClearCanvas?: boolean;
  /**
   * 双击清除画板内容，在自动提交生效的情况下，此选项无效
   */
  dblclickClear?: boolean;
  /**
   * 压感系数，缺省情况下禁用压感
   */
  pressureFactor?: number;
  /**
   * 笔触颜色，缺省情况下使用黑色
   */
  style?: string;
  /**
   * 笔触宽度，缺省情况下为 1
   */
  width?: number;
  /**
   * canvas 元素的 zIndex，缺省为 100
   */
  zIndex?: number;
  /**
   * 在某个元素开始手写输入时的回调函数
   */
  onStart?: (this: Handwriting, element: HTMLElement) => any;
  /**
   * 当某个元素结束手写输入后的回调函数
   *
   * 开发者应通过此回调处理识别结果或者错误
   */
  onEnd?: (
    this: Handwriting,
    element: HTMLElement,
    result?: RecognitionResult,
    error?: Error
  ) => any;
  /**
   * 当调用 reset 方法准备卸载并重置所有元素之前的回调函数
   */
  onBeforeReset?: (this: Handwriting) => any;
}

interface Context {
  data: HandwritingData;
  canvasElement: HTMLCanvasElement;
  properties: Map<HTMLElement, object>;
  listeners: Map<EventTarget, Record<string, Function>>;
  query: (withClearCanvas?: boolean) => Promise<RecognitionResult>;
}

class EmptyElementError extends Error {
  constructor(public readonly element: HTMLElement) {
    super(`<${element.tagName}/> is empty element`);
  }
}

type ElementCollection = string | HTMLElement[] | JQuery;

function $(collection: ElementCollection) {
  let elements = undefined;

  if (typeof collection === "string") {
    elements = Array.prototype.slice.call(
      document.querySelectorAll(collection)
    );
  }
  if (collection instanceof Array) {
    elements = collection;
  }

  if (elements) {
    return { map: elements.map.bind(elements) };
  }

  return {
    map: (callback: (element: HTMLElement, index: number) => any) =>
      (collection as JQuery)
        .map(function (i) {
          return callback(this, i);
        })
        .toArray(),
  };
}

export default class Handwriting {
  private readonly elements: Map<HTMLElement, Context> = new Map();

  protected readonly service: Service;

  /**
   * 实例化一个 Handwriting 对象
   *
   * @param elements 要挂载的元素集合
   * @param service 手写识别的服务，可以是字符串，此时表示使用 QQShuru API 规范的服务入口路径
   * @param options Handwriting 的选项
   */
  constructor(
    elements: ElementCollection,
    service: Service | string,
    private options: HandwritingOptions = {}
  ) {
    this.service =
      typeof service === "string" ? getQQShuruService(service) : service;

    this.mount(elements);
  }

  /**
   * 重置 Handwriting，所有已挂载的元素均会被卸载
   */
  reset() {
    this.options.onBeforeReset?.call(this);

    this.unmount([...this.elements.keys()]);
  }

  /**
   * 将手写识别功能挂载到新的元素上，可指定方法级别的选项参数，实例化的选项参数将作为默认值
   *
   * @param elements 被挂载的元素集合，不能包含空元素，\<INPUT/\> 是典型的空元素之一
   * @param options 方法级别的选项参数
   */
  mount(elements: ElementCollection, options?: HandwritingOptions) {
    $(elements).map((element) => {
      this._mount(element, options);
    });
  }

  /**
   * 卸载已挂载的元素
   *
   * @param element 要卸载的元素集合
   */
  unmount(elements: ElementCollection) {
    $(elements).map((element) => {
      this._unmount(element);
    });
  }

  /**
   * 手动查询被挂载元素集合的识别结果
   *
   * @param element 被挂载的元素
   * @param withClearCanvas 查询完成后清除画板
   * @returns 识别结果数组的 Promise
   */
  async query(elements: ElementCollection, withClearCanvas = false): Promise<RecognitionResult[]> {
    return Promise.all(
      $(elements).map((element) => this._query(element, withClearCanvas))
    );
  }

  protected _mount(
    element: HTMLElement,
    options?: HandwritingOptions
  ): Context {
    // 如果指定元素已经被挂载，则返回相应的上下文
    if (this.elements.has(element)) {
      return this.elements.get(element)!;
    }

    this.ensureIsNotEmptyElement(element);

    options = Object.assign({}, this.options, options);

    const data: HandwritingData = [];
    const canvasElement = this.createCanvasElement(options);
    const canvasContext = canvasElement.getContext("2d")!;
    this.resetCanvasContext(options, canvasContext);
    this.updateCanvasSize(options, element, canvasContext);

    const listeners = this.bindListeners(options, data, element, canvasContext);
    listeners.forEach((listenerMap, target) =>
      addEventListeners(target, listenerMap)
    );

    const properties = this.bindProperties(options, element);

    element.append(canvasElement);

    const context = {
      data,
      canvasElement,
      listeners,
      properties,
      query: (withClearCanvas = true) =>
        this.service(data).then((result) => {
          if (withClearCanvas) {
            this.clearCanvasAndData(canvasContext, data, options);
          }
          return result;
        }),
    };

    this.elements.set(element, context);

    return context;
  }

  protected _unmount(element: HTMLElement) {
    if (!this.elements.has(element)) {
      return false;
    }

    const { properties, listeners, data, canvasElement } = this.elements.get(
      element
    );

    data.length = 0;

    properties.forEach((propertyMap, element) => merge(element, propertyMap));
    listeners.forEach((listenerMap, target) =>
      removeEventListeners(target, listenerMap)
    );

    this.elements.delete(element);
    canvasElement.remove();

    return true;
  }

  protected async _query(element: HTMLElement, withClearCanvas = false) {
    if (!this.elements.has(element)) {
      throw new Error(`no such element: ${element}`);
    }

    return await this.elements.get(element).query(withClearCanvas);
  }

  // https://developer.mozilla.org/zh-CN/docs/Glossary/Empty_element
  protected ensureIsNotEmptyElement(element: HTMLElement) {
    const tagName = element.tagName.toUpperCase();
    if (
      "AREA,BASE,BR,COL,COMMAND,EMBED,HR,IMG,INPUT,KEYGEN,LINK,META,PARAM,SOURCE,TRACK,WBR".includes(
        tagName
      ) ||
      (tagName === "COLGROUP" && element.hasAttribute("span"))
    ) {
      throw new EmptyElementError(element);
    }
  }

  protected clearCanvasAndData(
    canvasContext: CanvasRenderingContext2D,
    data: HandwritingData,
    options: HandwritingOptions
  ) {
    canvasContext.canvas.width = canvasContext.canvas.width;
    data.length = 0;
    this.resetCanvasContext(options, canvasContext);
  }

  protected bindProperties(options: HandwritingOptions, element: HTMLElement) {
    const old = {
      style: {
        position: element.style.position,
      },
    };

    element.style.position = "relative";

    return new Map([[element, old]]);
  }

  protected bindListeners(
    options: HandwritingOptions,
    data: HandwritingData,
    element: HTMLElement,
    canvasContext: CanvasRenderingContext2D
  ) {
    const {
      onStart,
      onEnd,
      dblclickClear,
      pressureFactor,
      autoSubmitInterval,
      autoSubmitWithClearCanvas = true,
    } = options;
    const listeners = new Map<EventTarget, Record<string, Function>>();
    // window listener
    listeners.set(window, {
      resize: debounce(() => {
        this.updateCanvasSize(options, element, canvasContext);
      }, 200),
    });
    // canvas element listeners
    let flag = false;
    let latestPromise;
    const submit = debounce(() => {
      if (data.length === 0) {
        return;
      }
      // 利用闭包性质确定是不是最新 Promise 导致的 then，catch 或 finally
      // 这样做是为了避免由于服务响应过慢，分笔画的时候出现多个结果，这些结果往往是对还没完全手写完的字的识别结果
      const promise = (latestPromise = this.service(data)
        .then((result) => {
          promise === latestPromise &&
            !flag &&
            onEnd &&
            onEnd.call(this, element, result);
        })
        .catch((error) => {
          promise === latestPromise &&
            !flag &&
            onEnd &&
            onEnd.call(this, element, null, error);
        })
        .finally(() => {
          if (promise === latestPromise && !flag && autoSubmitWithClearCanvas) {
            this.clearCanvasAndData(canvasContext, data, options);
          }
        }));
    }, autoSubmitInterval);
    const trySubmit = () => {
      flag = false;
      canvasContext.closePath();
      // 自动提交的值必须大于 0 才有效
      if (autoSubmitInterval > 0) {
        submit();
      }
    };
    listeners.set(canvasContext.canvas, {
      pointerdown: ({ offsetX, offsetY, pointerId }) => {
        flag = true;
        submit.cancel();
        canvasContext.canvas.setPointerCapture(pointerId);
        canvasContext.moveTo(offsetX, offsetY);
        canvasContext.beginPath();
        data.push([[~~offsetX, ~~offsetY]]);
        onStart && onStart.call(this, element);
      },
      pointermove: ({ offsetX, offsetY, movementX, movementY, pressure }) => {
        if (!flag) {
          return;
        }

        if (pressureFactor) {
          canvasContext.lineWidth = pressure * pressureFactor;
        }

        canvasContext.lineTo(offsetX, offsetY);
        canvasContext.stroke();

        data.slice(-1)[0].push([~~movementX, ~~movementY]);
      },
      pointerup: trySubmit,
      pointerleave: trySubmit,
      dblclick: () => {
        if (!dblclickClear || autoSubmitInterval > 0) {
          return;
        }
        data.length = 0;
        // 清空画布
        canvasContext.canvas.width = canvasContext.canvas.width;
        this.resetCanvasContext(options, canvasContext);
      },
    });

    return listeners;
  }

  protected updateCanvasSize(
    options: HandwritingOptions,
    element: HTMLElement,
    canvasContext: CanvasRenderingContext2D
  ) {
    const { offsetHeight, offsetWidth } = element;

    canvasContext.canvas.width = offsetWidth;
    canvasContext.canvas.height = offsetHeight;

    this.resetCanvasContext(options, canvasContext);
  }

  protected resetCanvasContext(
    { style, width }: HandwritingOptions,
    canvasContext: CanvasRenderingContext2D
  ) {
    canvasContext.lineWidth = width ?? 1;
    canvasContext.strokeStyle = style;
    canvasContext.lineJoin = "round";
    canvasContext.lineCap = "round";
  }

  protected createCanvasElement({
    zIndex = 100,
  }: HandwritingOptions): HTMLCanvasElement {
    const canvasElement = document.createElement("canvas");

    canvasElement.style.position = "absolute";
    canvasElement.style.zIndex = zIndex.toString();
    canvasElement.style.top = canvasElement.style.left = canvasElement.style.bottom = canvasElement.style.right = (0).toString();

    return canvasElement;
  }
}
