import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// from Campaigns
import OptionsPanel from "../components/Campaigns/OptionsPanel";
import AdCard from "../components/Campaigns/AdCard";
import AdCardUpdate from "../components/Campaigns/AdCardUpdate";

import { fetchCampaigns } from "../redux/slices/campaigns";
import { selectIsAuth } from "../redux/slices/user";
import { resetCampaignsFilter } from "../redux/slices/filter";

const Campaigns = ({ isUpdate }) => {
  // Делаем запрос в бэк через axios и сохраняем в store через slices инфу по кампаниям
  const dispatch = useDispatch();
  const campaigns = useSelector((state) => state.campaigns);
  const isCampaignsLoading = campaigns.status === "loading";
  // const isCampaignsLoaded = (campaigns.status === "loaded"); //заменить isCampaignsLoading на isCampaignsLoaded

  useEffect(() => {
    dispatch(resetCampaignsFilter());
    dispatch(fetchCampaigns());
  }, []);

  // Получаем id кампании и по нему достаем кампанию из списка для передачи в AdCard, а также список заголовков кампаний передем в Options Panel
  const { id } = useParams();
  const optionsPanelLinks = campaigns.data.map((obj) => {
    // console.log(obj.id);
    return {
      id: obj.id,
      title: obj.title,
    };
  });
  const selectedAdCard = campaigns.data.find((obj) => obj.id == id); // Убрал полное совпадение ===, так как один string, другой int

  // Проверка авторизован ли пользователь
  const isAuth = useSelector(selectIsAuth);
  if (!isAuth && !Boolean(window.localStorage.getItem("token"))) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <OptionsPanel links={optionsPanelLinks} />
      <div className="page-container">
        {!isCampaignsLoading ? (
          isUpdate ? (
            <AdCardUpdate key={id}/>
          ) : Boolean(selectedAdCard) ? (
            <AdCard key={id} adcard={selectedAdCard} />
          ) : null
        ) : null}
      </div>
    </div>
  );
};

export default Campaigns;
