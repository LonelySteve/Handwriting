/// <reference types="jquery" />
/// <reference types="sizzle" />

/**
 * 手写数据，三维数组
 *
 * 第一维度：每一次绘制（指针按下，指针移动，指针松开）产生的数据集
 * 第二维度：某一次绘制的产生的坐标数据，其中第一个表示起始坐标，此后都是以上一坐标计算的差值
 * 第三维度：二维平面坐标，x 和 y
 */
export declare type HandwritingData = number[][][];
/**
 * 识别结果
 */
export interface RecognitionResult {
	/**
	 * 单字猜测结果，按准确率由高到低进行排序
	 */
	characters: string[];
	/**
	 * 联想词
	 */
	assocWords?: string[];
}
export declare type Service = (data: HandwritingData) => Promise<RecognitionResult>;
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
	onEnd?: (this: Handwriting, element: HTMLElement, result?: RecognitionResult, error?: Error) => any;
	/**
	 * 当调用 reset 方法准备卸载并重置所有元素之前的回调函数
	 */
	onBeforeReset?: (this: Handwriting) => any;
}
export interface Context {
	data: HandwritingData;
	canvasElement: HTMLCanvasElement;
	properties: Map<HTMLElement, object>;
	listeners: Map<EventTarget, Record<string, Function>>;
	query: (withClearCanvas?: boolean) => Promise<RecognitionResult>;
}
export declare type ElementCollection = string | HTMLElement[] | JQuery;
export default class Handwriting {
	private options;
	private readonly elements;
	protected readonly service: Service;
	/**
	 * 实例化一个 Handwriting 对象
	 *
	 * @param elements 要挂载的元素集合
	 * @param service 手写识别的服务，可以是字符串，此时表示使用 QQShuru API 规范的服务入口路径
	 * @param options Handwriting 的选项
	 */
	constructor(elements: ElementCollection, service: Service | string, options?: HandwritingOptions);
	/**
	 * 重置 Handwriting，所有已挂载的元素均会被卸载
	 */
	reset(): void;
	/**
	 * 将手写识别功能挂载到新的元素上，可指定方法级别的选项参数，实例化的选项参数将作为默认值
	 *
	 * @param elements 被挂载的元素集合，不能包含空元素，\<INPUT/\> 是典型的空元素之一
	 * @param options 方法级别的选项参数
	 */
	mount(elements: ElementCollection, options?: HandwritingOptions): void;
	/**
	 * 卸载已挂载的元素
	 *
	 * @param element 要卸载的元素集合
	 */
	unmount(elements: ElementCollection): void;
	/**
	 * 手动查询被挂载元素集合的识别结果
	 *
	 * @param element 被挂载的元素
	 * @param withClearCanvas 查询完成后清除画板
	 * @returns 识别结果数组的 Promise
	 */
	query(elements: ElementCollection, withClearCanvas?: boolean): Promise<[
		unknown,
		unknown,
		unknown,
		unknown,
		unknown,
		unknown,
		unknown,
		unknown,
		unknown,
		unknown
	]>;
	protected _mount(element: HTMLElement, options?: HandwritingOptions): Context;
	protected _unmount(element: HTMLElement): boolean;
	protected _query(element: HTMLElement, withClearCanvas?: boolean): Promise<RecognitionResult>;
	protected ensureIsNotEmptyElement(element: HTMLElement): void;
	protected clearCanvasAndData(canvasContext: CanvasRenderingContext2D, data: HandwritingData, options: HandwritingOptions): void;
	protected bindProperties(options: HandwritingOptions, element: HTMLElement): Map<HTMLElement, {
		style: {
			position: string;
		};
	}>;
	protected bindListeners(options: HandwritingOptions, data: HandwritingData, element: HTMLElement, canvasContext: CanvasRenderingContext2D): Map<EventTarget, Record<string, Function>>;
	protected updateCanvasSize(options: HandwritingOptions, element: HTMLElement, canvasContext: CanvasRenderingContext2D): void;
	protected resetCanvasContext({ style, width }: HandwritingOptions, canvasContext: CanvasRenderingContext2D): void;
	protected createCanvasElement({ zIndex, }: HandwritingOptions): HTMLCanvasElement;
}

export {};
