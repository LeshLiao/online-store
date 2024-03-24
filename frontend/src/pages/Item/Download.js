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
    document.getElementById('download_button').click()
  }

  // for firebase
  function download (url, filename) {
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'blob'
    xhr.onload = function () {
      const a = document.createElement('a')
      a.href = window.URL.createObjectURL(xhr.response)
      a.download = filename // Name the file anything you'd like.
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
    }
    xhr.open('GET', url)
    xhr.send()
  }

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      window.scrollTo(0, 0)
      setTimeout(() => {
        if (downloadLink && downloadLink.includes('firebasestorage')) {
          download(downloadLink, downloadName)
        } else {
          runDownload()
        }
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
        <AdsComponent dataAdSlot='1369223650' />
      </div>
      <div className={classes.empty_box}>

      </div>
      <div className={classes.hint_msg}>If you have not downloaded it</div>
      { downloadLink && (
      <div className={classes.download_container}>
          <a href={downloadLink} download="" className={classes.download_link}>
            <div className={classes.download_again}>Download It Again</div>
          </a>
          <a href={downloadLink} download="" className={classes.download_link} id='download_button'>
            <img className={classes.download_icon} src="/images/icon/cloud_download.png" alt={`download_img_${id}`} />
          </a>
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
