import React, { useState, useEffect, useRef } from "react";
import styles from "./SearchResults.module.scss";
import ProductCard from "./ProductCard/ProductCard";
import ProductNavBar from "./Pane/ProductNavBar/ProductNavBar";

import Pane from "./Pane/Pane";

const SearchResults = (props) => {
  // the actual products handed to the this component by the api
  const [products, setProducts] = useState(props.searchResults);
  // blur the search results while they're loading
  const [fadeProducts, setFadeProducts] = useState(false);
  // when a massive change to pagination is done, set the page to 1
  const [resetPage, setResetPage] = useState(false);

  // the container for our search results
  const searchResultsContainer = useRef(null);
  console.log("Rendering");

  // when the search results change, rebuild the search results/product cards
  // ! TODO figure out why Product is rendering 3 times per product
  useEffect(() => {
    // set the current products to the latest search results
    setProducts(props.searchResults);
    // start fading the search results container for 500ms
    setFadeProducts(true);
    // TODO chain this to the actual product load
    setTimeout(() => {
      setFadeProducts(false);
    }, 500);
    // set the products to an empty array when unloading the components
    return () => {
      setProducts([]);
    };
  }, [props.searchResults]);

  // when a filter is applied, scroll to the top and send the refined search
  const handleFilter = (refinement, remove = false) => {
    searchResultsContainer.current.scroll({ top: 0, behavior: "smooth" });
    props.handleSearch(products.query, {
      refinement,
      remove,
      page: 1,
    });
    setResetPage(true);
  };

  // when the page size is changed, set the current page to 1
  const handlePageSizeChange = (pageSize) => {
    props.handleSearch(products.query, {
      pageSize,
      page: 1,
    });
  };

  // when the page is changed, scroll to the top and resend the search
  const handleChangePage = (page) => {
    searchResultsContainer.current.scroll({ top: 0, behavior: "smooth" });
    props.handleSearch(products.query, {
      page,
    });
  };

  return (
    <div className={styles.searchResults}>
      {products.totalRecordCount ? (
        <Pane
          totalProducts={props.searchResults.totalRecordCount}
          enabledFilters={products.selectedNavigation}
          filters={products.availableNavigation}
          query={products.query}
          handleFilter={handleFilter}
        />
      ) : (
        ""
      )}
      {props.searchResults?.pageInfo?.recordEnd ? (
        <ProductNavBar
          handlePageSizeChange={handlePageSizeChange}
          handleChangePage={handleChangePage}
          currentPageSize={props.searchResults.originalRequest.pageSize}
          totalRecordCount={props.searchResults.totalRecordCount}
          resetPage={resetPage}
        />
      ) : (
        ""
      )}

      <div
        ref={searchResultsContainer}
        className={`${styles.products} ${fadeProducts ? styles.blur : ""}`}
      >
        {products.totalRecordCount ? (
          products.records.map((product) => {
            try {
              return <ProductCard key={product.allMeta.id} product={product} />;
            } catch (err) {
              return (
                <ProductCard
                  key={String.fromCharCode(97 + Math.floor(Math.random() * 26))}
                  title={"A missing Item!"}
                  price={39.99}
                  image={
                    "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=webp&v=1530129081"
                  }
                />
              );
            }
          })
        ) : (
          <h1>Sorry no products found!</h1>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
