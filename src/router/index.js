import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'all',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/active',
        name: 'active',
        component: () => import('@/views/Active.vue')
    },
    {
        path: '/completed',
        name: 'completed',
        component: () => import('@/views/Completed.vue')
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL || '/'),
    routes
})

export default router
