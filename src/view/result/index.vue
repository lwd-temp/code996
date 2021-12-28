<template>
  <div class="result">
    <div class="banner">
      <div class="wrapper">
        <p class="logo-text mb10">#CODE996</p>
      </div>
    </div>
    <div class="wrapper main">
      <div>
        <h1>该项目的工作时长为：965</h1>
        <!-- 96 5 -->
        <!-- 一周几天班，根据比例计算，按双周14天的 commit 比例算，如果周末的比例是在 -->
        <p>这是一个普通项目，你应该会干的比较开心</p>
        <!-- <p>小于6小时：神仙项目</p>
        <p>8小时：普普通通</p>
        <p>9小时：勉勉强强</p>
        <p>10小时：加班可能有点多！！</p>
        <p>12小时：快跑！！</p> -->
      </div>
      <h1>项目分析解读</h1>
      <div>
        <p>分析时间段：2021.01.01 - 2022.01.01</p>
        <p>总 commit 数：326</p>
      </div>
      <h2>小时维度数据解读：</h2>
      <div class="section">
        <BarChart class="mr20" :data="hourResult" />
        <div>
          <h3>解读内容：</h3>
          <p>你们中午休息的时间是1个小时，看起来有点短呢</p>
          <p>你们中午休息的时间是1个半小时，符合大部分公司的规律</p>
          <p>你们中午休息的时候是2个小时，羡慕你们</p>
          <p>你们中午休息的时间是2个半小时，真的很棒</p>
          <p>你们中午休息的时间是3个小时，真的很不错！！</p>
          <p>看起来你们每周可能有3天会加班到8点以后</p>
          <p></p>
        </div>
      </div>
      <h2>周维度数据解读：</h2>
      <div class="section">
        <BarChart class="mr20" :data="weekResult" />
        <div>
          <h3>解读内容：</h3>
          <p>周末的commit 数为0，良心项目！</p>
          <p>周末只有&lt;1%的 commit，看起来只有突发情况才会修复 BUG</p>
          <p>周末的 commit 跟工作日的一样，看起来你们不好过呢</p>
          <p>周末的 commit 居然多于工作日的 commit，你们是神仙吗</p>
          <p>周一跟周五的工作效率看起来有点低呢……（这条需要结合小时维度分析）</p>
          <p>该项目可能存在周二和周四加班的嫌疑（这条需要结合小时维度分析）</p>
          <p></p>
        </div>
      </div>
      <div>
        <h2>安全提示：</h2>
        <p>该项目仅供娱乐，分析结果不代表任何建议</p>
        <p>原始分析数据通过 URL 参数的方式传输，为了项目的数据安全，请不要轻易分享 URL 给第三方</p>
        <p>脚本端和 web 端代码均已开源，项目不会收集任何信息，请放心食用</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { TimeCount } from '../../typings'
import BarChart from './components/BarChart.vue'
import { parseResult, parseWeekData, useWeek, useHour } from './utils/time'

const router = useRouter()
const { query } = router.currentRoute.value

const hourResult = ref<TimeCount[]>([])
const weekResult = ref<TimeCount[]>([])

function init() {
  const hourData = parseResult(query.hour as string)
  const weekData = parseWeekData(parseResult(query.week as string))

  hourResult.value = [...hourData]
  weekResult.value = [...weekData]
  const { times } = useHour(hourData)

  const { commitRatio } = useWeek(weekData)
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

  .section {
    display: flex;
  }
}
</style>
