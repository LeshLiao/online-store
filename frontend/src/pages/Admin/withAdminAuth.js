// withAdminAuth.js
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const withAdminAuth = (WrappedComponent) => {
  const WithAdminAuth = (props) => {
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
      if (!user || !user.isAdmin) {
        navigate('/login')
      }
    }, [user, navigate])

    // Render the wrapped component if the user is authenticated and an admin
    return user && user.isAdmin ? <WrappedComponent {...props} /> : null
  }

  // Assign a display name for easier debugging
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component'
  WithAdminAuth.displayName = `withAdminAuth(${wrappedComponentName})`

  return WithAdminAuth
}

export default withAdminAuth
