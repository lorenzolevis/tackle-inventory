<template>
  <v-container fluid class="pt-10">
    <v-row justify="space-around" class="my-5">
      <div class="mx-auto font-weight-light text-h5">Sign up to Tackle Inventory</div>
    </v-row>
    <v-row justify="space-around">
      <v-card
        class="mx-auto pa-2"
        width="400"
        elevation="10"
      >
        <v-alert density="compact" class="ma-2" v-if="errorMessage" closable color="red">{{ errorMessage }}</v-alert>
        <v-card-title></v-card-title>
        <v-card-subtitle>Register a new account</v-card-subtitle>
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
              @click="register"
              prepend-icon="mdi-account-plus-outline"
            > Register </v-btn>
            <v-divider class="border-opacity-100 mt-4" color="primary"></v-divider>
            <v-btn
              color="primary"
              class="mt-4"
              block
              @click="registerWithGoogle"
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
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

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

const registerWithGoogle = async () => {
  errorMessage.value = "";
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
      router.push('/');
    }).catch((error) => {
      errorMessage.value = error.message;
    });
}
const register = async() => {
  const { valid } = await this.$refs.form.validate();
  if (valid) {
    createUserWithEmailAndPassword(getAuth(), this.email, this.password)
      .then(() => {
        this.$router.push('/');
      })
  }
}
</script>

