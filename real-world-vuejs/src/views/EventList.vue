<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <Event-Card v-for="event in event.events" :key="event.id" :event="event"/>
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">Previus Page</router-link>|
    </template>
    <template v-if="event.eventsTotal > page * 3">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next">Next Page</router-link>
    </template>
  </div>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  created() {
    this.fetchEvents({ perPage: 3, page: this.page })
  },
  computed: {
    ...mapState(['event', 'user']),
    page() {
      return parseInt(this.$route.query.page) || 1
    }
  },
  methods: {
    ...mapActions('event', ['fetchEvents'])
  },
  components: {
    EventCard
  }
}
</script>
<style scoped>
</style>
