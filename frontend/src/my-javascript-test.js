// const axiosRequest = require('axios')
// const errorApi = 'https://httpstat.us/404'
// const boredApi = 'https://www.boredapi.com/api/activity'

// axiosRequest
//   .get(boredApi)
//   .then(response => {
//     console.log(`You could ${response.data.activity}`)
//   })

function generateTransactionID () {
  // Get current UTC time
  const now = new Date()
  const year = now.getUTCFullYear()
  const month = String(now.getUTCMonth() + 1).padStart(2, '0')
  const day = String(now.getUTCDate()).padStart(2, '0')
  const hours = String(now.getUTCHours()).padStart(2, '0')
  const minutes = String(now.getUTCMinutes()).padStart(2, '0')

  // Generate random 8-digit hexadecimal number
  const randomHex = Math.floor(Math.random() * 0xFFFFFFFF).toString(16).padStart(8, '0')

  // Construct transaction ID
  const transactionID = `${year}${month}${day}_${hours}${minutes}_${randomHex}`

  return transactionID
}

// Example usage
const transactionID = generateTransactionID()
console.log(transactionID)
