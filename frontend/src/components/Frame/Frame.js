import React, { useState } from 'react'
import classes from './frame.module.css'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Price from '../Price/Price'
import { useCart } from '../../hooks/useCart'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Frame ({ item, index }) {
  const imgUrl = `/images/items/${item.itemId}/${item.thumbnail}`
  const [tempImage, setTempImage] = useState(imgUrl)
  const [isClicking, setIsClicking] = useState(false)
  const { addToCart, checkItemIsExist } = useCart()

  const clickImage = () => {
    if (isClicking || !item.preview) return
    setIsClicking(true)
    setTempImage(`/images/items/${item.itemId}/${item.preview}`)
    setTimeout(() => {
      setTempImage(imgUrl)
      setIsClicking(false)
    }, 2900)
  }

  const navigate = useNavigate()
  const handleAddToCart = () => {
    if (checkItemIsExist(item)) {
      toast.info('You have already put this item!')
    } else {
      addToCart(item)
      navigate('/cart')
    }
  }

  return (
      <div className={classes.frame}>
        <div className={classes.main_container}>
          <div className={classes.left_container}>
            {/* <Link to={`/item/${index}`}> */}
              <img className={classes.image} onClick={clickImage} src={tempImage} alt="item-pic"/>
            {/* </Link> */}
          </div>
            {/* <div className={classes.text}>{`${item.name}`}</div> */}
            <div className={classes.right_container}>
              {item.freeDownload
                ? <div>
                    <div className={classes.free_text}>Free</div>
                    <a href={item.downloadList[0].link} download="" className={classes.download_link}>
                      <img className={classes.download_icon} src="/images/icon/cloud_download.png"/>
                    </a>
                  </div>

                : <div>
                    <div className={classes.price}><Price price={item.price} /></div>
                    <img className={classes.add_cart} onClick={handleAddToCart} src="/images/icon/add_cart_gray.png"/>
                  </div>
              }
              {item.photoType === 'live' ? <img className={classes.live_play_btn} onClick={clickImage} src="/images/icon/live_play_btn.png"/> : <div></div>}
            </div>
        </div>
      </div>
  )
}

// Add PropTypes validation for the 'item' prop
Frame.propTypes = {
  item: PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    preview: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    freeDownload: PropTypes.bool.isRequired,
    photoType: PropTypes.string.isRequired,
    downloadList: PropTypes.arrayOf(
      PropTypes.shape({
        size: PropTypes.string.isRequired,
        ext: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
      })
    ).isRequired
    // Add other required or optional properties based on your actual data structure
  }).isRequired,
  index: PropTypes.number.isRequired
}
