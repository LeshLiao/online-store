import React, { useState, createContext, useContext } from 'react'
import * as userService from '../services/userService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser())

  const login = async (email, password) => {
    try {
      const user = await userService.login(email, password)
      setUser(user)
      toast.success('Login Successful!')
    } catch (err) {
      toast.error(err.response.data)
    }
  }

  const navigate = useNavigate()
  const logout = () => {
    userService.logout()
    setUser(null)
    toast.success('Logout Successful!')
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Add PropTypes validation for children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const useAuth = () => useContext(AuthContext)
