<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  loading: boolean
  data: Record<string, any>[] | null
  headers: { key: string; title: string }[]
}

interface Emits {
  (e: 'view', id: string): void
  (e: 'delete', id: string): void
}

const { loading, data, headers } = defineProps<Props>()
const emit = defineEmits<Emits>()

const hoveredRow = ref<string | null>(null)

const handleView = (id: string) => {
  emit('view', id)
}

const handleDelete = (id: string) => {
  emit('delete', id)
}

watch(
  () => [loading, data],
  () => {
    const tables = document.querySelectorAll('table')

    if (loading || data?.length === 0) {
      tables.forEach((table) => {
        table.style.height = '100%'
      })
    } else {
      tables.forEach((table) => {
        table.style.height = 'auto'
      })
    }
  },
  { immediate: true },
)
</script>

<template>
  <v-table class="h-100 w-100 bg-grey-lighten-3">
    <thead>
      <tr>
        <th
          v-for="header in headers"
          :key="header.key"
          class="text-center font-weight-bold bg-grey-darken-4 text-white"
        >
          {{ header.title }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-if="loading">
        <td :colspan="headers.length" class="text-center">
          <v-progress-circular indeterminate color="primary" />
        </td>
      </tr>

      <tr
        v-else-if="data?.length"
        v-for="item in data"
        :key="item.id"
        class="text-center"
        :class="{ 'bg-grey-lighten-4': hoveredRow === item.id }"
        style="height: 20px; max-height: 20px"
        @mouseover="hoveredRow = item.id"
        @mouseleave="hoveredRow = null"
      >
        <td v-for="header in headers" :key="header.key">
          <slot
            :name="`cell-${header.key}-${item.id}`"
            :item="item"
            :header="header"
          >
            <template v-if="header.key === 'actions'">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    icon="mdi-dots-vertical"
                    variant="text"
                    v-bind="props"
                  ></v-btn>
                </template>

                <v-list class="pa-0">
                  <v-list-item class="pa-0">
                    <v-list-item-title>
                      <v-btn
                        class="w-100 rounded-0 d-flex align-center justify-space-between bg-grey-darken-4"
                        @click="handleView(item.id)"
                      >
                        <v-icon
                          icon="mdi-checkbox-marked-circle"
                          class="mr-2"
                        ></v-icon>
                        Ver
                      </v-btn>
                    </v-list-item-title>

                    <v-list-item-title>
                      <v-btn
                        class="w-100 rounded-0 d-flex align-center justify-space-between"
                        color="red"
                        @click="handleDelete(item.id)"
                      >
                        <v-icon icon="mdi-cancel" class="mr-2"></v-icon>
                        Eliminar
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
            <template v-else>
              {{ item[header.key] }}
            </template>
          </slot>
        </td>
      </tr>

      <tr v-else>
        <td :colspan="headers.length">
          <section class="d-flex flex-column align-center justify-center ga-5">
            <v-img src="/assets/empty.png" alt="Empty" width="200" />
            <p class="text-h5 text-grey-darken-3">
              No se encontraron resultados para tu busqueda
            </p>
          </section>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped>
table {
  height: 100%;
}
</style>
