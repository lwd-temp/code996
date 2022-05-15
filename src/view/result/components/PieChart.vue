<template>
  <svg class="bar-chart" ref="bar"></svg>
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import chartXkcd from 'chart.xkcd'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})

const bar = ref(null)

function init() {
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

onMounted(() => {
  nextTick(() => {
    init()
  })
})
</script>
<style lang="scss" scoped></style>
