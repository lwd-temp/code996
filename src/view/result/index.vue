<template>
  <div class="result">
    <div class="wrapper">
      <div>
        <h1>这里是标题</h1>
        <p>标题文案展示：</p>
        <p>小于6小时：神仙项目</p>
        <p>8小时：普普通通</p>
        <p>9小时：勉勉强强</p>
        <p>10小时：加班可能有点多！！</p>
        <p>12小时：快跑！！</p>
        <h2>这里是副标题</h2>
        <p>这是一个996/955的项目</p>
      </div>
      <h1>项目分析解读</h1>
      <div>
        <p>分析时间段：2021.01.01 - 2022.01.01</p>
        <p>总 commit 数：326</p>
      </div>
      <h2>24小时维度数据解读：</h2>
      <BarChart :data="dayResult" />
      <h2>周维度数据解读：</h2>
      <BarChart :data="weekResult" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { TimeCount } from '../../typings'
import BarChart from './components/BarChart.vue'
import { parseResult, parseWeekData, useWeek } from './utils/time'

const router = useRouter()
const { query } = router.currentRoute.value

const dayResult = ref<TimeCount[]>([])
const weekResult = ref<TimeCount[]>([])

function init() {
  const dayData = parseResult(query.day as string)
  const weekData = parseWeekData(parseResult(query.week as string))

  const {} = useWeek(weekData)

  dayResult.value = [...dayData]
  weekResult.value = [...weekData]
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
}
</style>
