import { TimeCount } from '../../../typings'

/**
 * 计算总数量
 */
export function getTotalCount(data: TimeCount[]) {
  return data.reduce((total, item) => total + item.count, 0)
}

/**
 * 计算比例
 * @param element 分子
 * @param denominator 分母
 * @param decimal 小数位，默认2位
 * @returns 百分比
 */
export function getRadio(element: number, denominator: number, decimal: number = 2): number {
  return +((element / denominator) * 100).toFixed(decimal)
}
