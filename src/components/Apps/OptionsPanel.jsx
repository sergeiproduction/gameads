import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import {
  setAppsType,
  setAppsMinDownloads,
  setAppsMaxDownloads,
} from "../../redux/slices/filter";

const OptionsPanel = () => {
  const dispatch = useDispatch();

  const [filterAppsType, setFilterAppsType] = useState("all");

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      appsType: "all",
      minDownloads: null,
      maxDownloads: null,
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    dispatch(setAppsType(filterAppsType));
    dispatch(setAppsMinDownloads(values.minDownloads));
    dispatch(setAppsMaxDownloads(values.maxDownloads));
  };

  return (
    <form className="options-panel" onSubmit={handleSubmit(onSubmit)}>
      <div className="options-panel__title">Фильтр</div>

      <div className="options-panel__toggle-switch">
        <input
          {...register("appsType")}
          type="radio"
          id="toggle-all"
          checked={filterAppsType === "all"}
          onChange={() => setFilterAppsType("all")}
        />
        <div>
          <label htmlFor="toggle-all">Все</label>
        </div>
        <input
          {...register("appsType")}
          type="radio"
          id="toggle-games"
          checked={filterAppsType === "games"}
          onChange={() => setFilterAppsType("games")}
        />
        <div>
          <label htmlFor="toggle-games">Игры</label>
        </div>
        <input
          {...register("appsType")}
          type="radio"
          id="toggle-apps"
          checked={filterAppsType === "apps"}
          onChange={() => setFilterAppsType("apps")}
        />
        <div>
          <label htmlFor="toggle-apps">Приложения</label>
        </div>
      </div>

      <div className="options-panel__input-field">
        <input
          {...register("minDownloads")}
          type="text"
          placeholder="Охват от"
        />
        <input
          {...register("maxDownloads")}
          type="text"
          placeholder="до"
        />
      </div>

      <button type="submit" className="options-panel__button">
        Применить
      </button>
    </form>
  );
};

export default OptionsPanel;
