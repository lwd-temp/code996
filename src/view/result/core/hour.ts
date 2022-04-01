import { TimeCount } from '../../../typings'

export function useHour(hourData: TimeCount[]) {
  const { openingTime, closingTime, workTimePl } = getWorkTime(hourData)

  const openingPrevScore = Math.abs(openingTime.prevScore)

  if (openingPrevScore > 0.5 && openingPrevScore < 0.8) {
    openingTime.time = `${+openingTime.time - 1}`
  }
  // 下班时间
  /**
   * 先判断当前时间是否接近1，如果接近1
   *    则直接取后者为下班时间
   * 如果当前时间大于0.75小于1
   *
   */
  if (closingTime.score < 1) {
  }

  if (closingTime.score + closingTime.nextScore < 0.25) {
    // closingTime.time = `${+closingTime.time - 1}`
  } else if (closingTime.score + closingTime.nextScore > 0.5) {
    // closingTime.time = `${+closingTime.time + 1}`
  }

  return {
    openingTime,
    closingTime,
    workTimePl,
  }
}

/**
 * 获取工作相关commit数据
 */
function getWorkTime(hourData: TimeCount[]) {
  // 14 - 17点平均 commit
  // const standardData = hourData.filter((item) => Number(item.time) >= 14 && Number(item.time) <= 17)
  // const standardTotal = standardData.reduce((total, item) => total + item.count, 0)
  // const averageCommit = standardTotal / standardData.length
  // console.log(averageCommit)

  // 获取效率最高的前 N 个小时
  const sortData = hourData.sort((a, b) => b.count - a.count)
  // console.log(sortData)
  const worktimeData = sortData.slice(0, 8)
  const overtimeData = sortData.slice(8, sortData.length + 1)
  const worktimeDataCount = worktimeData.reduce((total, item) => total + item.count, 0)
  const overtimeDataCount = overtimeData.reduce((total, item) => total + item.count, 0)
  // console.log(worktimeDataCount, overtimeDataCount)

  const workTimePl = [
    { time: '工作', count: worktimeDataCount, timeCount: worktimeData.length },
    { time: '加班', count: overtimeDataCount, timeCount: overtimeData.length },
  ]

  // 平方平均数(并非所有模型均适用， 只有在数值分布呈现正态分布时才适用)
  const quadraticValue = hourData.reduce((total, item) => total + item.count ** 2, 0) / hourData.length
  const standardValue = Math.sqrt(quadraticValue)
  const calcData = hourData.map((item: TimeCount, index: number) => {
    const score = item.count / standardValue
    return {
      ...item,
      score,
      prevScore: (item.count - (hourData[index - 1]?.count || item.count)) / standardValue,
      nextScore: ((hourData[index + 1]?.count || item.count) - item.count) / standardValue,
    }
  })
  // TODO  计算 score 差，然后在相邻的 score 差内寻找差值较大的时间间隔

  // 工作时间
  const workData = calcData.filter((item) => item.score >= 0.75)
  // 工作过渡时间
  const specialData = calcData.filter((item) => item.score < 1.25)
  // 开工时间段
  const openingData = specialData.filter((item) => +item.time >= 8 && +item.time <= 11)
  // 收工时间段
  const closingData = specialData.filter((item) => +item.time >= 17 && +item.time <= 23)
  const openingTime = openingData.sort((a, b) => b.prevScore - a.prevScore)[0]
  const closingTime = closingData.sort((a, b) => a.nextScore - b.nextScore)[0]

  // console.log(calcData)
  // TODO 判断一下这两个时间紧邻的时间的 score 差，如果很离谱，说明可能是30上/下班的

  return {
    // 上班时间
    openingTime,
    // 下班时间
    closingTime,
    // 工作表格
    workTimePl,
  }
}
