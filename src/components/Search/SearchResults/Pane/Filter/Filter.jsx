import React, { useState, useRef, useEffect } from "react";
import styles from "./Filter.module.scss";

import Value from "./Filters/Value";
import Color from "./Filters/Color";
import Range from "./Filters/Range";

const Filter = (props) => {
  const [expander, setExpandeder] = useState(false);
  const [expanded, setExpanded] = useState(false);

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

  // if the filter container's height isn't more than 140px,
  // then there's no need for an expander button
  useEffect(() => {
    const title = filterTitle.current;
    const contentHeight = title.nextSibling.offsetHeight;
    setExpandeder(contentHeight > 150);
  }, []);

  return (
    <div className={styles.category}>
      <div
        className={styles.title}
        onClick={() => setExpanded(expanded ? false : true)}
        ref={filterTitle}
      >
        {displayName}
        {expander &&
          (expanded ? (
            <img
              src="/img/arrows-v.svg"
              alt="expand"
              className={`${styles.invert} ${styles.fade}`}
            />
          ) : (
            <img
              src="/img/arrow-down.svg"
              alt="expand"
              className={`${styles.invert} ${styles.fade}`}
            />
          ))}
      </div>
      <div
        className={`${styles.refinements} ${expanded ? styles.expanded : ""} ${
          displayName === "Color" ? styles.colors : ""
        }`}
      >
        {sortedRefinements().map((refinement) => {
          if (displayName === "Color") {
            return (
              <Color
                enabled={false}
                refinement={{ ...refinement, navigationName: name }}
                key={refinement.value}
                handleFilter={props.handleFilter}
              />
            );
          } else if (type === "Range") {
            return (
              <Range
                enabled={false}
                refinement={{ ...refinement, navigationName: name }}
                key={refinement.low}
                handleFilter={props.handleFilter}
              />
            );
          } else {
            return (
              <Value
                enabled={false}
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
