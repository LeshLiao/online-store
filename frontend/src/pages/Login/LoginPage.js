import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import classes from './loginPage.module.css'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { EMAIL } from '../../constants/patterns'
import { useCart } from '../../hooks/useCart'

export default function LoginPage () {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()
  const { user, login } = useAuth()
  const [params] = useSearchParams()
  const returnUrl = params.get('returnUrl')
  const { emptyCart } = useCart()

  useEffect(() => {
    if (!user) return

    returnUrl ? navigate(returnUrl) : navigate('/')
  }, [navigate, returnUrl, user])

  const submit = async ({ email, password }) => {
    await login(email, password)
  }

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        {/* <Title title="Login" /> */}
        <div className={classes.title}>Login</div>
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="email"
            label="Email"
            {...register('email', {
              required: true,
              pattern: EMAIL
            })}
            error={errors.email}
          />

          <Input
            type="password"
            label="Password"
            {...register('password', {
              required: true
            })}
            error={errors.password}
          />

          <Button type="submit" text="Login" />
          <div className={classes.register}>
            <div className={classes.create_account}>
              <span>{"Don't have an account?"}&nbsp;&nbsp;&nbsp;</span>
              <Link to={`/register${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
                <strong>Create one</strong>
              </Link>
            </div>
            <Link to='/' onClick={emptyCart}>
              Clear cart
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
