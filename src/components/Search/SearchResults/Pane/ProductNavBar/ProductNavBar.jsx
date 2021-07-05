import React, { useState, useEffect, useRef } from "react";
import styles from "./ProductNavBar.module.scss";

const ProductNavBar = (props) => {
  // C H A N G E   P A G E   S I Z E
  const [pageSize, setPageSize] = useState(props.currentPageSize);
  const [pageOpen, setPageOpen] = useState(false);

  // C H A N G E   P A G E
  const [page, setPage] = useState(1);
  const [controlsOpen, setControlsOpen] = useState(false);

  // page size options
  const pageSizeOpts = [10, 25, 50];
  const pageSizeBubbles = useRef([]);

  // go to page 1 when the page size is changed
  useEffect(() => {
    setPageOpen(false);
    setPage(1);
  }, [pageSize, props.resetPage]);

  useEffect(() => {
    pageInput.current.value = page;
  }, [page]);

  // validate the page isn't below or above the max count
  const validatePage = (pageNum) => {
    const page = parseInt(pageNum);
    if (page < 1) {
      setPage(1);
      pageInput.current.value = 1;
      props.handleChangePage(1);
    } else if (page > totalPages) {
      setPage(totalPages);
      pageInput.current.value = totalPages;
      props.handleChangePage(totalPages);
    } else {
      setPage(page);
      pageInput.current.value = page;
      props.handleChangePage(page);
    }
  };

  // get the page input as a ref
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
              validatePage(page - 1);
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
                validatePage(pageInput.current.value);
              }}
            >
              &#10003;
            </div>
          </div>
          <div
            className={styles.control}
            onClick={() => {
              validatePage(page + 1);
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
