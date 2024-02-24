import React, { useState, useEffect } from 'react'
import Carousel from 'react-spring-3d-carousel'
import { config } from 'react-spring'
import PropTypes from 'prop-types' // Import prop-types package
import Styles from './Carousel3D.module.css'

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

  let xDown = null
  let yDown = null

  const getTouches = (evt) => {
    return (
      evt.touches || evt.originalEvent.touches // browser API
    ) // jQuery
  }

  const handleTouchStart = (evt) => {
    const firstTouch = getTouches(evt)[0]
    xDown = firstTouch.clientX
    yDown = firstTouch.clientY
    // console.log('handleTouchStart')
  }

  const handleTouchMove = (evt) => {
    // console.log('handleTouchMove')
    if (!xDown || !yDown) {
      return
    }

    const xUp = evt.touches[0].clientX
    const yUp = evt.touches[0].clientY

    const xDiff = xDown - xUp
    const yDiff = yDown - yUp

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /* most significant */
      if (xDiff > 0) {
        setGoToSlide(goToSlide + 1) /* left swipe */
      } else {
        setGoToSlide(goToSlide - 1) /* right swipe */
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
      } else {
        /* down swipe */
      }
    }
    /* reset values */
    xDown = null
    yDown = null
  }

  return (
    <div className={Styles.carousel_container}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}>

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
  width: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.string,
  index: PropTypes.number
}

// Default prop values for Carousel component
Carousel3D.defaultProps = {
  offset: 2,
  showArrows: false,
  margin: '0'
}
