import React, { useRef } from "react";
import styles from "./Filter.module.scss";

import Value from "./Filters/Value";
import Color from "./Filters/Color";
import Range from "./Filters/Range";

const Filter = (props) => {
  const name = props.filterData.name;
  const displayName = props.filterData.displayName;
  const refinements = props.filterData.refinements;
  const type = props.filterData.type;

  const sortedRefinements = () => {
    let sortedRefinements = refinements;

    // if color is loaded, fix the sorting
    if (displayName === "Color") {
      sortedRefinements = refinements.sort((a, b) => b.count - a.count);
    }
    return sortedRefinements;
  };

  const filterTitle = useRef(null);

  return (
    <div className={styles.category}>
      <div className={styles.title} ref={filterTitle}>
        {displayName}
      </div>
      <div
        className={`${styles.refinements} ${
          displayName === "Color" ? styles.colors : ""
        }`}
      >
        {sortedRefinements().map((refinement) => {
          if (displayName === "Color") {
            return (
              <Color
                enabled={true}
                refinement={{ ...refinement, navigationName: name }}
                key={refinement.value}
                handleFilter={props.handleFilter}
              />
            );
          } else if (type === "Range") {
            return (
              <Range
                enabled={true}
                refinement={{ ...refinement, navigationName: name }}
                key={refinement.low}
                handleFilter={props.handleFilter}
              />
            );
          } else {
            return (
              <Value
                enabled={true}
                refinement={{ ...refinement, navigationName: name }}
                key={refinement.value}
                handleFilter={props.handleFilter}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Filter;
