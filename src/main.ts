import { HandwritingData, RecognitionResult } from "./abstract";
import { addEventListeners, removeEventListeners } from "./events";
import {
  FunctionalServiceProvider,
  ServiceProvider,
  toFunctionalServiceProvider
} from "./providers";

export interface HandwritingOptions {
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
  oldStyles: Record<string, string>;
  listeners: Record<string, Function>;
  canvasElement: HTMLCanvasElement;
  canvasElementListeners: Record<string, Function>;
}

export default class Handwriting {
  private readonly elements: Map<HTMLElement, Context | undefined>;

  protected readonly functionalServiceProvider: FunctionalServiceProvider;

  constructor(
    selector: string | HTMLElement[],
    serviceProvider: ServiceProvider,
    private options: HandwritingOptions = {}
  ) {
    const elements: HTMLElement[] =
      typeof selector === "string"
        ? Array.prototype.slice.call(document.querySelectorAll(selector))
        : selector;

    this.elements = new Map(elements.map((element) => [element, undefined]));

    this.functionalServiceProvider =
      typeof serviceProvider === "function"
        ? serviceProvider
        : toFunctionalServiceProvider(serviceProvider);

    for (const element of this.elements.keys()) {
      this.mount(element);
    }
  }

  reset() {
    this.options.onBeforeReset?.call(this);

    for (const [element, context] of this.elements.entries()) {
      this.unmount(element, context);
    }

    this.elements.clear();
  }

  mount(element: HTMLElement): HTMLCanvasElement {
    const data: HandwritingData = [];

    const {
      options: { onStart, onEnd, zIndex = 100 },
    } = this;

    const oldStyles = {
      position: element.style.position,
    };
    element.style.position = "relative";

    const canvasElement = document.createElement("canvas");

    canvasElement.style.position = "absolute";
    canvasElement.style.zIndex = zIndex.toString();

    let flag = false;

    const ctx = canvasElement.getContext("2d");

    const listeners = {
      resize: () => {
        const { offsetHeight, offsetWidth } = element;
        canvasElement.width = offsetWidth;
        canvasElement.height = offsetHeight;

        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
      },
    };

    addEventListeners(window, listeners);

    listeners.resize()

    const canvasElementListeners = {
      pointerdown: ({ offsetX, offsetY }) => {
        flag = true;
        ctx.moveTo(offsetX, offsetY);
        ctx.beginPath();
        data.push([[~~offsetX, ~~offsetY]]);
        onStart && onStart.call(this, element);
      },
      pointermove: ({ offsetX, offsetY, movementX, movementY }) => {
        if (!flag) {
          return;
        }

        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();

        data.slice(-1)[0].push([~~movementX, ~~movementY]);
      },
      pointerup: () => {
        flag = false;
        ctx.closePath();

        this.functionalServiceProvider(data, (result, error) => {
          onEnd && onEnd.call(this, element, result, error);
        });
      },
      pointerleave: () => {
        flag = false;
        ctx.closePath();
      },
      dblclick: () => {
        data.length = 0;
        // 清空画布
        canvasElement.width = canvasElement.width;
      },
    };

    addEventListeners(canvasElement, canvasElementListeners);

    element.append(canvasElement);

    this.elements.set(element, {
      data,
      listeners,
      canvasElementListeners,
      oldStyles,
      canvasElement,
    });

    return canvasElement;
  }

  unmount(
    element: HTMLElement,
    { oldStyles, listeners, canvasElement, canvasElementListeners }: Context
  ) {
    Object.assign(element.style, oldStyles);
    removeEventListeners(window, listeners);
    removeEventListeners(canvasElement, canvasElementListeners);
  }
}
