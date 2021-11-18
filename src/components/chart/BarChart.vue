<template>
  <div class="chart">
    <vue3-chart-js v-bind="{ ...barChart }" />
  </div>
</template>
<script setup lang="ts">
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

const props = defineProps({
  labels: {
    type: Array,
    default: () => [],
  },
  values: {
    type: Array,
    default: () => [],
  },
})

const barChart = {
  type: 'bar',
  height: 400,
  width: 400,
  data: {
    labels: props.labels,
    datasets: [
      {
        data: props.values,
      },
    ],
  },
}
</script>
<style lang="scss" scoped>
.chart {
  width: 400px;
  height: 400px;
}
</style>
