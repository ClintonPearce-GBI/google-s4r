import React, { useState, useEffect, useRef } from "react";
import styles from "./ProductNavBar.module.scss";

const ProductNavBar = (props) => {
  // C H A N G E   P A G E   S I Z E
  const [pageSize, setPageSize] = useState(props.currentPageSize);
  const [pageOpen, setPageOpen] = useState(false);

  // C H A N G E   P A G E
  const [page, setPage] = useState(1);
  const [controlsOpen, setControlsOpen] = useState(false);

  const pageSizeOpts = [10, 25, 50];
  const pageSizeBubbles = useRef([]);

  useEffect(() => {
    setPageOpen(false);
    setPage(1);
  }, [pageSize, props.totalRecordCount]);

  const pageInput = useRef(null);

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
                  props.handlePageSizeChange(opt);
                }}
                ref={(el) => (pageSizeBubbles.current[index] = el)}
                className={`${styles.pageBubble} ${
                  pageOpen ? styles.pageOpen : ""
                }`}
              >
                <div className={styles.innerBubble}>{opt}</div>
              </div>
            );
          })}
      </div>
      <div className={styles.page}>
        <small>Page</small>
        <div
          className={styles.currentPage}
          onClick={() => setControlsOpen(controlsOpen ? false : true)}
        >
          {page}
        </div>
        <small>of</small>
        <div className={styles.totalPages}>{totalPages}</div>
        <div
          className={`${styles.pageControls} ${
            controlsOpen ? styles.controlsOpen : ""
          }`}
        >
          <div
            className={styles.control}
            onClick={() => {
              props.handleChangePage(page - 1);
              setPage(page - 1);
            }}
          >
            &#10094;
          </div>
          <div className={styles.pageInputContainer}>
            <input
              ref={pageInput}
              type="text"
              placeholder={page}
              className={styles.pageInput}
            />
            <div
              className={styles.check}
              onClick={() => {
                props.handleChangePage(pageInput.current.value);
                setPage(pageInput.current.value);
              }}
            >
              &#10003;
            </div>
          </div>
          <div
            className={styles.control}
            onClick={() => {
              props.handleChangePage(page + 1);
              setPage(page + 1);
            }}
          >
            &#10095;
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductNavBar;
