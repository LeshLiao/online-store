import React, { Component } from 'react'
import bg from "../../img/hero.png"

export class Hero extends Component {


  render() {
    const style = {
      backgroundImage: `url(${bg})`,
      backgroundPosition: 'center',
      backgroundRepeat: "no-repeat",
      height: "830px",
    }

    return (
      <>
      <div style={style}></div>
      </>

    )
  }
}

export default Hero