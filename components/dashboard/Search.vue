<script setup lang="ts">
import { useProductsStore } from '~/store/products'
import { useUserStore } from '~/store/users'

const route = useRoute()
const userStore = useUserStore()
const productStore = useProductsStore()
const search = ref('')
const { getFilteredUsersLength } = storeToRefs(userStore)
const { getFilteredProductsLength } = storeToRefs(productStore)

const path = computed(() => route.path.split('/')[2])
const isUserModule = computed(() => path.value === 'users')

watch(search, (query) => {
  if (isUserModule.value) {
    userStore.filterUsers(query)
  } else {
    productStore.filterProducts(query)
  }
})
</script>

<template>
  <div class="d-flex flex-col align-center ga-4">
    <v-text-field
      v-model="search"
      clearable
      :label="path === 'users' ? 'Buscar usuario' : 'Buscar producto'"
      hide-details="auto"
      variant="outlined"
      width="400"
    />
    <p class="text-hh7">
      <span class="text-primary">{{
        isUserModule ? getFilteredUsersLength : getFilteredProductsLength
      }}</span>
      {{ isUserModule ? 'usuarios' : 'productos' }} encontrados
    </p>
  </div>
</template>
