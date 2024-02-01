import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import React, { useState } from 'react'

export default function MyPaypalButton(obj) {

// This value is from the props in the UI
const style = {"layout":"vertical"};
const [successMessage, setSuccessMessage] = useState('');

function createOrder() {
  // replace this url with your server
  return fetch("http://localhost:4000/api/orders", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product ids and quantities
      body: JSON.stringify({
          cart: [
              {
                currency: "USD",
                total: obj.total_amount,
              }
                ,
              {
                  sku: "1blwyeo8",
                  quantity: 2,
              },
          ],
      }),
  })
      .then((response) => response.json())
      .then((order) => {
          // Your code here after create the order
          return order.id;
      });
}
function onApprove(data) {
  // replace this url with your server
  return fetch(`http://localhost:4000/api/orders/${data.orderID}/capture`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          orderID: data.orderID,
      }),
  })
      .then((response) => response.json())
      .then((orderData) => {
          console.log(orderData);
          setSuccessMessage('Payment Successful!');
      });
}

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner }) => {
  const [{ isPending }] = usePayPalScriptReducer();

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
  );
}

return (
    <>
        <div style={{ maxWidth: "300px", minHeight: "200px" }}>
            <PayPalScriptProvider options={{ clientId: "AQMg4knitBn2NwW8ZpxYw7hrKy437qHv_rsWVy6sP7b2_yQErnOmX2jlSKZCrx3S5Byjf0IMPBvghH9U", components: "buttons", currency: "USD" }}>
                <ButtonWrapper showSpinner={false} />
            </PayPalScriptProvider>
        </div>
        <div id="success_message">{successMessage}</div>
    </>
);
}
