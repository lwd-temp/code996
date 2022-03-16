<template>
  <div>
    <Chart :size="{ width: 420, height: 420 }" :data="data" direction="horizontal" :axis="axis">
      <template #layers>
        <Grid strokeDasharray="2,2" />
        <Bar :dataKeys="['time', 'count']" :barStyle="{ fill: '#90e0ef' }" />
        <Marker :value="1000" label="Avg." color="#e76f51" :strokeWidth="2" strokeDasharray="6 6" />
      </template>

      <template #widgets>
        <Tooltip
          borderColor="#48CAE4"
          :config="{
            pl: { color: '#90e0ef' },
            avg: { color: '#0096c7' },
            inc: { color: '#48cae4' },
          }"
        />
      </template>
    </Chart>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Chart, Bar, Grid, Marker, Tooltip } from 'vue3-charts'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})

const axis = ref({
  primary: {
    type: 'band',
  },
  secondary: {
    domain: ['dataMin', 'dataMax+10'],
    type: 'linear',
    ticks: 8,
  },
})
</script>
<style lang="scss" scoped></style>
