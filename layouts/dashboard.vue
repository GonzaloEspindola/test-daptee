<template>
  <v-app>
    <v-container class="d-flex h-screen ma-0 pa-0">
      <v-row class="ma-0 pa-0">
        <v-col cols="12" md="2" class="ma-0 pa-0 h-100">
          <v-list class="h-100 pa-3 bg-grey-darken-4">
            <div :style="{ height: '10%' }">
              <v-list-item class="border-b-sm h-100">
                <NuxtLink to="/">
                  <v-img src="/assets/Logo Daptee Nuevo.svg" height="50" />
                </NuxtLink>
              </v-list-item>
            </div>

            <div class="d-flex flex-column ga-2" :style="{ height: '90%' }">
              <v-list-item link to="/dashboard/users">
                <v-list-item-content>
                  <v-list-item-title>Usuarios</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link to="/dashboard/products">
                <v-list-item-content>
                  <v-list-item-title>Productos</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list>
        </v-col>

        <v-col cols="12" md="10" class="pa-0 ma-0">
          <v-main>
            <v-container class="ma-0 pa-0 h-screen">
              <v-row class="ma-0 pa-0 border-b-sm" :style="{ height: '10%' }">
                <section
                  class="d-flex align-center justify-space-between ma-0 pa-6 w-100 header"
                >
                  <div class="w-25">
                    <DashboardSearch />
                  </div>

                  <div class="d-flex align-center ga-4">
                    <DashboardAvatar />
                  </div>
                </section>
              </v-row>

              <v-row class="ma-0 pa-0" :style="{ height: '90%' }">
                <slot />
              </v-row>
            </v-container>
          </v-main>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.v-container {
  max-width: 100%;
}

.header {
  height: 100px;
}
</style>
