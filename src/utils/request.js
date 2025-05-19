import axios from 'axios'

const baseURL = 'http://1.95.116.204:8868/'

const instance = axios.create({
  baseURL,
  timeout: 100000
})
export default instance
export { baseURL }