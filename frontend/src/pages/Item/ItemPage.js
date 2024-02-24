import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllItems } from '../../services/itemService'
import classes from './item_page.module.css'
import { v4 as uuidv4 } from 'uuid'
import Carousel3D from '../../components/Carousel/Carousel3D'
import Card from '../../components/Carousel/Card'

export default function ItemPage () {
  const { index } = useParams()
  const [items, setItems] = useState([])
  const [phones, setPhones] = useState([])

  useEffect(() => {
    console.log('useEffect(),index=' + index)
    getAllItems().then(items => {
      const firstArr = []
      const secondArr = []
      for (let i = 0; i < index; i++) {
        firstArr.push(items[i])
      }
      for (let i = index; i < items.length; i++) {
        secondArr.push(items[i])
      }
      const arr3 = [...secondArr, ...firstArr]
      setItems(arr3)
    })
  }, [index])

  useEffect(() => {
    const updatedPhones = items.map(item => ({
      key: uuidv4(),
      content: <Card itemImage={`/images/items/${item.imageFolder}/${item.thumbnailUrl}`}
                     item={item}/>
    }))
    setPhones(updatedPhones)
  }, [items])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
  <>
    <div className={classes.top_container}></div>
    {console.log('render()')}
    <div className={classes.container}>
      <div className={classes.left_block}>
      </div>
      <div className={classes.right_block}>
        <div className={classes.inner_block}>
          {/* <h2 className={classes.item_price}><Price price={item.price}/></h2> */}
          {/* <div className={classes.special_discount}>70% off sale for the next 21 hours</div> */}
          {/* <div className={classes.item_name}>{item.name}</div> */}
          {/* <h4 className={classes.stars}>STARS:{item.stars}</h4> */}
          {/* <div className={classes.options}>{item.sizeOptions}</div> */}
          {/* <button className={classes.add_button} onClick={handleAddToCart}>Add to Cart</button> */}
          {/* <h4>Item Detail</h4> */}
          {/* <div className={classes.digital_download}><DownloadIcon/>Digital Download</div> */}
          {/* <div className={classes.download_link}><CropOriginalIcon/>Digital file type(s): 5 PNG</div> */}
        </div>
      </div>
      <div className={classes.middle_block}>
        <Carousel3D
          cards={phones}
          offset={3}
          showArrows={false}
          index={Number(index)}
          />
      </div>
    </div>
  </>
  )
}
