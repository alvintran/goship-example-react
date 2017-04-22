import axios from 'axios'

export const getRates = (data) => {
  return axios.post('/rates', data)
}
