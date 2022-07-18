import Layout from '@/layout'
import Login from '@/views/fishery/Login/'
import Register from '@/views/fishery/Register/'
import Dashboard from '@/views/fishery/dashboard'
export const router = [
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/register',
    component: Register,
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
  },
  {
    path: '/dashboard',
    component: Layout,
    name: 'Dashboard3',
    meta: {
      title: 'Registration',
      roles: ['ADMIN']
    },
    children: [
      {
        path: '/fisher-folks',
        name: 'fisher-folks',
        meta: { title: 'Municipal Fisher Folks' }
      },
      {
        path: '/boat',
        name: 'boat',
        meta: { title: 'Boat' }
      }
    ]
  }
]
