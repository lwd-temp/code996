<template>
  <div class="table-box">
    <table class="container table">
      <thead>
        <tr>
          <th class="l">时间类型</th>
          <th v-for="item in list" :class="getActive(item.index996)">{{ item.type }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in tableConfig">
          <td class="l">{{ row.label }}</td>
          <td v-for="item in list" :class="getActive(item.index996)">{{ item[row.key] }}{{ row.unit }}</td>
        </tr>
      </tbody>
    </table>
    <p class="tips">* 高亮列为该项目最接近的指标</p>
  </div>
</template>
<script setup lang="ts">
import { watch } from '@vue/runtime-core'
import { ref } from 'vue'
import { findNear } from '../utils/util'

const props = defineProps({
  index996: {
    type: Number,
  },
})

const tableConfig = [
  { label: '日均公司打卡时长', key: 'value', unit: 'h' },
  { label: '日均有效工作时间', key: 'codeTime', unit: 'h' },
  { label: '每周实际工时', key: 'weekTime', unit: 'h' },
  { label: '预计每周加班时长', key: 'overtime', unit: 'h' },
  { label: '加班时间占比', key: 'overtimeRate', unit: '%' },
  { label: '996指数', key: 'index996', unit: '' },
]

const list: any[] = [
  { type: '955', value: 8, codeTime: 6, weekTime: 30, overtime: -7.5, overtimeRate: -16, index996: -21 },
  { type: '965', value: 9, codeTime: 7.5, weekTime: 37.5, overtime: 0, overtimeRate: 0, index996: 0 },
  { type: '966', value: 9, codeTime: 7.5, weekTime: 45, overtime: 7.5, overtimeRate: 16, index996: 48 },
  { type: '995', value: 12, codeTime: 9.5, weekTime: 47.5, overtime: 10, overtimeRate: 21, index996: 63 },
  { type: '996', value: 12, codeTime: 9.5, weekTime: 57, overtime: 19.5, overtimeRate: 34, index996: 100 },
  { type: '997', value: 12, codeTime: 9.5, weekTime: 66.5, overtime: 29, overtimeRate: 50, index996: 130 },
  { type: '9126', value: 15, codeTime: 12, weekTime: 75, overtime: 37.5, overtimeRate: 100, index996: 150 },
]

const nearValue = ref(0)

watch(
  () => props.index996,
  (val) => {
    nearValue.value = findNear(val)
  }
)

const getActive = (index: number) => {
  return nearValue.value === index ? 'active' : ''
}
</script>
<style lang="scss" scoped></style>
