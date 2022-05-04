<template>
  <div class="table-box">
    <table class="container table">
      <thead>
        <tr>
          <th class="l">时间类型</th>
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
          <td class="l">日均公司打卡时长</td>
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
          <td class="l">日均有效工作时间</td>
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
          <td class="l">每周实际工时</td>
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
          <td class="l">预计每周加班时长</td>
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
          <td class="l">加班时间占比</td>
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
          <td class="l">996指数</td>
          <td>负数</td>
          <td>0</td>
          <td>48</td>
          <td>63</td>
          <td>100</td>
          <td>130</td>
          <td>150</td>
          <td>171</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.table-box {
  width: 100%;
  overflow: auto;
  margin: 20px 0;
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
  }
}
</style>
