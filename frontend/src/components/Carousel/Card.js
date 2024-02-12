import Styles from './Card.module.css'
import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import PropTypes from 'prop-types' // Import prop-types package
// import Button from './Button'

function Card ({ imagen }) {
  const [show, setShown] = useState(false)

  const props3 = useSpring({
    transform: show ? 'scale(1.03)' : 'scale(1)',
    boxShadow: show
      ? '0 20px 25px rgb(0 0 0 / 25%)'
      : '0 2px 10px rgb(0 0 0 / 8%)'
  })
  return (
    <animated.div
      className={Styles.card}
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <img src={imagen} alt="photo" />
      {/* <h2>Title</h2> */}

    </animated.div>
  )
}

// Define prop types for Card component
Card.propTypes = {
  imagen: PropTypes.string.isRequired
}

export default Card
