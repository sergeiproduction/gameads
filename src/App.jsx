import React, { Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchUser, selectIsAuth } from "./redux/slices/user";

import "./scss/app.scss";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Apps from "./pages/Apps";
import Campaigns from "./pages/Campaigns";

import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Advert from "./pages/Advert";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const data = dispatch(fetchUser());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>

        {/* Домашняя страница */}
        <Route path="" element={<Home />} />

        {/* Приложения */}
        <Route path="apps" element={<Apps />} />

        {/* Рекламные кампании */}
        <Route path="campaigns">
          <Route index element={<Campaigns />} />
          <Route path="add" element={<Campaigns isUpdate={true}/>} /> 
          {/* <Route path="add" element={<Campaigns />} /> Добавить новый элемент AdCardUpdate внутри Campaigns для добавления карточки */}
          <Route path=":id" element={<Campaigns isUpdate={false} />} />
          <Route path=":id/edit" element={<Campaigns isUpdate={true} />} /> 
          {/* <Route path=":id/edit" element={<Campaigns />} /> Добавить новый элемент AdCardUpdate внутри Campaigns для изменения карточки */}
        </Route>
        
      </Route>

      {/* Страница рекламной кампании */}
      <Route path="/campaigns/:id/run" element={<Advert />} />

      {/* Страница авторизации */}
      <Route path="/login" element={<Login />} />

      {/* Страница регистрации */}
      <Route path="/register" element={<Register />} />

      {/* Страница не найдена */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
