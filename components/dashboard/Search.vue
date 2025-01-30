<script setup lang="ts">
import { useProductsStore } from '~/store/products'
import { useSearchStore } from '~/store/search'
import { useUserStore } from '~/store/users'

const route = useRoute()
const { setQuery, updateModule } = useSearchStore()
const { module } = storeToRefs(useSearchStore())
const { length: usersLength } = storeToRefs(useUserStore())
const { length: productsLength } = storeToRefs(useProductsStore())
const search = ref('')

const handleSearch = () => {
  setQuery(search.value)
}

watch(
  route,
  () => {
    updateModule(route.path.split('/')[2])
  },
  { immediate: true },
)
</script>

<template>
  <div class="d-flex flex-col align-center ga-4">
    <v-text-field
      v-model="search"
      :label="module === 'users' ? 'Buscar usuario...' : 'Buscar producto...'"
      hide-details="auto"
      variant="outlined"
      width="400"
      @update:modelValue="handleSearch"
    />

    <div class="d-flex flex-col align-center ga-2">
      <span class="text-primary text-h7">
        <div v-if="module === 'users'">
          <v-progress-circular
            v-if="usersLength === null"
            indeterminate
            color="primary"
            size="18"
          />
          <span v-else>{{ usersLength }}</span>
        </div>

        <div v-if="module === 'products'">
          <v-progress-circular
            v-if="productsLength === null"
            indeterminate
            color="primary"
            size="18"
          />
          <span v-else>{{ productsLength }}</span>
        </div>
      </span>
      {{ module === 'users' ? 'usuarios' : 'productos' }} encontrados
    </div>
  </div>
</template>
