<template>
  <div class="footer">
    <div class="wrapper">
      <p>
        <a :href="url" :title="title">{{ label }}</a>
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
  </div>
</template>
<script setup lang="ts">
const getMirrorConfig = () => {
  let url = window.location.href
  let label = ''
  let title = ''

  const isGithubMirror = window.location.host.includes('github.io')

  if (isGithubMirror) {
    url = url.replace('github.io', 'gitee.io')
    label = '🇨🇳 切换大陆节点'
    title = 'gitee.io 站点'
  } else {
    url = url.replace('gitee.io', 'github.io')
    label = '🌍 切换全球节点'
    title = 'github.io 站点'
  }

  return {
    url,
    label,
    title,
  }
}

const { label, url, title } = getMirrorConfig()
</script>
<style lang="scss" scoped>
.footer {
  line-height: 2;
  background: #2a2a2a;
  text-align: center;
  margin-top: 3em;
  padding: 2em 0;
  font-size: 0.9em;
  a {
    color: #de335e;
  }
}
</style>
