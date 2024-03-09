import React, { useEffect, useState } from 'react'
import classes from './live_photo.module.css'
import PaintingThumbnails from '../../components/Thumbnails/PaintingThumbnails'
import { getAllLive } from '../../services/itemService'

export default function LivePhoto () {
  const [items, setItems] = useState([])

  useEffect(() => {
    getAllLive().then(items => setItems(items))
  }, [])
  return (
    <div>
      <div className={classes.top_container}></div>
      <div className={classes.container}>
        <h1 className={classes.title}>Live Photo</h1>
      </div>
      <PaintingThumbnails items={items}/>
    </div>
  )
}
