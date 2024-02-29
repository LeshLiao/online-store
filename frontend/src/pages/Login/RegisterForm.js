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
      console.log(response)
      setMsg(response.data.message)
      setError('')
      console.log(getEmailMessage)
      emailService.sendEmailToUser(firstName, email, getEmailMessage(response.data.uid, response.data.token))
      // console.log(`http://localhost:3000/users/${response.data.uid}/verify/${response.data.token}`) // test
    }, (error) => {
      console.log(error)
      setError(error.response.data)
      setMsg('')
    })
  }

  return (
        <React.Fragment>
            <div className={classes.header}>REGISTER</div>
            <div className={classes.info}>Please fill in the information below:</div>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
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
                </Stack>
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
                />
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
                />
                {/* <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                    <Box sx={{ minWidth: 150 }}>
                      <FormControl fullWidth>
                        <InputLabel id="select-label-gender">Gender</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={gender}
                          label="Gender"
                          onChange={e => setGender(e.target.value)}
                        >
                          <MenuItem value={0}>Female</MenuItem>
                          <MenuItem value={1}>Male</MenuItem>
                          <MenuItem value={2}>No Specified</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 210 }}>
                      <FormControl fullWidth>
                        <InputLabel id="select-label-country">Country</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={country}
                          label="Country"
                          onChange={e => setCountry(e.target.value)}
                        >
                          {countries.map((country) => (
                            <MenuItem key={country.code} value={country.code}>
                              {country.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                </Stack> */}
                {error && <div className={classes.error_msg}><Alert severity="error">{error}</Alert></div>}
                {msg && <div className={classes.success_msg}><Alert severity="info">{msg}</Alert></div>}
                <Stack spacing={1} direction="row" sx={{ marginTop: 1, marginBottom: 3 }}>

                  <Button variant="outlined" sx={{ height: '50px', color: 'aliceblue', backgroundColor: '#0089cc', borderStyle: 'none', marginTop: '0.8rem' }} color="secondary" type="submit" fullWidth>CREATE MY ACCOUNT</Button>
                </Stack>

            </form>
            <div className={classes.already}>Already have an account? <Link to="/login"><span className={classes.login_here}>Login Here</span></Link></div>
        </React.Fragment>
  )
}

export default RegisterForm
