import { useRouter } from 'vue-router'
import { getHourResult } from './hour'
import { getWeekResult } from './week'
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
  const { openingTime, closingTime, workTimePl } = getHourResult(hourData)
  const { workDayTypeValue, workWeekPl } = getWeekResult(weekData)

  const _openingTime = Number(openingTime.time)
  const _closingTime = Number(closingTime.time) % 12
  console.log(workTimePl, workWeekPl)

  // 修正后的加班时间
  const overtimeHour = getCorrection({ workTimePl, workWeekPl })

  // console.log(overtimeHour)

  return {
    // 工作类型模板
    workingType: `${_openingTime}${_closingTime}${workDayTypeValue}`,
    workTimePl,
    workWeekPl,
  }
}

/**
 * 获取修正后的加班时间 △x
 * 要计算的加班时间为：周一到周五的非工作时间+周末全天，因此以工作日加班时间为标准，进行数学修正
 * 定义：小时维度 x 加班时长 y 正常上班时长；天维度 m 工作日；n 周六周日
 */
function getCorrection({ workTimePl, workWeekPl }: any): number {
  const y = workTimePl[0].count
  const x = workTimePl[1].count
  const m = workWeekPl[0].count
  const n = workWeekPl[1].count

  return (x + (y * n) / (m + n)).toFixed(0)
}
