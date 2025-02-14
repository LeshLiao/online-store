import React, { useEffect, useRef } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import classes from './download.module.css'
import AdsComponent from '../../components/GoogleAdSense/AdsComponent'
export default function Download () {
  const { id } = useParams()
  const location = useLocation()
  const downloadLink = location.state?.downloadLink || null
  const downloadName = location.state?.downloadName || null
  const isFirstRun = useRef(true)

  function runDownload () {
    if (downloadLink.includes('drive.google')) { // Deprecated
      // Google drive
      const link = document.createElement('a')
      link.id = 'hidden_download_button'
      link.href = downloadLink
      link.click()
    } else {
      // Firebase storage
      const xhr = new XMLHttpRequest()
      xhr.responseType = 'blob'
      xhr.onload = function () {
        const a = document.createElement('a')
        a.href = window.URL.createObjectURL(xhr.response)
        a.download = downloadName // Name the file anything you'd like.
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
      }
      xhr.open('GET', downloadLink)
      xhr.send()
    }
  }

  useEffect(() => {
    if (isFirstRun.current && downloadLink && downloadName) {
      isFirstRun.current = false
      window.scrollTo(0, 0)
      setTimeout(() => {
        runDownload()
      }, 500)
    }
  }, [downloadLink, downloadName])

  return (
  <>
    <div className={classes.top_container}></div>
    <div className={classes.container}>
      <div className={classes.successful_text}>Thanks For Downloading</div>

      <div className={classes.cute_container}>
        <img className={classes.add_cart} src="/images/icon/happy_ya.png"/>
      </div>
      <div className={classes.googleAdSense}>
        <AdsComponent dataAdSlot='1162669398' format='auto'/>
      </div>
      <div className={classes.empty_box}>

      </div>
      <div className={classes.hint_msg}>If you have not downloaded it</div>
      { downloadLink && (
      <div className={classes.download_container} onClick={() => runDownload()}>
        <div className={classes.download_again}>Download It Again</div>
        <img className={classes.download_icon} src="/images/icon/cloud_download.png" alt={`download_img_${id}`} />
      </div>
      )}
      <div className={classes.go_back}>
        <Link to='/'>
          Back to PaletteX
        </Link>
      </div>

    </div>
  </>
  )
}
