<template>
  <div class="result">
    <div class="wrapper main">
      <div class="top-result container">
        <h1>该项目的996指数是：</h1>
        <div class="result-line">
          <div class="score-box">
            <div class="score-number">{{ result.index996 }}</div>
            <div class="subtitle">{{ result.index996Str }}</div>
          </div>
          <div class="content">
            <p>
              推测你们的工作时间类型为：
              <span>{{ result.workingType }}</span>
            </p>
            <p>
              总 commit 数：
              <span>{{ result.totalCount }}</span>
            </p>
            <p>
              分析时间段：
              <span>{{ result.timeStr }}</span>
            </p>
            <div className="exp">
              <p>996指数：为0则不加班，值越大代表加班越严重，996工作制对应的值为100。</p>
            </div>
          </div>
        </div>
      </div>
      <div class="content container">
        <div class="section">
          <div class="item">
            <h2>按小时commit分布：</h2>
            <BarChart class="mr20" :data="hourResult" />
          </div>
          <div class="item">
            <h2>加班/工作commit占比：</h2>
            <PieChart class="mr20" :data="workHourRadio" />
          </div>
        </div>
        <div class="section">
          <div class="item">
            <h2>按天commit分布：</h2>
            <BarChart class="mr20" :data="weekResult" />
          </div>
          <div class="item">
            <h2>加班/工作commit占比：</h2>
            <PieChart class="mr20" :data="workWeekRadio" />
          </div>
        </div>
      </div>
      <div class="mt20 container">
        <h2>安全声明：</h2>
        <p>分析结果仅供参考，不代表任何建议</p>
        <p>原始分析数据通过 URL 传输，请不要轻易分享 URL 给第三方</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TimeCount } from '../../typings'
import { router } from '../../router'
import BarChart from './components/BarChart.vue'
import PieChart from './components/PieChart.vue'
import { getResult, getRoutesMeta } from './core'
import { checkUrlQueryAndRedirect } from './core/url-helper'

const hourResult = ref<TimeCount[]>([])
const weekResult = ref<TimeCount[]>([])
const workHourRadio = ref<any[]>([])
const workWeekRadio = ref<any[]>([])
const result = ref<any>({})

function init() {
  const { hourData, weekData, timeStr, totalCount } = getRoutesMeta()
  const { workingType, index996, index996Str, workHourPl, workWeekPl } = getResult()

  hourResult.value = [...hourData]
  weekResult.value = [...weekData]
  workHourRadio.value = [...workHourPl]
  workWeekRadio.value = [...workWeekPl]

  result.value = {
    workingType,
    totalCount,
    timeStr,
    index996,
    index996Str,
  }
}

const goBack = () => {
  router.push({ name: 'index' })
}

checkUrlQueryAndRedirect()

onMounted(() => {
  init()
})
</script>
<style lang="scss" scoped></style>
