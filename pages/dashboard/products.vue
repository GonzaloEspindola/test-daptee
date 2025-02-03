<script setup lang="ts">
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useDateFormat } from '~/composable/useDateFormat'
import { useProductsStore } from '~/store/products'
import { useSearchStore } from '~/store/search'
import type { Product } from '~/types/products'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { fetchProducts, deleteProduct, getFilteredProducts } = useProductsStore()
const { loading, error, products } = storeToRefs(useProductsStore())
const { query } = storeToRefs(useSearchStore())
const { formatDate } = useDateFormat()
const data = computed(() => getFilteredProducts(query.value))

const isModalVisible = ref(false)
const selectedProduct = ref<Product>({} as Product)

const handleViewProduct = (id: string) => {
  selectedProduct.value = data.value.find(
    (user: Product) => user.id === id,
  ) as Product
  isModalVisible.value = true
}

const handleDeleteUser = (id: string) => {
  try {
    deleteProduct(id)
    toast('Producto eliminado correctamente!', {
      theme: 'auto',
      type: 'success',
      position: 'bottom-right',
      transition: 'flip',
    })
  } catch (error) {
    toast('Error al eliminar el producto!', {
      theme: 'auto',
      type: 'error',
      position: 'bottom-right',
      transition: 'flip',
    })
  }
}

const headers = [
  { key: 'id', title: 'ID' },
  { key: 'name', title: 'Nombre' },
  { key: 'description', title: 'Descripción' },
  { key: 'price', title: 'Precio' },
  { key: 'material', title: 'Material' },
  { key: 'actions', title: 'Acciones' },
]

if (!products.value) {
  fetchProducts()
}

watch(
  query,
  () => {
    getFilteredProducts(query.value)
  },
  { immediate: true },
)
</script>

<template>
  <DashboardTable :loading="loading" :data="data" :headers="headers">
    <template #id="{ item }">
      <p class="font-weight-bold">{{ item.id }}</p>
    </template>

    <template #description="{ item }">
      <p class="text-grey-darken-1">{{ item.description }}</p>
    </template>

    <template #price="{ item }">
      <v-badge color="success" :content="item.price" inline></v-badge>
    </template>

    <template #createdAt="{ item }">
      <span>{{ formatDate(item.createdAt) }}</span>
    </template>

    <template #actions="{ item }">
      <DashboardActions
        :item-id="item.id"
        @view="handleViewProduct"
        @delete="handleDeleteUser"
      />
    </template>
  </DashboardTable>

  <DashboardProductModal
    :product="selectedProduct"
    :visible="isModalVisible"
    @update:visible="isModalVisible = $event"
  />

  <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>
</template>
