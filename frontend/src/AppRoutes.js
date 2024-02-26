import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import PaymentPage from './pages/Payment/PaymentPage'
import { PaymentProvider } from './context/PaymentContext'
import PaymentSuccessful from './pages/Payment/PaymentSuccessful'
import ItemPage from './pages/Item/ItemPage'
import ItemCartPage from './pages/Cart/ItemCartPage'
import RegisterPage from './pages/Login/RegisterPage'

export default function AppRoutes () {
  return (
    <PaymentProvider>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/item/:index" element={<ItemPage/>}/>
        <Route path="/cart" element={<ItemCartPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/payment" element={<PaymentPage/>}/>
        <Route path='/success' element={<PaymentSuccessful/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
    </PaymentProvider>
  )
}
