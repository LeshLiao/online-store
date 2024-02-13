import React, { useState, useEffect } from 'react'
import Carousel from 'react-spring-3d-carousel'
// import { v4 as uuidv4 } from 'uuid'
import { config } from 'react-spring'
import PropTypes from 'prop-types' // Import prop-types package

export default function CarouselSwipe ({ cards, index }) {
  // export default function Frame ({ item, index }) {
  const [state, setState] = useState({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle
  })

  useEffect(() => {
    // console.log('useEffect first')
    // setState({ goToSlide: parseInt(index, 10) || 0 })
  }, [])

  // const slides = [
  //   {
  //     key: uuidv4(),
  //     content: <img src="https://picsum.photos/800/801/?random" alt="1" />
  //   },
  //   {
  //     key: uuidv4(),
  //     content: <img src="https://picsum.photos/800/802/?random" alt="2" />
  //   },
  //   {
  //     key: uuidv4(),
  //     content: <img src="https://picsum.photos/600/803/?random" alt="3" />
  //   },
  //   {
  //     key: uuidv4(),
  //     content: <img src="https://picsum.photos/800/500/?random" alt="4" />
  //   },
  //   {
  //     key: uuidv4(),
  //     content: <img src="https://picsum.photos/800/804/?random" alt="5" />
  //   },
  //   {
  //     key: uuidv4(),
  //     content: <img src="https://picsum.photos/500/800/?random" alt="6" />
  //   },
  //   {
  //     key: uuidv4(),
  //     content: <img src="https://picsum.photos/800/600/?random" alt="7" />
  //   },
  //   {
  //     key: uuidv4(),
  //     content: <img src="https://picsum.photos/805/800/?random" alt="8" />
  //   }
  // ].map((slide, index) => {
  //   return { ...slide, onClick: () => setState({ goToSlide: index }) }
  // })

  const onChangeInput = (e) => {
    setState({
      [e.target.name]: parseInt(e.target.value, 10) || 0
    })
  }

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
  }

  const handleTouchMove = (evt) => {
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
        /* left swipe */
        setState({ goToSlide: state.goToSlide + 1 })
      } else {
        /* right swipe */
        setState({ goToSlide: state.goToSlide - 1 })
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
  // const desiredIndex = 4

  return (
    <div
      style={{ width: '80%', height: '500px', margin: '0 auto' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {console.log('index=' + index)}
      <Carousel
        // slides={slides}
        slides={cards}
        // goToSlide={desiredIndex}
        offsetRadius={state.offsetRadius}
        showNavigation={state.showNavigation}
        animationConfig={state.config}
      />
      <div
        style={{
          margin: '0 auto',
          marginTop: '2rem',
          width: '50%',
          display: 'flex',
          justifyContent: 'space-around'
        }}
      >
        <div>
          <label>Go to slide: </label>
          <input name="goToSlide" onChange={onChangeInput} />
        </div>
        <div>
          <label>Offset Radius: </label>
          <input name="offsetRadius" onChange={onChangeInput} />
        </div>
        <div>
          <label>Show navigation: </label>
          <input
            type="checkbox"
            checked={state.showNavigation}
            name="showNavigation"
            onChange={(e) => {
              setState({ showNavigation: e.target.checked })
            }}
          />
        </div>
        <div>
          <button
            onClick={() => {
              this.setState({ config: config.gentle })
            }}
            disabled={state.config === config.gentle}
          >
            Gentle Transition
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              this.setState({ config: config.slow })
            }}
            disabled={state.config === config.slow}
          >
            Slow Transition
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              this.setState({ config: config.wobbly })
            }}
            disabled={state.config === config.wobbly}
          >
            Wobbly Transition
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              this.setState({ config: config.stiff })
            }}
            disabled={state.config === config.stiff}
          >
            Stiff Transition
          </button>
        </div>
      </div>
    </div>
  )
}

CarouselSwipe.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number
}
