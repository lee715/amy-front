export default {
  getPlaceSt: (state) => (id) => {
    return state.st.place[id]
  }
}
