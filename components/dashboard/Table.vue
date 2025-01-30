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
</script>

<template>
  <v-table class="h-100 w-100" fixed-header>
    <thead>
      <tr>
        <th
          v-for="header in headers"
          :key="header.key"
          class="text-center text-grey-darken-3 font-weight-bold"
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
        v-else
        v-for="item in data"
        :key="item.id"
        class="text-center"
        :class="{ 'bg-grey-lighten-3': hoveredRow === item.id }"
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
                        class="w-100 rounded-0 d-flex align-center justify-space-between"
                        color="primary"
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
    </tbody>
  </v-table>
</template>
