import React from "react";
import styles from './Footer.module.css';

class Footer extends React.Component {
   render() {
      return (
         <footer className={styles.footer}>
            <span>All rights reserved</span>
         </footer>
      )
   };
};

export default Footer;