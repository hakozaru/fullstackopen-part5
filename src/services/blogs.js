import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = (blog) => {
  const config = { headers: { Authorization: token } }
  const request = axios.post(baseUrl, blog, config)
  return request.then(res => res.data)
}

export default { getAll, setToken, createBlog }
