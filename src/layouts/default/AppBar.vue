<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon @click="navigationDrawer = !navigationDrawer"></v-app-bar-nav-icon>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4" />

      Base Preset
    </v-app-bar-title>
  </v-app-bar>
  <v-navigation-drawer app v-model="navigationDrawer">
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
      <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {ref} from "vue";

export default {
  setup() {
    const navigationDrawer = ref(false)
    return {
      navigationDrawer,
    }
  }
}
</script>
