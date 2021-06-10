import React from "react";
import styles from "./Color.module.scss";

const Color = (props) => {
  return (
    <>
      <div
        onClick={() => props.handleFilter(props.refinement, props.enabled)}
        className={[
          styles.refinementContainer,
          styles.colors,
          props.enabled ? styles.enabled : "",
        ].join(" ")}
        style={{ backgroundColor: props.refinement.value.toLowerCase() }}
        key={props.refinement.value}
      >
        <span>{props?.enabled ? <>&#10006;</> : props.refinement.count}</span>
      </div>
    </>
  );
};

export default Color;
