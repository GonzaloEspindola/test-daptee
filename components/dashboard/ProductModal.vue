<script setup lang="ts">
import type { Product } from '~/types/products'

interface Props {
  product: Product
  visible: boolean
}

interface Emits {
  (e: 'update:visible', visible: boolean): void
}

const emit = defineEmits<Emits>()
const { product, visible } = defineProps<Props>()

const isModalVisible = computed(() => visible)

const closeModal = () => {
  emit('update:visible', false)
}
</script>

<template>
  <v-dialog v-model="isModalVisible" max-width="fit-content" height="auto">
    <template v-slot:default="{ isActive }">
      <v-card v-if="isActive" class="pa-4 rounded-xl">
        <v-card-title class="d-flex flex-column align-center">
          <v-avatar size="100" class="mb-3" :image="product.image"> </v-avatar>
          <h3 class="font-weight-bold">{{ product.name }}</h3>
          <p class="text-h7 text-grey-lighten-1">{{ product.description }}</p>
          <v-badge color="success" :content="product.price" inline></v-badge>
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
