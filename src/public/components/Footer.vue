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
  padding: 4em 0;
  a {
    color: #de335e;
  }
  .button{
    display: inline-block;
    font-size: 1em;
    cursor: pointer;
    background-color: #212121;
    padding: 10px 20px;
    background-color: #444;
    color: #fff;
    box-shadow: 0px 0px 0px rgb(255 255 255 / 0%), 10px 10px 0px rgb(0 0 0 / 20%);
    margin-bottom: 40px;
    transition: .3s all;
    &:hover{
      background-color: #4a4a4a;
      box-shadow: 0px 0px 0px rgb(255 255 255 / 0%), 5px 5px 0px rgb(0 0 0 / 20%);
    }
  }
}
</style>
