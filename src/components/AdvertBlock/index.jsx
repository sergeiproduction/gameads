import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios, { serverURL } from "../../axios";

import styles from "./AdvertBlock.module.scss";

const RandomGradientBackground = () => {
  // Генерация случайного числа в заданном диапазоне
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Генерация случайного цвета в формате HSL
  const getRandomColor = () => {
    const minHueDifference = 10;
    const maxHueDifference = 90;

    const baseHue = getRandomNumber(0, 360);
    const hueDifference = getRandomNumber(minHueDifference, maxHueDifference);

    const hue1 = baseHue;
    const hue2 = (baseHue + hueDifference) % 360;

    const saturation = getRandomNumber(50, 100);
    const lightness = getRandomNumber(30, 70);

    return [hue1, hue2].map((hue) => `hsl(${hue}, ${saturation}%, ${lightness}%)`);
  };

  // Генерация случайного градиента
  const generateRandomGradient = () => {
    const [color1, color2] = getRandomColor();

    const directions = ['to right', 'to left', 'to top', 'to bottom'];
    const randomDirection = directions[getRandomNumber(0, directions.length - 1)];

    return `linear-gradient(${randomDirection}, ${color1}, ${color2})`;
  };

  const style = {
    background: generateRandomGradient(),
  };

  return style;
};

export const AdvertBlock = () => {
  const { id } = useParams();
  const [dataResponse, setDataResponse] = useState({});

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/campaigns/${id}`);
      setDataResponse(data);
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
          {dataResponse.content_path && dataResponse.message ? (
            <>
              <img
                src={`${serverURL}/${dataResponse.content_path}`}
                alt="Advertisement"
              />
              <p className={styles.text}>{dataResponse.message}</p>
            </>
          ) : dataResponse.content_path ? (
            <img
              src={`${serverURL}/${dataResponse.content_path}`}
              alt="Advertisement"
            />
          ) : dataResponse.message ? (
            <p
              className={styles.formatted_text}
              style={RandomGradientBackground()}
            >
              {dataResponse.message}
            </p>
          ) : null}
          {/* <button className={styles.button}>Перейти</button> */}
        </>
      )}
    </div>
  );
};
