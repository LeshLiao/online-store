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
          <div className={classes.title}>Experience the Power of Pattern</div>
          <div className={classes.content}>
            Transform your screen into a canvas of individuality and inspiration with wallpapers.
          </div>
          <div className={classes.line}>
            {/* <img src="/images/section/line.png" /> */}
          </div>
        </div>
      </>
    )
  }
}

export default FirstSection
