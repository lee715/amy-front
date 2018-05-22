import fetch from '../util/fetch'

export const getAll = () => fetch('/api/grads')

export const get = (id) => fetch(`/api/grads/${id}`)

export const create = (grad) => fetch('/api/grads', grad, 'POST')

export const update = (_gradId, data) => fetch(`/api/grads/${_gradId}`, data, 'PUT')

export const remove = (_gradId) => fetch(`/api/grads/${_gradId}`, {}, 'DELETE')
