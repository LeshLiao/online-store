import React from 'react'
import classes from './inputContainer.module.css'
import PropTypes from 'prop-types'

export default function InputContainer ({ label, bgColor, children }) {
  return (
    <div className={classes.container} style={{ backgroundColor: bgColor }}>
      <label className={classes.label}>{label}</label>
      <div className={classes.content}>{children}</div>
    </div>
  )
}

// Add PropTypes validation
InputContainer.propTypes = {
  label: PropTypes.string,
  bgColor: PropTypes.string,
  children: PropTypes.node
}
