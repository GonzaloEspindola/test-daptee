<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

definePageMeta({
  middleware: 'auth',
})

const { login } = useAuthStore()
const { error } = storeToRefs(useAuthStore())
const username: Ref<string> = ref<string>('')
const password: Ref<string> = ref<string>('')

const handleLogin: Function = (): void => {
  login(username.value, password.value)
}
</script>

<template>
  <v-container fluid class="d-flex h-screen pa-0">
    <v-row class="w-100 ma-0">
      <v-col
        cols="12"
        md="6"
        class="d-flex flex-column justify-center align-center pa-0"
      >
        <div class="pa-16 w-75">
          <v-card-title class="text-center text-h5"
            >Iniciar Sesión</v-card-title
          >
          <v-card-subtitle class="text-center"
            >Inicia sesión con las credenciales de administrador Daptee -
            Daptee2025</v-card-subtitle
          >
          <v-card-text class="h-auto">
            <v-text-field
              v-model="username"
              label="Usuario"
              dense
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Contraseña"
              type="password"
              variant="outlined"
              dense
            ></v-text-field>
            <v-alert v-if="error" type="error" class="mb-4">{{
              error
            }}</v-alert>
          </v-card-text>
          <div class="pa-4">
            <v-btn
              color="black"
              variant="outlined"
              class="w-100"
              size="large"
              @click="handleLogin"
              >Ingresar</v-btn
            >
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="6" class="d-flex align-center justify-center pa-0">
        <v-img src="/assets/login_background.jpg" height="100vh" cover></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>
