import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import type { User } from '~/types/users'

interface UserState {
  users: User[] | null
  filteredUsers: User[] | null
  loading: boolean
  error: string | null
}

export const useUserStore = defineStore('users', {
  state: (): UserState => ({
    users: [] as User[] | null,
    filteredUsers: [] as User[] | null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchUsers() {
      this.loading = true
      this.error = null
      try {
        const { data } = await useAsyncData(
          'users',
          (): Promise<User[]> =>
            $fetch('https://679ac372747b09cdcccfa74c.mockapi.io/users'),
        )

        this.setUsers(data.value ?? [])
      } catch (e) {
        this.error = 'Failed to load users'
      } finally {
        this.loading = false
      }
    },

    setUsers(users: User[]) {
      this.users = users
      this.filteredUsers = users
    },

    filterUsers(query: string) {
      if (query && this.users) {
        this.filteredUsers = this.users.filter((user) =>
          Object.values(user).some((value) =>
            String(value).toLowerCase().includes(query.toLowerCase()),
          ),
        )
      } else {
        this.filteredUsers = this.users
      }
    },

    deleteUser(id: string) {
      if (id && this.users) {
        this.users = this.users.filter((user) => user.id !== id)
        this.filterUsers('')
      }
    },
  },

  getters: {
    getFilteredUsersLength(state: UserState) {
      return state.filteredUsers?.length ?? 0
    },
  },
})
