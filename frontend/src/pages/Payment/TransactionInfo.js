import React, { useState, useEffect } from 'react'
import classes from './transaction_info.module.css'
import PropTypes from 'prop-types' // Import PropTypes
import { useAuth } from '../../hooks/useAuth'
import * as itemService from '../../services/itemService'
import * as emailService from '../../services/emailService'

export default function TransactionInfo ({ cart, paymentData, transactionId }) {
  const { user } = useAuth()
  const [isDataWritten, setIsDataWritten] = useState(false)

  const getEmailMessage = () => {
    let message = ''
    cart.items.forEach((item, index) => {
      message += `(${index + 1}) ${item.myItem.name}\nDownload link: ${item.myItem.downloadList[0].link}\n`
    })
    return message
  }

  useEffect(() => {
    if (user && !isDataWritten) {
      const hasEmailSent = sessionStorage.getItem('sentTransactionId')
      if (hasEmailSent !== transactionId) { // If email hasn't been sent
        console.log('Send email, transactionId=' + transactionId)
        emailService.sendEmailOrder(user.firstName, user.email, getEmailMessage(), transactionId)
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
  }, [user, isDataWritten])

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
                            src={item.myItem.thumbnail.includes('firebasestorage') ? item.myItem.thumbnail : `/images/items/${item.myItem.itemId}/${item.myItem.thumbnail}`}
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
                      {item.myItem.downloadList[0].link
                        ? <a href={item.myItem.downloadList[0].link} download="" className={classes.button_download}>Download</a>
                        : <a href="/" download="" className={classes.button_download}>ERROR LINK</a>
                      }
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
              dimensions: PropTypes.string,
              name: PropTypes.string,
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
