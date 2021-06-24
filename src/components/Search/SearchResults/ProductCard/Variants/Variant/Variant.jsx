import React from "react";

import styles from "./Variant.module.scss";

const Variant = (props) => {
  const color = props.color;
  const multicolor = color === "Multi";

  return (
    <>
      {props.active ? (
        <div
          className={[styles.variant, multicolor ? styles.multiColor : ""].join(
            " "
          )}
          style={{ backgroundColor: color }}
          onClick={() => props.handleColor(color)}
        ></div>
      ) : (
        ""
      )}
    </>
  );
};

export default Variant;
