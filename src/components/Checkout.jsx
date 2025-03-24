import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import TableProduct from "./TableProduct";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const Checkout = () => {
  const { cart, userAddress, url, user } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let totalQty = 0;
    let totalPrice = 0;
    if (cart?.items?.length > 0) {
      cart.items.forEach((item) => {
        totalQty += item.qty;
        totalPrice += item.qty * item.price;
      });
    }
    setQty(totalQty);
    setPrice(totalPrice);
  }, [cart]);

  const handlePayment = async () => {
    try {
      if (!user || !user._id) {
        alert("❌ User not logged in!");
        navigate("/login");
        return;
      }

      // Token ko AppState se ya localStorage se fetch kar rahe hain.
      const userToken = localStorage.getItem("token");
      if (!userToken) {
        alert("❌ Authentication token not found!");
        navigate("/login");
        return;
      }

      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
      if (!stripePublicKey) {
        alert("❌ Stripe Public Key is missing!");
        return;
      }

      const stripe = await loadStripe(stripePublicKey);

      // URL banane me extra '/api' add na karein, kyunki 'url' already isko contain karta hai.
      const orderResponse = await axios.post(
        `${url}/payment/checkout`,
        {
          amount: price,
          cartItems: cart?.items,
          userShipping: userAddress,
          userId: user._id,
        },
        {
          headers: { Auth: userToken },
        }
      );

      if (!orderResponse.data.sessionId) {
        alert("❌ Payment session failed!");
        return;
      }

      const { sessionId } = orderResponse.data;
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        alert(`❌ Payment Error: ${result.error.message}`);
      }
    } catch (error) {
      console.error("❌ Payment Error:", error.response?.data || error.message);
      alert(`❌ Payment Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <>
      <div className="container my-3">
        <h1 className="text-center">Order Summary</h1>
        <table className="table table-bordered border-primary bg-dark">
          <thead className="bg-dark">
            <tr>
              <th className="bg-dark text-light text-center">Product Details</th>
              <th className="bg-dark text-light text-center">Shipping Address</th>
            </tr>
          </thead>
          <tbody className="bg-dark">
            <tr>
              <td className="bg-dark text-light">
                <TableProduct cart={cart} />
              </td>
              <td className="bg-dark text-light">
                <ul style={{ fontWeight: "bold" }}>
                  <li>Name: {userAddress?.fullName}</li>
                  <li>Phone: {userAddress?.phoneNumber}</li>
                  <li>Country: {userAddress?.country}</li>
                  <li>State: {userAddress?.state}</li>
                  <li>PinCode: {userAddress?.pincode}</li>
                  <li>Address: {userAddress?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container text-center my-5">
        <button
          className="btn btn-secondary btn-lg"
          style={{ fontWeight: "bold" }}
          onClick={handlePayment}
        >
          Proceed To Pay
        </button>
      </div>
    </>
  );
};

export default Checkout;
