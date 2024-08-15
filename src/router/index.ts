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
      component: () => import('../views/doctor/DoctorView.vue'),
      children: [
        {
          path: '/patientManagement',
          name: 'patientManagement',
          component: () => import('../views/doctor/patientManagement/PatientManagementView.vue')
        },
        {
          path: 'knowledgeManagement',
          name: 'knowledgeManagement',
          component: () => import('../views/doctor/knowledgeManagement/KnowledgeManagementView.vue')
        },
        {
          path: 'accountManagement',
          name: 'accountManagement',
          component: () => import('../views/doctor/accountManagement/AccountManagementView.vue')
        }
      ]
    },
    {
      path: '/patient',
      name: 'patient',
      component: () => import('../views/patient/PatientView.vue')
    }
  ]
})

export default router
