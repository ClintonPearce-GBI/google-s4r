import React, { useState, useEffect } from "react";
import styles from "./SearchResults.module.scss";
import ProductCard from "../../Shared/ProductCard/ProductCard";
import Pane from "./Pane/Pane";

const SearchResults = (props) => {
  const [fadeProducts, setFadeProducts] = useState(false);
  //const [page, setPage] = useState(1);
  //const [pageSize, setPageSize] = useState(10);
  //const [sort, setSort] = useState([]);

  useEffect(() => {
    setFadeProducts(true);
    setTimeout(() => {
      setFadeProducts(false);
    }, 800);
  }, [props.searchResults]);

  //useEffect(() => {}, [page, pageSize, sort]);

  const handleFilter = (refinement) => {
    props.handleSearch(props.searchResults.query, {
      refinements: [refinement],
    });
  };

  return (
    <div className={styles.searchResults}>
      {props.searchResults.totalRecordCount ? (
        <Pane
          filters={props.searchResults.availableNavigation}
          query={props.searchResults.query}
          handleFilter={handleFilter}
        />
      ) : (
        ""
      )}
      <div className={`${styles.products} ${fadeProducts ? styles.blur : ""}`}>
        {props.searchResults.totalRecordCount ? (
          props.searchResults.records.map((product) => {
            // * get the lowest variant price
            // * sort the vairents and return the first (lowest result)'s price
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
