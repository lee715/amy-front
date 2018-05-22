export default {

  updateUser (state, newData) {
    for (let k in newData) {
      state.me[k] = newData[k]
    }
  },

  addPlaceSt (state, placeSt) {
    state.st.place[placeSt._placeId] = placeSt
  }
}
