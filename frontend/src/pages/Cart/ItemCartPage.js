import React, { useEffect } from 'react'
import classes from './item_cart_page.module.css'
import { useCart } from '../../hooks/useCart'
import { useNavigate } from 'react-router-dom'
import Price from '../../components/Price/Price'
import NotFound from '../../components/NotFound/NotFound'
import { usePayment } from '../../context/PaymentContext'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'react-toastify'

export default function ItemCartPage () {
  const { cart, removeFromCart } = useCart()
  const { setPayment } = usePayment()
  const { user } = useAuth()
  const navigate = useNavigate()

  const checkIsLogin = () => {
    setPayment(cart.totalPrice)
    if (user) {
      navigate('/payment')
    } else {
      toast.info('Please login to continue')
      navigate('/login?returnUrl=/payment')
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
  <>
    <div className={classes.top_container}></div>

    {cart.items.length === 0
      ? (<NotFound message="YOUR CART IS EMPTY" />)
      : (
        <div className={classes.container}>

          <ul className={classes.list}>
            <div className={classes.title}>My Cart</div>
            {/* {console.log(cart.items)} */}
            {cart.items.map(item => (
              <li key={item.myItem.itemId}>
                <div className={classes.left_block}>
                  {item && item.myItem && item.myItem.thumbnail
                    ? (
                    <img src={item.myItem.thumbnail.includes('https') ? item.myItem.thumbnail : `/images/items/${item.myItem.itemId}/${item.myItem.thumbnail}`} alt={item.myItem.name} />
                      )
                    : (
                    <span>Image Not Found</span>
                      )}
                </div>
                <div className={classes.right_block}>
                  <div className={classes.name_price_block}>
                    <div className={classes.item_name}>{item.myItem.name}</div>
                    <div className={classes.item_price}>
                      <Price price={item.myItem.price} />
                    </div>
                  </div>
                  <div className={classes.catalog_remove_block}>
                    <div className={classes.tags}>
                      {item.myItem.tags.map(tag => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <button
                      className={classes.remove_button}
                      onClick={() => removeFromCart(item.myItem.itemId)}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className={classes.checkout_container}>
            <div className={classes.checkout_box}>
              <div className={classes.upper_container}>
                <div className={classes.items_count_box}>
                  <span>Subtotal</span>
                  {/* <div className={classes.items_count}>{cart.totalCount}</div> */}
                  <Price price={cart.totalPrice} />
                </div>
                <div className={classes.total_price_box}>
                  <div className={classes.total_price_label}>Total</div>
                  <div className={classes.price_container}>
                    <div className={classes.currency}>USD</div><Price price={cart.totalPrice} />
                  </div>
                </div>
              </div>
              <button onClick={() => checkIsLogin()}>CHECKOUT</button>
            </div>
          </div>
        </div>
        )
    }
  </>
  )
}
