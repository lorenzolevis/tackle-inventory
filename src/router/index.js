// Composables
import { createRouter, createWebHistory } from 'vue-router'

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
        component: () => import('@/views/auth/Register.vue'),
        meta: {
          authPath: true
        }
      },
      {
        path: 'sign-in',
        name: 'SignIn',
        component: () => import('@/views/auth/SignIn.vue'),
        meta: {
          authPath: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
