import { onSnapshot, doc, updateDoc, setDoc } from "firebase/firestore";
import { ref, onUnmounted, watch } from "vue";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { db } from "./firebase.js";
import { PROFILES } from "./types/collection-types.js";

export const user = ref(null);

const auth = getAuth();
onAuthStateChanged(auth, (data) => {
  if (data) {
    user.value = data;
    console.log("User is signed in");
  } else {
    user.value = null;
    console.log("User is signed out");
  }
  console.log("user", user.value);
});

export const login = async (email, password) => await signInWithEmailAndPassword(auth, email, password);

export const createUser = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, PROFILES, result.user.uid), {});
};

export const logout = async () => {
  await signOut(auth);
};

export const useUserProfile = () => {
  const userProfile = ref({});
  let unsub = () => {};
  watch(user, (user) => {
    if (!user || !user.uid) {
      return;
    }
    unsub();

    unsub = onSnapshot(
      doc(db, PROFILES, user.uid),
      (doc) => (userProfile.value = doc.data()),
    );
  });

  onUnmounted(unsub);
  return userProfile;
};

export const setActiveProjectId = async (activeProjectId) => {
  await updateDoc(doc(db, PROFILES, user?.value?.uid), {
    activeProjectId,
  });
};
