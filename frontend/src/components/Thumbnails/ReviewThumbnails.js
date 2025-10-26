import React, { useState } from 'react'
import classes from './review_thumbnails.module.css'
import ReviewFrame from '../Frame/ReviewFrame'
import PropTypes from 'prop-types'

export default function ReviewThumbnails ({ items }) {
  // State for filter selection
  const [filterOption, setFilterOption] = useState('not_reviewed')
  const [timeFilter, setTimeFilter] = useState('1') // Default to 1 hour

  // Helper function to check if item was updated within the specified time range
  const isWithinTimeRange = (updatedAt, hours) => {
    if (!updatedAt) return false
    const now = new Date()
    const itemDate = new Date(updatedAt)
    const diffInMs = now - itemDate
    const diffInHours = diffInMs / (1000 * 60 * 60)
    return diffInHours <= hours
  }

  // Filter items based on selection
  const filteredItems = items.filter(item => {
    // First apply review/status filter
    let passesReviewFilter = true
    if (filterOption === 'reviewed') passesReviewFilter = item.review === true
    else if (filterOption === 'not_reviewed') passesReviewFilter = item.review === false
    else if (filterOption === 'not_finished') passesReviewFilter = item.status !== 'Completed'

    // Then apply time filter
    let passesTimeFilter = true
    if (timeFilter !== 'all') {
      const hours = parseInt(timeFilter)
      passesTimeFilter = isWithinTimeRange(item.updatedAt, hours)
    }

    return passesReviewFilter && passesTimeFilter
  })

  // Handle dropdown change
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value)
  }

  // Handle time filter change
  const handleTimeFilterChange = (e) => {
    setTimeFilter(e.target.value)
  }

  return (
    <div className={classes.container}>
      <div className={classes.filter_container}>
        <div className={classes.filter_row}>
          <span className={classes.empty_space}>
          </span>
        </div>

        <div className={classes.filter_row}>
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
            <option value="not_finished">Not Finished</option>
          </select>
        </div>

        <div className={classes.filter_row}>
          <label htmlFor="timeFilter" className={classes.filter_label}>
            Updated within:
          </label>
          <select
            id="timeFilter"
            className={classes.filter_dropdown}
            value={timeFilter}
            onChange={handleTimeFilterChange}
          >
            <option value="all">All Time</option>
            <option value="1">Last 1 Hour</option>
            <option value="6">Last 6 Hours</option>
            <option value="24">Last 24 Hours</option>
            <option value="168">Last 7 Days</option>
          </select>
        </div>

        <div className={classes.filter_row}>
          <span className={classes.result_count}>
            Results: {filteredItems.length}
          </span>
        </div>
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
      {filteredItems.length === 0 && (
        <div className={classes.no_results}>No items match the selected filters</div>
      )}
    </div>
  )
}

// Add PropTypes validation
ReviewThumbnails.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      itemId: PropTypes.string,
      review: PropTypes.bool,
      updatedAt: PropTypes.string
    })
  ).isRequired
}
