import React from 'react'
import { Link } from 'react-router-dom'
import classes from './footer.module.css'

export default function Footer () {
  return (
    <>
      <div className={classes.upper_gap}></div>
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.name}>PaletteX © 2024</div>
          <div className={classes.policy}>
            <Link to="/policy" style={{ textDecoration: 'none', color: 'inherit' }}>
              PRIVACY POLICY
            </Link>
          </div>
          <div className={classes.suppliers}>SUPPLIERS</div>
        </div>
      </div>
    </>
  )
}
