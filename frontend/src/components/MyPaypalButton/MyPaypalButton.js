import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from '@paypal/react-paypal-js'

export default function MyPaypalButton (obj) {
  const style = { layout: 'vertical' }
  //   const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()
  // const baseUrl = 'https://online-store-backend-cloud-run-service-jeeuicbmuq-uc.a.run.app' // Google Cloud Run
  const baseUrl = 'https://online-store-service.onrender.com'
  function createOrder () {
    // replace this url with your server
    return fetch(`${baseUrl}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // use the "body" param to optionally pass additional order information
      // like product ids and quantities
      body: JSON.stringify({
        cart: [
          {
            currency: 'CAD',
            total: obj.total_amount
          },
          {
            sku: '1blwyeo8',
            quantity: 2
          }
        ]
      })
    })
      .then((response) => response.json())
      .then((order) => {
        // Your code here after create the order
        return order.id
      })
  }
  function onApprove (data) {
    // replace this url with your server
    return fetch(`${baseUrl}/api/orders/${data.orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderID: data.orderID
      })
    })
      .then((response) => response.json())
      .then((orderData) => {
        console.log('Successful!')
        console.log(orderData)
        navigate('/success')
        // setSuccessMessage('Payment Successful!');
      })
  }

  // Custom component to wrap the PayPalButtons and show loading spinner
  const ButtonWrapper = ({ showSpinner }) => {
    const [{ isPending }] = usePayPalScriptReducer()

    return (
        <>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style]}
                fundingSource={undefined}
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </>
    )
  }

  // Add PropTypes validation for the 'showSpinner' prop
  ButtonWrapper.propTypes = {
    showSpinner: PropTypes.bool.isRequired
  }

  return (
        <>
            <PayPalScriptProvider options={{ clientId: 'AVy5AdpDkb3sg9FaXabV4YJCcJNHS0g8N-TmP_-GMi13TIHEpyI973XNe-GLBZX5zEYnm6-lA2pR4l1V', components: 'buttons', currency: 'CAD' }}>
                <ButtonWrapper showSpinner={false} />
            </PayPalScriptProvider>
        </>
  )
}
