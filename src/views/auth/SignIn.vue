<template>
  <v-container fluid class="pt-10">
    <v-row justify="space-around" class="my-5">
      <div class="mx-auto font-weight-light text-h5">Sign In to Tackle Inventory</div>
    </v-row>
    <v-row justify="space-around">
      <v-card
        class="mx-auto pa-2"
        width="400"
        elevation="10"
      >
        <v-alert density="compact" class="ma-2" v-if="errorMessage" closable color="red">{{ errorMessage }}</v-alert>
        <v-card-title></v-card-title>
        <v-card-subtitle>Sign in with an existing account</v-card-subtitle>
        <v-form v-model="form" validate-on="input" class="mt-2">
          <v-card-text>
            <v-text-field
              density="compact"
              variant="solo-filled"
              v-model="email"
              :rules="emailRules"
              label="Email"
              required
            ></v-text-field>
            <v-text-field
              class="mt-2"
              density="compact"
              variant="solo-filled"
              v-model="password"
              type="password"
              :rules="passwordRules"
              label="Password"
              required
            ></v-text-field>
            <v-btn
              color="primary"
              class="mt-4"
              block="true"
              @click="signIn"
              prepend-icon="mdi-google"
              :disabled="!form"
            > Sign In with Google </v-btn>
          </v-card-text>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
import { useCredentials } from "@/composable/useCredential";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/firebase/user.js";

const { credentials, perform } = useCredentials();

const router = useRouter()

const email = ref("")
const password = ref("")
const errorMessage = ref()
const form = ref()

const emailRules = [
  e => !!e || 'Email is required',
  e => (e && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)) || 'Email not valid!',
]
const passwordRules = [
  p => !!p || 'Password is required',
  p => (p && p.length >= 8) || 'Password must contain at least 8 characters!',
]

const signIn = perform(async () => {
  await login(credentials.email, credentials.password);
  await router.push({ name: "project" });
});
</script>


