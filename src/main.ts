import { RecognitionResult } from "./abstract";
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
  onBeforeDestory?: (this: Handwriting) => any;
}

export default class Handwriting {
  private elements: HTMLElement[];
  private canvasElements: [HTMLElement, HTMLCanvasElement][] = [];

  private inited: boolean = false;
  private destoryed: boolean = false;

  protected readonly functionalServiceProvider: FunctionalServiceProvider;

  constructor(
    selector: string | HTMLElement[],
    serviceProvider: ServiceProvider,
    private options: HandwritingOptions = {}
  ) {
    if (typeof selector === "string") {
      this.elements = Array.prototype.slice.call(
        document.querySelectorAll(selector)
      );
    } else {
      this.elements = selector;
    }
    this.functionalServiceProvider =
      typeof serviceProvider === "function"
        ? serviceProvider
        : toFunctionalServiceProvider(serviceProvider);

    this.init();
  }

  init() {
    if (this.inited) {
      throw new Error("inited");
    }
    this.elements.forEach((element) => {
      this.mountCanvas(element);
      element.addEventListener("resize", this.handleElementResize);
    });
    this.inited = true;
  }

  destory() {
    if (this.destoryed) {
      throw new Error("destoryed");
    }
    this.options.onBeforeDestory?.call(this);

    this.unmountCanvasElements();
    this.elements.forEach((element) => {
      element.removeEventListener("resize", this.handleElementResize);
    });

    this.destoryed = true;
  }
  // TODO 修复 Resize 情景
  handleElementResize(this: HTMLElement, ev: UIEvent) {
    throw new Error("Method not implemented.");
  }

  unmountCanvasElements() {
    this.canvasElements.forEach(([element, canvasElement]) => {
      canvasElement.onpointerdown = canvasElement.onpointermove = canvasElement.onpointerup = canvasElement.onpointerleave = null;
    });
    this.canvasElements.length = 0;
  }

  mountCanvas(element: HTMLElement): HTMLCanvasElement {
    const {
      options: { onStart, onEnd },
    } = this;
    const { width, height } = element.getBoundingClientRect();
    // TODO 改进挂载方案，比如监听滚动事件，resize 事件等，按需修改 fixed 定位的 canvas 坐标
    element.style.position = "relative";

    const canvasElement = document.createElement("canvas");

    let down = false;

    canvasElement.width = width;
    canvasElement.height = height;
    canvasElement.style.position = "absolute";
    canvasElement.style.zIndex = (this.options.zIndex ?? 100).toString();

    const ctx = canvasElement.getContext("2d");

    const data = [];

    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    canvasElement.onpointerdown = ({ offsetX, offsetY }) => {
      down = true;
      ctx.moveTo(offsetX, offsetY);
      ctx.beginPath();
      data.push([~~offsetX, ~~offsetY]);
      onStart && onStart.call(this, element);
    };

    canvasElement.onpointermove = ({
      offsetX,
      offsetY,
      movementX,
      movementY,
    }) => {
      if (!down) {
        return;
      }

      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();

      data.slice(-1)[0].push([~~movementX, ~~movementY]);
    };

    canvasElement.onpointerup = () => {
      down = false;
      ctx.closePath();

      this.functionalServiceProvider(data, (result, error) => {
        onEnd && onEnd.call(this, element, result, error);
      });
    };

    canvasElement.onpointerleave = () => {
      down = false;
      ctx.closePath();
    };

    canvasElement.ondblclick = () => {
      data.length = 0;
      ctx.clearRect(0, 0, width, height);
    };

    element.append(canvasElement);

    this.canvasElements.push([element, canvasElement]);

    return canvasElement;
  }
}
