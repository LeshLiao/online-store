import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import classes from './loginPage.module.css'
import Alert from '@mui/material/Alert'
import { useAuth } from '../../hooks/useAuth'
import { useForm } from 'react-hook-form'
// import * as emailService from '../../services/emailService'
import { TextField, Button, Stack, InputAdornment, IconButton } from '@mui/material'
// import AlertTitle from '@mui/material/AlertTitle'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InfoVerify from './InfoVerify'

export default function LoginPage () {
  const navigate = useNavigate()
  // const { user, login } = useAuth()
  const { login } = useAuth()
  const [params] = useSearchParams()
  const returnUrl = params.get('returnUrl')
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [showVerifyInfo, setShowVerifyInfo] = useState(false) // State to track if email is sent
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [uid, setUid] = useState('')
  const [token, setToken] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)
  const {
    handleSubmit
  } = useForm()

  // function handleSubmit (event) {
  const submit = async () => {
    setIsSubmitting(true)
    const response = await login(email, password)
    setMsg('')
    setError('')

    if (response.needVerified) {
      setFirstName(response.firstName)
      setEmail(response.email)
      setUid(response.uid)
      setToken(response.token)
      console.log('need verified =================')
      setShowVerifyInfo(true)
    } else if (response.loginSucceed) {
      setMsg('Login Successful')
      setTimeout(() => {
        returnUrl ? navigate(returnUrl) : navigate('/')
      }, 1500)
    } else {
      console.log(response)
      setError(response.response.data.message)
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
    <div className={classes.top_container}></div>
    <div className={classes.container}>
    {!showVerifyInfo && (
      <div className={classes.login_form}>
      <React.Fragment>
        {!showVerifyInfo && (<div className={classes.header}>LOGIN</div>)}
        <form onSubmit={handleSubmit(submit)} noValidate>
          <TextField
              type="email"
              variant='outlined'
              color='secondary'
              label="Email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              fullWidth
              required
              InputLabelProps={{
                style: { color: 'aliceblue' } // Change label color here
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline
                },
                style: { color: 'aliceblue' }
              }}
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'aliceblue' // Change the focused border color
                },
                mb: 2
              }}
          />

          <TextField
              type={showPassword ? 'text' : 'password'} // <-- This is where the magic happens
              variant='outlined'
              color='secondary'
              label="Password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              required
              fullWidth
              InputLabelProps={{
                style: { color: 'aliceblue' } // Change label color here
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline
                },
                style: { color: 'aliceblue' },
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff style={{ color: 'white' }}/> : <Visibility style={{ color: 'white' }}/>}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'aliceblue' // Change the focused border color
                },
                mb: 2
              }}
          />
          {error && <div className={classes.error_msg}><Alert severity="error">{error}</Alert></div>}
          {msg && <div className={classes.success_msg}>
            <Alert severity="info">{msg}</Alert>
          </div>}

          {!showVerifyInfo && (
          <Stack spacing={1} direction="row" sx={{ marginTop: 1, marginBottom: 3 }}>
            <Button variant="outlined" sx={{
              height: '50px',
              color: 'aliceblue',
              backgroundColor: '#0089cc',
              borderStyle: 'none',
              marginTop: '0.8rem',
              '&.Mui-disabled': {
                background: '#0089cc',
                color: '#74cdf9'
              }
            }} color="secondary" type="submit" disabled={isSubmitting} fullWidth>LOGIN</Button>
          </Stack>)}

          {!showVerifyInfo && (
          <div className={classes.register}>
            <div className={classes.create_account}>
              <span>{"Don't have an account?"}&nbsp;&nbsp;&nbsp;</span>
              <Link to={`/register${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
                <strong>[ Create one ]</strong>
              </Link>
            </div>
          </div>)}
        </form>
      </React.Fragment>
      </div>
    )}
    {showVerifyInfo && (<InfoVerify firstName={firstName} email={email} uid={uid} token={token} />)}
    </div>
    </>
  )
}
