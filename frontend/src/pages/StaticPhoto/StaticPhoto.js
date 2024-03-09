import React, { useEffect, useState } from 'react'
import classes from './static_photo.module.css'
import { getAllStatic } from '../../services/itemService'
import PaintingThumbnails from '../../components/Thumbnails/PaintingThumbnails'

export default function StaticPhoto () {
  const [items, setItems] = useState([])

  useEffect(() => {
    getAllStatic().then(items => setItems(items))
    console.log(items)
  }, [])
  return (
    <div>
      <div className={classes.top_container}></div>
      <h1 className={classes.title}>StaticPhoto</h1>
      <h1 className={classes.title}>StaticPhoto</h1>
      <h1 className={classes.title}>StaticPhoto</h1>
      <h1 className={classes.title}>StaticPhoto</h1>
      <h1 className={classes.title}>StaticPhoto</h1>
      <PaintingThumbnails items={items}/>
    </div>
  )
}
