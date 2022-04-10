<template>
  <div class="index">
    <div class="banner">
      <div class="banner-wrapper wrapper">
        <p class="logo-text mb10">#CODE996</p>
        <p class="p2 mb40">
          code996 是一个命令行脚本，它可以计算 git 项目的 commit 时间分布规律，进而推导出这个项目的工作强度。
        </p>
        <span class="btn" @click="previewDemo">查看示例</span>
      </div>
    </div>
    <div class="main wrapper">
      <div class="item">
        <div class="left">
          <div class="icon-mark">?</div>
        </div>
        <article class="markdown-body">
          <div class="p1">用途</div>
          <ul>
            <li>分析项目的提交时间</li>
            <li>了解新入职公司的项目是否存在996迹象</li>
            <li class="todo">判断一个项目中到底谁是卷王</li>
          </ul>
        </article>
      </div>
      <div class="item">
        <div class="left">
          <div class="icon-mark">></div>
        </div>
        <article class="markdown-body">
          <div class="p1">如何使用</div>
          <ul>
            <li>切到git项目的根目录，执行以下脚本</li>
            <pre>/bin/bash -c "$(curl -fsSL https://cdn.jsdelivr.net/npm/code996@latest/bin/code996.sh)"</pre>
            <li>如果你拥有 node 环境，也可以直接执行以下命令</li>
            <pre>
npx code996
</pre
            >
          </ul>
        </article>
      </div>
      <div class="item">
        <div class="left">
          <div class="icon-mark">#</div>
        </div>
        <article class="markdown-body">
          <div class="p1">它怎样工作</div>
          <p>TODO</p>
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
      week: '65_Fri,50_Mon,1_Sun,96_Thu,119_Tue,108_Wed',
    },
  })
}
</script>
<style lang="scss" scoped>
.index {
  height: 100%;
  width: 100%;
  .wrapper {
    width: 80%;
    margin: 0 auto;
  }
  .banner {
    &-wrapper {
      .p2 {
        font-size: 1.1em;
      }
      .btn {
        display: inline-block;
        font-size: 1.1em;
        cursor: pointer;
        background-color: #212121;
        padding: 14px 40px;
        background-color: #de335e;
        color: #fff;
        box-shadow: 0px 0px 0px rgba(255, 255, 255, 0), 10px 10px 0px rgba(0, 0, 0, 0.2);
      }
    }
  }
  .main {
    .item {
      display: flex;
      padding-bottom: 5em;
      .left {
        width: 120px;
      }
      .icon-mark {
        font-size: 3.2em;
        color: #de335e;
        font-family: vcr-osd;
        background-color: #2a2a2a;
        text-shadow: 0px 0px 0px rgba(255, 255, 255, 0), 5px 5px 0px rgba(0, 0, 0, 0.2);
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 80px;
      }
      .p1 {
        font-size: 1.6em;
        font-weight: 500;
        color: #fff;
        line-height: 1;
        margin-bottom: 1.3em;
      }
    }
  }

  .markdown-body ul {
    padding-left: 0;
    list-style: inside;
    pre {
      margin: 1em 0;
    }
    .todo {
      text-decoration: line-through;
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
