<template>
  <v-container class="fill-height">
    <v-row justify="space-around">
      <v-card
        class="mx-auto"
        width="400"
        title="Login"
        subtitle="Sign in with an existing account"
        elevation="10"
      >
        <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
        <v-form ref="form">
          <v-card-text>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              required
            ></v-text-field>
            <v-btn
              color="primary"
              class="mt-4"
              block
              @click="signIn"
              prepend-icon="mdi-login"
            > Login </v-btn>
            <v-divider class="border-opacity-100 mt-4" color="primary"></v-divider>
            <v-btn
              color="primary"
              class="mt-4"
              block
              @click="signIn"
              prepend-icon="mdi-google"
            > Sign In with Google
            </v-btn>
          </v-card-text>
        </v-form>

      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {ref} from "vue";
import router from "@/router";

const email = ref("")
const password = ref("")
const errorMessage = ref()
const emailRules = [
  e => !!e || 'Email is required',
  e => (e && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)) || 'Email not valid!',
]
const passwordRules = [
  p => !!p || 'Password is required',
  p => (p && p.length >= 8) || 'Password must contain at least 8 characters!',
]
const signIn = async() => {
  debugger;
  const { valid } = await this.$refs.form.validate()
  if (valid) {
    signInWithEmailAndPassword(getAuth(), this.email, this.password)
      .then((data) => {
        debugger;
        router.push('/')
      })
      .catch((error) => {
        console.log(error.code)
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage.value = "Invalid email"
            break;
          case "auth/user-not-found":
            errorMessage.value = "User not found"
            break;
          case "auth/wrong-password":
            errorMessage.value = "Incorrect password"
            break;
          default:
            errorMessage.value = "Error or password was incorrect"
            break;
        }
      })
  }
}
</script>


