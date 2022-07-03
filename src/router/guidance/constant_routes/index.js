import Layout from '@/layout'
import Login from '@/views/guidance/Login/'
import Dashboard from '@/views/guidance/dashboard'
export const router = [
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: Dashboard,
        name: 'Dashboard',
        meta: {
          title: 'Dashboard',
          roles: ['ADMIN']
        }
      }
    ]
  }
]
