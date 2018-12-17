import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: 'abc123',
    user: {
      name: 'John Doe'
    },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [],
    eventsTotal: null,
    event: {}
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_TOTAL_EVENTS(state, total) {
      state.eventsTotal = total
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event.data)
      })
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(res => {
          console.log(`Total events is ${res.headers['x-total-count']}`)
          commit('SET_TOTAL_EVENTS', res.headers['x-total-count'])
          commit('SET_EVENTS', res.data)
        })
        .catch(err => {
          console.log(`There was an error fetching the events. ${err}`)
        })
    },
    fetchEvent({ commit, getters }, id) {
      const event = getters.getEventById(id)
      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then(res => {
            commit('SET_EVENT', res.data)
          })
          .catch(err => {
            console.log(`There was an error searching for the event. ${err}`)
          })
      }
    }
  },
  getters: {
    getEventById: state => id => state.events.find(event => event.id === id)
  }
})
