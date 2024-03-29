import React, { useState } from 'react'
import { TextField, Button, Stack, InputAdornment, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { register } from '../../services/userService'
import classes from './register_form.module.css'
import * as emailService from '../../services/emailService'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  function handleSubmit (event) {
    event.preventDefault()

    if (!checkPassword(password)) return

    setIsSubmitting(true)
    console.log('register submit!!!')
    setLastName('') // Remove LastName in register form.
    const userData = {
      firstName,
      lastName,
      email,
      password
    }

    const getEmailMessage = (verifiedUid, verifiedToken) => {
      let message = ''
      message += 'Click this link to verify your PaletteX account:\n\n'
      message += `https://www.palettex.ca/users/${verifiedUid}/verify/${verifiedToken}`
      return message
    }

    register(userData).then((response) => {
      setError('')
      setMsg('')
      console.log('register response:')
      console.log(response)
      // console.log(getEmailMessage(response.data.uid, response.data.token))

      // === send email ===
      emailService.sendEmailVerify(
        firstName,
        email,
        getEmailMessage(response.data.uid, response.data.token)
      ).then((ret) => { // Use .then() to handle the resolved promise
        console.log(ret)
        if (ret.status === 200) { // Check for status 200
          setMsg('We have sent a verification link to your email\nPlease verify your email address\n' +
          response.data.email)
          setEmailSent(true)
        } else {
          setError('Failed to send verification email')
        }
      }).catch((error) => {
        console.error('Failed to send email:', error)
        setError('Error: Failed to send verification email')
      })

      // === debug ===
      // if (response.status === 200) {
      //   setMsg('DB ok')
      //   setEmailSent(true)
      // } else {
      //   setError('DB error')
      // }
      // console.log(`http://localhost:3000/users/${response.data.uid}/verify/${response.data.token}`)
    }, (error) => {
      console.log(error)
      setError(error.response.data)
      setMsg('')
      setIsSubmitting(false)
    })
  }

  function checkPassword (pwd) {
    if (pwd.length < 8) {
      setError('Passwords must have at least 8 characters.')
      return false
    }
    return true
  }

  return (
        <React.Fragment>
            {!emailSent && (<div className={classes.header}>REGISTER</div>)}
            {!emailSent && (<div className={classes.info}>Please fill in the information below:</div>)}
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
              {!emailSent && (
                <Stack spacing={2} direction="column" sx={{ marginBottom: 2 }} >
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="First Name"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
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
                          '& input:disabled': {
                            color: 'white', // Change text color when disabled
                            backgroundColor: 'transparent' // Change background color when disabled
                          }
                        }}

                    />
                    {/* <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Last Name"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
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
                          }
                        }}
                    /> */}
                </Stack>)}
                {!emailSent && (
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
                />)}
                {!emailSent && (
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

                />)}
                {error && <div className={classes.error_msg}><Alert severity="error">{error}</Alert></div>}
                {msg && <div className={classes.success_msg}>
                  <Alert severity="info"><AlertTitle>Verify Your Email</AlertTitle>{msg}</Alert>
                </div>}

                {!emailSent && (
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
                  }} color="secondary" type="submit" disabled={isSubmitting} fullWidth>CREATE MY ACCOUNT</Button>
                </Stack>)}
            </form>
            {!emailSent && (<div className={classes.already}>Already have an account? <Link to="/login"><span className={classes.login_here}>Login Here</span></Link></div>)}
            {emailSent && (<div className={classes.login_in_here}><br/><strong>Please Verify Your Email</strong><br/><br/>If verification succeeds, <Link to="/login"><span className={classes.login_here}>Log in Here</span></Link><br/><br/>
            <div className={classes.hint_msg}>If you haven&apos;t received the email after a few minutes, be sure to check your junk mail.</div>
            </div>)}
        </React.Fragment>
  )
}

export default RegisterForm
