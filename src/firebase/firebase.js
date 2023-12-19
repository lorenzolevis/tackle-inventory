import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDAiRylDidPmlXyYbTI-ZxFUJijFjgmUks",
  authDomain: "vue-tackle-inventory.firebaseapp.com",
  projectId: "vue-tackle-inventory",
  storageBucket: "vue-tackle-inventory.appspot.com",
  messagingSenderId: "574824075418",
  appId: "1:574824075418:web:c0e725b36d39b3628d4f23",
  measurementId: "G-N7KWGM0M2N"
}

  export const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
