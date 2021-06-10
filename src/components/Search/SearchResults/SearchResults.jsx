import React, { useState, useEffect, useRef } from "react";
import styles from "./SearchResults.module.scss";
import ProductCard from "./ProductCard/ProductCard";
import ProductNavBar from "./Pane/ProductNavBar/ProductNavBar";

import Pane from "./Pane/Pane";

const SearchResults = (props) => {
  const [fadeProducts, setFadeProducts] = useState(false);
  const [products, setProducts] = useState(props.searchResults);

  const searchResultsContainer = useRef(null);

  //const [page, setPage] = useState(1);
  //const [pageSize, setPageSize] = useState(10);
  //const [sort, setSort] = useState([]);

  //useEffect(() => {}, [page, pageSize, sort]);

  useEffect(() => {
    setProducts(props.searchResults);
    setFadeProducts(true);
    setTimeout(() => {
      setFadeProducts(false);
    }, 800);
    return () => {
      setProducts([]);
    };
  }, [props.searchResults]);

  const handleFilter = (refinement, remove = false) => {
    searchResultsContainer.current.scroll({ top: 0, behavior: "smooth" });
    props.handleSearch(products.query, {
      refinement,
      remove,
    });
  };

  const handlePageNav = (pageSize) => {
    props.handleSearch(products.query, {
      pageSize,
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
          handlePageNav={handlePageNav}
          currentPageSize={props.searchResults.pageInfo.recordEnd}
          totalRecordCount={props.searchResults.totalRecordCount}
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
            // get the lowest variant price
            // sort the vairents and return the first (lowest result)'s price

            try {
              const price = product.allMeta.variants.sort(
                (variant) => variant.priceInfo.price
              )[0].priceInfo.price;

              const image = product.allMeta.variants[0].images[0].uri;
              return (
                <ProductCard
                  key={product.allMeta.id}
                  title={product.allMeta.title}
                  price={price}
                  image={image}
                />
              );
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
