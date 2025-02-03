<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  loading: boolean
  data: Record<string, any>[] | null
  headers: { key: string; title: string }[]
}

const { loading, data, headers } = defineProps<Props>()

const hoveredRow = ref<string | null>(null)

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
      >
        <td v-for="header in headers" :key="header.key">
          <slot
            v-if="$slots[header.key]"
            :name="header.key"
            :item="item"
          ></slot>
          <span v-else>{{ item[header.key] }}</span>
        </td>
      </tr>

      <tr v-else>
        <td :colspan="headers.length">
          <section class="d-flex flex-column align-center justify-center ga-5">
            <v-img src="/assets/empty.png" alt="Empty" width="200" />
            <p class="text-h5 text-grey-darken-3">
              No se encontraron resultados para tu búsqueda
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
