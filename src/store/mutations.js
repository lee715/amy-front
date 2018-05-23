export default {

  updateUser (state, newData) {
    for (let k in newData) {
      state.me[k] = newData[k]
    }
    state.me.isRoot = state.me.role === 'root'
  },

  addPlaceSt (state, placeSt) {
    state.st.place[placeSt._placeId] = placeSt
  }
}
