import React from "react";
import { CategoryData } from "./CategoryData";
import CategoryCard from "./CategoryCard";
import styles from "./Category.module.css";
function Catagory() {
  return (
    <div>
      <section className={styles.category_container}>
        {CategoryData?.map((singleproduct, i) => {
          return <CategoryCard key={i} data={singleproduct} />;
        })}
      </section>
    </div>
  );
}

export default Catagory;
