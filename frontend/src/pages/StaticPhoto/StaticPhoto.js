import React, { useEffect, useState } from 'react'
import classes from './static_photo.module.css'
import { getAllStatic } from '../../services/itemService'
import PaintingThumbnails from '../../components/Thumbnails/PaintingThumbnails'
import PicSection from '../../components/PicSection/PicSection'

export default function StaticPhoto () {
  const [items, setItems] = useState([])

  useEffect(() => {
    getAllStatic().then(items => setItems(items))
  }, [])
  return (
    <div>
      <div className={classes.top_container}></div>
      <PicSection/>
      <PaintingThumbnails items={items}/>
    </div>
  )
}
