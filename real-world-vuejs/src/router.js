import Vue from 'vue'
import Router from 'vue-router'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import EventCreate from './views/EventCreate.vue'
import NotFound from '@/components/NotFound.vue'
import NetworkIssue from '@/views/NetworkIssue.vue'
import Example from '@/views/Example.vue'
import NProgress from 'nprogress'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      alias: ['/list'],
      props: true
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      beforeEnter (routeTo, routeFrom, next) {
        store.dispatch('event/fetchEvent', routeTo.params.id)
          .then(event => {
            routeTo.params.event = event
            next()
          })
          .catch(err => {
            if (err.response && err.response.status === 404) {
              next({
                name: '404',
                params: {
                  resource: 'event'
                }
              })
            } else {
              next({
                name: 'network-issue'
              })
            }
          })
      }
    },
    {
      path: '/event-create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      path: '*',
      redirect: {
        name: '404',
        params: {
          resource: 'page'
        }
      }
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue
    },
    {
      path: '/example',
      component: Example
    }
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
