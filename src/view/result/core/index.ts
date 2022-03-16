import { useRouter } from 'vue-router'
import { TimeCount } from '../../../typings'
import { useWeek, useHour } from './timer'
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

  console.log(query.time)

  return {
    hourData,
    weekData,
    timeRange,
    timeStr,
  }
}

/**
 * 获取分析结果
 */
export function getResult() {
  const { hourData, weekData } = getRoutesMeta()
  const { openingTime, closingTime, totalCount } = useHour(hourData)
  const { workDayTypeValue } = useWeek(weekData)

  const _openingTime = Number(openingTime.time)
  const _closingTime = Number(closingTime.time) % 12
  console.log(openingTime, closingTime)

  return {
    tmpl: `${_openingTime}${_closingTime}${workDayTypeValue}`,
    totalCount,
  }
}
