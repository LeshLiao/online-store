import React from 'react'
import './Frame.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function Frame ({ item }) {
  const imgUrl = `/images/painting/${item.imageFolder}/${item.thumbnailUrl}`

  return (
    <Link to={`/item/${item.itemId}`}>
      <div className='frame'>
        <div className='container'>
          <img className="image" src={`${imgUrl}`} alt="item-pic"/>
        </div>
        <span className='text'>{`${item.name}`}</span>
        <span className='price'>{`From $${item.price}`}</span>
      </div>
    </Link>
  )
}

// Add PropTypes validation for the 'item' prop
Frame.propTypes = {
  item: PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    imageFolder: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
    // Add other required or optional properties based on your actual data structure
  }).isRequired
}
