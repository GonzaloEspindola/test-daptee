import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '@/store/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const { checkAuth } = useAuthStore()
  checkAuth()
})
