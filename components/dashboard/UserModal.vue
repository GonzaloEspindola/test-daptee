<script setup lang="ts">
import type { User } from '~/types/users'

interface Props {
  user: User
  visible: boolean
}

interface Emits {
  (e: 'update:visible', visible: boolean): void
}

const emit = defineEmits<Emits>()
const { user, visible } = defineProps<Props>()

const isModalVisible = computed(() => visible)

const closeModal = () => {
  emit('update:visible', false)
}
</script>

<template>
  <v-dialog v-model="isModalVisible" max-width="500px">
    <template v-slot:default="{ isActive }">
      <v-card v-if="isActive" class="pa-4 rounded-xl">
        <v-card-title class="d-flex flex-column align-center">
          <v-avatar size="100" class="mb-3" color="primary">{{
            user.name.charAt(0)
          }}</v-avatar>
          <h3 class="font-weight-bold">{{ user.name }}</h3>
          <p class="text-h7 text-grey-lighten-1">{{ user.email }}</p>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-actions class="d-flex justify-end">
          <v-btn
            color="primary"
            text="Cerrar"
            variant="tonal"
            @click="closeModal"
            class="ml-2"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
