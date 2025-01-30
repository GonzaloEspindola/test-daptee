import type { Product } from '~/types/products'

interface ProductState {
  products: Product[] | null
  filteredProducts: Product[] | null
  loading: boolean
  error: string | null
}

export const useProductsStore = defineStore('products', {
  state: (): ProductState => ({
    products: [] as Product[],
    filteredProducts: [] as Product[],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      try {
        const { data } = await useAsyncData(
          'products',
          (): Promise<Product[]> =>
            $fetch('https://679ac372747b09cdcccfa74c.mockapi.io/products'),
        )

        this.setProducts(data.value ?? [])
      } catch (e) {
        this.error = 'Failed to load products'
      } finally {
        this.loading = false
      }
    },

    setProducts(products: Product[]) {
      this.products = products
      this.filteredProducts = products
    },

    filterProducts(query: string) {
      if (query && this.products) {
        this.filteredProducts = this.products.filter((product) =>
          Object.values(product).some((value) =>
            String(value).toLowerCase().includes(query.toLowerCase()),
          ),
        )
      } else {
        this.filteredProducts = this.products
      }
    },

    deleteProduct(id: string) {
      if (id && this.products) {
        this.products = this.products.filter((product) => product.id !== id)
        this.filterProducts('')
      }
    },
  },

  getters: {
    getFilteredProductsLength(state: ProductState) {
      return state.filteredProducts?.length ?? 0
    },
  },
})
