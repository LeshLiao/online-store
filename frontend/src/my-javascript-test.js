const axiosRequest = require('axios')
// const errorApi = 'https://httpstat.us/404'
const boredApi = 'https://www.boredapi.com/api/activity'

axiosRequest
  .get(boredApi)
  .then(response => {
    console.log(`You could ${response.data.activity}`)
  })
