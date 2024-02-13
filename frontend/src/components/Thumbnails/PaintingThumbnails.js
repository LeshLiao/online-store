import React from 'react'
import classes from './painting_thumbnails.module.css'
import Frame from '../Frame/Frame'
import PropTypes from 'prop-types'
// import StarRating from '../StarRating/StarRating'
// import Price from '../Price/Price'

export default function PaintingThumbnails ({ items }) {
  return (
    <div className={classes.container}>
      <ul className={classes.list}>
        {
          items.map((item, index) => (
            <li key={item.itemId}>
              <Frame item={item} index={index}/>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

// Add PropTypes validation
PaintingThumbnails.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      itemId: PropTypes.string.isRequired
      // Add other required or optional properties based on your actual data structure
    })
  ).isRequired
}
