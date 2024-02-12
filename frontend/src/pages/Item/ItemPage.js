import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getItemById, getAllItems } from '../../services/itemService'
import DownloadIcon from '@mui/icons-material/CloudDownload'
import CropOriginalIcon from '@mui/icons-material/CropOriginal'
import classes from './item_page.module.css'
import { useCart } from '../../hooks/useCart'
import Price from '../../components/Price/Price'
import { v4 as uuidv4 } from 'uuid'
import Carousel3D from '../../components/Carousel/Carousel3D'
import Card from '../../components/Carousel/Card'
// import DemoCarousel from '../../components/Carousel/DemoCarousel'

export default function ItemPage () {
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const { id } = useParams()
  const [item, setItem] = useState({})
  const [items, setItems] = useState([])
  const [phones, setPhones] = useState([])

  const handleAddToCart = () => {
    addToCart(item)
    navigate('/cart')
  }

  useEffect(() => {
    console.log('useEffect()')
    getItemById(id).then(setItem)
    getAllItems().then(items => setItems(items))
  }, [id])

  useEffect(() => {
    const updatedPhones = items.map(item => ({
      key: uuidv4(),
      content: <Card imagen={`/images/items/${item.imageFolder}/${item.thumbnailUrl}`} />
      // content: <img src={`/images/items/${item.imageFolder}/${item.thumbnailUrl}`} alt="images" />
    }))
    // console.log(updatedPhones)
    setPhones(updatedPhones)
  }, [items])

  // useEffect(() => {
  // window.scrollTo(0, 0)
  // }, [])

  return (
  <>
    <div className={classes.top_container}></div>
    {console.log('render()')}
    <div className={classes.container}>

      <div className={classes.left_block}>
        {/* <DemoCarousel/> */}
        {/* <img className={classes.image} src={`${imgUrl}`} alt="item-pic"/> */}
        <Carousel3D
        cards={phones}
        height="700px"
        width="50%"
        margin="0 auto"
        offset={2}
        showArrows={false}
        />
      </div>
      <div className={classes.right_block}>
        <div className={classes.inner_block}>
          <h2 className={classes.item_price}><Price price={item.price}/></h2>
          <div className={classes.special_discount}>70% off sale for the next 21 hours</div>
          <div className={classes.item_name}>{item.name}</div>
          <h4 className={classes.stars}>STARS:{item.stars}</h4>
          <div className={classes.options}>{item.sizeOptions}</div>
          <button className={classes.add_button} onClick={handleAddToCart}>Add to Cart</button>
          <h4>Item Detail</h4>
          <div className={classes.digital_download}><DownloadIcon/>Digital Download</div>
          <div className={classes.download_link}><CropOriginalIcon/>Digital file type(s): 5 PNG</div>

        </div>
      </div>
    </div>
  </>
  )
}
