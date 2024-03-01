import React, { useState } from 'react'
import { TextField, Button, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { register } from '../../services/userService'
import classes from './register_form.module.css'
import * as emailService from '../../services/emailService'
import Alert from '@mui/material/Alert'

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [dateOfBirth] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [emailSent, setEmailSent] = useState(false) // State to track if email is sent

  function handleSubmit (event) {
    event.preventDefault()

    const userData = {
      firstName,
      lastName,
      email,
      dateOfBirth,
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
      console.log(response)
      console.log(getEmailMessage)
      emailService.sendEmailToUser(
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
      //   setMsg('We have sent a verification link to your email\nPlease verify your email address\n' +
      //   response.data.email)
      //   setEmailSent(true)
      // } else {
      //   setError('Register error')
      // }
      // console.log(`http://localhost:3000/users/${response.data.uid}/verify/${response.data.token}`)
    }, (error) => {
      console.log(error)
      setError(error.response.data)
      setMsg('')
    })
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
                    <TextField
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
                    />
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
                    // sx={{ mb: 2 }}
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
                    type="password"
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
                      style: { color: 'aliceblue' }
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'aliceblue' // Change the focused border color
                      },
                      mb: 2
                    }}
                />)}

                {error && <div className={classes.error_msg}><Alert severity="error">{error}</Alert></div>}
                {msg && <div className={classes.success_msg}><Alert severity="info">{msg}</Alert></div>}
                {!emailSent && (
                <Stack spacing={1} direction="row" sx={{ marginTop: 1, marginBottom: 3 }}>
                  <Button variant="outlined" sx={{ height: '50px', color: 'aliceblue', backgroundColor: '#0089cc', borderStyle: 'none', marginTop: '0.8rem' }} color="secondary" type="submit" fullWidth>CREATE MY ACCOUNT</Button>
                </Stack>)}
            </form>
            <div className={classes.already}>Already have an account? <Link to="/login"><span className={classes.login_here}>Login Here</span></Link></div>
        </React.Fragment>
  )
}

export default RegisterForm
