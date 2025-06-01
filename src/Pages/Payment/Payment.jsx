import React, { useContext, useState } from "react";
import styles from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import ProductCard from "../../Components/Product/ProductCard";
//to grab our datacontext....
import { DataContext } from "../../DataProvider/DataProvider";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/Firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/Action.Type";
function Payment() {
  const [{ user, basket }, disPatch] = useContext(DataContext);

  // For total price defined on Cart
  const totalproduct = basket.reduce((sum, item) => sum + item.amount, 0);
  // }, 0);
  // for Cart number to display total items
  const totalprice = basket.reduce(
    (amount, item) => amount + item.price * item.amount,
    0
  );
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  // Hooks copied from stripe Docs
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  // to handle the error
  const handleChange = (e) => {
    // console.log(e)
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };
  // to handle the payment
  const handlePayment = async (e) => {
    e.preventDefault();

    if (totalprice <= 0) {
      alert("Total must be greater than $0");
      return;
    }
    try {
      setProcessing(true);
      // 1. Contact backend to create a payment intent
      // 1. Backend  || function ....>contact to the client
      // const response = await axiosInstance({
      //   method: "POST",
      //   url: `/payment/create?totalprice=${totalprice * 100}`, // in cents
      // });
      const response = await axiosInstance.post(
        `/payment/create?totalprice=${totalprice * 100}`
      );
      // console.log(response.data);

      const clientSecret = response.data?.clientSecret;
      console.log("Client Secret:", clientSecret);

      // 2. Confirm payment on client side
      // 2. client side (react side conformation)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // console.log("Payment confirmation:", confirmation);
      if (!paymentIntent) {
        setCardError("Payment confirmation failed.");
        return;
      }

      console.log("Basket before saving:", basket);
      console.log("PaymentIntent:", paymentIntent);
      setProcessing(false);
      // 3. Save order to DB, clear basket (optional step) ...
      // 3. after the confirmation --> order firestore database save, clear
      // added the solution for images not displayed
      const cleanedBasket = basket.map(
        ({ id, title, price, amount, image, rating, description }) => ({
          id,
          title,
          price,
          amount,
          image,
          rating,
          description,
        })
      );
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: cleanedBasket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // await db
      //   .collection("student")
      //   .doc("course_data")
      //   .set({ name: "MERN", job: "fullstack developer" });
      // console.log("done")
      //make empty basket
      disPatch({
        type: Type.EMPTY_BASKET,
      });
      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new order" } });
    } catch (error) {
      console.error("Payment failed:", error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* Header */}
      <div className={styles.payment_header}>
        Checkout({totalproduct}) items
      </div>

      {/* Checkout{2} */}
      {/* Payment Method */}

      <section className={styles.payment}>
        {/* address */}
        <div className={styles.flex}>
          <h3>Delivery Address:</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lan</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        {/* Product */}
        <div className={styles.flex}>
          <h3>Review Items and delivery;</h3>
          <div>
            {basket?.map((item) => (
              <>
                <p>Total Amount:{item.amount}</p>
                <ProductCard product={item} flex={true} />
              </>
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}

        {/* to implement stripe in client side using their own payment form*/}
        <div className={styles.flex}>
          <h3>Payment Methods</h3>
          <div className={styles.payment_card_container}>
            <div className={styles.payment_details}>
              {/* for our payment submission */}
              <form onSubmit={handlePayment}>
                {/* for error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />

                {/* Price */}
                <div className={styles.payment_price}>
                  <div>
                    <span style={{ display: "flex", gab: "20px" }}>
                      <p>Total Order | </p>
                      <CurrencyFormat amount={totalprice} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={styles.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
