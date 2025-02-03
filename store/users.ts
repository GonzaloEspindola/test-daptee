import type { User } from '~/types/users'

interface UserState {
  users: User[] | null
  loading: boolean
  error: string | null
  length: number | null
}

export const useUserStore = defineStore('users', {
  state: (): UserState => ({
    users: null,
    loading: false,
    error: null,
    length: null,
  }),

  actions: {
    async fetchUsers() {
      this.loading = true
      this.error = null
      try {
        const data: User[] = await $fetch(
          'https://679ac372747b09cdcccfa74c.mockapi.io/users',
          {
            method: 'GET',
            query: {},
          },
        )

        this.users = data ?? []
        this.length = this.users.length
      } catch (e) {
        this.error = 'Failed to load users'
      } finally {
        this.loading = false
      }
    },

    deleteUser(id: string) {
      if (id && this.users) {
        const user = this.users.filter((user) => user.id !== id)
        this.users = user
        this.length = user.length
      }
    },

    getFilteredUsers(query: string): User[] {
      if (!query) return this.users as User[]

      const filteredUsers =
        this.users?.filter((user) =>
          Object.values(user).some((value) =>
            String(value).toLowerCase().includes(query.toLocaleLowerCase()),
          ),
        ) ?? []

      this.length = filteredUsers.length

      return filteredUsers
    },
  },

  getters: {
    getFilteredUsersLength: (state: UserState) => {
      return state.length
    },
  },
})
