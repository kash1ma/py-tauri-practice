import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../features/auth/AuthActions/registerUser";
import { RootState, AppDispatch } from "../../app/store";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaPizzaSlice } from "react-icons/fa";
import "./RegisterScreen.css";

interface RegisterFormData {
  firstName: string;
  email: string;
  password: string;
  phone: string;
  confirmPassword: string;
}

const RegisterScreen = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { 
    register, 
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormData>();

  useEffect(() => {
    if (success) navigate("/login");
    if (userInfo) navigate("/pizzaList");
  }, [navigate, userInfo, success]);

  const submitForm: SubmitHandler<RegisterFormData> = (data) => {
    const payload = {
      email: data.email.toLowerCase(),
      phone: data.phone,
      username: data.firstName,
      password: data.password,
    };
    dispatch(registerUser(payload));
  };

  const password = watch("password");

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit(submitForm)} className="register-form">
        <div className="form-header">
          <FaPizzaSlice className="form-icon" />
          <h2>Регистрация</h2>
          <p>Создайте аккаунт для доступа к заказам</p>
        </div>

        <div className="form-group">
          <div className="input-with-icon">
            <FaUser className="input-icon" />
            <input
              type="text"
              id="firstName"
              className={`form-input ${errors.firstName ? 'invalid' : ''}`}
              placeholder="Имя"
              {...register("firstName", { 
                required: 'Имя обязательно',
                minLength: {
                  value: 2,
                  message: 'Имя должно содержать минимум 2 символа'
                }
              })}
            />
          </div>
          {errors.firstName && <span className="error-text">{errors.firstName.message}</span>}
        </div>

        <div className="form-group">
          <div className="input-with-icon">
            <FaPhone className="input-icon" />
            <input
              type="tel"
              id="phone"
              className={`form-input ${errors.phone ? 'invalid' : ''}`}
              placeholder="Телефон"
              {...register("phone", { 
                required: 'Телефон обязателен',
                pattern: {
                  value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                  message: 'Введите корректный номер телефона'
                }
              })}
            />
          </div>
          {errors.phone && <span className="error-text">{errors.phone.message}</span>}
        </div>

        <div className="form-group">
          <div className="input-with-icon">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              id="email"
              className={`form-input ${errors.email ? 'invalid' : ''}`}
              placeholder="Email"
              {...register("email", { 
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
          <div className="input-with-icon">
            <FaLock className="input-icon" />
            <input
              type="password"
              id="password"
              className={`form-input ${errors.password ? 'invalid' : ''}`}
              placeholder="Пароль"
              {...register("password", { 
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

        <div className="form-group">
          <div className="input-with-icon">
            <FaLock className="input-icon" />
            <input
              type="password"
              id="confirmPassword"
              className={`form-input ${errors.confirmPassword ? 'invalid' : ''}`}
              placeholder="Подтвердите пароль"
              {...register("confirmPassword", { 
                required: 'Подтверждение пароля обязательно',
                validate: value => 
                  value === password || 'Пароли не совпадают'
              })}
            />
          </div>
          {errors.confirmPassword && <span className="error-text">{errors.confirmPassword.message}</span>}
        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          type="submit" 
          className="register-button" 
          disabled={loading}
        >
          {loading ? (
            <span className="button-loader"></span>
          ) : (
            'Зарегистрироваться'
          )}
        </button>

        <div className="form-footer">
          Уже есть аккаунт? <span onClick={() => navigate('/login')}>Войти</span>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;