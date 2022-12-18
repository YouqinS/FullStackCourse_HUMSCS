import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'
//const baseUrl = 'http://localhost:3001/notes'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

//return the promises returned by the axios methods
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async (content) => {
  const object = { content, important: false }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default {
  getAll,
  create,
  createNew,
  update,
  setToken
}
