import React, { useEffect } from 'react'
// import Title from '../../components/Title/Title'
import MyPaypalButton from '../../components/MyPaypalButton/MyPaypalButton'
import { usePayment } from '../../context/PaymentContext'
import './PaymentPage.css'

export default function PaymentPage () {
  const { paymentValue } = usePayment()

  useEffect(() => {
    console.log('paymentValue=' + paymentValue)
  }, [paymentValue])

  return (
    <>
      <div className='container'>
        <div className='background'>
          <div className='payment-title'>Payment</div>
          <div className='detail'>
            <h4>Order Summary</h4><br></br>
            <hr></hr>
            <div className='subtotal'>
              <h4>Subtotal (CAD)</h4>
              <span>C${paymentValue}</span>
            </div>
            <br></br>
          </div>
          <div className='description'>
            <span><strong>Satisfaction Guaranteed</strong></span><br></br>
            <span>If you&apos;re not completely happy with your purchase, contact our PaletteX Guides, 24/7/365, and we&apos;ll make it right.</span>
          </div>
          <div className='button-container'>
            <MyPaypalButton total_amount={paymentValue} />
          </div>
        </div>
      </div>

    </>
  )
}
