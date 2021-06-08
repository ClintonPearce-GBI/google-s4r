import React from "react";
import styles from "./Color.module.scss";

const Color = (props) => {
  return (
    <>
      <div
        onClick={() => props.handleFilter(props.refinement)}
        className={[styles.refinementContainer, styles.colors].join(" ")}
        style={{ backgroundColor: props.refinement.value.toLowerCase() }}
        key={props.refinement.value}
      >
        <span>{props.refinement.count}</span>
      </div>
    </>
  );
};

export default Color;
