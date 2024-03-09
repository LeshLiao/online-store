import React, { useState, useEffect } from 'react'
// import Price from '../../components/Price/Price'
import classes from './transaction_info.module.css'
import PropTypes from 'prop-types' // Import PropTypes
import * as userService from '../../services/userService'
import * as emailService from '../../services/emailService'
import * as itemService from '../../services/itemService'

export default function TransactionInfo ({ cart, paymentData, transactionId }) {
  const [user] = useState(userService.getUser())
  const [isDataWritten, setIsDataWritten] = useState(false)

  const getEmailMessage = () => {
    let message = ''
    message += 'Transaction ID:' + transactionId + '\n\n'
    cart.items.forEach((item, index) => {
      message += `(${index + 1}) ${item.myItem.name}\nDownload link: ${item.myItem.downloadList[0].link}\n`
    })
    return message
  }

  useEffect(() => {
    if (!isDataWritten) {
      const hasEmailSent = sessionStorage.getItem('sentTransactionId')
      if (hasEmailSent !== transactionId) { // If email hasn't been sent
        console.log('Send email, transactionId=' + transactionId)
        emailService.sendEmailToUser(user.firstName, user.email, getEmailMessage())
        sessionStorage.setItem('sentTransactionId', transactionId) // Store that email has been sent

        const val = itemService.getTransactionData(
          transactionId,
          user.email,
          user.firstName,
          user.lastName,
          cart,
          'paypal',
          paymentData,
          0,
          cart.totalPrice,
          cart.totalCount
        )

        itemService.transaction(val).then((response) => {
          console.log(response.data)
        }, (error) => {
          console.log(error)
        })
      } else {
        console.log('This transactionId has been sent!')
      }
      setIsDataWritten(true)
    }
  }, [isDataWritten])

  return (
    <>
      <div className={classes.transaction_container}>
        <div className={classes.user_email}>We have also sent the digital link to your email:<br/>
        <strong>{user.email}</strong></div>
        {cart.items.length === 0
          ? <div>No info</div>
          : (
              <ul className={classes.list}>
                {cart.items.map(item => (
                  <li key={item.myItem.itemId}>
                    <div className={classes.left_block}>
                      {item.myItem && item.myItem.thumbnail
                        ? (
                          <img
                            src={`/images/items/${item.myItem.itemId}/${item.myItem.thumbnail}`}
                            alt={item.myItem.name}
                          />
                          )
                        : (
                          <span>Image Not Found</span>
                          )}
                    </div>
                    <div className={classes.right_block}>
                      <div className={classes.name_price_block}>
                        <div className={classes.item_name}>{item.myItem.name}</div>
                        {/* <Price price={item.myItem.price} /> */}
                      </div>
                      <a href={item.myItem.downloadList[0].link} download="" className={classes.button_download}>Download</a>
                    </div>
                  </li>
                ))}
              </ul>
            )
        }
      </div>
    </>
  )
}

TransactionInfo.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        myItem: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          thumbnail: PropTypes.string,
          price: PropTypes.number.isRequired,
          downloadList: PropTypes.arrayOf(
            PropTypes.shape({
              size: PropTypes.string.isRequired,
              ext: PropTypes.string.isRequired,
              link: PropTypes.string.isRequired
            })
          ).isRequired
        }).isRequired
      })
    ).isRequired,
    totalPrice: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired
  }).isRequired,
  paymentData: PropTypes.object,
  transactionId: PropTypes.string
}
