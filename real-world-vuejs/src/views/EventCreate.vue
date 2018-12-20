<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        class="field"
      />
      <h3>Name & describe your event</h3>
      <BaseInput v-model="event.title" class="field" type="text" label="Title" placeholder="Title"/>
      <BaseInput
        v-model="event.description"
        class="field"
        type="text"
        label="Description"
        placeholder="Description"
      />
      <h3>Where is your event?</h3>
      <BaseInput
        v-model="event.location"
        class="field"
        type="text"
        label="Location"
        placeholder="Location"
      />
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <Datepicker v-model="event.date" placeholder="Select a date"/>
      </div>
      <BaseSelect label="Select a time" :options="times" v-model="event.time" class="field"/>
      <input type="submit" class="button -fill-gradient" value="Submit">
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'

export default {
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  methods: {
    createEvent() {
      NProgress.start()
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          NProgress.done()
        })
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  },
  components: {
    Datepicker
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
