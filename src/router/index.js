import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// import different route files
const client = process.env.VUE_APP_CLIENT
const clientConstantRoutes = require('./' + client + '/constant_routes')
const clientModuleRoutes = require('./' + client + '/modules')
export const constantRoutes = [
  ...clientConstantRoutes.router
]
export const asyncRoutes = [
  ...clientModuleRoutes.router
]
const createRouter = () => new VueRouter({
  base: process.env.BASE_URL,
  routes: constantRoutes
})
const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
export default router
