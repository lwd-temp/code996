<template>
  <div class="index">
    <div class="banner">
      <div class="banner-wrapper wrapper">
        <p class="logo-text mb10">#CODE996</p>
        <p class="p2 mb40">
          code996 是一个命令行脚本，它可以计算 git 项目的 commit 时间分布规律，进而推导出这个项目的工作强度。
        </p>
        <span class="btn" @click="previewDemo">查看示例结果</span>
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
            <li>分析 git 项目的 commit 提交时间规律</li>
            <li>入职新公司后了解项目是否存在996迹象</li>
            <li>在上班的摸鱼时光找点乐子</li>
            <!-- <li class="todo">判断一个项目中到底谁是卷王</li> -->
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
            <li>在项目的根目录，执行以下脚本</li>
            <pre>/bin/bash -c "$(curl -fsSL https://cdn.jsdelivr.net/npm/code996@latest/bin/code996.sh)"</pre>
            <li>如果你拥有 node 环境，也可以直接执行以下命令</li>
            <pre>
npx code996 -o
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
          <p>1. 使用 git-log 对你的项目进行查询，得到以小时汇总和以天汇总的commit统计结果</p>
          <p>2. 将本地脚本得到的查询结果转为 URL 参数，并打开 URL 到网页</p>
          <p>3. 从 URL 拿到数据，并使用一些规则处理，并将结果可视化展现</p>
        </article>
      </div>
      <div class="item">
        <div class="left">
          <div class="icon-mark">@</div>
        </div>
        <article class="markdown-body">
          <div class="p1">它安全吗</div>
          <p>1. 脚本端和 web 端均不会发起任何请求以收集数据</p>
          <p>2. 除分析的起始时间、commit结果等数据外，URL 本身不泄露项目名等任何关键信息</p>
          <p>
            3. 所以代码均已开源到
            <a href="https://github.com/hellodigua/code996">github</a>
            ，请放心食用
          </p>
        </article>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup lang="ts">
import { router } from '../../router'
import Footer from '../../public/components/Footer.vue'

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
    li {
      margin-bottom: 16px;
    }
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
    }
    .logo-text {
      font-size: 17vw;
      margin-bottom: 10px;
    }
    .main {
      display: block !important;

      .item {
        flex-direction: column;
        .left {
          margin-bottom: 20px;
        }
        .p1 {
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
