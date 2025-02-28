import React from 'react'
import classes from './review_thumbnails.module.css'
import ReviewFrame from '../Frame/ReviewFrame'
import PropTypes from 'prop-types'
// import StarRating from '../StarRating/StarRating'
// import Price from '../Price/Price'

export default function ReviewThumbnails ({ items }) {
  return (
    <div className={classes.container}>
      <ul className={classes.list}>
        {
          items.map((item, index) => (
            <li key={item._id}>
              <ReviewFrame item={item} index={index}/>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

// Add PropTypes validation
ReviewThumbnails.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      itemId: PropTypes.string
      // Add other required or optional properties based on your actual data structure
    })
  ).isRequired
}
