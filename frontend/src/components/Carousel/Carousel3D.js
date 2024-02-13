import React, { useState, useEffect } from 'react'
import Carousel from 'react-spring-3d-carousel'
import { config } from 'react-spring'
import PropTypes from 'prop-types' // Import prop-types package
// import Styles from './Carousel3D.module.css'

export default function Carousel3D (props) {
  const [offsetRadius, setOffsetRadius] = useState(2)
  const [showArrows, setShowArrows] = useState(false)
  const [goToSlide, setGoToSlide] = useState(null)
  const [cards, setCards] = useState([])

  useEffect(() => {
    // Update cards when props.cards changes
    const table = props.cards.map((element, index) => {
      return { ...element, onClick: () => setGoToSlide(index) }
    })
    setCards(table)

    setOffsetRadius(props.offset)
    setShowArrows(props.showArrows)
  }, [props.cards, props.offset, props.showArrows])

  return (
    <div style={{ width: props.width, height: props.height, margin: props.margin }}>
    {/* <div className={Styles.carousel_container}> */}
      {/* {console.log('3D_cards:')} */}
      {/* {console.log(cards)} */}
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.default}
      />
    </div>
  )
}

// Define prop types for Carousel component
Carousel3D.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  offset: PropTypes.number,
  showArrows: PropTypes.bool,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  margin: PropTypes.string,
  index: PropTypes.number
}

// Default prop values for Carousel component
Carousel3D.defaultProps = {
  offset: 2,
  showArrows: false,
  margin: '0'
}
