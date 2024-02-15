import React, { useState } from 'react'
// import { TextField, Button, Container, Stack } from '@mui/material'
import { TextField, Button, Stack } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import countries from '../../components/Common/IsoCountryList'
import { register } from '../../services/userService'
import { toast } from 'react-toastify'

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  // const [dateOfBirth, setDateOfBirth] = useState('')
  const [dateOfBirth] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [country, setCountry] = useState('')
  const navigate = useNavigate()

  function handleSubmit (event) {
    event.preventDefault()

    const userData = {
      firstName,
      lastName,
      email,
      dateOfBirth,
      password,
      gender,
      country
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
            <h3>Create Your Account</h3>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                <Stack spacing={4} direction="column" sx={{ marginBottom: 4 }}>
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
                    sx={{ mb: 4 }}
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
                    sx={{ mb: 4 }}
                />
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
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
                </Stack>
                <Button variant="outlined" color="secondary" type="submit">Register</Button>
            </form>
            <small>Already have an account? <Link to="/login">Login Here</Link></small>

        </React.Fragment>
  )
}

export default RegisterForm
