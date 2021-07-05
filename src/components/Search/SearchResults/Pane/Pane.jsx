import React, { useState } from "react";
import styles from "./Pane.module.scss";

import Filter from "./Filter/Filter";
import EnabledFilter from "./Filter/EnabledFilter";

const Pane = (props) => {
  const query = props.query;

  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* this is the filter page toggle */}
      <div
        className={[styles.toggle, expanded ? styles.expanded : ""].join(" ")}
        onClick={() => setExpanded(expanded ? false : true)}
      >
        <div
          className={[styles.vert, expanded ? styles.right : styles.left].join(
            " "
          )}
        ></div>
        <div>{expanded ? "❮" : "❯"}</div>
      </div>
      <div
        className={[styles.resultsPane, expanded ? styles.expanded : ""].join(
          " "
        )}
      >
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
    </>
  );
};

export default Pane;
