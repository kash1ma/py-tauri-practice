import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store'
import { userLogin } from '../../features/auth/AuthActions/loginUser'
import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa'
import './LoginScreen.css'

type LoginFormInputs = {
  email: string
  password: string
}

const LoginScreen: React.FC = () => {
  const { loading, error, userInfo, success } = useSelector((state: RootState) => state.auth)
  const dispatch: AppDispatch = useDispatch()
  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>()
  const navigate = useNavigate()

  const submitForm: SubmitHandler<LoginFormInputs> = (data) => {
    dispatch(userLogin(data))
  }

  useEffect(() => {
    if (success || userInfo) navigate("/pizzaList")
  }, [navigate, userInfo, success])

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(submitForm)} className="login-form">
        <div className="form-header">
          <h2>Вход в аккаунт</h2>
          <p>Введите ваши данные для входа</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="input-with-icon">
            <FaEnvelope className="input-icon" />
            <input
              id="email"
              type="email"
              className={`form-input ${errors.email ? 'invalid' : ''}`}
              placeholder="example@mail.com"
              {...register('email', {
                required: 'Email обязателен',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Введите корректный email'
                }
              })}
            />
          </div>
          {errors.email && <span className="error-text">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <div className="input-with-icon">
            <FaLock className="input-icon" />
            <input
              id="password"
              type="password"
              className={`form-input ${errors.password ? 'invalid' : ''}`}
              placeholder="••••••••"
              {...register('password', {
                required: 'Пароль обязателен',
                minLength: {
                  value: 6,
                  message: 'Пароль должен содержать минимум 6 символов'
                }
              })}
            />
          </div>
          {errors.password && <span className="error-text">{errors.password.message}</span>}
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? (
            <span className="button-loader"></span>
          ) : (
            <>
              <FaSignInAlt className="button-icon" />
              Войти
            </>
          )}
        </button>

        <div className="form-footer">
          Нет аккаунта? <span onClick={() => navigate('/register')}>Зарегистрироваться</span>
        </div>
      </form>
    </div>
  )
}

export default LoginScreen