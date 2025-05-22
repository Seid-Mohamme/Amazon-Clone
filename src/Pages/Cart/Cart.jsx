import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../../src/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import styles from "./cart.module.css";
import { Type } from "../../../src/Utility/Action.Type";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import "./Cart.module.css";
function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  console.log(basket);
  // const totalprice = basket.reduce((sum, item) => {
  //   return item.totalprice * sum;
  // }, 0);
  const totalprice = basket.reduce((sum, item) => {
    return sum + item.price * (item.amount || 1);
  }, 0);

  // console.log(totalprice)
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };
  return (
    <LayOut>
      <section className={styles.cart_container}>
        <div className={styles.item_container}>
          <h2>Hello Dear, </h2>
          <h3>Your Shoping Basket is Below</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Oh! Your basket is empty, please try to add an items!</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className={styles.cart_product}>
                  <ProductCard
                    key={i}
                    product={item}
                    flex={true}
                    renderDesc={true}
                    renderADD={false}
                  />
                  <div className={styles.btn_container}>
                    <button
                      className={styles.btn}
                      onClick={() => increment(item)}
                    >
                      <IoIosArrowUp size={35} />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={styles.btn}
                      onClick={() => decrement(item.id)}
                    >
                      <IoIosArrowDown size={35} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={styles.subtotal}>
            <div>
              <p>Total Cart({basket?.length}) items</p>
              <CurrencyFormat amount={totalprice} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contain a gift</small>
            </span>
            <Link to="/payments">Proceed to Checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
