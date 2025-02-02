<template>
  <v-col cols="12" md="2" class="ma-0 pa-0">
    <v-list class="h-100 pa-3 bg-grey-darken-4">
      <div class="py-5">
        <v-list-item class="h-100">
          <NuxtLink to="/">
            <v-img src="/assets/logo_daptee.svg" height="50" />
          </NuxtLink>
        </v-list-item>
      </div>

      <div class="d-flex flex-column ga-2 flex-grow-1">
        <v-list-item link to="/dashboard/users" class="rounded-lg">
          <v-list-item-content>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/dashboard/products" class="rounded-lg">
          <v-list-item-content>
            <v-list-item-title>Productos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </v-col>
</template>