// import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../DataProvider/DataProvider";
import { Type } from "../../Utility/Action.Type";
function ProductCard({ product = {}, flex, renderDesc, showButton = true }) {
  if (!product) return null;
  const { image, title, id, rating, price, description, amount } = product;
  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description },
      // console.log("Add to cart:", title);
    });
  };

  // console.log(state);
  return (
    <div
      className={`${styles.card_container} ${
        flex ? styles.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "590" }}>{description}</div>}
        <div className={styles.rating}>
          {/* rating */}
          <Rating value={rating?.rate} precision={0.5} />
          {/* count */}
          <small>{60}</small>
          {/* price */}
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        {/* {showButton && ...used for displaying the images ...it also apply on orders.jsx */}
        {showButton && (
          <button className={styles.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
