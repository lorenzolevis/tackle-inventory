/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDAiRylDidPmlXyYbTI-ZxFUJijFjgmUks",
  authDomain: "vue-tackle-inventory.firebaseapp.com",
  projectId: "vue-tackle-inventory",
  storageBucket: "vue-tackle-inventory.appspot.com",
  messagingSenderId: "574824075418",
  appId: "1:574824075418:web:c0e725b36d39b3628d4f23",
  measurementId: "G-N7KWGM0M2N"
};

initializeApp(firebaseConfig);

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
