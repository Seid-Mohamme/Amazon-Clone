import { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import styles from "./Results.module.css";
import { productUrl } from "../../Api/endpoints";
import Loader from "../../Components/Loader/Loader";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../Components/Product/ProductCard";
function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { categoryName } = useParams();
  useEffect(() => {
    if (!categoryName) return;
    setIsLoading(true);
    setIsLoading(true);
    // https://fakestoreapi.com/products/category/jewelery
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      // .get(`https://fakestoreapi.com/products/category/${categoryName}`)
      .then((res) => {
        // console.log(res)
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryName]);
  return (
    <LayOut>
      <div>
        <h1 style={{ padding: "10px" }}>Results</h1>
        <p style={{ padding: "10px" }}> Category / {categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.products_container}>
            {results?.map((singleProduct) => {
              return (
                <ProductCard
                  key={singleProduct.id}
                  data={singleProduct}
                  renderADD={true}
                />
              );
            })}
          </div>
        )}
      </div>
    </LayOut>
  );
}

export default Results;
