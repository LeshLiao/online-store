import React, { useState } from 'react'
import classes from './review_thumbnails.module.css'
import ReviewFrame from '../Frame/ReviewFrame'
import PropTypes from 'prop-types'
// import StarRating from '../StarRating/StarRating'
// import Price from '../Price/Price'

export default function ReviewThumbnails ({ items }) {
  // State for filter selection
  const [filterOption, setFilterOption] = useState('not_reviewed') // Default to 'not_reviewed'

  // Filter items based on selection
  const filteredItems = items.filter(item => {
    if (filterOption === 'all') return true
    if (filterOption === 'reviewed') return item.review === true
    if (filterOption === 'not_reviewed') return item.review === false
    return true
  })

  // Handle dropdown change
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value)
  }

  return (
    <div className={classes.container}>
      <div className={classes.filter_container}>
        <label htmlFor="reviewFilter" className={classes.filter_label}>Filter by: </label>
        <select
          id="reviewFilter"
          className={classes.filter_dropdown}
          value={filterOption}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="reviewed">Reviewed</option>
          <option value="not_reviewed">Not Reviewed</option>
        </select>
      </div>
      <ul className={classes.list}>
        {
          filteredItems.map((item, index) => (
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
      _id: PropTypes.string.isRequired,
      itemId: PropTypes.string,
      review: PropTypes.bool
      // Add other required or optional properties based on your actual data structure
    })
  ).isRequired
}
