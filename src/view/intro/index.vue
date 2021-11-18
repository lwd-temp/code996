<template>
  <div class="index">
    <div class="banner">
      <div class="banner-wrapper wrapper">
        <p class="p1 mb10">FIRE996</p>
        <p class="p2 mb20">
          fire996是一个命令行脚本，它可以计算 git 项目的 commit 时间分布规律，进而推导出这个项目的工作强度。
        </p>
        <span class="btn" @click="previewDemo">查看示例 ></span>
      </div>
    </div>
    <div class="main wrapper">
      <div class="item">
        <div class="p1">解决的问题</div>
        <article class="markdown-body">
          <p>新入职一家公司后，你可能不了解你所在岗位的加班情况。</p>
          <p>也许你面试时问过了面试官，或者在网上查看了某些共享文档，可他们的回答难免包含主观想法……</p>
          <p>但项目代码不会骗人，因此你可以通过一个项目的历史 commit 记录来了解这家公司的加班时间。</p>
          <p>你只需要在入职一家公司后，走完入职流程，拉下来你负责的仓库，跑一个命令，即可了解项目的工作强度。</p>
        </article>
      </div>
      <div class="item">
        <div class="p1">开始使用</div>
        <article class="markdown-body">
          <ol>
            <li>如果你拥有 node 环境，可以直接执行 npm 命令</li>
            <pre>
npx fire996 -o
或
npm install fire996 -g
fire996 -o</pre
            >
            <li>其他环境，可以执行以下脚本</li>
            <pre>/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/hellodigua/test/HEAD/fire996.sh)"</pre>
          </ol>
        </article>
      </div>
    </div>
    <div class="footer wrapper"></div>
  </div>
</template>
<script setup lang="ts">
import { router } from '../../router'

const previewDemo = () => {
  router.push({
    name: 'result',
    query: {
      time: '2021-01-01_2022-01-01',
      hour: '5_08,19_09,44_10,51_11,7_13,63_14,71_15,49_16,75_17,34_18,15_19,4_20,1_21,1_22',
      day: '65_Fri,50_Mon,1_Sun,96_Thu,119_Tue,108_Wed',
    },
  })
}
</script>
<style lang="scss" scoped>
.index {
  height: 100%;
  width: 100%;
  .wrapper {
    width: 1180px;
    margin: 0 auto;
  }
  .banner {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    height: 380px;
    width: 100%;
    background: #1a1a1a;
    &-wrapper {
      color: #fff;
      .p1 {
        font-size: 6em;
      }
      .p2 {
        font-size: 1.2em;
      }
      .btn {
        border-bottom: 1px solid;
        font-size: 1.2em;
        padding-bottom: 2px;
        cursor: pointer;
      }
    }
  }
  .main {
    display: flex;
    padding-top: 3em;
    .item {
      flex: 1;
      max-width: 50%;
      padding-right: 2em;
      &:last-child {
        padding-right: 0;
      }
      .p1 {
        font-size: 1.6em;
        font-weight: 500;
        margin-bottom: 1em;
      }
    }
  }
}

@media (max-width: 700px) {
  .index {
    .wrapper {
      width: 90%;
      padding: 0 5%;
    }
    .main {
      display: block !important;
    }
  }
}
</style>
