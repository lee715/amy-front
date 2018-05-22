import fetch from '../util/fetch'

export const getPlaceSt = (_placeId, startDate, endDate) => fetch(`/api/places/${_placeId}/statistic?startDate=${startDate || ''}&endDate=${endDate || ''}`)
