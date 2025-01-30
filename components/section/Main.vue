<template>
  <v-col cols="12" md="10" class="pa-0 ma-0 bg-grey-lighten-3">
    <v-main>
      <v-container class="ma-0 pa-0 h-screen">
        <v-row class="ma-0 pa-4" :style="{ height: '10%' }">
          <section
            class="d-flex align-center justify-space-between ma-0 w-100 bg-white rounded-lg px-2"
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
</template>
