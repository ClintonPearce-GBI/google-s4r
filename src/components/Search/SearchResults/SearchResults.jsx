import React from "react";
import styles from "./SearchResults.module.scss";
import ProductCard from "../../Shared/ProductCard/ProductCard";
import Pane from "./Pane/Pane";

const SearchResults = (props) => {
  console.log(props);
  return (
    <div className={styles.searchResults}>
      <Pane
        filters={props.searchResults.availableNavigation}
        query={props.searchResults.query}
      />
      <div className={styles.products}>
        {props.searchResults.records.map((product) => {
          // * get the lowest variant price
          // * sort the vairents and return the first (lowest result)'s price
          const price = product.allMeta.variants.sort(
            (variant) => variant.priceInfo.price
          )[0].priceInfo.price;

          const image = product.allMeta.variants[0].images[0].uri;

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
