import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '../views/PostView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: '地道にWeb技術を習得していきたい記録', description: '地道にWeb技術を習得していきたい記録' }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/post/:id',
    name: 'post',
    component: PostView,
    meta: { title: '地道にWeb技術を習得していきたい記録', description: '地道にWeb技術を習得していきたい記録' },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
