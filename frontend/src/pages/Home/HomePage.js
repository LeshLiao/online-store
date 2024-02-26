import React, { useEffect, useState } from 'react'
import classes from './homePage.module.css'
import { getAllItems } from '../../services/itemService'
import Hero from './Hero'
import PicSection from '../../components/PicSection/PicSection'
import PaintingThumbnails from '../../components/Thumbnails/PaintingThumbnails'
import FirstSection from '../../components/PicSection/FirstSection'

export default function HomePage () {
  const [items, setItems] = useState([])

  useEffect(() => {
    getAllItems().then(items => setItems(items))
  }, [])

  return (
    <div className={classes.container}>
      <Hero></Hero>
      <FirstSection/>
      <PicSection/>
      <PaintingThumbnails items={items}/>
    </div>
  )
}
