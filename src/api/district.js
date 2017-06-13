import axios from 'axios'

export const getWardsOfDistrict = (district_code, params) => {
  return axios.get(`/districts/${district_code}/wards`, {params: params})
}
