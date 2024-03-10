import emailjs from '@emailjs/browser'

export const sendEmailOrder = async (name, email, msg, transactionId) => {
  const templateParams = {
    user_name: name,
    user_email: email,
    message: msg,
    transaction_id: transactionId
  }

  emailjs.init({
    publicKey: process.env.REACT_APP_EMAILJS_API_PUBLIC_KEY,
    // Do not allow headless browsers
    blockHeadless: true,
    blockList: {
      // Block the suspended emails
      // list: ['foo@emailjs.com', 'bar@emailjs.com'],
      // The variable contains the email address
      // watchVariable: 'userEmail'
    },
    limitRate: {
      // Set the limit rate for the application
      id: 'app',
      // Allow 1 request per 7s, prevent send twice at the same time.
      throttle: 7000
    }
  })

  // Return the promise chain from emailjs.send
  return emailjs.send('service_yzbjz9c', 'template_xwwh9t9', templateParams)
    .then(
      (response) => {
        console.log('sendEmailOrder SUCCESS!', response.status, response.text)
        return response
      },
      (error) => {
        console.log('sendEmailOrder FAILED:', error)
        throw error // Throw the error to be caught by the caller
      }
    )
}

export const sendEmailVerify = async (name, email, msg) => {
  const templateParams = {
    user_name: name,
    user_email: email,
    message: msg
  }

  emailjs.init({
    publicKey: process.env.REACT_APP_EMAILJS_API_PUBLIC_KEY,
    blockHeadless: true,
    blockList: {
    },
    limitRate: {
      // Set the limit rate for the application
      id: 'app',
      // Allow 1 request per 7s, prevent send twice at the same time.
      throttle: 7000
    }
  })

  // Return the promise chain from emailjs.send
  return emailjs.send('service_yzbjz9c', 'template_lyjloxz', templateParams)
    .then(
      (response) => {
        console.log('sendEmailVerify SUCCESS!', response.status, response.text)
        return response
      },
      (error) => {
        console.log('sendEmailVerify FAILED:', error)
        throw error // Throw the error to be caught by the caller
      }
    )
}
