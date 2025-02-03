<script setup lang="ts">
interface Props {
  itemId: string
}

interface Emits {
  (e: 'view', id: string): void
  (e: 'delete', id: string): void
}

const { itemId } = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleView = (id: string) => {
  emit('view', id)
}

const handleDelete = (id: string) => {
  emit('delete', id)
}
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
    </template>

    <v-list class="pa-0">
      <v-list-item class="pa-0">
        <v-list-item-title>
          <v-btn
            class="w-100 rounded-0 d-flex align-center justify-space-between bg-grey-darken-4"
            @click="handleView(itemId)"
          >
            <v-icon icon="mdi-checkbox-marked-circle" class="mr-2"></v-icon>
            Ver
          </v-btn>
        </v-list-item-title>

        <v-list-item-title>
          <v-btn
            class="w-100 rounded-0 d-flex align-center justify-space-between"
            color="red"
            @click="handleDelete(itemId)"
          >
            <v-icon icon="mdi-cancel" class="mr-2"></v-icon>
            Eliminar
          </v-btn>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
