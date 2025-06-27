<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <h2>欢迎来到后台管理系统</h2>
        <blockquote class="quote">
          <p>基于Vue3 + Element Plus + Pinia + Vite + TypeScript构建</p>
        </blockquote>
      </el-col>
    </el-row>
    <home />
    <topInfo></topInfo>
  </div>
</template>

<script setup name="Index">
import home from "@/views/home";
import topInfo from "@/views/home/topInfo";

const version = ref("3.8.5");

function goTarget(url) {
  window.open(url, "__blank");
}
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>
