<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <Event-Card v-for="event in event.events" :key="event.id" :event="event"/>
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">Previus Page</router-link>|
    </template>
    <template v-if="hasNextPage">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next">Next Page</router-link>
    </template>
  </div>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
import store from '@/store/store'
import { mapState } from 'vuex'

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page || 1)
  store.dispatch('event/fetchEvents', { page: currentPage }).then(() => {
    routeTo.params.page = currentPage
    next()
  })
}

export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  data() {
    return {}
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  computed: {
    ...mapState(['event', 'user']),
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage
    }
  },
  components: {
    EventCard
  }
}
</script>
<style scoped>
</style>
