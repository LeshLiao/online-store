import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import classes from './loginPage.module.css'
import Input from '../../components/Input/Input'
import { EMAIL } from '../../constants/patterns'
// import { toast } from 'react-toastify'
import Alert from '@mui/material/Alert'
// import * as emailService from '../../services/emailService'

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
  // const { emptyCart } = useCart()

  // useEffect(() => {
  //   if (!user) return
  //   returnUrl ? navigate(returnUrl) : navigate('/')
  // }, [navigate, returnUrl, user])

  const getEmailMessage = (verifiedUid, verifiedToken) => {
    let message = ''
    message += 'Click this link to verify your PaletteX account:\n\n'
    message += `https://www.palettex.ca/users/${verifiedUid}/verify/${verifiedToken}`
    return message
  }

  const submit = async ({ email, password }) => {
    const ret = await login(email, password)
    if (ret.needVerified) {
      setMsg(ret.message)
      setError('')
      console.log(ret.firstName + ' , ' + ret.email)
      console.log(getEmailMessage(ret.uid, ret.token))
      // emailService.sendEmailToUser(ret.firstName, ret.email, getEmailMessage(ret.uid, ret.token))
    } else if (ret.loginSucceed) {
      setMsg(ret.message)
      setError('')
      returnUrl ? navigate(returnUrl) : navigate('/')
    } else {
      console.log(ret)
      setError(ret.response.data.message)
      setMsg('')
    }
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
          <Input
            type="email"
            label="Email"
            {...register('email', {
              required: true,
              pattern: EMAIL
            })}
            error={errors.email}
          />

          <Input
            type="password"
            label="Password"
            {...register('password', {
              required: true
            })}
            error={errors.password}
          />
          {error && <div className={classes.error_msg}><Alert severity="error">{error}</Alert></div>}
          {msg && <div className={classes.success_msg}><Alert severity="info">{msg}</Alert></div>}

          <button className={classes.login_button} type="submit">LOGIN</button>
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
          </div>
        </form>
      </div>
    </div>
    </>
  )
}
