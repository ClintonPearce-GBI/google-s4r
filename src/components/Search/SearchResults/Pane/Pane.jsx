import React from "react";
import styles from "./Pane.module.scss";

import Filter from "./Filter/Filter";
import EnabledFilter from "./Filter/EnabledFilter";

const Pane = (props) => {
  const query = props.query;

  return (
    <div className={styles.resultsPane}>
      <div className={styles.cap}>
        <p>
          <strong>{props.totalProducts.toLocaleString()}&nbsp;</strong>
          {query ? (
            <>
              <small>Results&nbsp;</small>
              <small>for&nbsp;</small>
              <strong>{query}</strong>
            </>
          ) : (
            <>
              <strong>Products</strong>
            </>
          )}
        </p>
      </div>
      {props.enabledFilters &&
        props.enabledFilters.map((filter) => {
          return (
            <EnabledFilter
              key={filter.displayName}
              filterData={filter}
              handleFilter={props.handleFilter}
            />
          );
        })}
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
