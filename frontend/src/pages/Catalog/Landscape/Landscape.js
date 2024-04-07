import React, { useEffect, useState } from 'react'
import classes from './landscape.module.css'
import { getItemsByTag } from '../../../services/itemService'
import PaintingThumbnails from '../../../components/Thumbnails/PaintingThumbnails'
// import PicSection from '../../components/PicSection/PicSection'

export default function Landscape () {
  const [items, setItems] = useState([])

  useEffect(() => {
    getItemsByTag('Landscape')
      .then(items => {
        const staticItems = items.filter(item => item.photoType === 'static')
        setItems(staticItems)
      })
      .catch(error => console.error('Error fetching items:', error))
  }, [])

  return (
    <div>
      <div className={classes.top_container}></div>
      <div className={classes.hero}>
        <div className={classes.image_container}>

          <img className={classes.image} src='/images/section/landscape_iphone.png' alt="pic"/>
          <div className={classes.title}>Landscape</div>
        </div>
      </div>
      <div className={classes.item_container}>
        <PaintingThumbnails items={items}/>
      </div>
    </div>
  )
}
