import React, { Component } from 'react'
import './Hero.css'
import videoBg from '../../img/video/vllo.mp4'

export class Hero extends Component {
  render () {
    return (
      <div className="main">
        <video src={videoBg} autoPlay loop muted/>
        <div className="content">
          <br/><br/>
          <div className='its_time_to_text'>IT&apos;S TIME TO</div><br/>
          <div className='change_your_text'>CHANGE</div><br/>
          <div className="wallpaper_text">WALLPAPER</div>

        </div>
        {/* <div className='hero'></div> */}
      </div>
    )
  }
}

export default Hero
