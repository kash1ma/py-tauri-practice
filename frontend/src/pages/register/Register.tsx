import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../features/auth/authActions'
import { RootState, AppDispatch } from '../../app/store'

interface RegisterFormData {
  firstName: string
  email: string
  password: string
  confirmPassword: string
}

const RegisterScreen = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state: RootState) => state.auth
  )

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<RegisterFormData>()

  useEffect(() => {
    if (success) navigate('/login')
    if (userInfo) navigate('/pizzaList')
  }, [navigate, userInfo, success])

  const submitForm: SubmitHandler<RegisterFormData> = (data) => {
    if (data.password !== data.confirmPassword) {
      alert('Password mismatch')
      return
    }

    // email.toLowerCase(),
    // phone: phone,
    // username: username,
    // role: "user",
    // password: password,

    const payload = {
      email: data.email.toLowerCase(),
      phone: '+0000000000', // заглушка
      username: data.firstName,
      password: data.password,
    }

    dispatch(registerUser(payload))
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className='form-group'>
        <label htmlFor='firstName'>First Name</label>
        <input
          type='text'
          id='firstName'
          className='form-input'
          {...register('firstName')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          className='form-input'
          {...register('email')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          className='form-input'
          {...register('password')}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          type='password'
          id='confirmPassword'
          className='form-input'
          {...register('confirmPassword')}
          required
        />
      </div>
      {error && <p className='error-message'>{error}</p>}
      <button type='submit' className='button' disabled={loading}>
        {loading ? 'Loading...' : 'Register'}
      </button>
    </form>
  )
}

export default RegisterScreen
