import axios from 'axios'

let store: { getState: () => any }

export const injectStore = (_store: any) => {
  store = _store
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,

})

api.interceptors.request.use(config => {
  if(config.headers)
    config.headers['Authorization'] = `Bearer ${store.getState().Users.user.token}`
  console.log(config)
  console.log(store.getState())
  return config
})

export default api