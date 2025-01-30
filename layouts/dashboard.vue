<template>
  <v-app>
    <v-container class="d-flex h-screen ma-0 pa-0">
      <v-row class="ma-0 pa-0">
        <SectionSidebar />

        <v-col cols="12" md="10" class="pa-0 ma-0 bg-grey-lighten-3">
          <v-main>
            <v-container class="ma-0 pa-0 h-screen">
              <v-row class="ma-0 pa-4" :style="{ height: '10%' }">
                <section
                  class="d-flex align-center justify-space-between ma-0 w-100 bg-white rounded-lg px-2"
                >
                  <DashboardSearch />
                  <DashboardAvatar />
                </section>
              </v-row>

              <v-row class="ma-0 pa-0 pa-4" :style="{ height: '90%' }">
                <section
                  class="h-100 w-100 d-flex justify-center align-center rounded-lg shadow-xl"
                >
                  <slot />
                </section>
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
