export const namespaced = true

let id = 1

export const state = {
  notifications: []
}

export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      id: id++,
      ...notification
    })
  },
  DELETE(state, { id }) {
    state.notifications = state.notifications.filter(el => el.id != id)
  }
}

export const actions = {
  add({ commit }, notification) {
    commit('PUSH', notification)
  },
  remove({ commit }, notification) {
    commit('DELETE', notification)
  }
}
