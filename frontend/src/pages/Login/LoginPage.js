import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import classes from './loginPage.module.css'
import Input from '../../components/Input/Input'
import { EMAIL } from '../../constants/patterns'
import Alert from '@mui/material/Alert'
import * as emailService from '../../services/emailService'

export default function LoginPage () {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()
  // const { user, login } = useAuth()
  const { login } = useAuth()
  const [params] = useSearchParams()
  const returnUrl = params.get('returnUrl')
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [emailSent, setEmailSent] = useState(false) // State to track if email is sent

  const getEmailMessage = (verifiedUid, verifiedToken) => {
    let message = ''
    message += 'Click this link to verify your PaletteX account:\n\n'
    message += `https://www.palettex.ca/users/${verifiedUid}/verify/${verifiedToken}`
    return message
  }

  const submit = async ({ email, password }) => {
    const response = await login(email, password)
    if (response.needVerified) {
      setError('')
      setMsg('')
      console.log(response.firstName + ' , ' + response.email)
      console.log(getEmailMessage(response.uid, response.token))
      emailService.sendEmailToUser(
        response.firstName,
        response.email,
        getEmailMessage(response.uid, response.token)
      ).then((ret) => { // Use .then() to handle the resolved promise
        console.log(ret)
        if (ret.status === 200) { // Check for status 200
          setMsg('We have sent a verification link to your email\nPlease verify your email address\n' +
          response.email)
          setEmailSent(true)
        } else {
          setError('Failed to send verification email')
        }
      }).catch((error) => {
        console.error('Failed to send email:', error)
        setError('Error: Failed to send verification email')
      })
    } else if (response.loginSucceed) {
      setMsg('Login Successful')
      setError('')
      setTimeout(() => {
        returnUrl ? navigate(returnUrl) : navigate('/')
      }, 1500)
    } else {
      console.log(response)
      setError(response.response.data.message)
      setMsg('')
    }
  }

  function refreshPage () {
    window.location.reload(false)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
    <div className={classes.top_container}></div>
    <div className={classes.container}>
      <div className={classes.details}>
        <div className={classes.title}>LOGIN</div>
        <form onSubmit={handleSubmit(submit)} noValidate>
          {!emailSent && (
          <Input
            type="email"
            label="Email"
            {...register('email', {
              required: true,
              pattern: EMAIL
            })}
            error={errors.email}
          />)}
          {!emailSent && (
          <Input
            type="password"
            label="Password"
            {...register('password', {
              required: true
            })}
            error={errors.password}
          />)}
          {error && <div className={classes.error_msg}><Alert severity="error">{error}</Alert></div>}
          {msg && <div className={classes.success_msg}><Alert severity="info">{msg}</Alert></div>}
          {!emailSent && (
            <button className={classes.login_button} type="submit">LOGIN</button>
          )}

          {!emailSent && (
          <div className={classes.register}>
            <div className={classes.create_account}>
              <span>{"Don't have an account?"}&nbsp;&nbsp;&nbsp;</span>
              <Link to={`/register${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
                <strong>Create one</strong>
              </Link>
            </div>
            {/* <Link to='/' onClick={emptyCart}>
              Clear cart
            </Link> */}
          </div>)}
          {emailSent && (<button className={classes.reload_button} onClick={refreshPage}>LOGIN AGAIN</button>)}
        </form>
      </div>
    </div>
    </>
  )
}
