import { useRouter } from 'vue-router'
import { getHourResult } from './hour'
import { getWeekResult } from './week'
import { parseResult, parseWeekData } from './url-helper'

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
  const { openingTime, closingTime, workHourPl } = getHourResult(hourData)
  const { workDayTypeValue, workWeekPl } = getWeekResult(weekData)
  const { index996, overTimeRadio } = get996Index({ workHourPl, workWeekPl })

  const MSG_TYPE = checkDataIsRight({ workHourPl, workWeekPl, index996, overTimeRadio })

  const _openingTime = Number(openingTime?.time)
  const _closingTime = Number(closingTime?.time) % 12

  return {
    // 工作类型模板
    workingType: `${_openingTime}${_closingTime}${workDayTypeValue}`,
    workHourPl,
    workWeekPl,
    index996,
    MSG_TYPE,
  }
}

/**
 * 计算996指数
 */
function get996Index({ workHourPl, workWeekPl }: any) {
  const y = workHourPl[0].count
  const x = workHourPl[1].count
  const m = workWeekPl[0].count
  const n = workWeekPl[1].count

  /**
   * 修正后的加班commit数量
   * 要计算的加班时间为：周一到周五的非工作时间+周末全天，因此以工作日加班时间为标准，进行数学修正
   * 定义：小时维度 x 加班时长 y 正常上班时长；天维度 m 工作日；n 周六周日
   */
  const overTimeAmendCount = (x + (y * n) / (m + n)).toFixed(0)
  const totalCount = y + x

  // 加班commit百分比
  const overTimeRadio = Math.ceil((overTimeAmendCount / totalCount) * 100)

  /**
   * 996指数
   */
  const index996 = overTimeRadio * 3

  return { index996, overTimeRadio }
}

/**
 * 校验数据
 * 1. 项目数据伪造✅
 * 2. 项目commit过少✅
 * 3. 项目commit分布不像正常工作时间
 */
function checkDataIsRight(params: any) {
  const { workHourPl, workWeekPl, overTimeRadio } = params
  let MSG_TYPE: string = ''

  const total1 = workHourPl[0].count + workHourPl[1].count
  const total2 = workWeekPl[0].count + workWeekPl[1].count

  if (total1 !== total2) {
    MSG_TYPE = 'commit_is_fake'
  }

  if (total1 < 100 || total2 < 100) {
    MSG_TYPE = 'commit_is_low'
  }

  if (overTimeRadio > 65) {
    MSG_TYPE = 'overTimeRadio_is_too_high'
  }

  return MSG_TYPE
}
