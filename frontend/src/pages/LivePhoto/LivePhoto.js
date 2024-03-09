import React, { useEffect, useState } from 'react'
import classes from './live_photo.module.css'
import PaintingThumbnails from '../../components/Thumbnails/PaintingThumbnails'
import { getAllLive } from '../../services/itemService'

export default function LivePhoto () {
  const [items, setItems] = useState([])

  useEffect(() => {
    getAllLive().then(items => setItems(items))
    console.log(items)
  }, [])
  return (
    <div>
      <div className={classes.top_container}></div>
      <h1 className={classes.title}>LivePhoto</h1>
      <h1 className={classes.title}>LivePhoto</h1>
      <h1 className={classes.title}>LivePhoto</h1>
      <h1 className={classes.title}>LivePhoto</h1>
      <h1 className={classes.title}>LivePhoto</h1>
      <PaintingThumbnails items={items}/>
    </div>
  )
}
