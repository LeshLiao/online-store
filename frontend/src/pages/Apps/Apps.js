// Apps.jsx
import React from 'react'
import classes from './apps.module.css'

export default function Apps () {
  return (
    <div className={classes.page_container}>
      <div className={classes.top_container}></div>

      <div className={classes.hero}>
        <div className={classes.content_container}>
          <div className={classes.app_info}>
            <img
              className={classes.app_icon}
              src='/images/icon/PaletteX_512x512.jpg'
              alt="PaletteWall App Icon"
            />
            <h1 className={classes.title}>PaletteWall</h1>
            <p className={classes.subtitle}>Free HD Wallpapers for Your Device</p>

            <div className={classes.features_container}>
              <div className={classes.feature}>
                <span className={classes.feature_icon}>✓</span>
                <span>1000+ HD Wallpapers</span>
              </div>
              <div className={classes.feature}>
                <span className={classes.feature_icon}>✓</span>
                <span>Daily New Designs</span>
              </div>
              <div className={classes.feature}>
                <span className={classes.feature_icon}>✓</span>
                <span>Easy to Use</span>
              </div>
            </div>

            <a
              href="https://play.google.com/store/apps/details?id=com.palettex.palettewall"
              className={classes.google_play_button}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src='/images/icon/google_play.png'
                alt="Get it on Google Play"
                className={classes.google_play_image}
              />
            </a>
          </div>

          <div className={classes.device_preview}>
            <img
              className={classes.phone_mockup}
              src='/images/section/landscape_iphone.png'
              alt="App Preview"
            />
          </div>
        </div>
      </div>

      <div className={classes.screenshots_section}>
        <h2>Beautiful Wallpapers for Every Style</h2>
        <div className={classes.screenshots_container}>
          {/* Add 3-4 screenshot previews here */}
          <div className={classes.screenshot}>
            <img src='/images/icon/001.jpg' alt="Screenshot 1" />
          </div>
          <div className={classes.screenshot}>
            <img src='/images/icon/002.jpg' alt="Screenshot 2" />
          </div>
          <div className={classes.screenshot}>
            <img src='/images/icon/003.jpg' alt="Screenshot 3" />
          </div>
        </div>
      </div>

      <footer className={classes.footer}>
        <p>© 2025 PaletteWall. All rights reserved.</p>
      </footer>
    </div>
  )
}
