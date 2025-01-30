<script setup lang="ts">
import { useAuthStore } from '@/store/auth'

const { logout, user } = useAuthStore()

const handleLogout = () => {
  logout()
}
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        variant="text"
        color="primary"
        class="d-flex align-center h-auto px-4 py-2"
        v-bind="props"
      >
        <p class="text-grey">{{ user?.username }}</p>
        <v-avatar class="ml-2" image="/assets/icon.png" />
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <v-btn variant="plain" disabled> Mi cuenta </v-btn>
          <v-divider class="my-3"></v-divider>
          <v-btn variant="plain" @click="handleLogout">Cerrar sesión</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
