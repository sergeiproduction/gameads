import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import { serverURL } from "../../axios";

import AppCard from "./AppCard";

const AverageMetrics = (metrics) => {
  if (!metrics || metrics.appcard.length === 0) {
    return {
      CPC: 0,
      CTR: 0,
      CPM: 0,
      CR: 0,
      CPA: 0,
    };
  }

  let appCards = metrics.appcard;
  let totalCPC = 0;
  let totalCTR = 0;
  let totalCPM = 0;
  let totalCR = 0;
  let totalCPA = 0;

  for (let i = 0; i < appCards.length; i++) {
    totalCPC += parseFloat(appCards[i].cpc);
    totalCTR += parseFloat(appCards[i].ctr);
    totalCPM += parseFloat(appCards[i].cpm);
    totalCR += parseFloat(appCards[i].cr);
    totalCPA += parseFloat(appCards[i].cpa);
  }

  let averageCPC = totalCPC / appCards.length;
  let averageCTR = totalCTR / appCards.length;
  let averageCPM = totalCPM / appCards.length;
  let averageCR = totalCR / appCards.length;
  let averageCPA = totalCPA / appCards.length;

  const averagedMetrics = {
    CPC: averageCPC.toFixed(2),
    CTR: averageCTR.toFixed(2),
    CPM: averageCPM.toFixed(2),
    CR: averageCR.toFixed(2),
    CPA: averageCPA.toFixed(2),
  };

  return averagedMetrics;
};

const AdCardUpdate = () => {
  const navigate = useNavigate();

  // Определение режим редактирования или добавления
  const { id } = useParams();
  const campaigns = useSelector((state) => state.campaigns);
  const selectedAdCard = campaigns.data.find((obj) => obj.id === id);

  let selectedAdCardUpdate;
  const isEditing = Boolean(id) && Boolean(selectedAdCard);

  if (isEditing) {
    // Если режим редактирования, заполняем поля данными
    selectedAdCardUpdate = selectedAdCard;
  } else {
    // если режим добавления, тогда оставляем поля пустыми, кроме карточек приложений
    selectedAdCardUpdate = {
      id: null,
      title: "",
      img_url: "",
      description: "",
      appcard: [],
    };
  }

  // Загрузка изображения на сервер
  //
  const [adImgURL, setAdImgURL] = useState(selectedAdCardUpdate.img_url);
  const inputFileRef = useRef(null);
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      // console.log(file);
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setAdImgURL(data.img_url);
      // console.log(data);
    } catch (error) {
      console.warn(error);
    }
  };
  const handleRemoveImage = () => {
    setAdImgURL('');
  };
  //

  const averagedMetrics = AverageMetrics(selectedAdCardUpdate);

  // Работа с полями формы
  const { register, handleSubmit } = useForm({
    defaultValues: {
      adId: selectedAdCardUpdate.id,
      adTitle: selectedAdCardUpdate.title,
      adDescription: selectedAdCardUpdate.description,
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      if (isEditing) {
        // Если было редактирование
        const fields = {
          // id: values.adId,
          title: values.adTitle,
          img_url: adImgURL,
          description: values.adDescription,
        };
        // console.log(fields);
        await axios.patch(`/campaigns/${id}`, fields);
        navigate(`/campaigns/${id}`);
      } else {
        // Если было добавление
        const fields = {
          // id: values.adId,
          title: values.adTitle,
          img_url: adImgURL,
          description: values.adDescription,
        };
        // console.log(fields);
        const { data } = await axios.post("/campaigns", fields);
        const newId = data.id;
        navigate(`/campaigns/${newId}`);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const onCancel = () => {
    if (isEditing) {
      navigate(-1);
    } else {
      navigate("/campaigns");
    }
  };

  return (
    <form className="page-container__ad-card" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="page-container__ad-card__title">
        <input
          {...register("adTitle", {
            required: "Обязательное поле",
          })}
          placeholder="Название"
          type="text"
        />
      </h3>

      <div className="page-container__ad-card__top">
        {adImgURL ? (
          <>
            <img
              src={`${serverURL}${adImgURL}`}
              alt="Рекламная кампания"
              className="page-container__ad-card__image"
            />
            <div className="page-container__ad-card__image__delete">
              <svg
                onClick={handleRemoveImage}
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </div>
          </>
        ) : (
          <>
            <div onClick={() => inputFileRef.current.click()} className="page-container__ad-card__image">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="224"
                viewBox="0 -960 960 960"
                width="224"
              >
                <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
              </svg>
            </div>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
          </>
        )}
        <div className="page-container__ad-card__text">
          <textarea
            {...register("adDescription", {
              required: "Обязательное поле",
            })}
            placeholder="Описание"
          ></textarea>
        </div>
      </div>

      <div className="page-container__ad-card__stats">
        <div className="page-container__ad-card__stats__block">
          CPC (средний) - <div>{averagedMetrics.CPC + " руб."}</div>
        </div>
        <div className="page-container__ad-card__stats__block">
          CTR (средний) - <div>{averagedMetrics.CTR + "%"}</div>
        </div>
        <div className="page-container__ad-card__stats__block">
          CPM (средний) - <div>{averagedMetrics.CPM + " руб."}</div>
        </div>
        <div className="page-container__ad-card__stats__block">
          CR (средний) - <div>{averagedMetrics.CR + "%"}</div>
        </div>
        <div className="page-container__ad-card__stats__block">
          CPA (средний) - <div>{averagedMetrics.CPA + " руб."}</div>
        </div>
      </div>

      {selectedAdCardUpdate.appcard.map((obj) => (
        <AppCard key={obj.id} {...obj} />
      ))}

      <div className="page-container__ad-card__buttons">
        <button type="submit" className="primary">
          {isEditing ? "Сохранить" : "Добавить"}
        </button>
        <button type="button" onClick={() => onCancel()}>
          Отмена
        </button>
      </div>
    </form>
  );
};

export default AdCardUpdate;
