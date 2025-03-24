import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Appstate = (props) => {
  const url = "http://localhost:3000/api";
  
  console.log("url",url);
  
  const [product, setProduct] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // ✅ Token from localStorage
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [userOrder, setUserOrder] = useState([]);
  const [isAuthentication, setIsAuthentication] = useState(!!token); // ✅ Check token

  // ✅ Load User Profile if Token Exists
  useEffect(() => {
    if (token) {
      userProfile();
      fetchProduct();
      userCart();
      getAddress();
      user_Order();
    }
  }, [token, reload]);

  // 🛠 Fetch Products
  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`${url}/product/all`, { withCredentials: true });
      setProduct(data.product);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
  };

  // 🛠 Register User
  const register = async (name, email, password) => {
    const { data } = await axios.post(`${url}/user/register`, { name, email, password });
    toast.success(data.message);
    return data;
  };

  // 🛠 Login User
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${url}/user/login`, { email, password });
      toast.success(data.message);

      setToken(data.token);
      localStorage.setItem("token", data.token);
      setIsAuthentication(true);

      await userProfile(); // ✅ Fetch user after login
      return data;
    } catch (error) {
      console.error("❌ Login Error:", error);
      toast.error("❌ Login Failed!");
    }
  };

  // 🛠 Logout
  const logout = () => {
    setIsAuthentication(false);
    setToken("");
    setUser(null); // ✅ Reset user state
    localStorage.removeItem("token");
    toast.success("✅ Logout Successfully!");
  };

  // 🛠 Get User Profile
  const userProfile = async () => {
    const userToken = token || localStorage.getItem("token"); // ✅ Ensure token is retrieved
    if (!userToken) return console.error("❌ No Token Found!");

    try {
      const { data } = await axios.get(`${url}/user/profile`, {
        headers: { Auth: userToken },
        withCredentials: true,
      });
      setUser(data.user);
    } catch (error) {
      console.error("❌ Error fetching user profile:", error);
    }
  };

  // 🛠 Add to Cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const userToken = token || localStorage.getItem("token");
    if (!userToken) return toast.error("❌ Please login first!");

    try {
      await axios.post(
        `${url}/cart/add`,
        { productId, title, price, qty, imgSrc },
        { headers: { Auth: userToken }, withCredentials: true }
      );
      setReload(!reload);
      toast.success("✅ Item added to cart!");
    } catch (error) {
      console.error("❌ Cart API Error:", error);
    }
  };

  // 🛠 Fetch User Cart
  const userCart = async () => {
    const userToken = token || localStorage.getItem("token");
    if (!userToken) return;

    try {
      const { data } = await axios.get(`${url}/cart/user`, {
        headers: { Auth: userToken },
        withCredentials: true,
      });
      setCart(data.cart);
    } catch (error) {
      console.error("❌ Error fetching cart data:", error);
    }
  };

  // 🛠 Remove from Cart
  const removeFromCart = async (productId) => {
    const userToken = token || localStorage.getItem("token");
    if (!userToken || !productId) return;

    try {
      await axios.delete(`${url}/cart/remove/${productId}`, {
        headers: { Auth: userToken },
      });
      setReload(!reload);
      toast.success("✅ Item removed from cart!");
    } catch (error) {
      console.error("❌ Error removing product:", error);
    }
  };

  // 🛠 Clear Cart
  const clearCart = async () => {
    const userToken = token || localStorage.getItem("token");
    if (!userToken) return;

    try {
      await axios.delete(`${url}/cart/clear`, {
        headers: { Auth: userToken },
        withCredentials: true,
      });
      setReload(!reload);
      toast.success("✅ Cart cleared!");
    } catch (error) {
      console.error("❌ Error clearing cart:", error);
    }
  };

  // 🛠 Add Shipping Address
  const shippingAddress = async (fullName, address, city, state, country, pincode, phoneNumber) => {
    const userToken = token || localStorage.getItem("token");
    if (!userToken) return;

    try {
      const { data } = await axios.post(
        `${url}/address/add`,
        { fullName, address, city, state, country, pincode, phoneNumber },
        { headers: { Auth: userToken }, withCredentials: true }
      );
      setReload(!reload);
      toast.success("✅ Address added!");
      return data;
    } catch (error) {
      console.error("❌ Error adding address:", error);
    }
  };

  // 🛠 Get User Address
  const getAddress = async () => {
    const userToken = token || localStorage.getItem("token");
    if (!userToken) return;

    try {
      const { data } = await axios.get(`${url}/address/get`, {
        headers: { Auth: userToken },
        withCredentials: true,
      });
      setUserAddress(data.userAddress);
    } catch (error) {
      console.error("❌ Error fetching address:", error);
    }
  };

  // 🛠 Get User Orders
  const user_Order = async () => {
    const userToken = token || localStorage.getItem("token");
    if (!userToken) return;

    try {
      const { data } = await axios.get(`${url}/payment/userorder`, {
        headers: { Auth: userToken },
        withCredentials: true,
      });
      setUserOrder(data);
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
    }
  };

  return (
    <AppContext.Provider value={{
      product, register, login, logout, token, isAuthentication, 
      addToCart, cart, removeFromCart, clearCart, 
      shippingAddress, getAddress, userAddress, userOrder,
      user,url // ✅ Added user to context
    }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default Appstate;
