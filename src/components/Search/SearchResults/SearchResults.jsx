import React from "react";
import styles from "./SearchResults.module.scss";
import ProductCard from "../../Shared/ProductCard/ProductCard";
import Pane from "./Pane/Pane";

const SearchResults = (props) => {
  const products = props.searchResults.records;
  return (
    <div className={styles.searchResults}>
      <Pane />
      <div className={styles.products}>
        {products.map((product) => {
          // * get the lowest variant price
          // * sort the vairents and return the first (lowest result)'s price
          const price = product.variants.sort(
            (variant) => variant.priceInfo.price
          )[0].priceInfo.price;

          const image = product.variants[0].images[0].uri;

          return (
            <ProductCard
              key={product.id}
              title={product.title}
              price={price}
              image={image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
