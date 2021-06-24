import React, { useState } from "react";
import Variant from "./Variant/Variant";

import styles from "./Variants.module.scss";

const Variants = (props) => {
  const [active, setActive] = useState(false);

  const colors = props.colors.filter((color) => color !== props.activeColor);

  return (
    <div
      onClick={() => setActive(active ? false : true)}
      className={[styles.container, active ? styles.active : ""].join(" ")}
      style={{ backgroundColor: props.activeColor }}
    >
      {colors.map((color) => {
        return (
          <Variant
            active={active}
            color={color}
            handleColor={props.handleColor}
          />
        );
      })}
    </div>
  );
};

export default Variants;
