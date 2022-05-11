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
        <tr>
          <td class="l">日均公司打卡时长</td>
          <td v-for="item in list" :class="getActive(item.index996)">{{ item.value }}</td>
        </tr>
        <tr>
          <td class="l">日均有效工作时间</td>
          <td v-for="item in list" :class="getActive(item.index996)">{{ item.codeTime }}</td>
        </tr>
        <tr>
          <td class="l">每周实际工时</td>
          <td v-for="item in list" :class="getActive(item.index996)">{{ item.weekTime }}</td>
        </tr>
        <tr>
          <td class="l">预计每周加班时长</td>
          <td v-for="item in list" :class="getActive(item.index996)">{{ item.overtime }}</td>
        </tr>
        <tr>
          <td class="l">加班时间占比</td>
          <td v-for="item in list" :class="getActive(item.index996)">{{ item.overtimeRate }}</td>
        </tr>
        <tr>
          <td class="l">996指数</td>
          <td v-for="item in list" :class="getActive(item.index996)">{{ item.index996 }}</td>
        </tr>
        <tr>
          <td class="l">发量</td>
          <td v-for="item in list"></td>
        </tr>
        <tr>
          <td class="l"></td>
          <td v-for="item in list" :class="getActive(item.index996)">{{ 23 }}</td>
        </tr>
      </tbody>
    </table>
    <p class="tips">* 高亮列为该项目最接近的指标</p>
  </div>
</template>
<script setup lang="ts">
import { watch } from '@vue/runtime-core'
import { ref } from 'vue'

const props = defineProps({
  index996: {
    type: Number,
  },
})

const list = [
  {
    type: '955',
    value: 8,
    codeTime: 6,
    weekTime: 30,
    overtime: -7.5,
    overtimeRate: -16,
    index996: '-21',
  },
  { type: '965', value: 9, codeTime: 7.5, weekTime: 37.5, overtime: 0, overtimeRate: 0, index996: '0' },
  {
    type: '966',
    value: 9,
    codeTime: 7.5,
    weekTime: 45,
    overtime: 7.5,
    overtimeRate: 16,
    index996: '21',
  },
  {
    type: '995',
    value: 12,
    codeTime: 9.5,
    weekTime: 47.5,
    overtime: 10,
    overtimeRate: 21,
    index996: '34',
  },
  {
    type: '996',
    value: 12,
    codeTime: 9.5,
    weekTime: 57,
    overtime: 19.5,
    overtimeRate: 34,
    index996: '45',
  },
  {
    type: '997',
    value: 12,
    codeTime: 9.5,
    weekTime: 66.5,
    overtime: 29,
    overtimeRate: 50,
    index996: '100',
  },
  {
    type: '9126',
    value: 15,
    codeTime: 12,
    weekTime: 75,
    overtime: 37.5,
    overtimeRate: 100,
    index996: '130',
  },
]

const nearValue = ref(0)

watch(
  () => props.index996,
  (val) => {
    nearValue.value = findNear(val)
  }
)

const getActive = (index: string) => {
  if (Number(nearValue.value) === Number(index)) {
    return 'active'
  }
}

/**
 * 寻找最接近的数字
 */
function findNear(num: number = 0): number {
  const list = [0, 21, 34, 45, 100, 130]
  let min = Number.MAX_VALUE
  let index = 0
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    const diff = Math.abs(num - item)
    if (diff < min) {
      min = diff
      index = i
    }
  }
  return list[index]
}
</script>
<style lang="scss" scoped>
.table-box {
  width: 100%;
  overflow: auto;
  margin-top: 10px;

  .table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    .l {
      min-width: 10em;
    }
    tr {
      border-bottom: 1px solid #555;
      td {
        padding: 10px;
        text-align: center;
      }
    }
    th {
      text-align: center;
      padding: 10px;
      border-bottom: 1px solid #999;
    }
    td {
      text-align: center;
      padding: 10px;
    }
    .active {
      color: #de335e;
    }
  }
  .tips {
    font-size: 14px;
    color: #999;
    margin-top: 10px;
  }
}
</style>
