import { defineStore } from 'pinia'

interface UserState {
    token: string | null
    user: {
        id: string | null
        username: string | null
        role: string | null
    }
}

export const useAuthStore = defineStore('auth', {
    state: (): UserState => ({
        token: null,
        user: {
            id: null,
            username: null,
            role: null
        }
    }),

    actions: {
        async login(loginForm: { username: string, password: string, role: string }) {
            // 这里应该调用实际的登录 API
            // 模拟 API 调用
            const response = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        token: 'mock_token',
                        user: {
                            id: '1',
                            username: loginForm.username,
                            role: loginForm.role
                        }
                    })
                }, 1000)
            })

            this.setUserInfo(response)
            return response
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
                role: null
            }
        }
    },

    persist: true // 持久化存储
})