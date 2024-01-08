console.log('hihi')

const axiosRequest = require('axios');
let error_api = 'https://httpstat.us/404';
let boredapi_api = 'https://www.boredapi.com/api/activity';

axiosRequest
  .get(boredapi_api)
  .then(response => {
    console.log(`You could ${response.data.activity}`)
  })
  .catch(error => {
    console.log('error!')
  })