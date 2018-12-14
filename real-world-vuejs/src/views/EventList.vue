<template>
  <div>
    <h1>Events Listing</h1>
    <Event-Card v-for="event in events" :key="event.id" :event="event"/>
    <BaseIcon/>
  </div>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventServices.js'
export default {
  data() {
    return {
      events: []
    }
  },
  created() {
    EventService.getEvents()
      .then(res => {
        this.events = res.data
      })
      .catch(err => {
        console.log(`There was an error: ${err.response}`)
      })
  },
  components: {
    EventCard
  }
}
</script>
<style scoped>
</style>
