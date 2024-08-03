import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/login/LoginView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'selectAccount',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/doctor',
      name: 'doctor',
      component: () => import('../views/doctor/DoctorView.vue')
    },
    {
      path: '/patient',
      name: 'patient',
      component: () => import('../views/patient/PatientView.vue')
    }
  ]
})

export default router
