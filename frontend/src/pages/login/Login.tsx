import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store'
import { userLogin } from '../../features/auth/AuthActions/loginUser'
import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'

type LoginFormInputs = {
  email: string
  password: string
  phone: string
}

const LoginScreen: React.FC = () => {
  const { loading, error, userInfo, success } = useSelector((state: RootState) => state.auth)
  const dispatch: AppDispatch = useDispatch()
  const { register, handleSubmit } = useForm<LoginFormInputs>()
  const navigate = useNavigate()

  const submitForm: SubmitHandler<LoginFormInputs> = (data) => {
    dispatch(userLogin(data))
  }


useEffect(() => {
if(success) navigate("/pizzaList")

}, [userInfo])

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <p className="error-text">{error}</p>}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="form-input"
          {...register('email')}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="form-input"
          {...register('password')}
          required
        />
      </div>
      <button type="submit" className="button" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  )
}

export default LoginScreen
