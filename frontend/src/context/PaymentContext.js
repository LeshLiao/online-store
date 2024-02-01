// Create a context
import { createContext, useContext, useState } from 'react';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [paymentValue, setPaymentValue] = useState(null);

  const setPayment = (value) => {
    setPaymentValue(value);
  };

  return (
    <PaymentContext.Provider value={{ paymentValue, setPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  return useContext(PaymentContext);
};
