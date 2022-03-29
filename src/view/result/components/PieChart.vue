<template>
  <div>
    <!-- <Responsive class="w-full"> -->
    <Chart :size="{ width: 400, height: 400 }" :data="data" direction="circular">
      <template #layers>
        <Pie :dataKeys="['time', 'count']" :pie-style="{ innerRadius: 80, padAngle: 0.09 }" />
      </template>

      <!-- <template #widgets>
        <Tooltip
          borderColor="#48CAE4"
          :config="{
            pl: { color: '#90e0ef' },
            avg: { color: '#0096c7' },
            inc: { color: '#48cae4' },
          }"
        />
      </template> -->
    </Chart>
    <!-- </Responsive> -->
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Chart, Pie, Responsive, Tooltip } from 'vue3-charts'

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
