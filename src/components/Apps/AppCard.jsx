import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const appType = ["Игра", "Приложение"];
  const formatedDownloads = formatDownloads(props.downloads);
  const campaignsTitle = useSelector((state) => state.campaignsTitle);

  // Разворчанивание и сворачивание карточек приложений
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandIconClick = () => {
    setIsExpanded(!isExpanded);
  };

  // Выбор рекламной кампании из списка
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [selectedCampaignTitle, setSelectedCampaignTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectCampaign = (obj) => {
    setSelectedCampaignId(obj.adcampaing_id);
    setSelectedCampaignTitle(obj.name);
    setIsOpen(false);
  };

  // Отправка добавленного приложения на бэкэнд
  const handleFetchCampaign = async () => {
    try {
      if (selectedCampaignId !== null) {
        // Добавить функцию отправки запроса на обновление рекламной кампании
        // console.log(props.title);
        // console.log(selectedCampaignTitle);

        const params = { campaing_id: selectedCampaignId, app_id: props.id }; // Дописать названия полей
        const { data } = await axios.post("/campaigns/app", params); // Дописать эндпоинт
      }
    } catch (error) {
      console.warn(error);
    }
  };

  // Закрытие списка на клик в любое место
  const nodeRef = useRef();
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.body.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={
        isExpanded
          ? "page-container__app-card expanded"
          : "page-container__app-card"
      }
    >
      <div
        className={
          isExpanded
            ? "page-container__app-card__options expanded"
            : "page-container__app-card__options"
        }
      >
        <img
          src={`${serverURL}/${props.img_url}`}
          className="page-container__app-icon"
          alt="App Image"
        />
        <div className="page-container__app-details">
          <div className="page-container__app-name">
            <div>{props.title}</div>
            <div> - {props.developer}</div>
          </div>
          <div className="page-container__app-description">
            <div>Описание </div>
            <div>{props.description}</div>
          </div>
          <div className="page-container__app-type">
            <div>Тип </div>
            <div>{appType[props.type]}</div>
          </div>
          <div className="page-container__app-downloads">
            <div>Скачиваний </div>
            <div>{formatedDownloads}</div>
          </div>
        </div>
        <svg
          className={
            isExpanded
              ? "page-container__app-expand-icon expanded"
              : "page-container__app-expand-icon"
          }
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 -960 960 960"
          width="48"
          onClick={handleExpandIconClick}
        >
          <path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z" />
        </svg>
      </div>

      <div
        className={
          isExpanded
            ? "page-container__app-card__options expanded"
            : "page-container__app-card__options"
        }
      >
        <div>
          <div
            className={`page-container__app-card__options__dropdown-container ${
              isOpen ? "open" : ""
            }`}
            ref={nodeRef}
          >
            <div onClick={() => setIsOpen(!isOpen)}>
              <div placeholder="Рекламная кампания...">
                {selectedCampaignTitle ? selectedCampaignTitle : null}
              </div>
            </div>
            {isOpen &&
              (Boolean(campaignsTitle) ? (
                <ul>
                  {campaignsTitle.data.map((obj) => (
                    <li
                      key={obj.adcampaing_id}
                      onClick={() => handleSelectCampaign(obj)}
                    >
                      <div>{obj.name}</div>
                    </li>
                  ))}
                </ul>
              ) : null)}
          </div>

          <button onClick={handleFetchCampaign}>Добавить</button>
        </div>
      </div>
    </div>
  );
};

export default AppCard;
