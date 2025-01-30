<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const { checkAuth } = useAuthStore()

checkAuth()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
