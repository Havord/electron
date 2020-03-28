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
      name: 'Traffic-Page',
      component: require('@/components/TrafficPage').default
    },
    {
      path: '/LandingPage',
      name: 'LandingPage-Page',
      component: require('@/components/LandingPage').default
    },
  ]
})