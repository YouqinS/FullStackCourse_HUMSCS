import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (blogId, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${blogId}`, newObject, config)

  return response.data
}

const comment = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, blog, config)
  return response.data
}

const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }

  return await axios.delete(`${baseUrl}/${blogId}`, config)
}

export default {
  setToken,
  getAll,
  create,
  update,
  remove,
  comment
}
