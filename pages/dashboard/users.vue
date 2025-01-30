<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

import { toast } from 'vue3-toastify'
import { useDateFormat } from '~/composable/useDateFormat'
import { useSearchStore } from '~/store/search'
import { useUserStore } from '~/store/users'
import type { User } from '~/types/users'

const { fetchUsers, deleteUser, getFilteredUsers } = useUserStore()
const { loading, error, users } = storeToRefs(useUserStore())
const { query } = storeToRefs(useSearchStore())
const { formatDate } = useDateFormat()
const data = computed(() => getFilteredUsers(query.value))

const isModalVisible = ref(false)
const selectedUser = ref<User>({} as User)

const handleViewUser = (id: string) => {
  selectedUser.value = data.value.find((user: User) => user.id === id) as User
  isModalVisible.value = true
}

const handleDeleteUser = (id: string) => {
  try {
    deleteUser(id)
    toast('Usuario eliminado correctamente!', {
      theme: 'auto',
      type: 'success',
      position: 'bottom-right',
      transition: 'flip',
    })
  } catch (error) {
    toast('Error al eliminar el usuario!', {
      theme: 'auto',
      type: 'error',
      position: 'bottom-right',
      transition: 'flip',
    })
  }
}

const headers = [
  { key: 'id', title: 'ID' },
  { key: 'avatar', title: 'Avatar' },
  { key: 'name', title: 'Nombre' },
  { key: 'email', title: 'Email' },
  { key: 'createdAt', title: 'Creado el' },
  { key: 'actions', title: 'Acciones' },
]

if (!users.value) {
  fetchUsers()
}

watch(
  query,
  () => {
    getFilteredUsers(query.value)
  },
  { immediate: true },
)
</script>

<template>
  <DashboardTable
    :loading="loading"
    :data="data"
    :headers="headers"
    @delete="(id: string) => handleDeleteUser(id)"
    @view="(id: string) => handleViewUser(id)"
  >
    <template
      v-for="user in data"
      :key="user.id"
      v-slot:[`cell-id-${user.id}`]="{ item }"
    >
      <span class="font-weight-bold">{{ item.id }}</span>
    </template>

    <template
      v-for="user in data"
      :key="user.id"
      v-slot:[`cell-avatar-${user.id}`]="{ item }"
    >
      <v-avatar class="ml-2" color="primary" :image="item.avatar">{{
        item.name.charAt(0)
      }}</v-avatar>
    </template>

    <template
      v-for="user in data"
      :key="user.id"
      v-slot:[`cell-createdAt-${user.id}`]="{ item }"
    >
      <span>{{ formatDate(item.createdAt) }}</span>
    </template>
  </DashboardTable>

  <DashboardUserModal
    :user="selectedUser"
    :visible="isModalVisible"
    @update:visible="isModalVisible = $event"
  />

  <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>
</template>
