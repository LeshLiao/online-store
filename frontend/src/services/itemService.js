import axios from 'axios'
// import { sampleItems } from '../test/mock-data-03-ignore.js'

export const getAllItems = async () => {
  // For mobile debug
  // return sampleItems
  const { data } = await axios.get('/api/items')
  return data
}

export const getItemById = async itemId => {
  const { data } = await axios.get('/api/items/' + itemId)
  return data
}

export const searchItem = async searchTerm => {
  const { data } = await axios.get('/api/items/search/' + searchTerm)
  return data
}

export const getAllTagsItems = async () => {
  const { data } = await axios.get('/api/items/tags')
  return data
}

export const getAllByTag = async tag => {
  if (tag === 'All') return getAllItems()
  const { data } = await axios.get('/api/items/tag/' + tag)
  return data
}

export async function deleteById (itemId) {
  await axios.delete('/api/items/' + itemId)
};

export async function update (item) {
  await axios.put('/api/items', item)
};

export async function add (item) {
  const { data } = await axios.post('/api/items', item)
  return data
};

export async function transaction (data) {
  const response = await axios.post('/api/items/transaction', data)
  return response
}

export function getTransactionData (transactionId, email, firstName, lastName, detail, payment, paymentData, tax, totalPrice, totalCount) {
  const reserved = {}
  const data = {
    transactionId,
    email,
    firstName,
    lastName,
    detail,
    payment,
    paymentData,
    tax,
    totalPrice,
    totalCount,
    reserved
  }

  return data
}

export function generateTransactionID () {
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
// const transactionID = generateTransactionID()
// console.log(transactionID)
