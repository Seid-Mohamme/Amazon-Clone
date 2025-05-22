import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import styles from "./Product.module.css";
import axios from "axios";
function Product() {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        // console.log(res);
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        isLoading(false);
      });
  }, []);
  return (
    <section className={styles.product_image}>
      {products?.map((singleProduct) => {
        return <ProductCard product={singleProduct} key={singleProduct.id} />;
        // console.log(singleProduct.image);
      })}
    </section>
  );
}

export default Product;
