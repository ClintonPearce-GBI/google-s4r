import React from "react";
import styles from "./Pane.module.scss";

import Filter from "./Filter/Filter";

const Pane = (props) => {
  const query = props.query;

  return (
    <div className={styles.resultsPane}>
      <div className={styles.cap}>
        <p>
          <small>Viewing</small>
        </p>
        <p>
          <strong>"{query}"</strong>
        </p>
      </div>
      {props.filters &&
        props.filters.map((filter) => {
          return (
            <Filter
              key={filter.displayName}
              filterData={filter}
              handleFilter={props.handleFilter}
            />
          );
        })}
    </div>
  );
};

export default Pane;
