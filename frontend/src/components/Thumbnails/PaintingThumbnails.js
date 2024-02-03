import React from 'react'
import { Link } from 'react-router-dom'
import classes from './painting_thumbnails.module.css'
import StarRating from '../StarRating/StarRating'
import Price from '../Price/Price'
import Frame from '../Frame/Frame'

export default function PaintingThumbnails({items}) {
  return (
    <div className={classes.container}>
      <ul className={classes.list}>
        {
          items.map(item => (
            <li key={item.itemId}>
              <Frame item={item}/>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
