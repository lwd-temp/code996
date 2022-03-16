import { getTotalCount, getRadio } from './utils'
import { getWorkDayType, getWorkTime } from './calc'
import { TimeCount } from '../../../typings'

export function useHour(hourData: TimeCount[]) {
  // commit 总数
  const totalCount = hourData.reduce((total, item) => total + item.count, 0)

  const { openingTime, closingTime } = getWorkTime(hourData)

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
    totalCount,
    openingTime,
    closingTime,
  }
}

export function useWeek(weekData: TimeCount[]) {
  const workDayData = weekData.slice(0, 5)
  const saturdayData = weekData[5]
  const sundayData = weekData[6]
  // commit 总数
  const totalCount = getTotalCount(weekData)
  const commitCount = {
    workday: getTotalCount(workDayData),
    saturday: saturdayData.count,
    sunday: sundayData.count,
  }

  // commit 比例
  const commitRatio = {
    workday: getRadio(commitCount.workday, totalCount),
    saturday: getRadio(commitCount.saturday, totalCount),
    sunday: getRadio(commitCount.sunday, totalCount),
  }

  const workDayType = getWorkDayType(commitRatio)
  const workDayTypeMap = [5, 6, 6, 7, 7]

  const workDayTypeValue = workDayTypeMap[workDayType - 1]

  return {
    totalCount,
    commitCount,
    commitRatio,

    workDayType,
    workDayTypeValue,
  }
}
