import React, { Component } from 'react'
import './Frame.css'
import { Link } from 'react-router-dom'

export default function Frame({id, imageUrl, title, price}) {
  // id = "659c931a67dc217ce98cbc3a";
  // imageUrl="/images/painting/1.PNG";
  // title = "This is a pizza";
  // price = 10;

  return (
    // <Link to={`/food/${id}`}>
      <div className='frame'>
        <div className='container'>
          <img className="image" src={`${imageUrl}`} alt="food-1"/>
        </div>
        <span className='text'>{`${title}`}</span>
        <span className='price'>{`From $${price}.00`}</span>
      </div>
    // </Link>
  )
}
