<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

definePageMeta({
  middleware: 'auth',
})

const { login } = useAuthStore()
const { error } = storeToRefs(useAuthStore())
const username: Ref<string> = ref<string>('')
const password: Ref<string> = ref<string>('')

const visible: Ref<boolean> = ref<boolean>(false)

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
        class="d-flex flex-column justify-center align-center pa-0 bg-grey-darken-4"
      >
        <div
          class="pa-4 w-75 d-flex flex-column justify-center align-center ga-6"
        >
          <v-img :width="300" src="/assets/logo_daptee.svg"></v-img>

          <v-card-title class="text-center text-h5 text-primary"
            >Inicia sesión en tu cuenta</v-card-title
          >

          <section
            class="d-flex flex-column justify-center align-center w-75 ga-4"
          >
            <v-text-field
              v-model="username"
              label="Usuario"
              variant="outlined"
              placeholder="Ingresa tu usuario"
              hide-details="auto"
              width="100%"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              variant="outlined"
              width="100%"
              hide-details="auto"
              @click:append-inner="visible = !visible"
            ></v-text-field>
          </section>

          <div class="w-75 d-flex flex-column ga-2 align-center">
            <v-alert v-if="error" class="ma-0 w-100" type="error">{{
              error
            }}</v-alert>
          </div>

          <div class="d-flex flex-column ga-2 w-75">
            <v-btn
              color="primary"
              variant="tonal"
              block
              class="py-4 h-auto w-full"
              @click="handleLogin"
              >Ingresar</v-btn
            >
            <a
              class="text-caption text-decoration-none text-blue text-center text-secondary"
              href="#"
            >
              ¿Olvidaste tu contraseña?</a
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
