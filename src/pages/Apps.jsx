import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// from Apps
import OptionsPanel from "../components/Apps/OptionsPanel";
import SearchBar from "../components/Apps/SearchBar";
import ViewSwitch from "../components/Apps/ViewSwitch";
import AppCard from "../components/Apps/AppCard";

import { selectIsAuth } from "../redux/slices/user";
import { fetchApps } from "../redux/slices/apps";
import { fetchCampaignsTitle } from "../redux/slices/campaignsTitle";
import { resetAppsFilter } from "../redux/slices/filter";

const Apps = () => {
  // Делаем запрос в бэк через axios и сохраняем в store через slices инфу по приложениям
  const dispatch = useDispatch();
  const apps = useSelector((state) => state.apps);
  const isAppsLoading = apps.status === "loading";
  // const isAppsLoaded = (apps.status === "loaded"); //заменить isAppsLoading на isAppsLoaded

  // Достаем из хранилища значения поиска
  const selectFilterAppsTitle = useSelector(
    (state) => state.filter.apps.searchValue
  );
  // const selectFilterAppsType = useSelector((state) => state.filter.apps.type);
  // const selectFilterMinDownloads = useSelector(
  //   (state) => state.filter.apps.minDownloads
  // );
  // const selectFilterMaxDownloads = useSelector(
  //   (state) => state.filter.apps.maxDownloads
  // );

  // Запросы на бэк
  useEffect(() => {
    dispatch(resetAppsFilter());
    dispatch(fetchApps());
    dispatch(fetchCampaignsTitle());
  }, []);

  // Проверка авторизован ли пользователь
  const isAuth = useSelector(selectIsAuth);
  if (!isAuth && !Boolean(window.localStorage.getItem("token"))) {
    return <Navigate to="/login" />;
  }

  const appСardsData = apps.data
    .filter((obj) => {
      if (
        obj.title.toLowerCase().includes(selectFilterAppsTitle.toLowerCase()) ||
        obj.developer
          .toLowerCase()
          .includes(selectFilterAppsTitle.toLowerCase()) ||
        obj.description
          .toLowerCase()
          .includes(selectFilterAppsTitle.toLowerCase())
      ) {
        return true;
      }
      return false;
    })
    .map((obj) => <AppCard key={obj.id} {...obj} />);

  return (
    <div className="container">
      <OptionsPanel />
      <div className="page-container">
        <div className="page-container_search-and-switch">
          <SearchBar />
          <ViewSwitch />
        </div>
        {isAppsLoading ? null : appСardsData}
      </div>
    </div>
  );
};

export default Apps;
