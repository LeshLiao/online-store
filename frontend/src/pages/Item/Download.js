import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import classes from './download.module.css'

export default function Download () {
  const { id } = useParams()

  useEffect(() => {
    console.log('id=' + id)
    window.scrollTo(0, 0)
  }, [])

  return (
  <>
    <div className={classes.top_container}></div>
    <div className={classes.container}>
      <div className={classes.successful_text}>Thanks For Downloading</div>

      <div className={classes.cute_container}>
        <img className={classes.add_cart} src="/images/icon/happy_ya.png"/>
      </div>
      {/* <div className={classes.hint_msg}>If you have not downloaded it</div> */}
      <div className={classes.download_container}>
          {/* <a href={item.downloadList[0].link} download="" className={classes.download_link}> */}
          {/* <a href='' download="" className={classes.download_link}> */}
            {/* <div className={classes.download_again}>Download It Again</div> */}
          {/* </a> */}
          {/* <a href={item.downloadList[0].link} download="" className={classes.download_link}> */}
          {/* <a href='' download="" className={classes.download_link}> */}
            {/* <img className={classes.download_icon} src="/images/icon/cloud_download.png" alt="Download" /> */}
          {/* </a> */}
      </div>
      <div className={classes.go_back}>
        <Link to='/'>
          Back to PaletteX
        </Link>
      </div>

    </div>
  </>
  )
}
