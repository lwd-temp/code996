<template>
  <div class="result">
    <div class="wrapper">
      <h1>项目分析解读</h1>
      <div>
        <p>分析时间段：2021.01.01 - 2022.01.01</p>
        <p>总 commit 数：326</p>
      </div>
      <div>
        <h1>恭喜你，965公司！</h1>
        <h1>996，快跑！！</h1>
        <h1>997，快跑！！</h1>
        <h1>997，快跑！！！</h1>
      </div>
      <div>
        <h1>成就系统</h1>
        <p>夜猫子成就！</p>
      </div>
      <div>一天二十四小时 柱状图</div>
      <div>一周七天 柱状图</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { TimeCount } from '../../typings/times'

const router = useRouter()
const { query } = router.currentRoute.value

const labels = ref<string[]>([])
const values = ref<number[]>([])

function parseResult(str: string): TimeCount[] {
  let list: TimeCount[] = []
  str.split(',').forEach((item) => {
    item.replace(/(?<count>\d+)_(?<time>\w+)/g, (...args) => list.push(args[5]))
  })

  return list
}

function init() {
  const hourResult = parseResult(query.hour as string)
  const dayResult = parseResult(query.day as string)
  console.log(hourResult, dayResult)

  // result.forEach((item: TimeCount) => {
  //   labels.value.push(item.time)
  //   values.value.push(Number(item.count))
  // })
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
