import { TimeCount } from '../../../typings'
import { getTotalCount, getRadio } from './utils'
import { getWorkDayType, getWorkTime } from './calc'

/**
 * 解析url参数为标准数据格式
 * @param str 分析参数
 * @returns
 */
export function parseResult(str: string): TimeCount[] {
  let list: TimeCount[] = []
  str.split(',').forEach((item) => {
    const arr = item.split('_')
    list.push({
      time: arr[1],
      count: Number(arr[0]),
    })
  })

  return list
}

/**
 * 二次改造周维度数据
 * @param list
 * @returns
 */
export function parseWeekData(list: TimeCount[]): TimeCount[] {
  const templateList = [
    { name: '周一', key: 'Mon' },
    { name: '周二', key: 'Tue' },
    { name: '周三', key: 'Wed' },
    { name: '周四', key: 'Thu' },
    { name: '周五', key: 'Fri' },
    { name: '周六', key: 'Sat' },
    { name: '周日', key: 'Sun' },
  ]
  return templateList.map((tem) => {
    const item = list.find((i) => i.time === tem.key) as TimeCount

    return {
      time: tem.name,
      count: item?.count || 0,
    }
  })
}

export function useHour(hourData: TimeCount[]) {
  // commit 总数
  const totalCount = hourData.reduce((total, item) => total + item.count, 0)

  const times = getWorkTime(hourData)

  return {
    totalCount,
    times,
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

  return {
    totalCount,
    commitCount,
    commitRatio,

    workDayType,
  }
}
