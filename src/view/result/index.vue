<template>
  <div class="result">
    <div class="wrapper main">
      <div>
        <h1>该项目的工作时长为：{{ result.tmpl }}</h1>
        <p>这是一个普通项目，你应该会干的比较开心</p>
      </div>
      <h2>项目分析解读</h2>
      <div>
        <p>分析时间段：{{ result.timeStr }}</p>
        <p>总 commit 数：{{ result.totalCount }}</p>
      </div>
      <div class="items">
        <div class="item">
          <h2>按小时commit分布：</h2>
          <BarChart class="mr20" :data="hourResult" />
        </div>
        <div class="item">
          <h2>按天commit分布：</h2>
          <BarChart class="mr20" :data="weekResult" />
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
import BarChart from './components/BarChart.vue'
import { getResult, getRoutesMeta } from './core'

const hourResult = ref<TimeCount[]>([])
const weekResult = ref<TimeCount[]>([])
const result = ref<any>({})

function init() {
  const { hourData, weekData, timeStr } = getRoutesMeta()

  hourResult.value = [...hourData]
  weekResult.value = [...weekData]

  result.value = {
    ...getResult(),
    timeStr,
  }
}

onMounted(() => {
  init()
})
</script>
<style lang="scss" scoped>
.result {
  height: 100%;
  width: 100%;
  .wrapper {
    width: 1180px;
    margin: 0 auto;
  }

  .items {
    display: flex;
    .item {
      h2 {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
