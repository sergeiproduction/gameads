import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { fetchLogin } from "../redux/slices/auth";
import { fetchRegister, fetchUser, selectIsAuth } from "../redux/slices/user";

const Register = () => {
  // Выход из формы
  const navigate = useNavigate();

  // Валидация поля e-mail или номер телефона
  const isLoginValid = (value) => {
    const loginRegexes = [
      /^\+?[7-8]\d{10}$/,
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    ];
    return loginRegexes.some((regex) => regex.test(value));
  };

  // Валидация имени пользователя
  const isUserNameValid = (value) => {
    const UserNameRegexes = [/^[а-яА-Яa-zA-Z]+$/];
    return UserNameRegexes.some((regex) => regex.test(value));
  };

  // Функции авторизации
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      login: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const formatedValues = {
      "username": values.username,
      "email": values.login,
      "password": values.password,
    };
    const data = await dispatch(fetchRegister(formatedValues)); // Записываем данные о регистрации пользователя в стейты
    // console.log(formatedValues);
    console.log("fetchRegister - ", data);

    if (!data.payload) {
      return alert("Не удалось зарегистрироваться");
    }

    const formatedData = { "username": values.login, "password": values.password };
    const userData = await dispatch(fetchLogin(formatedData)); // Записываем данные о входе пользователя в стейты
    console.log("fetchLogin - ", userData);

    if (!userData.payload) {
      return alert("Не удалось авторизоваться");
    }

    if ("access_token" in userData.payload) {
      window.localStorage.setItem("token", userData.payload.access_token);
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
                isValid: (value) =>
                  isLoginValid(value) ||
                  "Введите корректный E-mail или номер телефона",
              },
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
          <label htmlFor="username">Имя</label>
          <input
            {...register("username", {
              required: "Обязательное поле",
              minLength: {
                value: 2,
                message: "Минимальная длина 2 символа",
              },
              maxLength: {
                value: 30,
                message: "Максимальная длина 30 символов",
              },
              validate: {
                isValid: (value) =>
                  isUserNameValid(value) ||
                  "Введите корректное имя пользователя",
              },
            })}
            type="text"
            id="username"
            autoComplete="on"
            placeholder="Иван"
            className={errors.username ? "invalid" : ""}
          />
          {errors.username && (
            <span className="error-label">{errors.username.message}</span>
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
                message: "Максимальная длина 256 символа",
              },
            })}
            type="password"
            id="password"
            autoComplete="new-password"
            placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
            className={errors.password ? "invalid" : ""}
          />
          {errors.password && (
            <span className="error-label">{errors.password.message}</span>
          )}
        </div>
        <div className="auth__input-field">
          <label htmlFor="confirmPassword">Повторите пароль</label>
          <input
            {...register("confirmPassword", {
              required: "Обязательное поле",
              validate: (value) =>
                value === watch("password") || "Пароли не совпадают",
            })}
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
            className={errors.confirmPassword ? "invalid" : ""}
          />
          {errors.confirmPassword && (
            <span className="error-label">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <button disabled={!isValid} type="submit" className="auth__button">
          Зарегистрироваться
        </button>
        <p className="register-terms">
          Нажимая кнопку "Зарегистрироваться", Вы соглашаетесь на обработку
          данных в соответствии с <Link to="#">условиями</Link>
        </p>
        <hr className="auth__divider" />
        <p className="auth__switch-text">
          Есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
