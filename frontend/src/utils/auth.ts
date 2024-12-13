import { defineStore } from 'pinia'

interface UserState {
    token: string | null
    user: {
        id: string | null
        username: string | null
        role: string | null
    }
}

//临时模拟用户数据
const mockUsers = [
    { username: 'student', password: '123456', role: 'student' },
    { username: 'teacher', password: '123456', role: 'teacher' },
    { username: 'admin', password: '123456', role: 'admin' },
]

export const useAuthStore = defineStore('auth', {
    state: (): UserState => ({
        token: null,
        user: {
            id: null,
            username: null,
            role: null,
        },
    }),
    actions: {
        async login(loginForm: { username: string; password: string; role: string }) {
            // 模拟 API 调用，验证用户身份
            const user = mockUsers.find(
                (u) =>
                    u.username === loginForm.username &&
                    u.password === loginForm.password &&
                    u.role === loginForm.role
            )

            if (user) {
                // 模拟成功响应
                const response = {
                    token: `mock_token_${user.role}`,
                    user: {
                        id: '1',
                        username: user.username,
                        role: user.role,
                    },
                }
                this.setUserInfo(response)
                return response
            } else {
                // 模拟失败响应
                throw new Error('用户名或密码错误')
            }
        },
        setUserInfo(data: any) {
            this.token = data.token
            this.user = data.user
        },
        logout() {
            this.token = null
            this.user = {
                id: null,
                username: null,
                role: null,
            }
        },
    },
    // 启用持久化存储
    persist: true,
})

// // 角色类型定义
// export type UserRole = 'student' | 'teacher' | 'admin'

// // 角色权限映射
// export const roleRouteMap: Record<UserRole, string[]> = {
//     student: ['/student'],
//     teacher: ['/teacher'],
//     admin: ['/admin']
// }

// // 检查用户是否有权限访问某个路由
// export const hasPermission = (userRole: UserRole, route: string): boolean => {
//     const allowedRoutes = roleRouteMap[userRole] || []
//     return allowedRoutes.some(prefix => route.startsWith(prefix))
// }

