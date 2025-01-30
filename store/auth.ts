interface AuthState {
  user: { username: string } | null
  account: {
    username: string
    password: string
  }
  error: string
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    account: {
      username: 'Daptee',
      password: 'Daptee2025',
    },
    error: '',
  }),
  actions: {
    login(username: string, password: string) {
      if (
        username === this.account.username &&
        password === this.account.password
      ) {
        this.user = { username }
        localStorage.setItem('user', JSON.stringify(this.user))
        navigateTo('/dashboard')
      } else {
        this.error = 'Usuario y/o contraseña incorrectos'
      }
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

  getters: {
    getError(state: AuthState) {
      return state.error
    },
  },
})
