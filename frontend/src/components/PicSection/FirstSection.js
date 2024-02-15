import React, { Component } from 'react'
import classes from './first_section.module.css'

export class FirstSection extends Component {
  render () {
    return (
      <>
        <div className={classes.container}>
          <div className={classes.image}>
            <img src="/images/section/ios17.png" />
          </div>
          <div className={classes.title}>Built for iOS 17</div>
          <div className={classes.content}>
            All new wallpaper app built for iOS 17, full of new features. Live Wallpapers, Depth Mode, Shuffle Mode, Wallpapers for every Focus mode.
          </div>
          <div className={classes.line}>
            <img src="/images/section/line.png" />
          </div>
        </div>
      </>
    )
  }
}

export default FirstSection
