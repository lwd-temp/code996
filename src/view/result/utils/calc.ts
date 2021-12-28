import { TimeCount, CalcTimeCount } from '../../../typings'

/**
 * 获取每周工作时长
 * @returns type 1: 每周5天 2: 每周6天 3: 大小周 4: 每周7天 5: 周末干活
 */
export function getWorkDayType(commitRatio: any) {
  let type
  if (commitRatio.workday >= 90) {
    type = 1
  } else if (commitRatio.workday >= 85 && commitRatio.workday < 90) {
    type = 2
  } else if (commitRatio.workday >= 79 && commitRatio.workday < 85) {
    type = 3
  } else if (commitRatio.workday >= 72 && commitRatio.workday < 79) {
    type = 4
  } else if (commitRatio.workday < 72) {
    type = 5
  }
  return type
}

/**
 * 获取上班时间和下班时间
 */
export function getWorkTime(hourData: TimeCount[]) {
  // 14 - 17点平均 commit
  // const standardData = hourData.filter((item) => Number(item.time) >= 14 && Number(item.time) <= 17)
  // const standardTotal = standardData.reduce((total, item) => total + item.count, 0)
  // const averageCommit = standardTotal / standardData.length
  // console.log(averageCommit)

  // 获取效率最高的前 N 个小时
  // const res = hourData.sort((a, b) => a.count - b.count)
  // console.log(res)

  // 平方平均数(并非所有模型均适用， 只有在数值分布呈现正态分布时才适用)
  const quadraticValue = hourData.reduce((total, item) => total + item.count ** 2, 0) / hourData.length
  const standardValue = Math.sqrt(quadraticValue)
  const calcData = hourData.map((item: TimeCount) => {
    return {
      ...item,
      score: item.count / standardValue,
    }
  })
  // 工作时间
  const workData = calcData.filter((item) => item.score >= 1)
  // 工作过渡时间
  const specialData = calcData.filter((item) => item.score < 1)
  // 开工时间段
  const openingData = specialData.filter((item) => Number(item.time) >= 8 && Number(item.time) <= 11)
  // 收工时间段
  const closingData = specialData.filter((item) => Number(item.time) >= 17 && Number(item.time) <= 23)
  const openingTime = openingData.sort((a, b) => b.score - a.score)[0]
  const closingTime = closingData.sort((a, b) => b.score - a.score)[0]

  console.log(calcData)
  // TODO 判断一下这两个时间紧邻的时间的 score 差，如果很离谱，说明可能是30上/下班的
  console.log(openingTime)
  console.log(closingTime)

  return {
    // 上班时间
    openingTime,
    // 下班时间
    closingTime,
  }
}
