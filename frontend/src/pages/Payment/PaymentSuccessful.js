// import React, { useEffect } from 'react'
import React, { useEffect, useState } from 'react'
// import { usePayment } from '../../context/PaymentContext';
import classes from './PaymentSuccessful.module.css'
import successIcon from '../../img/success-icon.png'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import TransactionInfo from './TransactionInfo'

export default function PaymentSuccessful () {
  const { cart, emptyCart } = useCart()
  const [tempCart, setTempCart] = useState(cart)
  const location = useLocation()
  const paymentData = location.state?.paymentData || null

  useEffect(() => {
    const copiedCart = JSON.parse(JSON.stringify(cart))
    setTempCart(copiedCart)
    emptyCart()
  }, [])

  return (
    <>
      <div className={classes.top_container}></div>
      <div className={classes.container}>
        <div className={classes.background}>
          <div className={classes.successful_title}>Payment Successful!</div>
          <img src={successIcon} alt='success-icon'/>
            {tempCart && <TransactionInfo cart={tempCart} paymentData={paymentData} />}
            <Link className={classes.done_button_link} to='/'>
              <div className={classes.done_button}>DONE</div>
            </Link>
        </div>
      </div>
    </>
  )
}
