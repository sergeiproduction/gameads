import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate} from "react-router-dom";

import { fetchLogin } from "../redux/slices/auth";
import { fetchUser, selectIsAuth } from "../redux/slices/user";

const Login = () => {
  // Выход из формы
  const navigate = useNavigate();

  // Валидация поля e-mail или номер телефона
  const loginRegexes = [
    /^\+?[7-8]\d{10}$/,
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  ];
  
  const isLoginValid = value => {
    return loginRegexes.some(regex => regex.test(value));
  };

  // Функции авторизации
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const formatedValues = {"username" : values.login, "password" : values.password};
    const data = await dispatch(fetchLogin(formatedValues));
    // console.log(formatedValues);
    // console.log(data);

    if (!data.payload) {
      return alert("Неверный логин или пароль");
    }

    if ("access_token" in data.payload) {
      window.localStorage.setItem("token", data.payload.access_token);
    } else {
      return alert("Не удалось авторизоваться");
    }

    await dispatch(fetchUser());
  };

  const isAuth = useSelector(selectIsAuth);
  if (isAuth && Boolean(window.localStorage.getItem("token"))) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <form className="auth__window" onSubmit={handleSubmit(onSubmit)}>
        <div className="auth__title">
          <h1>
            GameAds <span>ID</span>
          </h1>
          <span onClick={() => navigate("/")}>&#x2716;</span>
        </div>
        <div className="auth__input-field">
          <label htmlFor="login">E-mail или номер телефона</label>
          <input
            {...register("login", {
              required: "Обязательное поле",
              minLength: {
                value: 6,
                message: "Минимальная длина 6 символов",
              },
              maxLength: {
                value: 254,
                message: "Максимальная длина 254 символа",
              },
              validate: {
                isValid: value => isLoginValid(value) || "Введите корректный E-mail или номер телефона"
              }
            })}
            type="text"
            id="login"
            autoComplete="on"
            placeholder="+7 (999) 999-99-99"
            className={errors.login ? "invalid" : ""}
          />
          {errors.login && (
            <span className="error-label">{errors.login.message}</span>
          )}
        </div>
        <div className="auth__input-field">
          <label htmlFor="password">Пароль</label>
          <input
            {...register("password", {
              required: "Обязательное поле",
              minLength: {
                value: 8,
                message: "Минимальная длина 8 символов",
              },
              maxLength: {
                value: 256,
                message: "Максимальная длина 256 символов",
              },
            })}
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
            className={errors.password ? "invalid" : ""}
          />
          {errors.password && (
            <span className="error-label">{errors.password.message}</span>
          )}
        </div>
        <button disabled={!isValid} type="submit" className="auth__button">
          Войти
        </button>
        <p className="forgot-password">
          <Link to="#">Забыли пароль?</Link>
        </p>
        <hr className="auth__divider" />
        <p className="auth__switch-text">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
