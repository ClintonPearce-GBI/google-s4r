import React from "react";
import styles from "./Value.module.scss";

const Value = (props) => {
  return (
    <>
      <div
        className={`${styles.refinementContainer} ${
          props?.enabled && styles.enabled
        }`}
        key={props.refinement.value}
        onClick={() => props.handleFilter(props.refinement, props.enabled)}
      >
        <div>{props.refinement.value}</div>
        <div className={styles.pill}>
          {props?.enabled ? <>&#10006;</> : props.refinement.count}
        </div>
      </div>
    </>
  );
};

export default Value;
