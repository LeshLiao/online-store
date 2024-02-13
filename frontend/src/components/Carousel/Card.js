import Styles from './Card.module.css'
import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import PropTypes from 'prop-types' // Import prop-types package
import { useCart } from '../../hooks/useCart'
import { useNavigate } from 'react-router-dom'

function Card ({ itemImage, item }) {
  const [show, setShown] = useState(false)

  const props3 = useSpring({
    transform: show ? 'scale(1.03)' : 'scale(1)',
    boxShadow: show
      ? '0 20px 25px rgb(0 0 0 / 25%)'
      : '0 2px 10px rgb(0 0 0 / 8%)'
  })

  const { addToCart } = useCart()
  const navigate = useNavigate()
  const handleAddToCart = () => {
    addToCart(item)
    navigate('/cart')
  }

  return (
    <animated.div
      className={Styles.card}
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <img src={itemImage} alt="photo" />
      {item.freeDownload
        ? <button>Free Download</button>
        : <button onClick={handleAddToCart}>Add to Cart ${item.price}</button>}
    </animated.div>
  )
}

// Define prop types for Card component
Card.propTypes = {
  itemImage: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired
}

export default Card
