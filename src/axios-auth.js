import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/'
})
// saving the url as a const so we can use it anywhere.
export default instance
