import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth'; // Adjust the path as necessary

// 学生相关页面
import StudentLayout from '../views/layout/StudentLayout.vue'
import StudentDashboard from '../views/student/StudentDashboard.vue';
import CourseSelection from '../views/student/CourseSelection.vue';
import GradeInquiry from '../views/student/GradeInquiry.vue';
import Exams from '../views/student/Exams.vue';
import TeachingEvaluation from '../views/student/TeachingEvaluation.vue';

// 教师相关页面
import TeacherDashboard from '../views/teacher/TeacherDashboard.vue';
import TeachingCourseManagement from '../views/teacher/TeachingCourseManagement.vue';
import GradeManagement from '../views/teacher/GradeManagement.vue';


// 管理员相关页面
import AdminDashboard from '../views/admin/AdminDashboard.vue';
import UserManagement from '../views/admin/UserManagement.vue';
import CourseManagement from '../views/admin/CourseManagement.vue';
import Announcement from '../views/admin/Announcement.vue';

const routes = [
  // 学生路由
  {
    path: '/student',
    component: StudentLayout,
    meta: { role: 'student' },
    children: [
      {
        path: 'student-dashboard',
        name: 'StudentDashboard',
        component: StudentDashboard,
      },
      {
        path: 'course-selection',
        name: 'CourseSelection',
        component: CourseSelection,
      },
      {
        path: 'grades',
        name: 'GradeInquiry',
        component: GradeInquiry,
      },
      {
        path: 'exams',
        name: 'Exams',
        component: Exams,
      },
      {
        path: 'teaching-evaluation',
        name: 'TeachingEvaluation',
        component: TeachingEvaluation,
      },
    ],
  },

  // 教师路由
  {
    path: '/teacher',
    component: TeacherDashboard,
    meta: { role: 'teacher' },
    children: [
      {
        path: 'teacher-dashboard',
        name: 'TeacherDashboard',
        component: TeacherDashboard,
      },
      {
        path: 'teaching-course-management',
        name: 'TeachingCourseManagement',
        component: TeachingCourseManagement,
      },
      {
        path: 'grade-management',
        name: 'GradeManagement',
        component: GradeManagement,
      },
    ],
  },

  // 管理员路由
  {
    path: '/admin',
    component: AdminDashboard,
    meta: { role: 'admin' },
    children: [
      {
        path: 'admin-dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard,
      },
      {
        path: 'user-management',
        name: 'UserManagement',
        component: UserManagement,
      },
      {
        path: 'course-management',
        name: 'CourseManagement',
        component: CourseManagement,
      },
      {
        path: 'announcement',
        name: 'Announcement',
        component: Announcement,
      },
    ],
  },

  // 默认路由，重定向到登录页面或主页
  {
    path: '/',
    redirect: '/login',
  },

  // 登录页面
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue'),
  },

  // 404页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//路由守卫
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = !!authStore.token
  const userRole = authStore.user?.role

  // 不需要登录就可以访问的路由
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !isAuthenticated) {
    // 需要登录但未登录，重定向到登录页
    return next('/login')
  }

  if (to.path === '/login' && isAuthenticated) {
    // 已登录用户访问登录页，重定向到对应角色的主页
    return next(`/${userRole}`)
  }

  // 检查路由路径是否匹配用户角色
  if (isAuthenticated && userRole) {
    const rolePrefix = `/${userRole}`
    if (to.path !== '/login' && !to.path.startsWith(rolePrefix)) {
      // 用户试图访问非其角色的路由
      return next(`${rolePrefix}`)
    }
  }

  next()
})

export default router;

