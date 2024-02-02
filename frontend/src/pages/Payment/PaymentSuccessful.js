import React from 'react';
// import { usePayment } from '../../context/PaymentContext';
import './PaymentSuccessful.css';
import successIcon from '../../img/success-icon.png'
import { Link } from 'react-router-dom';

export default function PaymentSuccessful() {
  // const { paymentValue } = usePayment();

  // useEffect(() => {
  //   console.log('paymentValue=' + paymentValue);
  // }, [paymentValue]);

  return (
    <>
      <div className='container'>
        <div className='background'>
          <div className='successful-title'>Payment Successful!</div>
          <img src={successIcon} alt='success-icon'/>
          <span>Transaction Number:</span>
          <Link to='/'>
            <div className='done-button'>Done</div>
          </Link>
        </div>
      </div>
    </>
  );
}
