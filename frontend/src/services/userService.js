import axios from 'axios'

export const getUser = () =>
  localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null

export const login = async (email, password) => {
  const { data } = await axios.post('api/users/login', { email, password })
  //   localStorage.setItem('user', JSON.stringify(data))
  return data
}

export const addUserItem = (data) => {
  localStorage.setItem('user', JSON.stringify(data))
}

export const removeUserItem = () => {
  localStorage.removeItem('user')
}

export async function register (userData) {
  const response = await axios.post('/api/users/register', userData)
  return response
}

export const getAllTags = async () => {
  const { data } = await axios.get('/api/foods/tags')
  return data
}
