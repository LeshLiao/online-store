import React, { Component } from 'react'
import classes from './under_construction.module.css'

export class UnderConstruction extends Component {
  render () {
    return (
      <>
        <div className={classes.container}>
          <div className={classes.image}>
            <img src="/images/icon/under_construction.png" />
          </div>
        </div>
      </>
    )
  }
}

export default UnderConstruction
