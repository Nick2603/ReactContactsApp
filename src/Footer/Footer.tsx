import React, { FC } from "react";
import styles from "./Footer.module.css";

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <span>All rights reserved</span>
    </footer>
  );
};
