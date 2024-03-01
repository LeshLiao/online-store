import emailjs from '@emailjs/browser'

export const sendEmailToUser = async (name, email, msg) => {
  const templateParams = {
    user_name: name,
    user_email: email,
    message: msg
  }

  emailjs.init({
    publicKey: process.env.REACT_APP_EMAILJS_SERVICE_ID,
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
      // Allow 1 request per 1s, prevent send twice at the same time.
      throttle: 1000
    }
  })

  // Return the promise chain from emailjs.send
  return emailjs.send('service_yzbjz9c', 'template_xwwh9t9', templateParams)
    .then(
      (response) => {
        console.log('sendEmailToUser SUCCESS!', response.status, response.text)
        return response
      },
      (error) => {
        console.log('sendEmailToUser FAILED:', error)
        throw error // Throw the error to be caught by the caller
      }
    )
}
