interface AuthState {
  user: { username: string } | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
  }),
  actions: {
    login(username: string) {
      this.user = { username }
      localStorage.setItem('user', JSON.stringify(this.user))
      navigateTo('/dashboard')
    },

    logout() {
      this.user = null
      localStorage.removeItem('user')
      navigateTo('/auth')
    },

    checkAuth() {
      const user = localStorage.getItem('user')
      if (user) {
        this.user = JSON.parse(user)
      }
    },
  },
})
