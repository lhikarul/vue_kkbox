import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/rank'
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import('../views/Rank/Rank.vue'),
  },
  {
    path: '/playerlist/:playerlist_id',
    name: 'playerList',
    component: () => import('../views/Rank/PlayerList.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
