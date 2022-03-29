<template>
  <svg class="bar-chart" ref="bar"></svg>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import chartXkcd from 'chart.xkcd'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})

const bar = ref(null)

watch(
  () => props.data,
  (val) => {
    console.log(2, props.data)
    new chartXkcd.Pie(bar.value, {
      data: {
        labels: props.data.map((item: any) => item.time),
        datasets: [
          {
            data: props.data.map((item: any) => item.count),
          },
        ],
      },
      options: {
        backgroundColor: '#212121',
        strokeColor: '#fff',
      },
    })
  }
)
</script>
<style lang="scss" scoped>
.bar-chart {
  width: 500px;
}
</style>
