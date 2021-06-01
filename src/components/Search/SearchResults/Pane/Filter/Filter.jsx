import React, { useState } from "react";
import styles from "./Filter.module.scss";

import Value from "./Filters/Value";
import Color from "./Filters/Color";

const Filter = (props) => {
  console.log(props.filterData);
  const [expanded, setExpanded] = useState(false);
  const name = props.filterData.displayName;
  const refinements = props.filterData.refinements;
  const type = props.filterType;

  return (
    <div className={styles.category}>
      <div
        className={styles.title}
        onClick={() => setExpanded(expanded ? false : true)}
      >
        {name}
        <img src="/img/arrows-v.svg" alt="expand" />
      </div>
      <div
        className={`${styles.refinements} ${expanded ? styles.expanded : ""}`}
      >
        {type === "Value" &&
          refinements.map((refinement) => {
            if (name === "Color") {
              return <Color refinement={refinement} />;
            } else if (type === "Range") {
              return <Value refinement={refinement} />;
            } else {
              return <Value refinement={refinement} />;
            }
          })}
      </div>
    </div>
  );
};

export default Filter;
