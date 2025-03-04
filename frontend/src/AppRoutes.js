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
import EmailVerify from './pages/Login/EmailVerify'
import NewIn from './pages/NewIn/NewIn'
import Account from './pages/Login/Account'
import Landscape from './pages/Catalog/Landscape/Landscape'
import City from './pages/Catalog/City/City'
import Apps from './pages/Apps/Apps'
import Download from './pages/Item/Download'
import UploadImage from './pages/Admin/UploadImage'
import Help from './pages/HelpCenter/Help'
import Painting from './pages/Catalog/Painting/Painting'
import Review from './pages/Catalog/Review/Review'
import PrivacyPolicy from './pages/HelpCenter/PrivacyPolicy'

export default function AppRoutes () {
  return (
    <PaymentProvider>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/item/:index" element={<ItemPage/>}/>
        <Route path="/cart/:id" element={<ItemCartPage/>}/>
        <Route path="/download/:id" element={<Download/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/payment" element={<PaymentPage/>}/>
        <Route path='/success' element={<PaymentSuccessful/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path="/users/:id/verify/:token" element={<EmailVerify/>} />
        <Route path="/new" element={<NewIn/>} />
        <Route path="/city" element={<City/>} />
        <Route path="/landscape" element={<Landscape/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/upload" element={<UploadImage/>} />
        <Route path="/help" element={<Help/>} />
        <Route path="/painting" element={<Painting/>} />
        <Route path="/review" element={<Review/>} />
        <Route path="/policy" element={<PrivacyPolicy/>} />
        <Route path="/apps" element={<Apps/>} />
      </Routes>
    </PaymentProvider>
  )
}
