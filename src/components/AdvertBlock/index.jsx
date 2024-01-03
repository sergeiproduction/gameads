import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios, { serverURL } from "../../axios";

import styles from "./AdvertBlock.module.scss";

export const AdvertBlock = () => {
  const { id } = useParams();
  const [dataResponse, setDataResponse] = useState({});

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/campaigns/${id}`);
      setDataResponse(data);
      console.log(data);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.advertisement}>
      {dataResponse && (
        <>
          <img
            src={`${serverURL}/${dataResponse.content_path}`}
            alt="Advertisement"
          />
          <p className={styles.text}>{dataResponse.message}</p>
          {/* <button className={styles.button}>Перейти</button> */}
        </>
      )}
    </div>
  );
};
