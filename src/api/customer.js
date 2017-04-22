import axios from 'axios'

export const getCustomers = (params) => {
  return axios.get('/customers', {params: params})
}
