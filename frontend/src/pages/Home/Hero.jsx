import React, { Component } from 'react'
import classes from './hero.module.css'
// import videoBg from '../../img/video/vllo.mp4'

export class Hero extends Component {
  render () {
    return (
      <div className={classes.main}>
        {/* <video src={videoBg} autoPlay loop muted playsInline/> */}
        {/* <div className={classes.content}>
          <div className={classes.one_text}>Discover Endless</div><br/>
          <div className={classes.two_text}>Possibilities with</div><br/>
          <div className={classes.three_text}>Wallpaper</div>
        </div> */}
        {/* <div className={classes.hero_img}></div> */}
        <img className={classes.smart_phone} src="/images/section/WALLPAPER.jpg"/>
        {/* <img className={classes.smart_phone} src="/images/section/smartphone.jpg"/> */}
        <div className={classes.title_1}>Personalize Your Smartphone</div>
        <div className={classes.title_2}>With Wallpapers</div>
      </div>
    )
  }
}

export default Hero
