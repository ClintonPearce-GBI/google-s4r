import React, { useRef } from "react";
import styles from "./SearchField.module.scss";

const SearchField = (props) => {
  const searchValue = useRef(null);
  function handleSubmit(e) {
    e.preventDefault();
    props.handleSearch(searchValue.current.value);
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        className={styles.search}
        ref={searchValue}
        type="text"
        placeholder="Jeans, Pants, etc"
        defaultValue="Jeans"
      />
      <button className={styles.submit} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchField;
