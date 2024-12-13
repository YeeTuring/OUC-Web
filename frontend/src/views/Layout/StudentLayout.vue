<template>
  <el-container class="h-screen">
    <!-- 头部 -->
    <el-header class="header bg-primary">
      <el-row justify="space-between" align="middle" class="full-height">
        <el-col :span="12" class="flex-center">
          <h1 class="text-white text-xl no-margin">北京科技大学 | 本科教务管理系统</h1>
        </el-col>
        <el-col :span="12" class="flex-center justify-end">
          <el-space>
            <el-icon><Bell /></el-icon>
            <el-icon><Calendar /></el-icon>
            <span class="text-white">2024-2025-1 第9周</span>
            <el-avatar :size="32" :src="userAvatar" />
            <span class="text-white">姓名</span>
          </el-space>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu router>
          <el-menu-item
            v-for="(item, index) in menuItems"
            :key="index"
            :index="item.path"
          >
            <span>{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主要内容区 -->
      <el-main>
        <router-view></router-view>
        <!-- 渲染子路由内容 -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from "vue";

const menuItems = [
  { icon: "📘", label: "我的主页", path: "/student/student-dashboard" },
  { icon: "📊", label: "课程成绩", path: "/student/grades" },
  { icon: "🎓", label: "选课管理", path: "/student/course-selection" },
  { icon: "📝", label: "考试信息", path: "/student/exams" },
  { icon: "⭐", label: "教学评价", path: "/student/teaching-evaluation" },
];
</script>

<style scoped>
.bg-primary {
  background-color: #409eff;
}

.header {
  height: 80px; /* 设置头部高度 */
}

.full-height {
  height: 100%;
}

.flex-center {
  display: flex;
  align-items: center; /* 垂直居中 */
}

.justify-end {
  justify-content: flex-end; /* 右对齐 */
}

.no-margin {
  margin: 0;
}
</style>
