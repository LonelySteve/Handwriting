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
   * 双击清除画板内容
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
  onStart?: (this: Handwriting, element: HTMLElement) => any;
  onEnd?: (
    this: Handwriting,
    element: HTMLElement,
    result?: RecognitionResult,
    error?: Error
  ) => any;
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

export default class Handwriting {
  private readonly elements: Map<HTMLElement, Context | undefined>;

  protected readonly service: Service;

  constructor(
    selector: string | HTMLElement[],
    service: Service | string,
    private options: HandwritingOptions = {}
  ) {
    const elements: HTMLElement[] =
      typeof selector === "string"
        ? Array.prototype.slice.call(document.querySelectorAll(selector))
        : selector;

    this.elements = new Map(elements.map((element) => [element, undefined]));

    this.service =
      typeof service === "string" ? getQQShuruService(service) : service;

    for (const element of this.elements.keys()) {
      this.mount(element);
    }
  }

  reset() {
    this.options.onBeforeReset?.call(this);

    for (const element of this.elements.keys()) {
      this.unmount(element);
    }
  }

  mount(element: HTMLElement, options?: HandwritingOptions): HTMLCanvasElement {
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

    this.elements.set(element, {
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
    });

    return canvasElement;
  }

  unmount(element: HTMLElement) {
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
    const submit = debounce(() => {
      if (data.length === 0) {
        return;
      }
      this.service(data)
        .then((result) => {
          onEnd && onEnd.call(this, element, result);
        })
        .catch((error) => {
          onEnd && onEnd.call(this, element, null, error);
        })
        .finally(() => {
          if (!flag && autoSubmitWithClearCanvas) {
            this.clearCanvasAndData(canvasContext, data, options);
          }
        });
    }, autoSubmitInterval);
    const trySubmit = () => {
      flag = false;
      canvasContext.closePath();

      if (autoSubmitInterval != null) {
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
        if (!dblclickClear) {
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
