import React from 'react'

import classes from './footer.module.css'

export default function Footer () {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.name}>PaletteX © 2024</div>
        <div className={classes.policy}>PRIVACY POLICY</div>
        <div className={classes.suppliers}>SUPPLIERS</div>
      </div>
    </div>
  )
}
