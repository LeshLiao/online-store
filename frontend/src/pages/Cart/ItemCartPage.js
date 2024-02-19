import React from 'react'
import classes from './item_cart_page.module.css'
import { useCart } from '../../hooks/useCart'
import { Link } from 'react-router-dom'
import Price from '../../components/Price/Price'
import NotFound from '../../components/NotFound/NotFound'
import { usePayment } from '../../context/PaymentContext'

export default function ItemCartPage () {
  const { cart, removeFromCart } = useCart()
  const { setPayment } = usePayment()

  return (
  <>
    <div className={classes.top_container}></div>

    {cart.items.length === 0
      ? (<NotFound message="Cart Page Is Empty!" />)
      : (
        <div className={classes.container}>

          <ul className={classes.list}>
            <div className={classes.title}>My Cart</div>
            {/* {console.log(cart.items)} */}
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
                    <Price price={item.myItem.price} />
                  </div>
                  <div className={classes.catalog_remove_block}>
                    <div className={classes.tags}>
                      {item.myItem.tags.map(tag => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <button
                      className={classes.remove_button}
                      onClick={() => removeFromCart(item.myItem.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className={classes.checkout_container}>
            <div className={classes.checkout_box}>
              <div className={classes.items_count}>{cart.totalCount} Item(s)</div>
              <div className={classes.total_price}>
                Total:<Price price={cart.totalPrice} />
              </div>
              <Link to="/payment" onClick={() => setPayment(cart.totalPrice)}>
                <button>Checkout</button>
              </Link>
            </div>
          </div>
        </div>
        )
    }
  </>
  )
}
