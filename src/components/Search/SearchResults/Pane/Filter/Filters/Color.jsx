import React, { useState } from "react";
import styles from "./Color.module.scss";

const Color = (props) => {
  let color = props.refinement.value.split("/")[0];
  const [active, setActive] = useState(false);

  const handleMouseOver = (hovered) => {
    hovered ? setActive(true) : setActive(false);
  };

  return (
    <>
      <div
        onClick={() => props.handleFilter(props.refinement, props.enabled)}
        onMouseOver={() => handleMouseOver(true)}
        onMouseOut={() => handleMouseOver(false)}
        className={[
          color === "Multi" ? styles.multi : "",
          styles.refinementContainer,
          styles.colors,
          props.enabled ? styles.enabled : "",
        ].join(" ")}
        style={{ backgroundColor: color.toLowerCase() }}
        key={props.refinement.value}
      >
        <span>
          {props?.enabled ? (
            <>&#10006;</>
          ) : active ? (
            color
          ) : (
            props.refinement.count
          )}
        </span>
      </div>
    </>
  );
};

export default Color;
