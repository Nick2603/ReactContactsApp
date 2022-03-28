import React, { FC } from "react";
import styles from "./Header.module.css";

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <span>My Contacts</span>
    </header>
  );
};
