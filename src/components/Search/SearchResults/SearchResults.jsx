import React, { useState, useEffect } from "react";
import styles from "./SearchResults.module.scss";
import ProductCard from "./ProductCard/ProductCard";
import ProductNavBar from "./Pane/ProductNavBar/ProductNavBar";

import Pane from "./Pane/Pane";

const SearchResults = (props) => {
  const [fadeProducts, setFadeProducts] = useState(false);
  const [products, setProducts] = useState(props.searchResults);

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
  }, [props.searchResults]);

  const handleFilter = (refinement, remove = false) => {
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
          enabledFilters={products.selectedNavigation}
          filters={products.availableNavigation}
          query={products.query}
          handleFilter={handleFilter}
        />
      ) : (
        ""
      )}
      <ProductNavBar
        handlePageNav={handlePageNav}
        totalRecordCount={props.searchResults.totalRecordCount}
      />
      <div className={`${styles.products} ${fadeProducts ? styles.blur : ""}`}>
        {products.totalRecordCount ? (
          products.records.map((product) => {
            // get the lowest variant price
            // sort the vairents and return the first (lowest result)'s price
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
          })
        ) : (
          <h1>Sorry no products found!</h1>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
