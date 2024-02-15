import React from 'react'
import classes from './tags.module.css'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function Tags ({ tags, forFoodPage }) {
  return (
    <div
      className={classes.container}
      style={{
        justifyContent: forFoodPage ? 'start' : 'center'
      }}
    >
      {/* {tags.map(tag => (
        <Link key={tag.name} to={`/tag/${tag.name}`}>
          {tag.name}&nbsp;
          {!forFoodPage && `(${tag.count})`}
        </Link>
      ))} */}

    </div>
  )
}

// Add PropTypes validation
Tags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number
      // Add other required or optional properties based on your actual data structure
    })
  ).isRequired,
  forFoodPage: PropTypes.bool
}
