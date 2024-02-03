import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampaignsTitle } from "../../redux/slices/campaignsTitle";

import styles from "./HistoryCampaigns.module.scss";

function formatDate(dateString) {
  const dateObj = new Date(dateString);
  
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  
  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
  
  return formattedDate;
}

export const HistoryCampaigns = () => {
  const dispatch = useDispatch();
  const campaignsHistory = useSelector((state) => state.campaignsTitle);
  const isCampaignsHistoryLoading = campaignsHistory.status === "loading";

  useEffect(() => {
    dispatch(fetchCampaignsTitle());
  }, []);

  return (
    <div className={styles.component}>
      <h1>История создания рекламных кампаний</h1>
      {console.log(campaignsHistory.data)}

      {
        isCampaignsHistoryLoading ? null : (
          (campaignsHistory.data.length == 0) ?
          (
            <div className={styles.emptyHistoryText}>Вы еще не создали ни одной рекламной кампании :(</div>
          ) : (
            campaignsHistory.data.map((obj) => (
            <div key={obj.adcampaing_id} className={styles.campaigns}>
              <div className={styles.campaigns_name}>{obj.name}</div>
              <div className={styles.campaigns_date}>{formatDate(obj.created_at)}</div>
            </div>
            )))
          )
    }

    </div>
  );
};
