import React, { useState, useEffect } from 'react'
// import Price from '../../components/Price/Price'
import classes from './transaction_info.module.css'
import PropTypes from 'prop-types' // Import PropTypes
import * as userService from '../../services/userService'
import * as emailService from '../../services/emailService'
import * as itemService from '../../services/itemService'

export default function TransactionInfo ({ cart, paymentData }) {
  const [user] = useState(userService.getUser())
  const [isDataWritten, setIsDataWritten] = useState(false)

  const getEmailMessage = () => {
    let message = ''
    cart.items.forEach((item, index) => {
      message += `(${index + 1}) ${item.myItem.name}\nDownload link: ${item.myItem.downloadLink}\n`
    })
    return message
  }

  useEffect(() => {
    if (!isDataWritten) {
      console.log('firstName=' + user.firstName)
      console.log('email=' + user.email)
      console.log('getEmailMessage=')
      console.log(getEmailMessage())
      emailService.sendEmailToUser(user.firstName, user.email, getEmailMessage())
      const val = itemService.getTransactionData(
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
                  <li key={item.myItem.id}>
                    <div className={classes.left_block}>
                      {item.myItem && item.myItem.imageFolder && item.myItem.thumbnailUrl
                        ? (
                          <img
                            src={`/images/items/${item.myItem.imageFolder}/${item.myItem.thumbnailUrl}`}
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
                      <a href={item.myItem.downloadLink} download="" className={classes.button_download}>Download</a>
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
          imageFolder: PropTypes.string,
          thumbnailUrl: PropTypes.string,
          price: PropTypes.number.isRequired,
          downloadLink: PropTypes.string.isRequired
        }).isRequired
      })
    ).isRequired,
    totalPrice: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired
  }).isRequired,
  paymentData: PropTypes.object
}
