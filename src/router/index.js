// Composables
import { createRouter, createWebHistory } from 'vue-router'
import {getAuth, onAuthStateChanged} from "firebase/auth";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
          requiredAuth: true
        }
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/auth/Register.vue')
      },
      {
        path: 'sign-in',
        name: 'SignIn',
        component: () => import('@/views/auth/SignIn.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
       reject
    )
  })
};

router.beforeEach(async (to,from,next) => {
  if(to.matched.some((record) => record.meta.requiredAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next('/auth/sign-in')
    }
  } else {
    next();
  }
});

export default router
