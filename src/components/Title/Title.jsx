import React from "react";
import styles from "./Title.module.scss";
import SearchField from "./SearchField/SearchField";

const Title = (props) => {
  return (
    <div className={styles.titleSearch}>
      <div className={styles.googleTitle}>
        <img
          className={styles.googleLogo}
          src="/img/google.webp"
          alt="Google Logo"
        />
        <span className={styles.googleRetail}>for Retail</span>
      </div>
      <SearchField handleSearch={props.handleSearch} />
    </div>
  );
};

export default Title;
