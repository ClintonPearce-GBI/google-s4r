import React from "react";
import styles from "./Color.module.scss";

const Color = (props) => {
  return (
    <>
      <div
        className={styles.refinementContainer}
        style={{ backgroundColor: props.refinement.value.toLowerCase() }}
        key={props.refinement.value}
      >
        <span>{props.refinement.count}</span>
      </div>
    </>
  );
};

export default Color;
