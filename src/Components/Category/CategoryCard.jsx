// import React from "react";
import styles from "./Category.module.css";
import { Link } from "react-router-dom";
// import "./Category.module.css";
function CategoryCard(props,flex) {
  const { data } = props;
  return (
    <div className={styles.category}>
      <Link to={`/category/${data.name}`}>
        <span>{data.category}</span>
        <img src={data.imageLink} alt={data.title} />
        <p>Shop Now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
