import type { Product } from '~/types/products'

interface ProductState {
  products: Product[] | null
  loading: boolean
  error: string | null
  length: number | null
}

export const useProductsStore = defineStore('products', {
  state: (): ProductState => ({
    products: null,
    loading: false,
    error: null,
    length: null,
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null

      try {
        const data: Product[] = await $fetch(
          'https://679ac372747b09cdcccfa74c.mockapi.io/products',
        )

        this.products = data ?? []
        this.length = this.products.length
      } catch (e) {
        this.error = 'Failed to load users'
      } finally {
        this.loading = false
      }
    },

    deleteProduct(id: string) {
      if (id && this.products) {
        const products = this.products.filter((product) => product.id !== id)
        this.products = products
        this.length = products.length
      }
    },

    getFilteredProducts(query: string): Product[] {
      if (!query) return this.products as Product[]

      const filteredProducts =
        this.products?.filter((user) =>
          Object.values(user).some((value) =>
            String(value).toLowerCase().includes(query.toLocaleLowerCase()),
          ),
        ) ?? []

      this.length = filteredProducts.length

      return filteredProducts
    },
  },

  getters: {
    getFilteredProductsLength: (state: ProductState) => {
      return state.length
    },
  },
})
