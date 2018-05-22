import fetch from '../util/fetch'

const modes = [{key: '比例分成', value: 'percent'}, {key: '固定数额', value: 'count'}]

export const getAll = async () => {
  let places = await fetch('/api/places')
  return places.map(format)
}

export const get = async (id) => {
  let place = await fetch(`/api/places/${id}`)
  return format(place)
}

export const create = (place) => fetch('/api/places', place, 'POST')

export const update = (id, data) => fetch(`/api/places/${id}`, data, 'PUT')

export const remove = (id) => fetch(`/api/places/${id}`, {}, 'DELETE')

export const getModes = () => modes

function format (place) {
  let countObj = place.deviceCount = {
    total: place.devices.length,
    work: 0,
    idle: 0,
    fault: 0
  }
  for (let device of place.devices) {
    countObj[device.status]++
  }
  place.countStatus = `${countObj.work + countObj.idle}/${countObj.total}`
  place.chart = {
    columns: ['date', 'count'],
    rows: place.st
  }
  return place
}
