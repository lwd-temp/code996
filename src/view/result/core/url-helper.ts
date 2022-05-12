import { useRouter } from 'vue-router'
import { TimeCount } from '../../../typings'

/**
 * 解析url参数为标准数据格式
 * @param str 分析参数
 * @returns
 */
export function parseResult(str: string = ''): TimeCount[] {
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
    { name: '周一', key: '1' },
    { name: '周二', key: '2' },
    { name: '周三', key: '3' },
    { name: '周四', key: '4' },
    { name: '周五', key: '5' },
    { name: '周六', key: '6' },
    { name: '周日', key: '7' },
  ]
  return templateList.map((tem) => {
    const item = list.find((i) => i.time === tem.key) as TimeCount

    return {
      time: tem.name,
      count: item?.count || 0,
    }
  })
}

/**
 * 检查路由参数是否合法并跳转
 */
export function checkUrlQueryAndRedirect(): void {
  const router = useRouter()
  const { query } = router.currentRoute.value

  if (!query.time || !query.hour || !query.week) {
    router.push({
      name: 'index',
      query: {
        error: 'url_query_error',
      },
    })
  }
}
