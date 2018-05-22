import fetch from '../util/fetch'

export const getAll = () => fetch('/api/devices')

export const getByPlaceId = (id) => fetch(`/api/places/${id}/devices`)

export const get = (id) => fetch(`/api/devices/${id}`)

export const create = (place) => fetch('/api/devices', place, 'POST')

export const update = (_placeId, data) => fetch(`/api/devices/${_placeId}`, data, 'PUT')

export const remove = (_placeId) => fetch(`/api/devices/${_placeId}`, {}, 'DELETE')
