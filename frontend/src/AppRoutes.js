import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import FoodPage from './pages/Food/FoodPage';
import CartPage from './pages/Cart/CartPage';
import LoginPage from './pages/Login/LoginPage';
import PaymentPage from './pages/Payment/PaymentPage';
import { PaymentProvider } from './context/PaymentContext';
import PaymentSuccessful from './pages/Payment/PaymentSuccessful';

export default function AppRoutes() {
  return (
    <PaymentProvider>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/search/:searchTerm" element={<HomePage/>}/>
        <Route path="/tag/:tag" element={<HomePage/>}/>
        <Route path="/food/:id" element={<FoodPage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/account" element={<LoginPage/>}/>
        <Route path="/payment" element={<PaymentPage/>}/>
        <Route path='/success' element={<PaymentSuccessful/>}/>
      </Routes>
    </PaymentProvider>
  );
}
