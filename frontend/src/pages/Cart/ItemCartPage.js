import React from 'react'
import classes from './item_cart_page.module.css'
import { useCart } from '../../hooks/useCart'
import Title from '../../components/Title/Title'
import { Link } from 'react-router-dom'
import Price from '../../components/Price/Price'
import NotFound from '../../components/NotFound/NotFound'
import { usePayment } from '../../context/PaymentContext'

export default function ItemCartPage () {
  const { cart, removeFromCart, changeQuantity } = useCart()
  const { setPayment } = usePayment()

  return (
  <>
    <Title title="ITEM Cart Page" margin="5rem 0 0 2.5rem" />

    {cart.items.length === 0
      ? (<NotFound message="Cart Page Is Empty!" />)
      : (
        <div className={classes.container}>
          <ul className={classes.list}>
            {cart.items.map(item => (
              <li key={item.myItem.id}>
                <div>
                  <img src={`/images/painting/${item.myItem.imageFolder}/${item.myItem.thumbnailUrl}`} alt={item.myItem.name} />

                  {/* <img src={'/images/painting/001/001.jpg'} alt={item.myItem.name} /> */}
                </div>
                <div>
                  <Link to={`/item/${item.myItem._id}`}>
                    <span className={classes.item_name}>{item.myItem.name}</span>
                  </Link>
                </div>

                <div>
                  <select
                    value={item.quantity}
                    onChange={e => changeQuantity(item, Number(e.target.value))}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                </div>

                <div>
                  <Price price={item.price} />
                </div>

                <div>
                  <button
                    className={classes.remove_button}
                    onClick={() => removeFromCart(item.myItem.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={classes.checkout}>
            <div>
              <div className={classes.items_count}>{cart.totalCount}</div>
              <div className={classes.total_price}>
                <Price price={cart.totalPrice} />
              </div>
            </div>
            <Link to="/payment" onClick={() => setPayment(cart.totalPrice)}>
              Checkout
            </Link>
          </div>
        </div>
        )
    }
  </>
  )
}
