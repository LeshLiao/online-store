import React, { useEffect, useState } from 'react'
import classes from './review.module.css'
import { getWaitingList } from '../../../services/itemService'
import ReviewThumbnails from '../../../components/Thumbnails/ReviewThumbnails'
// import PicSection from '../../../components/PicSection/PicSection'

export default function Review () {
  const [items, setItems] = useState([])

  useEffect(() => {
    getWaitingList('all')
      .then(items => {
        setItems(items)
      })
      .catch(error => console.error('Error fetching items:', error))
  }, [])

  return (
    <div>
      <div className={classes.top_container}></div>
      {/* <PicSection/> */}
      <div className={classes.hero}>
        <div className={classes.image_container}>
          {/* <img className={classes.image} src='/images/section/painting_iphone.png' alt="pic"/> */}
          <div className={classes.title}>Review System</div>
        </div>
      </div>
      <div className={classes.item_container}>
        <ReviewThumbnails items={items}/>
      </div>
    </div>
  )
}
