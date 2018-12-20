import EventService from '@/services/EventService'

export const namespaced = true

export const state = {
  events: [],
  eventsTotal: 0,
  event: {}
}

export const mutations = {
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
}

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Success creating the event!'
        }
        dispatch('notification/add', notification, {
          root: true
        })
      })
      .catch(err => {
        const notification = {
          type: 'error',
          message: `There was an error creating the event. ${err.message}`
        }
        dispatch('notification/add', notification, {
          root: true
        })
      })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(res => {
        commit('SET_TOTAL_EVENTS', res.headers['x-total-count'])
        commit('SET_EVENTS', res.data)
      })
      .catch(err => {
        const notification = {
          type: 'error',
          message: `There was an error fetching the events. ${err.message}`
        }
        dispatch('notification/add', notification, {
          root: true
        })
      })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    const event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      return EventService.getEvent(id)
        .then(res => {
          commit('SET_EVENT', res.data)
          return res.data
        })
        .catch(err => {
          const notification = {
            type: 'error',
            message: `There was an error searching for the event. ${
              err.message
            }`
          }
          dispatch('notification/add', notification, {
            root: true
          })
        })
    }
  }
}

export const getters = {
  getEventById: state => id => state.events.find(event => event.id === id)
}
