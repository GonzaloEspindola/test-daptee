interface SearchState {
  query: string
  module: 'products' | 'users'
}

export const useSearchStore = defineStore('search', {
  state: (): SearchState => ({
    query: '',
    module: 'users',
  }),

  actions: {
    setQuery(query: string) {
      this.query = query
    },

    updateModule(path: string) {
      this.module = path === 'products' ? 'products' : 'users'
    },
  },
})
