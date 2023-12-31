import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchCampaigns } from "../../redux/slices/campaigns";
import axios, { serverURL } from "../../axios";

const formatDownloads = (downloads) => {
  // Создаем массив с порядками чисел и их текстовыми эквивалентами
  const orders = [
    { value: 1e9, text: "млрд" },
    { value: 1e6, text: "млн" },
    { value: 1e3, text: "тыс." },
    { value: 1e2, text: "00" },
  ];

  // Перебираем массив с порядками чисел
  for (let order of orders) {
    // Если число больше или равно порядку числа, то применяем форматирование
    if (downloads >= order.value) {
      // Округляем число до меньшего целого, деля на порядок числа
      let rounded = Math.floor(downloads / order.value);
      // Возвращаем текст в виде "Более X порядок числа"
      if (order.value !== orders[orders.length - 1].value) {
        return `более ${rounded} ${order.text}`;
      } else {
        return `более ${rounded}${order.text}`;
      }
    }
  }
  // Если число меньше 100, то возвращаем его без изменений
  return downloads;
};

const AppCard = (props) => {
  const { id } = useParams();
  const formatedDownloads = formatDownloads(props.downloads);
  const dispatch = useDispatch();

  const handleRemoveApp = async () => {
    try {
      const params = { campaing_id: Number(id), app_id: props.id };
      const { data } = await axios.delete("/campaigns/app", { data: params });
      dispatch(fetchCampaigns());
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="page-container__ad-card__app-card">
      <img
        src={`${serverURL}/${props.img_url}`}
        className="page-container__ad-card__app-icon"
        alt="App Image"
      />
      <div className="page-container__ad-card__app-details">
        <div className="page-container__ad-card__app-name">
          <div>{props.title}</div>
          <div> - {props.developer}</div>
        </div>
        <div className="page-container__ad-card__app-stats">
          <div>
            CPC - <div>{props.cpc + " руб."}</div>
          </div>
          <div>
            CTR - <div>{props.ctr + "%"}</div>
          </div>
          <div>
            CPM - <div>{props.cpm + " руб."}</div>
          </div>
          <div>
            CR - <div>{props.cr + "%"}</div>
          </div>
          <div>
            CPA - <div>{props.cpa + " руб."}</div>
          </div>
        </div>
        <div className="page-container__ad-card__app-downloads">
          <div>Скачиваний </div>
          <div>{formatedDownloads}</div>
        </div>
      </div>
      <svg
        onClick={handleRemoveApp}
        className="page-container__ad-card__app-delete-icon"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
    </div>
  );
};

export default AppCard;
