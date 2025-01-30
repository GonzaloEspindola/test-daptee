<script setup lang="ts">
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useDateFormat } from '~/composable/useDateFormat'
import { useProductsStore } from '~/store/products'
import type { Product } from '~/types/products'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { fetchProducts, deleteProduct } = useProductsStore()
const { filteredProducts, loading, error } = storeToRefs(useProductsStore())
const { formatDate } = useDateFormat()

const isModalVisible = ref(false)
const selectedProduct = ref<Product>({} as Product)

const handleViewProduct = (id: string) => {
  selectedProduct.value = filteredProducts.value?.find(
    (product) => product.id === id,
  )!
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

if (filteredProducts.value?.length === 0) {
  fetchProducts()
}
</script>

<template>
  <DashboardTable
    :loading="loading"
    :data="filteredProducts"
    :headers="headers"
    @delete="(id: string) => handleDeleteUser(id)"
    @view="(id: string) => handleViewProduct(id)"
  >
    <template
      v-for="user in filteredProducts"
      :key="user.id"
      v-slot:[`cell-id-${user.id}`]="{ item }"
    >
      <span class="font-weight-bold">{{ item.id }}</span>
    </template>

    <template
      v-for="product in filteredProducts"
      :key="product.id"
      v-slot:[`cell-description-${product.id}`]="{ item }"
    >
      <span class="text-grey-darken-1">{{ item.description }}</span>
    </template>

    <template
      v-for="product in filteredProducts"
      :key="product.id"
      v-slot:[`cell-price-${product.id}`]="{ item }"
    >
      <v-badge color="success" :content="item.price" inline></v-badge>
    </template>

    <template
      v-for="product in filteredProducts"
      :key="product.id"
      v-slot:[`cell-createdAt-${product.id}`]="{ item }"
    >
      <span>{{ formatDate(item.createdAt) }}</span>
    </template>
  </DashboardTable>

  <DashboardProductModal
    :product="selectedProduct"
    :visible="isModalVisible"
    @update:visible="isModalVisible = $event"
  />

  <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>
</template>
