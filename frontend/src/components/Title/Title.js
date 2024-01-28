import React from 'react'
import './Title.css';

export default function Title({title, fontSize, margin}) {
  return (
    <h1 className="title" >{title}</h1>
  )
}
