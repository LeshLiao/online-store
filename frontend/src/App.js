import AppRoutes from './AppRoutes'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import React from 'react'
import { Analytics } from '@vercel/analytics/react'

function App () {
  return (
    <>
      <Header/>
      <AppRoutes/>
      <Footer/>
      <Analytics />
    </>
  )
}

export default App
