import React, { useState } from "react";
import styles from "./ProductCard.module.scss";

import Rating from "./Rating/Rating";
import Variants from "./Variants/Variants";

const ProductCard = React.memo((props) => {
  const product = props.product;
  const variants = product.allMeta.variants;

  const [activeVariant, setActiveVariant] = useState(variants[0]);

  // get the main (first) image for the first picture
  const image = activeVariant.images[0].uri;

  // V A R I A N T S
  const colors = [
    ...new Set(variants.map((variant) => variant.colorInfo.colorFamilies[0])),
  ];

  const handleColor = (color) => {
    console.log(color);
    setActiveVariant(
      variants.find((variant) => variant.colorInfo.colorFamilies[0] === color)
    );
    console.log(activeVariant);
  };

  return (
    <div className={styles.container}>
      <div>
        <img className={styles.productImage} src={image} alt={props.title} />
        {colors.length > 1 ? (
          <Variants
            activeVariant={activeVariant}
            activeColor={activeVariant.colorInfo.colorFamilies[0]}
            variants={variants}
            colors={colors}
            handleColor={handleColor}
          />
        ) : (
          ""
        )}
      </div>
      <div className={styles.title}>{activeVariant.title}</div>
      {activeVariant.priceInfo.price ===
      activeVariant.priceInfo.originalPrice ? (
        <div className={styles.pricing}>
          <span className={[styles.price].join(" ")}>
            ${activeVariant.priceInfo.price}
          </span>
        </div>
      ) : (
        <>
          <div className={styles.pricing}>
            <span className={styles.discount}>
              <span className={styles.originalPrice}>
                ${activeVariant.priceInfo.originalPrice}
              </span>
              <span className={styles.percent}>
                Save{" "}
                {100 -
                  Math.floor(
                    (activeVariant.priceInfo.price /
                      activeVariant.priceInfo.originalPrice) *
                      100
                  )}
                %
              </span>
            </span>
            <span className={[styles.price].join(" ")}>
              ${activeVariant.priceInfo.price}
            </span>
          </div>
        </>
      )}

      <button>Add to Cart</button>
      <Rating key={product.allMeta.id} rating={product.allMeta.rating} />
    </div>
  );
});

const areEqual = (prevProps, nextProps) => {
  return prevProps._id === nextProps._id;
};
export default React.memo(ProductCard, areEqual);
