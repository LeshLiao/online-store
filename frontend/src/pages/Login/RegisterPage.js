import React from 'react'
import RegisterForm from './RegisterForm'
import classes from './register_page.module.css'

export default function RegisterPage () {
  return (
   <>
      <div className={classes.top_container}></div>
      <div className={classes.container}>
        <div className={classes.form_container}>
          <RegisterForm/>
        </div>
      </div>
   </>
  )
}
