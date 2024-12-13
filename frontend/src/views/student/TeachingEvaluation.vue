<template>
  <div class="test-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h2>测试页面</h2>
        </div>
      </template>

      <el-space direction="vertical" size="large">
        <!-- 基础按钮测试 -->
        <el-button type="primary">主要按钮</el-button>

        <!-- 文本输入测试 -->
        <el-input v-model="inputText" placeholder="请输入内容"></el-input>

        <!-- 显示输入的内容 -->
        <div>输入的内容: {{ inputText }}</div>
      </el-space>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const inputText = ref("");
</script>

<style scoped>
.test-container {
  padding: 20px;
}
.box-card {
  width: 480px;
  margin: 0 auto;
}
.card-header {
  text-align: center;
}
</style>
