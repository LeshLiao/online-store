import React from 'react'
import { Link } from 'react-router-dom'
import classes from './thumbnails.module.css'
import StarRating from '../StarRating/StarRating'
import Price from '../Price/Price'
import PropTypes from 'prop-types' // Import PropTypes

export default function Thumbnails ({ foods }) {
  return (
    /* <div>Thumbnails{foods.length}</div> */
    <ul className={classes.list}>
      {
        foods.map(food => (
          <li key={food.id}>
            <Link to={`/food/${food.id}`}>
              <img
                className={classes.image}
                // src={`/foods/${food.imageUrl}`}
                src={`${food.imageUrl}`}
                alt={food.name}
              />

            <div className={classes.content}>
              <div className={classes.name}>{food.name}</div>
              <span
                className={`${classes.favorite} ${food.favorite ? '' : classes.not}`}>
                ❤
                </span>
                <div className={classes.stars}>
                  <StarRating stars={food.stars}/>
                </div>
                <div className={classes.product_item_footer}>
                  <div className={classes.origins}>
                    {food.origins.map(origin => (
                      <span key={origin}>{origin}</span>
                    ))}
                  </div>
                  <div className={classes.cook_time}>
                    <span>clock</span>
                    {food.cookTime}
                  </div>
                </div>
                <div className={classes.price}>
                  <Price price={food.price} locale='en-US' currency='USD'/>
                </div>
            </div>
            </Link>
          </li>
        ))
      }
    </ul>
  )
}

// Add PropTypes validation
Thumbnails.propTypes = {
  foods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      favorite: PropTypes.bool.isRequired,
      stars: PropTypes.number.isRequired,
      origins: PropTypes.arrayOf(PropTypes.string).isRequired,
      cookTime: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  ).isRequired
}
