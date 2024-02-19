import React, { useState } from 'react'
import { TextField, Button, Stack } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../services/userService'
import { toast } from 'react-toastify'
import classes from './register_form.module.css'

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [dateOfBirth] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit (event) {
    event.preventDefault()

    const userData = {
      firstName,
      lastName,
      email,
      dateOfBirth,
      password
    }

    register(userData).then((response) => {
      toast.success(response.data.status)
      navigate('/')
    }, (error) => {
      toast.error(error.response.data)
    })

    // console.log(firstName, lastName, email, dateOfBirth, password, gender, country)
  }

  return (
        <React.Fragment>
            <div className={classes.header}>REGISTER</div>
            <div className={classes.info}>Please fill in the information below:</div>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                <Stack spacing={2} direction="column" sx={{ marginBottom: 2 }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="First Name"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
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
                    sx={{ mb: 2 }}
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
                    sx={{ mb: 2 }}
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
                <Stack spacing={1} direction="row" sx={{ marginBottom: 4 }}>
                  <Button variant="outlined" color="secondary" type="submit" fullWidth>CREATE MY ACCOUNT</Button>
                </Stack>

            </form>
            <small>Already have an account? <Link to="/login"><span className={classes.login_here}>Login Here</span></Link></small>
        </React.Fragment>
  )
}

export default RegisterForm
