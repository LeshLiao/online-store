import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
// import { TroubleshootRounded } from '@mui/icons-material'

const CartContext = createContext(null)
const CART_KEY = 'cart'
const EMPTY_CART = {
  items: [],
  totalPrice: 0,
  totalCount: 0
}

export default function CartProvider ({ children }) {
  const initCart = getCartFromLocalStorage()
  const [cartItems, setCartItems] = useState(initCart.items)
  const [totalPrice, setTotalPrice] = useState(initCart.totalPrice)
  const [totalCount, setTotalCount] = useState(initCart.totalCount)

  useEffect(() => {
    const totalPrice = sum(cartItems.map(item => item.subtotal))
    const totalCount = sum(cartItems.map(item => item.quantity))
    setTotalPrice(totalPrice)
    setTotalCount(totalCount)

    localStorage.setItem(
      CART_KEY,
      JSON.stringify({
        items: cartItems,
        totalPrice,
        totalCount
      })
    )
  }, [cartItems])

  const sum = items => {
    return items.reduce((prevValue, curValue) => prevValue + curValue, 0)
  }

  function getCartFromLocalStorage () {
    const storedCart = localStorage.getItem(CART_KEY)
    return storedCart ? JSON.parse(storedCart) : EMPTY_CART
  }

  const removeFromCart = itemId => {
    const filteredCartItems = cartItems.filter(item => item.myItem.id !== itemId)
    setCartItems(filteredCartItems)
  }

  const checkItemIsExist = myItem => {
    const cartItem = cartItems.find(item => item.myItem.id === myItem.id)
    if (cartItem) return true
    else return false
  }

  const addToCart = myItem => {
    const cartItem = cartItems.find(item => item.myItem.id === myItem.id)
    if (cartItem) {
      changeQuantity(cartItem, cartItem.quantity + 1)
    } else {
      setCartItems([...cartItems, { myItem, quantity: 1, subtotal: myItem.price }])
    }
  }

  const changeQuantity = (cartItem, newQauntity) => {
    const { myItem } = cartItem

    const changedCartItem = {
      ...cartItem,
      quantity: newQauntity,
      subtotal: myItem.price * newQauntity
    }

    setCartItems(
      cartItems.map(item => (item.myItem.id === myItem.id ? changedCartItem : item))
    )
  }

  const emptyCart = () => {
    setCartItems([])
    window.localStorage.clear()
    console.log('clear localStorage')
    toast.info('The cart has been cleaned!')
  }

  return (

  <CartContext.Provider
    value={
      {
        cart: {
          items: cartItems, totalPrice, totalCount
        },
        removeFromCart,
        changeQuantity,
        addToCart,
        emptyCart,
        checkItemIsExist
      }
    }
  >
    {children}
  </CartContext.Provider>
  )
}

// Add PropTypes validation for children
CartProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const useCart = () => useContext(CartContext)
