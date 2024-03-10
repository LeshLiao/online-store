import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as itemService from '../../services/itemService'

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from '@paypal/react-paypal-js'

export default function HandlePaypalButton (obj) {
  let paypalClientId = 'AVy5AdpDkb3sg9FaXabV4YJCcJNHS0g8N-TmP_-GMi13TIHEpyI973XNe-GLBZX5zEYnm6-lA2pR4l1V'
  let baseUrl = 'https://online-store-service.onrender.com'

  const paypalSandboxMode = false
  const localhostMode = false

  const sandBoxClientId = 'AQMg4knitBn2NwW8ZpxYw7hrKy437qHv_rsWVy6sP7b2_yQErnOmX2jlSKZCrx3S5Byjf0IMPBvghH9U'
  if (paypalSandboxMode) {
    paypalClientId = sandBoxClientId
  }

  if (localhostMode) {
    baseUrl = 'http://localhost:4000'
  }

  const style = { layout: 'vertical' }
  //   const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

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
            currency: 'USD',
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
      .then((paymentData) => {
        console.log('=== payment Successful! ===')
        console.log(paymentData)
        const transactionId = itemService.generateTransactionID()
        navigate('/success', { state: { paymentData, transactionId } })
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
            <PayPalScriptProvider options={{ clientId: paypalClientId, components: 'buttons', currency: 'USD' }}>
                <ButtonWrapper showSpinner={false} />
            </PayPalScriptProvider>
        </>
  )
}
