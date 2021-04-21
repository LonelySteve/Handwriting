/**
 * 手写数据，三维数组
 *
 * 第一维度：每一次绘制（指针按下，指针移动，指针松开）产生的数据集
 * 第二维度：某一次绘制的产生的坐标数据，其中第一个表示起始坐标，此后都是以上一坐标计算的差值
 * 第三维度：二维平面坐标，x 和 y
 */
export type HandwritingData = number[][][];

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
