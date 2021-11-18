<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {},
})
</script>

<style lang="scss">
@import '@/public/styles/index.scss';

.container {
  height: 100%;
}
</style>
