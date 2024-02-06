// Create a context
import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const PaymentContext = createContext()

export const PaymentProvider = ({ children }) => {
  const [paymentValue, setPaymentValue] = useState(null)

  const setPayment = (value) => {
    setPaymentValue(Math.round(value * 100) / 100)
  }

  return (
    <PaymentContext.Provider value={{ paymentValue, setPayment }}>
      {children}
    </PaymentContext.Provider>
  )
}

// Add PropTypes validation for children
PaymentProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const usePayment = () => {
  return useContext(PaymentContext)
}
