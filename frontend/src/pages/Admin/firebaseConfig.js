import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'palettex-37930.firebaseapp.com',
  projectId: 'palettex-37930',
  storageBucket: 'palettex-37930.appspot.com',
  messagingSenderId: '73926915976',
  appId: '1:73926915976:web:3564cd779de6352433ec3d',
  measurementId: 'G-TY1F1F3G88'
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
