// import React from "react";
import styles from "./Header.module.css";
import { AiOutlineMenu } from "react-icons/ai";
function LowerHeader() {
  return (
    <div className={styles.lower_header}>
      <ul>
        <li>
          <AiOutlineMenu />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Customer service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
