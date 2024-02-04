import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getItemById } from '../../services/itemService'
import DownloadIcon from '@mui/icons-material/CloudDownload'
import CropOriginalIcon from '@mui/icons-material/CropOriginal'
import './ItemPage.css'

export default function ItemPage () {
  const { id } = useParams()
  const [item, setItem] = useState({})

  useEffect(() => {
    // console.log('id='+id);
    getItemById(id).then(setItem)
  }, [id])

  return (
  <>
    <div className='top-container'></div>
    <div className='container'>

      <div className='left-block'>

      </div>
      <div className='right-block'>
        <div className='inner-block'>
          <h2 className='item-price'>CA${item.price}.00</h2>
          <div className='special-discount'>70% off sale for the next 21 hours</div>
          <div className='item-name'>{item.name}</div>
          <h4 className='stars'>STARS:{item.stars}</h4>
          <div className='options'>{item.sizeOptions}</div>
          <button className='add-button'>Add to cart</button>
          <h4>Item Detail</h4>
          <div className='digital-download'><DownloadIcon/>Digital Download</div>
          <div className='download-link'><CropOriginalIcon/>Digital file type(s): 5 PNG</div>
          <div className='description'>
          Cute Ghost Wall Art Print -INSTANT DOWNLOAD and PRINT this eco-friendly printable wall art to give your space a spooky refresh. Printable art not only saves you delivery time and shipping costs but also contributes to a greener planet. Reduce paper waste and environmental impact with our digital prints!<br/><br/>

          🌿 Eco-Friendly Halloween Decor: Embrace sustainability with our digital printable! By choosing digital downloads, you help decrease paper consumption and minimize unnecessary production, reducing the carbon footprint.<br/><br/>

          🎁 Perfect Gift Idea: Our Halloween-themed printable wall art makes the perfect eco-conscious gift for your loved ones. Share the spooky spirit while being mindful of the environment!<br/><br/>

          🖼️ DIY Wall Decor: Enjoy the convenience of instant download and the satisfaction of creating your own wall art. Print, frame, and proudly display your unique Halloween decor.<br/><br/>

          🌎 Sustainability Matters: We care about our planet, and that&apos;s why all our products are digital, enabling us to contribute positively to the environment.<br/><br/>

          </div>
        </div>
      </div>
    </div>
  </>
  )
}
