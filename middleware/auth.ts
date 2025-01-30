// middleware/auth.middleware.ts
import { useAuthStore } from '@/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuthStore()

  if (!user && to.path.startsWith('/dashboard')) {
    return navigateTo('/auth')
  }

  if (user && !to.path.startsWith('/dashboard')) {
    return navigateTo('/dashboard/users')
  }
})
