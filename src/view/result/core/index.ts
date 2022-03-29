import { useRouter } from 'vue-router'
import { useHour } from './hour'
import { useWeek } from './week'
import { parseResult, parseWeekData } from '../utils/time'

/**
 * 获取路由元信息
 */
export function getRoutesMeta() {
  const router = useRouter()
  const { query } = router.currentRoute.value

  const hourData = parseResult(query.hour as string)
  const weekData = parseWeekData(parseResult(query.week as string))
  const timeRange = (query.time as string).split('_')
  const timeStr = `${timeRange[0]} ~ ${timeRange[1]}`
  const totalCount = hourData.reduce((total, item) => total + item.count, 0)

  console.log(query.time)

  return {
    hourData,
    weekData,
    timeRange,
    timeStr,
    totalCount,
  }
}

/**
 * 获取分析结果
 */
export function getResult() {
  const { hourData, weekData } = getRoutesMeta()
  const { openingTime, closingTime, workTimePl } = useHour(hourData)
  const { workDayTypeValue, workWeekPl } = useWeek(weekData)

  const _openingTime = Number(openingTime.time)
  const _closingTime = Number(closingTime.time) % 12
  console.log(openingTime, closingTime)

  return {
    // 工作类型模板
    workingType: `${_openingTime}${_closingTime}${workDayTypeValue}`,
    workTimePl,
    workWeekPl,
  }
}
