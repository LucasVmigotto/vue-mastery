<template>
  <div>
    <h1>Events Listing</h1>
    <Event-Card/>
  </div>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
export default {
  data() {
    return {}
  },
  components: {
    EventCard
  }
}
</script>
<style scoped>
</style>
