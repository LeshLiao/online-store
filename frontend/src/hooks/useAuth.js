import React, { useState, createContext, useContext } from 'react'
import * as userService from '../services/userService'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser())

  const login = async (email, password) => {
    try {
      const response = await userService.login(email, password)
      if (!response.needVerified) {
        userService.addUserItem(response)
        setUser(response.token)
      }
      return response
    } catch (err) {
      return err
    }
  }

  const navigate = useNavigate()
  const logout = () => {
    userService.removeUserItem()
    setUser(null)
    navigate('/')
  }

  const clearUser = () => {
    userService.removeUserItem()
    setUser(null)
    console.log('useAuth clearUser')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, clearUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// Add PropTypes validation for children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const useAuth = () => useContext(AuthContext)
