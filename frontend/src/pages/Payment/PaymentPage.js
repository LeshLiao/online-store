import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MyPaypalButton from '../../components/MyPaypalButton/MyPaypalButton'
import { usePayment } from '../../context/PaymentContext'
import classes from './payment_page.module.css'
import { toast } from 'react-toastify'

export default function PaymentPage () {
  const { paymentValue } = usePayment()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('paymentValue=' + paymentValue)
    if (!paymentValue) {
      toast.info('Payment Error, please try again!')
      console.log('paymentValue error,navigate to /cart!')
      navigate('/cart')
    }
  }, [paymentValue])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className={classes.top_container}></div>
      <div className={classes.container}>
        <div className={classes.background}>
          <div className={classes.payment_title}>Payment</div>
          <div className={classes.detail}>
            <h4>Order Summary</h4><br></br>
            <hr></hr>
            <div className={classes.total}>
              <h4>Total</h4>
              <div className={classes.number_container}>
                <span>${paymentValue}</span>
              </div>
            </div>
            <br></br>
          </div>
          <div className={classes.description}>
            <span><strong>Satisfaction Guaranteed</strong></span><br></br>
            <span>If you&apos;re not completely happy with your purchase, contact our PaletteX Guides, 24/7/365, and we&apos;ll make it right.</span>
          </div>
          <div className={classes.button_container}>
            <MyPaypalButton total_amount={paymentValue} />
          </div>
        </div>
      </div>

    </>
  )
}
