import React, { useState, useCallback } from 'react'
import './Carousel.css'
import LeftIcon from '@mui/icons-material/ArrowCircleLeft'
import RightIcon from '@mui/icons-material/ArrowCircleRight'
import PropTypes from 'prop-types'

const Item = ({ children }) => <div className='item-css'>{children}</div>

// Add PropTypes validation for 'children'
Item.propTypes = {
  children: PropTypes.node.isRequired
}

const CAROUSEL_ITEM = 'CAROUSEL_ITEM'
const Carousel = ({ cols = 1, gap = 10, children }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const itemList = React.Children.toArray(children).filter(
    child => child.type.displayName === CAROUSEL_ITEM
  )

  const itemSetList = itemList.reduce((result, item, i) => {
    if (i % cols === 0) {
      result.push([<Item key={i}>{item}</Item>])
    } else {
      result[result.length - 1].push(<Item key={i}>{item}</Item>)
    }

    return result
  }, [])

  const page = Math.ceil(itemList.length / cols)

  const handlePrev = useCallback(() => {
    if (currentPage <= 0) {
      setCurrentPage(page - 1)
    } else {
      setCurrentPage(p => p - 1)
    }
  }, [currentPage])

  const handleNext = useCallback(() => {
    if (currentPage === page - 1) {
      setCurrentPage(0)
    } else {
      setCurrentPage(p => p + 1)
    }
  }, [currentPage])

  return (
    <div className="Carousel">
      <div className='left-container'>
        {/* <div className='prev-button' hidden={currentPage <= 0} onClick={handlePrev}> */}
        <div className='prev-button' onClick={handlePrev}>
          <LeftIcon fontSize='large'/>
        </div>
      </div>
      <div className="Carousel__railWrapper">
        <div
          className="Carousel__rail"
          style={{
            gridTemplateColumns: `repeat(${page}, 100%)`,
            left: `calc(${-100 * currentPage}% - ${gap * currentPage}px)`,
            gridColumnGap: `${gap}px`
          }}
        >
          {itemSetList.map((set, i) => (
            <div
              key={i}
              className="Carousel__ItemSet"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridGap: `${gap}px`
              }}
            >
              {set}
            </div>
          ))}
        </div>
      </div>
      <div className='right-container'>
        {/* <div className='next-button' hidden={currentPage === page - 1} onClick={handleNext}> */}
        <div className='next-button' onClick={handleNext}>
          <RightIcon fontSize='large'/>
        </div>
      </div>
    </div>
  )
}

// Add PropTypes validation for the 'cols' and 'gap' props
Carousel.propTypes = {
  cols: PropTypes.number,
  gap: PropTypes.number,
  children: PropTypes.node.isRequired
}

Carousel.Item = ({ children }) => children
Carousel.Item.displayName = CAROUSEL_ITEM
export default Carousel
