// import React from "react";
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import LowerHeader from "./LowerHeader";
import { useContext } from "react";
import { DataContext } from "../../DataProvider/DataProvider";
import { AiOutlineDeploymentUnit } from "react-icons/ai";

const Header = () => {
  const [{ basket }, disPatch] = useContext(DataContext);
  // for Cart number display total
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  // console.log(basket.length);
  return (
    <div className={styles.header_fixed}>
      <div className={styles.fixed_header}>
        <div className={styles.header_container}>
          {/* Logo */}
          <div className={styles.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
                alt="Amazon Logo"
              />
            </Link>
            {/* delivery */}
            <div className={styles.delivery}>
              <span>
                {/* icon */}
                <SlLocationPin size={15} />
              </span>

              <div>
                <p>Delivered To</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={styles.search}>
            {/* {/* Search Section */}
            <select name="" id="">
              <option value="">All</option>
              <option value="">Computer</option>
              <option value="">Book</option>
              <option value="">Electronics</option>
            </select>
            <input type="text" />
            {/* Icon */}
            <BsSearch size={25} />
          </div>
          {/* Other Section */}
          {/* Right Side Link */}
          <div className={styles.order_container}>
            <Link to="" className={styles.language}>
              <div className={styles.lang2}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                  alt=""
                />

                <select name="" id="">
                  <option value="">EN</option>
                  <option value="">AM</option>
                </select>
              </div>
            </Link>

            <Link to="">
              <p>Hello, Sign In</p>
              <span>Account & Lists</span>
            </Link>
            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>

            <Link to="/cart" className={styles.cart}>
              <BiCart size={35} />
              {/* <img src="cart2.png" alt="" /> */}
              <span>{totalItem}</span>
              {/* <p>Cart</p> */}
              {/* <span>{TotalItem}</span> */}
            </Link>
          </div>
        </div>
      </div>
      <LowerHeader />
    </div>
  );
};

export default Header;
