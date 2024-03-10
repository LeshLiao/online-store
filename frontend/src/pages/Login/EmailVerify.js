import React, { useEffect, useState, Fragment, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import success from '../../img/success-icon.png'
import styles from './email_verify.module.css'
import { useAuth } from '../../hooks/useAuth'

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true)
  const param = useParams()
  const isMounted = useRef(false) // Ref to track component mount state
  const { clearUser } = useAuth()

  useEffect(() => {
    // Check if the component is mounted
    if (!isMounted.current) {
      // Set the mounted state to true after the first render
      clearUser()
      isMounted.current = true
      const verifyEmailUrl = async () => {
        try {
          const url = `https://online-store-service.onrender.com/api/users/${param.id}/verify/${param.token}`
          // const url = `http://localhost:4000/api/users/${param.id}/verify/${param.token}` // debug
          const res = await axios.get(url)
          console.log('AFTER verify email,res=')
          console.log(res)
          console.log(res.data.message)
          console.log(res.data.email)
          setValidUrl(true)
        } catch (error) {
          console.log('ERROR: verify email failed:')
          console.log(error)
          setValidUrl(false)
        }
      }
      verifyEmailUrl()
    }
  }, [param])

  return (
    <Fragment>
      <div className={styles.top_container}></div>
      <div className={styles.container}>
      {validUrl
        ? (
          <div className={styles.content}>
          <img src={success} alt="success_img" className={styles.success_img} />
          <h3>Email verified successfully!</h3>
          <Link to="/login">
            <button className={styles.green_btn}>Return to Login</button>
          </Link>
          </div>
          )
        : (<div className={styles.error_content}>
            <div className={styles.error_title}>Email verification link expired</div>
            <div className={styles.login_in_here}>
              Please log in to your account,<br/>
              and resend the verification email.<br/>
            </div>
            <div className={styles.login_button}>
              <Link to="/login">Log in here and verify again</Link>
            </div>
          </div>
          )}
      </div>
    </Fragment>
  )
}

export default EmailVerify
