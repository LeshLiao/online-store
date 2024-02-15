import React from 'react'
import classes from './button.module.css'
import PropTypes from 'prop-types'

export default function Button ({
  type,
  text,
  onClick,
  color,
  backgroundColor,
  fontSize,
  width,
  height
}) {
  return (
    <div className={classes.container}>
      <button
        style={{
          color,
          backgroundColor,
          fontSize,
          width,
          height
        }}
        type={type}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  )
}

Button.defaultProps = {
  type: 'button',
  text: 'Submit',
  backgroundColor: '#00a4ff',
  color: 'white',
  fontSize: '1.3rem',
  width: '22rem',
  height: '2.5rem'
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  text: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  fontSize: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}
