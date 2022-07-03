import Layout from '@/layout'
import Dashboard from '@/views/guidance/dashboard'
const router = [
  {
    path: '/',
    name: 'guidance DASHBOARD',
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