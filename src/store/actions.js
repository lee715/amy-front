import {getMe} from '../models/user'
import {getPlaceSt} from '../models/statistic'

export default {
  async getMe ({
    commit,
    state
  }) {
    let me = await getMe()
    commit('updateUser', me)
  },

  async getPlaceSt ({
    commit,
    state,
    getters
  }, _placeId) {
    let st = getters.getPlaceSt(_placeId)
    if (st) return st
    let res = await getPlaceSt(_placeId)
    res._placeId = _placeId
    commit('addPlaceSt', res)
    return res
  }
}
