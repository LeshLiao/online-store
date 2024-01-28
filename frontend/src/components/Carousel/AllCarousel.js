import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Carousel from './Carousel'
import './AllCarousel.css'
import classes from '../../components/Thumbnails/thumbnails.module.css'
import { Link } from 'react-router-dom'
import StarRating from '../StarRating/StarRating'
import Price from '../Price/Price'
import Frame from '../Frame/Frame'

{/* <Frame id={id} imageUrl={}/> */}
// Frame({id, imageUrl, title, price}) {

export default function AllCarousel({items}) {
    return (
      <div className='carousel-container'>
      <div className="my-carousel">
      <Carousel cols={5} gap={10}>
      {
        items.map(item => (
          <Carousel.Item>
            <Frame id={item.id} imageUrl={item.imageUrl} title={item.name} price={item.price}/>
          </Carousel.Item>
        ))
      }
      </Carousel>
    </div>
    </div>
    )
  }