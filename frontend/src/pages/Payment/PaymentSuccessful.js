import React, { useEffect } from 'react'
// import { usePayment } from '../../context/PaymentContext';
import classes from './PaymentSuccessful.module.css'
import successIcon from '../../img/success-icon.png'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

export default function PaymentSuccessful () {
  // const { paymentValue } = usePayment();
  const { emptyCart } = useCart()

  useEffect(() => {
    emptyCart()
  }, [])

  return (
    <>
      <div className={classes.top_container}></div>
      <div className={classes.container}>
        <div className={classes.background}>
          <div className={classes.successful_title}>Payment Successful!</div>
          <img src={successIcon} alt='success-icon'/>
          <span className={classes.info}>Transaction Number:</span>
          <Link className={classes.done_button_link} to='/'>
            <div className={classes.done_button}>DONE</div>
          </Link>
        </div>
      </div>
    </>
  )
}
