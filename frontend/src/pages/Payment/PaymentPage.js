import React, { useEffect } from 'react';
import Title from '../../components/Title/Title';
import MyPaypalButton from "../../components/MyPaypalButton/MyPaypalButton"
import { usePayment } from '../../context/PaymentContext';

export default function PaymentPage() {
  const { paymentValue } = usePayment();

  useEffect(() => {
    console.log('paymentValue=' + paymentValue);
  }, [paymentValue]);

  return (
    <>
      <Title title="Payment" margin="5rem 0 0 2.5rem" />
      <MyPaypalButton total_amount={paymentValue} />
    </>
  );
}
