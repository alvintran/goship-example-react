import axios from 'axios'

export const getAllCities = (params) => {
  return axios.get('/cities', {params: params})
}

export const getDistrictsOfCity = (city_code, params) => {
  return axios.get(`/cities/${city_code}/districts`, {params: params})
}
