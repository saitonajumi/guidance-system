import Layout from '@/layout'
import Dashboard from '@/views/fishery/dashboard'

const router = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  }
]

export default router
