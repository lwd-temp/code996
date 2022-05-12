/**
 * 寻找最接近的数字
 */
export function findNear(num: number = 0): number {
  const list = [-21, 0, 48, 63, 100, 130, 150]
  let min = Number.MAX_VALUE
  let index = 0
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    const diff = Math.abs(num - item)
    if (diff < min) {
      min = diff
      index = i
    }
  }
  return list[index]
}
