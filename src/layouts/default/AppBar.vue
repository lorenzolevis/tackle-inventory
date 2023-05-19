<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon @click="navigationDrawer = !navigationDrawer"></v-app-bar-nav-icon>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4" />
      Tackle Inventory
    </v-app-bar-title>
    <template v-if="user" v-slot:append>
      <div class="mx-2">
        <v-avatar icon="mdi-account-circle"></v-avatar>
        {{  user.displayName }}
      </div>
    </template>
  </v-app-bar>
  <v-navigation-drawer temporary v-model="navigationDrawer">
    <v-list density="compact" nav>
      <v-list-item v-if="isLoggedIn" prepend-icon="mdi-home" title="Home" value="home" to="/"></v-list-item>
      <v-list-item v-if="!isLoggedIn" prepend-icon="mdi-login" title="Sign In" value="signIn" to="/auth/sign-in"></v-list-item>
      <v-list-item v-if="!isLoggedIn" prepend-icon="mdi-account-plus-outline" title="Register" value="register" to="/auth/register"></v-list-item>
      <v-list-item v-if="isLoggedIn" prepend-icon="mdi-logout" title="Logout" value="logout" @click="handleSingOut"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from "vue-router";

const router = useRouter()
const isLoggedIn = ref(false)
const navigationDrawer = ref(false)
let auth;
let user = null;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (authenticatedUser) => {
    if(authenticatedUser) {
      user = authenticatedUser;
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  })
})

const handleSingOut = () => {
  signOut(auth).then(() => {router.push("/auth/sign-in")})
}
</script>
