import React, { useState } from "react";
import styles from "./Pane.module.scss";

import Filter from "./Filter/Filter";
import EnabledFilter from "./Filter/EnabledFilter";

const Pane = (props) => {
  const query = props.query;

  const [expanded, setExpanded] = useState(false);
  const [flipped, setFipped] = useState(false);

  console.log(flipped);

  return (
    <div className={styles.flipOuter}>
      {/* this is the filter page toggle for mobile */}
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
      {/* this is the pane wrapper */}
      <div
        className={[
          styles.resultsPane,
          expanded ? styles.expanded : "",
          flipped ? styles.flipped : "",
        ].join(" ")}
      >
        <div
          className={styles.cap}
          onClick={() => setFipped(flipped ? false : true)}
        >
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
                displayName={filter.displayName}
                or={filter.or}
                filterData={filter}
                handleFilter={props.handleFilter}
              />
            );
          })}
        {props.filters &&
          props.filters.map((filter) => {
            return ["Categories", "Price", "Sizes", "Brand", "Color"].includes(
              filter.displayName
            ) ? (
              <Filter
                key={filter.displayName}
                displayName={filter.displayName}
                or={filter.or}
                filterData={filter}
                handleFilter={props.handleFilter}
              />
            ) : (
              ""
            );
          })}
      </div>
    </div>
  );
};

export default Pane;
