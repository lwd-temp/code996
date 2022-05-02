<template>
  <div class="result">
    <span class="btn back" @click="goBack">返回</span>
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
      <h2>工作时间参照表：</h2>
      <table class="container table">
        <thead>
          <tr>
            <th>时间类型</th>
            <th>955</th>
            <th>965</th>
            <th>966</th>
            <th>995</th>
            <th>996</th>
            <th>997</th>
            <th>9126</th>
            <th>9127</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>日均公司打卡时长</td>
            <td>8</td>
            <td>9</td>
            <td>9</td>
            <td>12</td>
            <td>12</td>
            <td>12</td>
            <td>15</td>
            <td>15</td>
          </tr>
          <tr>
            <td>日均有效工作时间</td>
            <td>6</td>
            <td>7.5</td>
            <td>7.5</td>
            <td>9.5</td>
            <td>9.5</td>
            <td>9.5</td>
            <td>12.5</td>
            <td>12.5</td>
          </tr>
          <tr>
            <td>实际工时</td>
            <td>30</td>
            <td>37.5</td>
            <td>45</td>
            <td>47.5</td>
            <td>57</td>
            <td>66.5</td>
            <td>75</td>
            <td>87.5</td>
          </tr>
          <tr>
            <td>预计每周加班时长</td>
            <td>-7.5</td>
            <td>0</td>
            <td>7.5</td>
            <td>10</td>
            <td>19.5</td>
            <td>29</td>
            <td>37.5</td>
            <td>50</td>
          </tr>
          <tr>
            <td>加班时间占比</td>
            <td>0</td>
            <td>0</td>
            <td>16%</td>
            <td>21%</td>
            <td>34%</td>
            <td>43.6%</td>
            <td>50%</td>
            <td>57%</td>
          </tr>
          <tr>
            <td>996指数</td>
            <td>负分</td>
            <td>0分</td>
            <td>48分</td>
            <td>63分</td>
            <td>100分</td>
            <td>130分</td>
            <td>150分</td>
            <td>171分</td>
          </tr>
        </tbody>
      </table>
      <div class="mt20 container">
        <h2>安全声明：</h2>
        <p>分析结果仅供参考，不代表任何建议</p>
        <p>原始分析数据通过 URL 传输，请不要轻易分享 URL 给第三方</p>
        <p>请勿用于正式场合，不接受查水表</p>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TimeCount } from '../../typings'
import { router } from '../../router'
import BarChart from './components/BarChart.vue'
import PieChart from './components/PieChart.vue'
import Footer from '../../public/components/Footer.vue'
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
<style lang="scss" scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  tr {
    border-bottom: 1px solid #ccc;
    td {
      padding: 10px;
      text-align: center;
    }
  }
  th {
    text-align: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  td {
    text-align: center;
    padding: 10px;
  }
}
</style>
