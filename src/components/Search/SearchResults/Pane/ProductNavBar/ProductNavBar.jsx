import React, { useState, useEffect, useRef } from "react";
import styles from "./ProductNavBar.module.scss";

const ProductNavBar = (props) => {
  // C H A N G E   P A G E   S I Z E
  const [pageSize, setPageSize] = useState(props.currentPageSize);
  const [pageOpen, setPageOpen] = useState(false);

  const pageSizeOpts = [10, 25, 50];
  const pageSizeBubbles = useRef([]);

  useEffect(() => {
    setPageOpen(false);
  }, [pageSize]);

  // C H A N G E   P A G E
  const [page, setPage] = useState(1);
  const [pageControls, setPageControls] = useState(false);

  const totalRecords = props.totalRecordCount;
  const totalPages = Math.ceil(totalRecords / pageSize);

  return (
    <div className={styles.nav}>
      <small>Page Size</small>
      <div
        className={styles.pageSize}
        onClick={() => setPageOpen(pageOpen ? false : true)}
      >
        <div className={styles.activeSize}>{pageSize}</div>
        {pageSizeOpts
          .filter((opt) => opt !== pageSize)
          .map((opt, index) => {
            return (
              <div
                key={opt}
                onClick={() => {
                  setPageSize(opt);
                  props.handlePageNav(opt);
                }}
                ref={(el) => (pageSizeBubbles.current[index] = el)}
                className={`${styles.outerBubble} ${
                  pageOpen && styles.pageOpen
                }`}
              >
                <div className={styles.innerBubble}>{opt}</div>
              </div>
            );
          })}
      </div>
      <div className={styles.page}>
        <small>Page </small>
        <div className={styles.currentPage}>{page}</div>
        <small> of </small>
        <div className={styles.totalPages}>{totalPages}</div>
      </div>
    </div>
  );
};

export default ProductNavBar;
