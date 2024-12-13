<template>
  <div class="temp-container">
    <el-card class="temp-card">
      <template #header>
        <div class="card-header">
          <h2>开发中...</h2>
        </div>
      </template>

      <div class="card-content">
        <el-alert title="该功能正在开发中" type="info" :closable="false" show-icon>
          <p>此页面的功能尚未实现，敬请期待</p>
        </el-alert>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 暂无逻辑
</script>

<style scoped>
.temp-container {
  padding: 20px;
}

.temp-card {
  max-width: 600px;
  margin: 0 auto;
}

.card-header {
  text-align: center;
}

.card-content {
  padding: 20px 0;
}
</style>
