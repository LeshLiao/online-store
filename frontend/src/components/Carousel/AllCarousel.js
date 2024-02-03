import React, { useState, useEffect } from 'react'
import Carousel from './Carousel'
import './AllCarousel.css'
import Frame from '../Frame/Frame'
import PropTypes from 'prop-types'

export default function AllCarousel ({ items }) {
  const [matches, setMatches] = useState(
    window.matchMedia('(min-width: 768px)').matches
  )

  const fitCol = () => {
    if (matches) {
      return 4
    } else {
      return 1
    }
  }

  useEffect(() => {
    window
      .matchMedia('(min-width: 960px)')
      .addEventListener('change', e => setMatches(e.matches))
  }, [])

  return (
      <div className='carousel-container'>
        <div className="my-carousel">
          <Carousel cols={fitCol()} gap={10}>
          {
            items.map(item => (
              <Carousel.Item key={item.itemId}>
                <Frame item={item}/>
                </Carousel.Item>
            ))
          }
          </Carousel>
        </div>
      </div>
  )
}

// Add PropTypes validation for the 'items' prop
AllCarousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      itemId: PropTypes.string.isRequired
      // Add other required or optional properties based on your actual data structure
    })
  ).isRequired
}
