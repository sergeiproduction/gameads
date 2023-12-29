import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

import { setCampaignsSearchValue } from "../../redux/slices/filter";

import OptionsPanelLink from "./OptionsPanelLink";

const OptionsPanel = (props) => {
  // Функционал поиска
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const onChangeInput = (event) => {
    setInputValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClickClear = () => {
    dispatch(setCampaignsSearchValue(""));
    setInputValue("");
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setCampaignsSearchValue(str));
    }, 150),
    []
  );

  // Достаем из хранилища значения поиска и фильтруем объекты
  const selectFilterCampaignsTitle = useSelector(
    (state) => state.filter.campaigns.searchValue
  );

  const OptionsPanelLinksData = props.links
    .filter((obj) => {
      if (
        obj.title
          .toLowerCase()
          .includes(selectFilterCampaignsTitle.toLowerCase())
      ) {
        return true;
      }
      return false;
    })
    .map((obj) => <OptionsPanelLink key={obj.id} {...obj} />);

  return (
    <div className="options-panel">
      <div className="options-panel__search-bar">
        <input
          ref={inputRef}
          value={inputValue}
          onChange={onChangeInput}
          type="text"
          placeholder="Поиск"
        />
        {Boolean(inputValue) ? (
          <svg
            onClick={onClickClear}
            className="page-container__search-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        ) : (
          <svg
            className="page-container__search-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        )}
      </div>

      <Link to="/campaigns/add">
        <button className="options-panel__button">Создать кампанию</button>
      </Link>

      <ul>{OptionsPanelLinksData}</ul>
    </div>
  );
};

export default OptionsPanel;
