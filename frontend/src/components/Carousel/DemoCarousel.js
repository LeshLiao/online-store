import React, { Component } from 'react'
// import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import './DemoCarousel.css'

export default class DemoCarousel extends Component {
  render () {
    return (
            <Carousel>
                <div>
                    <img src="/images/painting/001/001-1.png" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="/images/painting/001/001-2.png" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="/images/painting/001/001-3.png" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="/images/painting/001/001-4.png" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="/images/painting/001/001-5.png" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
    )
  }
};

// const root = createRoot(document.querySelector('.demo-carousel'))
// root.render(<DemoCarousel />)

// ReactDOM.render(<DemoCarousel />, document.querySelector('.demo-carousel'))

// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>
