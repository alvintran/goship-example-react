import axios from 'axios'

export const getShipments = (params) => {
  return axios.get('/shipments', {params: params})
}

export const createShipment = (data) => {
  return axios.post('/shipments', data)
}
