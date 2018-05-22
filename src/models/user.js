import fetch from '../util/fetch'

export const getMe = () => fetch('/api/users:me')

export const getAll = () => fetch('/api/users:batch')

export const getAgents = () => fetch('/api/users/agent:batch')

export const getSalesmans = () => fetch('/api/users/salesman:batch')

export const login = (email, password) => fetch('/api/login', {email, password}, 'POST')

export const create = (user) => fetch('/api/users', user, 'POST')
