import React, { useEffect, useState, Fragment, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import success from '../../img/success-icon.png'
import styles from './email_verify.module.css'

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true)
  const param = useParams()
  const isMounted = useRef(false) // Ref to track component mount state

  useEffect(() => {
    // Check if the component is mounted
    if (!isMounted.current) {
      // Set the mounted state to true after the first render
      isMounted.current = true
      const verifyEmailUrl = async () => {
        try {
          const url = `https://online-store-service.onrender.com/api/users/${param.id}/verify/${param.token}`
          const { data } = await axios.get(url)
          console.log(data)
          setValidUrl(true)
        } catch (error) {
          console.log(error)
          setValidUrl(false)
        }
      }
      verifyEmailUrl()
    }
  }, [param]) // Only run the effect when `param` changes

  return (
    <Fragment>
      <div className={styles.top_container}></div>
      <div className={styles.container}>
      {validUrl
        ? (
          <div className={styles.content}>
          <img src={success} alt="success_img" className={styles.success_img} />
          <h3>Email verified successfully</h3>
          <Link to="/login">
            <button className={styles.green_btn}>Login</button>
          </Link>
          </div>
          )
        : (
        <h1>404 Not Found</h1>
          )}
      </div>
    </Fragment>
  )
}

export default EmailVerify
