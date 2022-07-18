import Layout from '@/layout'
import Login from '@/views/guidance/Login/'
import Register from '@/views/guidance/Register/'
import Dashboard from '@/views/guidance/dashboard'
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
    path: '/',
    component: Layout,
    name: 'Dashboard3',
    meta: {
      title: 'Appointment',
      roles: ['ADMIN']
    },
    children: [
      {
        path: '/pending-appointment',
        name: 'pending-appointment',
        meta: { title: 'Pending' }
      },
      {
        path: '/approved-appointment',
        name: 'approved-appointment',
        meta: { title: 'Approved' }
      },
      {
        path: '/cancelled-appointment',
        name: 'cancelled-appointment',
        meta: { title: 'Canceled' }
      }
    ]
  },
  {
    path: '/dashboard',
    component: Layout,
    name: 'Dashboard3',
    meta: {
      title: 'Chat Room',
      roles: ['ADMIN']
    },
    children: [
      {
        path: '/chat-room',
        name: 'chat-room',
        meta: { title: 'Chat Room' }
      }
    ]
  }
]
