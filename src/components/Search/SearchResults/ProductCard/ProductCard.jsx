import React from "react";
import styles from "./ProductCard.module.scss";

const ProductCard = (props) => {
  return (
    <div className={styles.container}>
      <img src={props.image} alt={props.title} />
      <div className={styles.title}>{props.title}</div>
      <div className={styles.price}>
        <small>Starting at</small> ${props.price}!
      </div>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
