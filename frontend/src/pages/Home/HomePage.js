import React, { useEffect, useState } from 'react'
import classes from './homePage.module.css'
import { getAllStatic } from '../../services/itemService'
import Hero from './Hero'
// import PicSection from '../../components/PicSection/PicSection'
import PaintingThumbnails from '../../components/Thumbnails/PaintingThumbnails'
import FirstSection from '../../components/PicSection/FirstSection'
import SetPhoto from '../HelpCenter/SetPhoto'
import AdsComponent from '../../components/GoogleAdSense/AdsComponent'
import Article from '../HelpCenter/Article'

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
    getAllStatic()
      .then(items => {
        // Sort items by itemId in descending order
        items.sort((a, b) => b.itemId.localeCompare(a.itemId))
        // Get only the first 12 items
        const firstNineItems = items.slice(0, 12)
        setItems(firstNineItems)
      })
      .catch(error => console.error('Error fetching items:', error))
  }, [])

  return (
    <div className={classes.container}>
      <Hero></Hero>
      <FirstSection/>
      {/* <PicSection/> */}
      <PaintingThumbnails items={items}/>
      <div className={classes.googleAdSense}>
        <AdsComponent dataAdSlot='6052839586' format='in-article'/>
      </div>
      <SetPhoto/>
      <div className={classes.googleAdSense}>
        <AdsComponent dataAdSlot='3677193343' format='in-article'/>
      </div>
      <Article/>
    </div>
  )
}
