import { TimeCount } from '../../../typings'

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
  let times

  return times
}
