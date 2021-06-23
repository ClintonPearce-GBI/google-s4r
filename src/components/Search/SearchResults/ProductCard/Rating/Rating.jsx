import React from "react";
import styles from "./Rating.module.scss";

const Rating = (props) => {
  // get the rating
  let rating = props.rating?.averageRating;

  const stars = (() => {
    // stars empty array
    const stars = [];

    // if there's a rating
    if (rating) {
      // get the nearest .5 value for the rating (4.6 -> 4.5, 3.2 -> 3)
      rating = (Math.round(rating * 2) / 2).toFixed(1);

      // the integer value
      const fullStars = Math.floor(rating);
      // if there's a remainder of dividing by 1
      const halfStars = !!(rating % 1);
      // and 5 empty stars minus any whole stars without remainder
      const emptyStars = Math.floor(5 - rating);

      // add the full stars
      for (let i = 0; i !== fullStars; i++) stars.push(1);
      // add the half star (boolean, it's there or it isn't)
      halfStars && stars.push(0.5);
      // add the empty stars
      for (let i = 0; i !== emptyStars; i++) stars.push(0);
    } else {
      // push 5 empty stars to stars
      for (let i = 0; i !== 5; i++) stars.push(0);
    }
    return stars;
  })();

  return (
    <div className={styles.rating}>
      {stars.map((star, index) => {
        const src =
          star === 1
            ? "/img/star-solid.svg"
            : star === 0.5
            ? "/img/star-half-alt-solid.svg"
            : "/img/star-regular.svg";
        return <img className={styles.star} src={src} key={index} alt="" />;
      })}
    </div>
  );
};

export default Rating;
