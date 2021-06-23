import React from "react";
import styles from "./ProductCard.module.scss";

import Rating from "./Rating/Rating";

const ProductCard = (props) => {
  const product = props.product;

  // const variants = product.allMeta.variants;

  // get the lowest variant price
  // sort the vairants and return the first (lowest result)'s price
  const price = product.allMeta.variants.sort(
    (variant) => variant.priceInfo.price
  )[0].priceInfo.price;

  // get the main (first) image
  const image = product.allMeta.variants[0].images[0].uri;

  return (
    <div className={styles.container}>
      <img className={styles.productImage} src={image} alt={props.title} />
      <div className={styles.title}>{product.allMeta.title}</div>
      <div className={styles.price}>
        <small>Starting at</small> ${price}!
      </div>
      <button>Add to Cart</button>
      <Rating key={product.allMeta.id} rating={product.allMeta.rating} />
    </div>
  );
};

export default React.memo(ProductCard);
