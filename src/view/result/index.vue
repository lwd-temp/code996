<template>
  <div class="result">
    <div class="wrapper main">
      <div>
        <h1>该项目的996指数是：{{ result.index996 }}</h1>
        <p>定义：为0则不加班，值越大代表加班越严重，996工作制的结果为100</p>
        <p>
          推测你们的工作时间为：
          <span>{{ result.workingType }}</span>
        </p>
        <p>总 commit 数：{{ result.totalCount }}</p>
        <p>分析时间段：{{ result.timeStr }}</p>
      </div>
      <div class="back-btn" @click="goBack">返回</div>
      <div class="content">
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
      <div class="mt20">
        <h2>安全声明：</h2>
        <p>分析结果仅供参考，不代表任何建议</p>
        <p>原始分析数据通过 URL 传输，请不要轻易分享 URL 给第三方</p>
        <p>脚本端和 web 端代码均已开源，项目不会收集任何信息，请放心食用</p>
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
  const { workingType, index996, workHourPl, workWeekPl } = getResult()

  hourResult.value = [...hourData]
  weekResult.value = [...weekData]
  workHourRadio.value = [...workHourPl]
  workWeekRadio.value = [...workWeekPl]

  result.value = {
    workingType,
    totalCount,
    timeStr,
    index996,
  }
}

const goBack = () => {
  router.push({
    name: 'index',
  })
}

checkUrlQueryAndRedirect()

onMounted(() => {
  init()
  console.log(3)
})
</script>
<style lang="scss" scoped>
.result {
  height: 100%;
  width: 100%;
  .wrapper {
    position: relative;
    width: 80%;
    margin: 0 auto;
  }
  .back-btn {
    position: absolute;
    right: 0;
    cursor: pointer;
  }

  .content {
    .section {
      display: flex;
      .item {
        h2 {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
