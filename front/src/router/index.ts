import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory("/#"),
  routes: [
    {
      path: '/config',
      alias: '/',
      name: 'config',
      component: () => import('../views/ConfigView.vue')
    },
    {
      path: '/script',
      name: 'script',
      component: () => import('../views/ScriptView.vue')
    },
    {
      path: '/control',
      name: 'control',
      component: () => import('../views/ControlView.vue')
    },
    {
      path: '/device',
      name: 'device',
      component: () => import('../views/DeviceView.vue')
    },
    {
      path: '/set/:deviceId',
      name: 'set',
      component: () => import('../views/SetView.vue')
    }
  ]
})

export default router
