<template>
  <div class="footer wrapper">
    <p>
      <a :href="getChinaMirrorUrl" title="中国大陆节点">🇨🇳 切换大陆节点</a>
    </p>
    <p>
      自豪的采用
      <a target="_blank" href="https://unlicense.org/">Unlicense</a>
      协议 | 源码：
      <a target="_blank" href="https://github.com/hellodigua/code996">Github</a>
    </p>
    <p>
      Inspiration comes from ❤️
      <a target="_blank" href="https://996.icu/">996.icu</a>
    </p>
  </div>
</template>
<script setup lang="ts">
/**
 * 获取中国大陆镜像
 */
const getChinaMirrorUrl = () => {
  const url = window.location.href
  const host = window.location.host
  const protocol = window.location.protocol
  const path = window.location.pathname
  const query = window.location.search
  const hash = window.location.hash
  const mirror = 'https://hellodigua.gitee.io'
  const chinaMirror = `${protocol}//${mirror}${path}${query}${hash}`
  return url.indexOf(host) > -1 ? chinaMirror : url
}
</script>
<style lang="scss" scoped>
.footer {
  text-align: center;
  margin-top: 3em;
  a {
    color: #de335e;
  }
}
</style>
