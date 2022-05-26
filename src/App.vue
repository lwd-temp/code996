<template>
  <div class="app">
    <div class="app-container">
      <router-view></router-view>
    </div>
    <common-footer />
  </div>
</template>

<script setup lang="ts">
import CommonFooter from './public/components/CommonFooter.vue'
</script>

<style lang="scss">
@import '@/public/styles/index.scss';
</style>
