import React from 'react'
import './Title.css'
import PropTypes from 'prop-types'

export default function Title ({ title, fontSize, margin }) {
  return (
    <h1 className="title" >{title}</h1>
  )
}
// Add PropTypes validation
Title.propTypes = {
  title: PropTypes.string.isRequired,
  fontSize: PropTypes.number, // or PropTypes.number, depending on your use case
  margin: PropTypes.string // or PropTypes.number, depending on your use case
}
