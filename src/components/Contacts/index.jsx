import React from "react";

import styles from "./Contacts.module.scss";

export const Contacts = () => {
  return (
    <div className={styles.contacts}>
      <div className={styles.title}>Поддержка и обратная связь</div>
      <div className={styles.contact_container}>
        <div>
          <span>Телефон:</span>
          <span>+7 (937) 236-95-04</span>
        </div>
        <div>
          <span>E-mail:</span>
          <span>vip.ar15@mail.ru</span>
        </div>
      </div>
    </div>
  );
};
