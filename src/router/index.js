import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import Btable from '@/components/Btable'
import Login from '@/pages/Login'
import CreateUser from '@/pages/createUser'
import GradList from '@/pages/grad/list'
import GradCreate from '@/pages/grad/create'
import GradUpdate from '@/pages/grad/update'
import PlaceCreate from '@/pages/place/create'
import PlaceList from '@/pages/place/list'
import DeviceCreate from '@/pages/device/create'
import DeviceList from '@/pages/device/list'
import Statistic from '@/pages/statistic/place'
import OrderList from '@/pages/order/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'users/create',
          component: CreateUser
        },
        {
          path: 'grads',
          component: GradList
        },
        {
          path: 'grads/create',
          component: GradCreate
        },
        {
          path: 'grads/:id',
          component: GradUpdate
        },
        {
          path: 'places',
          component: PlaceList
        },
        {
          path: 'places/create',
          component: PlaceCreate
        },
        {
          path: 'devices/create',
          component: DeviceCreate
        },
        {
          path: 'places/:id/devices',
          component: DeviceList
        },
        {
          path: 'orders',
          component: OrderList
        },
        {
          path: 'statistic',
          component: Statistic
        }
      ]
    },
    {
      path: '/page',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'table',
          component: Btable
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
