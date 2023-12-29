import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.component}>
      <div>
        <h2>Страница не найдена :(</h2>
        <button onClick={() => navigate(-1)}>Вернуться назад</button>
      </div>
    </div>
  );
};
