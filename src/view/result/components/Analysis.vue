<template>
  <div>
    analysis
    <BarChart :labels="labels" :values="values"></BarChart>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BarChart from '../../../components/chart/BarChart.vue'
import { useRouter } from 'vue-router'
import { HourItem } from '../../../typings/times'

const router = useRouter()
const { query } = router.currentRoute.value

const labels = ref<string[]>([])
const values = ref<number[]>([])

function parseResult(str: string): any[] {
  let list: any = []
  str.split(',').forEach((item) => {
    item.replace(/(?<count>\d+)p(?<time>\d+)/g, (...args) => list.push(args[5]))
  })

  console.log(list)
  return list
}

function init() {
  const result = parseResult(query.result as string)

  result.forEach((item: HourItem) => {
    labels.value.push(item.time)
    values.value.push(Number(item.count))
  })
}

onMounted(() => {
  init()
})
</script>
<style lang="scss" scoped></style>
