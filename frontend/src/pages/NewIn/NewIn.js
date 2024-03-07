import React from 'react'
import classes from './newin.module.css'

export default function NewIn () {
  function toggleFullscreen2 () {
    const elem = document.getElementById('container')

    if (!document.fullscreenElement) {
      elem.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div>

      <h1 className={classes.title}>NewIn</h1>
      <h1 className={classes.title}>NewIn</h1>
      <h1 className={classes.title}>NewIn</h1>
      <h1 className={classes.title}>NewIn</h1>
      <h1 className={classes.title}>NewIn</h1>
      <div className={classes.container} id='container'>
        <button className={classes.btn} onClick={toggleFullscreen2} >toggle2</button>
      </div>
      <div id="docEl">Hello</div>
    </div>
  )
}
