import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { db } from "../../Utility/Firebase";
import { DataContext } from "../../../src/DataProvider/DataProvider";
import style from "./orders.module.css";
import ProductCard from "../../Components/Product/ProductCard";
function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      // console.log("in if")
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          // console.log(snapshat)
          setOrders(
            snapshot.docs.map((doc, i) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);
  // console.log(orders)
  return (
    <LayOut>
      <section className={style.container}>
        <div className={style.Orders_container}>
          <h2>Your Orders</h2>
          {orders?.length === 0 && <div>You don't have order yet!!!</div>}
          <div>
            {/* here lis of orders from firebase database */}

            {orders?.map((eachOrders, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID:{eachOrders.id}</p>
                  {eachOrders?.data?.basket?.map((order) => {
                    return (
                      <>
                        <p>Total amount: {order.amount}</p>
                        <ProductCard
                          product={order}
                          flex={true}
                          showButton={false}
                          data={order}
                          key={order.id}
                        />
                      </>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
