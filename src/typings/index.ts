export interface TimeCount {
  /**
   * commit 时间
   */
  time: string
  /**
   * commit 数量
   */
  count: number
}

export interface CalcTimeCount extends TimeCount {
  /**
   * 分数
   */
  score: number
}
