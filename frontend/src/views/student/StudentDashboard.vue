<template>
  <el-container>
    <!-- 主要内容区 -->
    <el-main>
      <el-card>
        <template #header>
          <el-row justify="space-between" align="middle">
            <el-col :span="12">
              <el-space>
                <h2>我的课表</h2>
                <el-select v-model="semester" placeholder="学期">
                  <el-option label="2024-2025-1" value="2024-2025-1" />
                </el-select>
                <el-select v-model="courseType" placeholder="类型">
                  <el-option label="全部" value="all" />
                </el-select>
              </el-space>
            </el-col>
            <el-col :span="12" class="flex-center justify-end">
              <el-tag>必修</el-tag>
              <el-tag type="info">选修</el-tag>
              <el-tag type="warning">任选</el-tag>
            </el-col>
          </el-row>
        </template>

        <!-- 课程表格 -->
        <el-table :data="scheduleItems" border>
          <el-table-column prop="period" label="节次" width="120" />
          <el-table-column v-for="day in weekDays" :key="day" :label="day">
            <template #default>
              <!-- 这里可以放置具体课程内容 -->
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-main>

    <!-- 右侧边栏 -->
    <el-aside width="250px">
      <el-card class="mb-4">
        <template #header>
          <h3>学业进展</h3>
        </template>
        <div>
          <span>课程得分: 65.5</span>
          <el-progress :percentage="90.97" />
        </div>
      </el-card>

      <el-card>
        <template #header>
          <h3>通知</h3>
        </template>
        <el-tabs>
          <el-tab-pane label="通知">通知内容</el-tab-pane>
          <el-tab-pane label="公告">公告内容</el-tab-pane>
          <el-tab-pane label="待办消息">待办内容</el-tab-pane>
        </el-tabs>
      </el-card>
    </el-aside>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { Bell, Calendar, Search } from "@element-plus/icons-vue";

const searchText = ref("");
const semester = ref("2024-2025-1");
const courseType = ref("all");

const menuItems = [
  { icon: "📘", label: "我的主页", path: "/student/student-dashboard" },
  { icon: "📊", label: "课程成绩", path: "/student/grades" },
  { icon: "🎓", label: "选课管理", path: "/student/course-selection" },
  { icon: "📝", label: "考试信息", path: "/student/exams" },
  { icon: "⭐", label: "教学评价", path: "/student/teaching-evaluation" },
];

const weekDays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

const scheduleItems = [
  { period: "第一大节", time: "(01/02小节)", timeRange: "08:00~09:45" },
  { period: "第二大节", time: "(03/04小节)", timeRange: "09:55~11:35" },
  { period: "第三大节", time: "(05/06小节)", timeRange: "13:30~15:05" },
  { period: "第四大节", time: "(07/08小节)", timeRange: "15:20~16:55" },
  { period: "第五大节", time: "(09/10小节)", timeRange: "17:10~18:45" },
];

// 定义一个响应式变量来存储用户头像URL
const userAvatar = ref("");

// 获取用户信息的方法
const fetchUserInfo = async () => {
  try {
    const response = await axios.get("/api/user/profile"); // 替换为实际的API端点
    // 假设后端返回的数据格式如下：
    // {
    //   "name": "姓名",
    //   "avatarUrl": "https://example.com/path-to-avatar.jpg"
    // }
    userAvatar.value = response.data.avatarUrl;
  } catch (error) {
    console.error("获取用户信息失败:", error);
    // 设置一个默认头像或处理错误
    userAvatar.value = ""; // 可以设置为默认图片的URL
  }
};

// 在组件挂载时调用获取用户信息的方法
onMounted(() => {
  fetchUserInfo();
});
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
