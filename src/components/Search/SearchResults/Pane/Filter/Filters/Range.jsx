import React from "react";
import styles from "./Range.module.scss";

const Range = (props) => {
  const count = props.refinement.count;
  const low = props.refinement.low;
  const high = props.refinement.high;
  return (
    <>
      <div
        className={styles.refinementContainer}
        key={props.refinement.value}
        onClick={() => props.handleFilter(props.refinement)}
      >
        <div>
          ${low} to ${high}
        </div>
        <div className={styles.pill}>{count}</div>
      </div>
    </>
  );
};

export default Range;
