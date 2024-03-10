import React, { useState, useEffect, useRef } from 'react'
import classes from './info_verify.module.css'
import * as emailService from '../../services/emailService'
import AlertTitle from '@mui/material/AlertTitle'
import Alert from '@mui/material/Alert'
import PropTypes from 'prop-types'

export default function InfoVerify ({ firstName, email, uid, token }) {
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

  const getEmailMessage = (uid, token) => {
    let message = ''
    message += 'Click this link to verify your PaletteX account:\n\n'
    message += `https://www.palettex.ca/users/${uid}/verify/${token}`
    return message
  }

  function sendVerify () {
    setError('')
    emailService.sendEmailVerify(
      firstName,
      email,
      getEmailMessage(uid, token)
    ).then((ret) => {
      console.log(ret)
      if (ret.status === 200) {
        setMsg('We have sent a verification link to your email\nPlease verify your email address\n' + email)
      } else {
        setError('Failed to send verification email')
      }
    }).catch((error) => {
      console.error('Failed to send email:', error)
      setError('Error: Failed to send verification email')
    })
  }

  function refreshPage () {
    window.location.reload(false)
  }

  const initialized = useRef(false)
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      sendVerify()
    }
  }, [])

  return (
    <>
      <div className={classes.container}>
        <div className={classes.title}></div>
          {error && <div className={classes.error_msg}><Alert severity="error">{error}</Alert></div>}
          {msg && <div className={classes.success_msg}>
            <Alert severity="info"><AlertTitle>Verify Your Email</AlertTitle>{msg}</Alert>
          </div>}
          <button className={classes.reload_button} onClick={refreshPage}>LOGIN AGAIN</button>
      </div>
    </>
  )
}
InfoVerify.propTypes = {
  firstName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
}
