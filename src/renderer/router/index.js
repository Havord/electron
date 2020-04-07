import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Guide-page',
      component: require('@/components/Guide').default
    },
    {
      path: '/TrafficPage',
      name: 'TrafficPage',
      component: require('@/components/TrafficPage').default
    },
    {
      path: '/TrainPage',
      name: 'TrainPage',
      component: require('@/components/TrainPage').default
    },
    {
      path: '/GroupPage',
      name: 'GroupPage',
      component: require('@/components/GroupPage').default
    }
  ]
})