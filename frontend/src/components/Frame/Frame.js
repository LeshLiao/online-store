import React from 'react'
import classes from './frame.module.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import Price from '../Price/Price'

export default function Frame ({ item, index }) {
  const imgUrl = `/images/items/${item.imageFolder}/${item.thumbnailUrl}`

  return (
    <Link to={`/item/${index}`}>
      <div className={classes.frame}>
        <img className={classes.image} src={`${imgUrl}`} alt="item-pic"/>

        {/* <div className={classes.container}>
          <img className={classes.image} src={`${imgUrl}`} alt="item-pic"/>
        </div>
        <div className={classes.text}>{`${item.name}`}</div>
        <div className={classes.price}>From <Price price={item.price} /></div> */}
      </div>
    </Link>
  )
}

// Add PropTypes validation for the 'item' prop
Frame.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageFolder: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired

    // Add other required or optional properties based on your actual data structure
  }).isRequired,
  index: PropTypes.number.isRequired
}
