import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import axios from "../../axios";

import AppCard from "./AppCard";

const AverageMetrics = (metrics) => {
  if (!metrics) {
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

const AdCard = (props) => {
  const { id } = useParams();
  const [campaignIsRunned, setCampaignIsRunned] = useState(props.adcard.is_runned);
  // console.log(campaignIsRunned);

  const averagedMetrics = AverageMetrics(props.adcard);

  const handleRunCampaign = async () => {
    try {
      const fields = {is_runned: !campaignIsRunned};
      await axios.post(`/campaigns/run/${id}`, fields); //После того как антоха добавит запрос, надо будет подправить запрос
      setCampaignIsRunned(!campaignIsRunned);
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <div className="page-container__ad-card">
      <h3 className="page-container__ad-card__title">{props.adcard.title}</h3>

      <div className="page-container__ad-card__top">
        <img
          src={props.adcard.img_url}
          alt="Рекламная кампания"
          className="page-container__ad-card__image"
        />
        <div className="page-container__ad-card__text">
          <p>{props.adcard.description}</p>
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

      {props.adcard.appcard.map((obj) => (
        <AppCard key={obj.id} {...obj} />
      ))}

      <div className="page-container__ad-card__buttons">
        {/* <button>Статистика</button> */}
        <button onClick={handleRunCampaign} className="primary">{campaignIsRunned ? "Остановить" : "Запустить"}</button>
        <Link to={`/campaigns/${id}/edit`}>
          <button>
            <svg
              className="page-container__ad-card__buttons__button__icon"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm112-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z" />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdCard;
