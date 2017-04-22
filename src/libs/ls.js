import ls from 'local-storage'

export default {
  get (key, defaultVal = null) {
    const val = ls(key) || defaultVal
    return val
  },

  set (key, val) {
    return ls(key, val)
  },

  remove (key) {
    return ls.remove(key)
  }
}
