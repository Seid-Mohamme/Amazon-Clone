// import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Payment from "./Pages/Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51RS2lnD3tABFFSmWDeczfdQv3Nx1LVcke9xN0n5mQXaPGpnIvpYqspqwRrISffx5t6K3kEsfP0Bz6cj91YYHdfu300D2kVz2ql"
);
function Routing() {
  return (
    <div>
      <Router>
        <Routes basename="/amazon-clone">
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/orders"
            element={
              // this is an authentication...if anyone try to order before login
              <ProtectedRoute
                msg={"You must login to access your orders"}
                redirect={"/orders"}
              >
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/payment"
            element={
              // This is a protection, when anyone try to proceed payment before login.
              <ProtectedRoute
                msg={"You must login to pay"}
                redirect={"/payment"}
              >
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route path="/category/:categoryName" element={<Results />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Routing;
