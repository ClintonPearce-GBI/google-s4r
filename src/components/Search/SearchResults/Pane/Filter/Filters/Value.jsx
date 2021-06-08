import React from "react";
import styles from "./Value.module.scss";

const Value = (props) => {
  return (
    <>
      <div
        className={styles.refinementContainer}
        key={props.refinement.value}
        onClick={() => props.handleFilter(props.refinement)}
      >
        <div>{props.refinement.value}</div>
        <div className={styles.pill}>{props.refinement.count}</div>
      </div>
    </>
  );
};

export default Value;
