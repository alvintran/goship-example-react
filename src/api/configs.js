/**
 * -----------------------------------------------------------------------------------------------------------
 * Loading dependencies
 * -----------------------------------------------------------------------------------------------------------
 */
import axios from 'axios'
import ls from 'local-storage'

/**
 * -----------------------------------------------------------------------------------------------------------
 * Default configurations
 * -----------------------------------------------------------------------------------------------------------
 */
axios.defaults.baseURL = 'http://sandbox.goship.io/api/v2';
axios.defaults.headers.post['Accept'] = 'application/json'

/**
 * -----------------------------------------------------------------------------------------------------------
 * Add a request interceptor
 * -----------------------------------------------------------------------------------------------------------
 */
axios.interceptors.request.use(config => {
  const token = ls.get('authen', {})
  if (token) {
    config.headers.Authorization = `Bearer ${token.access_token}`
  }
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

/**
 * -----------------------------------------------------------------------------------------------------------
 * Add a response interceptor
 * -----------------------------------------------------------------------------------------------------------
 */
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  const token = ls.get('authen', {})
  let response = error.response
  if (response.status === 400 || response.status === 401) {
    if (!(response.config.method === 'post' && response.config.url === response.config.baseURL + '/login')) {
      if (token) {
        ls.remove('authen')
        window.location.href = '/login'
      } else {
        window.location.href = '/login'
      }
    }
  }
  return error.response.data
})
