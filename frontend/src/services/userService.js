import axios from 'axios'

export const getUser = () =>
  localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null

export const login = async (email, password) => {
  const { data } = await axios.post('api/users/login', { email, password })
  localStorage.setItem('user', JSON.stringify(data))
  return data
}

export const logout = () => {
  localStorage.removeItem('user')
}

export async function register (userData) {
  try {
    console.log('register()')
    console.log(userData)
    const response = await axios.post('/api/users/register', userData)
    return response.data // Assuming your API returns relevant data on success
  } catch (error) {
    console.error('Error during registration:', error.response.data)
    throw new Error('Error during registration: ' + error.message)
  }
}
