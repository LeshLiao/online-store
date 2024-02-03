import './Frame.css'
import { Link } from 'react-router-dom'

export default function Frame({item}) {
  const imgUrl = `/images/painting/${item.imageFolder}/${item.thumbnailUrl}`;

  return (
    <Link to={`/item/${item.itemId}`}>
      <div className='frame'>
        <div className='container'>
          <img className="image" src={`${imgUrl}`} alt="item-pic"/>
        </div>
        <span className='text'>{`${item.name}`}</span>
        <span className='price'>{`From $${item.price}`}</span>
      </div>
    </Link>
  )
}