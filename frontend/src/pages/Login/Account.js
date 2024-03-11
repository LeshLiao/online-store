import React, { useEffect } from 'react'
import classes from './account.module.css'
import { useAuth } from '../../hooks/useAuth'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { useNavigate } from 'react-router-dom'

export default function Account () {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const logoutAndCloseMenu = () => {
    logout()
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <div className={classes.top_container}></div>
      {user && (
        <div className={classes.container}>
          <div className={classes.content}>
            <div className={classes.header}>Account</div>
            {user.firstName && (
              <div className={classes.first_name_box}>
                <div className={classes.first_name_label}>First Name:</div>
                <div className={classes.first_name_value}>{user.firstName}</div>
              </div>
            )}
            {user.email && (
              <div className={classes.email_box}>
                <div className={classes.email_label}>Email: </div>
                <div className={classes.email_value}>{user.email}</div>
              </div>
            )}
            <div className={classes.logout_box}>
              <div className={classes.logout_label}>Logout </div>
              <a href="/#" onClick={logoutAndCloseMenu}><ExitToAppIcon fontSize="large" style={{ color: '#56caf5' }}/></a>
            </div>
          </div>
        </div>
      )}
    </>

  )
}
