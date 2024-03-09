import Styles from './Card.module.css'
import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import PropTypes from 'prop-types' // Import prop-types package
import { useCart } from '../../hooks/useCart'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Card ({ itemImage, item }) {
  const [show, setShown] = useState(false)
  const [tempImage, setTempImage] = useState(itemImage)

  const props3 = useSpring({
    transform: show ? 'scale(1.03)' : 'scale(1)',
    boxShadow: show
      ? '0 20px 25px rgb(0 0 0 / 25%)'
      : '0 2px 10px rgb(0 0 0 / 8%)'
  })

  const { addToCart, checkItemIsExist } = useCart()
  const navigate = useNavigate()
  const handleAddToCart = () => {
    if (checkItemIsExist(item)) {
      toast.info('You have already put this item!')
    } else {
      addToCart(item)
      navigate('/cart')
    }
  }

  const clickImage = () => {
    setTempImage('/images/items/100001/test.gif')
    setTimeout(() => {
      setTempImage('/images/items/100001/test.jpg')
    }, 2500)
  }

  return (
    <animated.div
      className={Styles.card}
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >

      {item.freeDownload
        ? <a href={item.downloadList[0].link} download="" className={Styles.button_download}>Free Download</a>
        : <button className={Styles.button_add}onClick={handleAddToCart}>Add to Cart ${item.price}</button>}
        <img src={tempImage} onClick={clickImage} alt="photo" />
    </animated.div>
  )
}

// Define prop types for Card component
Card.propTypes = {
  itemImage: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired
}

export default Card
