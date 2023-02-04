import axios from 'axios'

const client = axios.create({
  baseURL: process.env.BACKEND_URL || "/api/"
})

export default client