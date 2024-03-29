import React, { useEffect, useState } from 'react'
import classes from './homePage.module.css'
import { getAllItems } from '../../services/itemService'
import Hero from './Hero'
// import PicSection from '../../components/PicSection/PicSection'
import PaintingThumbnails from '../../components/Thumbnails/PaintingThumbnails'
import FirstSection from '../../components/PicSection/FirstSection'

export default function HomePage () {
  const [items, setItems] = useState([])

  // useEffect(() => {
  //   getAllItems().then(items => setItems(items))
  // }, [])

  // useEffect(() => {
  //   getAllItems()
  //     .then(items => {
  //       // Sort items by createdAt in descending order
  //       items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  //       setItems(items)
  //     })
  //     .catch(error => console.error('Error fetching items:', error))
  // }, [])

  useEffect(() => {
    getAllItems()
      .then(items => {
        // Sort items by itemId in descending order
        items.sort((a, b) => b.itemId.localeCompare(a.itemId))
        setItems(items)
      })
      .catch(error => console.error('Error fetching items:', error))
  }, [])

  return (
    <div className={classes.container}>
      <Hero></Hero>
      <FirstSection/>
      {/* <PicSection/> */}
      <PaintingThumbnails items={items}/>
    </div>
  )
}
