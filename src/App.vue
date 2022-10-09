<template>
  <div class="app">
    <github-corner />
    <div class="app-container">
      <router-view></router-view>
    </div>
    <common-footer />
  </div>
</template>

<script setup lang="ts">
import CommonFooter from './public/components/CommonFooter.vue'
import GithubCorner from './public/components/GithubCorner.vue'
</script>

<style lang="scss">
@import '@/public/styles/index.scss';
</style>
