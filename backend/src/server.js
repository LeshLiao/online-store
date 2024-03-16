import dotenv from'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'
import foodRouter from './routers/food.router.js'
import userRouter from './routers/user.router.js'
import itemRouter from './routers/item.router.js'
import fetch from "node-fetch";

// Paypal
const { BUSINESS_PAYPAL_CLIENT_ID, BUSINESS_PAYPAL_CLIENT_SECRET,
        SANDBOX_PAYPAL_CLIENT_ID, SANDBOX_PAYPAL_CLIENT_SECRET,
        PORT = 8888 } = process.env;

let base = "https://api-m.paypal.com";
let PAYPAL_CLIENT_ID = BUSINESS_PAYPAL_CLIENT_ID;
let PAYPAL_CLIENT_SECRET = BUSINESS_PAYPAL_CLIENT_SECRET;

const paypalSandboxMode = false;
if (paypalSandboxMode) {
  base = "https://api-m.sandbox.paypal.com";
  PAYPAL_CLIENT_ID = SANDBOX_PAYPAL_CLIENT_ID;
  PAYPAL_CLIENT_SECRET = SANDBOX_PAYPAL_CLIENT_SECRET;
}

import { dbconnect } from './config/database.config.js';
dbconnect();

const app = express();
app.use(express.json());


// NOTE: DO NOT add slash / end of URL.
// EX:   https://aa.bb.cc/  is not allowed.
// EX:   https://aa.bb.cc   is correct!
app.use(
  cors({
    credentials:true,
    origin: [
    "http://localhost:3000",
    "https://www.palettex.ca",
    "https://food-store-frontend.onrender.com",
    "https://react-frontend-cloud-run-service-jeeuicbmuq-uc.a.run.app",
    "https://online-store-hxxg.onrender.com",
    "https://online-store-frontend-cloud-run-service-jeeuicbmuq-uc.a.run.app",
    "https://online-store-nu-dusky.vercel.app"],
  })
);

// app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/items', itemRouter);

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createOrder = async (order_detail) => {
  // use the cart information passed from the front-end to calculate the purchase unit details
  console.log(
    "shopping cart information passed from the frontend createOrder() callback:",
    order_detail,
  );

  console.log('order_detail.currency=' + order_detail[0].currency);
  console.log('order_detail.total=' + order_detail[0].total);

  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: order_detail[0].currency,
          value: order_detail[0].total,
        },
      },
    ],
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
  });

  return handleResponse(response);
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

app.post("/api/orders", async (req, res) => {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const { cart } = req.body;
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

app.post("/api/orders/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

app.listen(process.env.PORT, () => {
  console.log('listening on PORT:' + process.env.PORT);
})