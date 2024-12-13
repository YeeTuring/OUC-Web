<template>
  <el-container>
    <!-- 主要内容区 -->
    <el-main>
      <el-card>
        <template #header>
          <div class="search-container mb-4">
            <el-input
              v-model="searchQuery"
              placeholder="请输入课程名称"
              class="search-input"
              clearable
            >
              <template #append>
                <el-button :icon="Search" @click="handleSearch">搜索</el-button>
              </template>
            </el-input>
          </div>
        </template>

        <!-- 课程表格 -->
        <el-table
          :data="displayCourses"
          border
          stripe
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column prop="courseId" label="课程号" width="120" />
          <el-table-column prop="courseName" label="课程名称" width="200" />
          <el-table-column prop="teacher" label="授课教师" width="120" />
          <el-table-column prop="courseType" label="课程性质" width="120">
            <template #default="scope">
              <el-tag :type="getTagType(scope.row.courseType)">
                {{ scope.row.courseType }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="scheduleTime" label="上课时间" width="200" />
          <el-table-column prop="credits" label="学分" width="80" />
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-button type="primary" size="small" @click="handleSelect(scope.row)">
                选/退课
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.status === '已选' ? 'success' : 'info'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination-container mt-4">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 50]"
            :total="totalCourses"
            layout="total, sizes, prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Search, Bell, Calendar } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import axios from "axios";

// 复用主页面的菜单项
const menuItems = [
  { icon: "📘", label: "我的主页", path: "/" },
  { icon: "📊", label: "课程成绩", path: "/grades" },
  { icon: "🎓", label: "选课管理", path: "/course-selection" },
  { icon: "📝", label: "考试信息", path: "/exams" },
  { icon: "⭐", label: "教学评价", path: "/evaluation" },
];

const searchText = ref("");
const userAvatar = ref("");

// 数据定义
interface Course {
  courseId: string;
  courseName: string;
  teacher: string;
  courseType: string;
  scheduleTime: string;
  credits: number;
  status: string;
}

const searchQuery = ref("");
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const totalCourses = ref(0);
const courses = ref<Course[]>([]);

// 计算显示的课程数据
const displayCourses = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return courses.value.slice(startIndex, endIndex);
});

// 获取课程标签类型
const getTagType = (type: string) => {
  const typeMap: { [key: string]: string } = {
    必修: "danger",
    选修: "warning",
    任选: "success",
  };
  return typeMap[type] || "info";
};

// 处理搜索
const handleSearch = async () => {
  loading.value = true;
  try {
    // 这里应该调用实际的API
    const response = await mockSearchCourses(searchQuery.value);
    courses.value = response.data;
    totalCourses.value = response.total;
  } catch (error) {
    ElMessage.error("搜索失败，请重试");
  } finally {
    loading.value = false;
  }
};

// 处理选课
const handleSelect = (course: Course) => {
  if (course.status === "已选") {
    course.status = "未选";
    ElMessage.info(`已取消课程：${course.courseName}`);
    return;
  }
  course.status = "已选";
  ElMessage.success(`已选择课程：${course.courseName}`);
};

// 处理分页变化
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  handleSearch();
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  handleSearch();
};

// Mock API调用
const mockSearchCourses = async (query: string) => {
  // 模拟API延迟
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 模拟数据
  const mockData = Array.from({ length: 100 }, (_, index) => ({
    courseId: `COURSE${String(index + 1).padStart(3, "0")}`,
    courseName: `示例课程${index + 1}`,
    teacher: `教师 ${index + 1}`,
    courseType: ["必修", "选修", "任选"][index % 3],
    scheduleTime: `周${["一", "二", "三", "四", "五"][index % 5]} 1-2节`,
    credits: (index % 3) + 1,
    status: index % 2 === 0 ? "未选" : "已选",
  }));

  return {
    data: mockData.filter((course) => !query || course.courseName.includes(query)),
    total: mockData.length,
  };
};

// 初始加载
onMounted(() => {
  handleSearch();
});
</script>

<style scoped>
.header {
  height: 80px;
}

.bg-primary {
  background-color: #409eff;
}

.full-height {
  height: 100%;
}

.flex-center {
  display: flex;
  align-items: center;
}

.justify-end {
  justify-content: flex-end;
}

.no-margin {
  margin: 0;
}

.search-container {
  display: flex;
  justify-content: flex-start;
}

.search-input {
  width: 400px;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-4 {
  margin-top: 1rem;
}
</style>
