import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import axios from 'axios';
import { data } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

const Appstate = (props) => {
  const url = "http://localhost:3000/api"
  const [product, setProduct] = useState([])
  const [token, setToken] = useState([])
  const [user, setUser] = useState()
  const [cart, setCart] = useState([])
  const [reload, setReload] = useState(false)
  const [userAddress,setUserAddress] = useState("")
  const [userOrder, setUserOrder] = useState([]);
  const [isAuthentication, setIsAuthentication] = useState(
    localStorage.getItem("isAuthenticated" === "true")
  )

  useEffect(() => {
    const fetchProduct = async (req, res) => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json"
        },
        withCredentials: true
      })
      console.log(api.data.product);
      setProduct(api.data.product)
      userProfile()
    }
    fetchProduct();
    userCart();
    getAddress();
    user_Order()
  }, [token, reload])

  useEffect(() => {
    let lstoken = localStorage.getItem("token")

    if (lstoken) {
      setToken(lstoken)
      setIsAuthentication(true)
    }

  }, [])


  //register user
  const register = async (name, email, password) => {
    const api = await axios.post(`${url}/user/register`, { name, email, password }, {
      headers: {
        "Content-Type": "Application/json"
      },
      withCredentials: true
    })
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    return api.data
    // alert(api.data.message)
    // console.log("user Register",api);
  }

  //login user
  const login = async (email, password) => {
    const api = await axios.post(`${url}/user/login`, { email, password }, {
      headers: {
        "Content-Type": "Application/json"
      },
      withCredentials: true
    })
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    setToken(api.data.token)
    setIsAuthentication(true)
    localStorage.setItem("token", api.data.token)
    // console.log("User Login",api.data);
    return api.data
  }

  //logout
  const logout = () => {
    setIsAuthentication(false)
    setToken(" ")
    localStorage.removeItem("token")
    toast.success("Logout Successfully ...!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  //user profile
  const userProfile = async (req, res) => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "Apllication/json",
        "Auth": token
      },
      withCredentials: true,
    })
    // console.log(api.data);
    setUser(api.data.user)

  }
  //add to cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const token = localStorage.getItem("token"); // 🟢 Token store se le rahe hain
    console.log("🔹 Stored Token:", token);

    if (!token) {
      toast.error("❌ Please login first!");
      return;
    }

    try {
      // 🟢 Debugging ke liye console log
      console.log("📌 Sending Data:", { productId, title, price, qty, imgSrc });

      // 🛑 Ensure productId is valid
      if (!productId) {
        console.error("❌ productId is missing!");
        toast.error("❌ Product ID is missing!");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/cart/add",
        { productId, title, price, qty, imgSrc },
        {
          headers: {
            "Content-Type": "application/json",
            "Auth": token,  // ✅ Correctly setting authentication token
          },
          withCredentials: true,
        }
      );
      setReload(!reload)
      console.log("✅ Cart all :", response.data);
      toast.success("✅ Item added/updated in cart!");
    } catch (error) {
      console.error("❌ Cart API Error:", error.response?.data || error.message);
      toast.error("❌ Failed to add item to cart!");
    }
  };


  // user cart
  const userCart = async (productId, title, price, qty, imgSrc) => {
    try {
      const token = localStorage.getItem("token"); // Token get karo
      if (!token) {
        console.error("No token found! Redirecting to login...");
        return;
      }

      const response = await axios.get(`${url}/cart/user`, {
        params: { productId, title, price, qty, imgSrc },
        headers: {
          "Content-Type": "application/json",
          "Auth": token, // ✅ Ensure correct Auth header
        },
        withCredentials: true,
      });

      console.log("✅ Cart Response:", response.data);
      setCart(response.data.cart);
    } catch (error) {
      console.error("❌ Error fetching cart data:", error);
      toast.error("Failed to fetch cart data. Please login again.");
    }
  };

  //qty remove 
  const decreaseQty = async (productId, qty) => {
    try {
      if (!productId) return;
      const { data } = await axios.post(
        "http://localhost:3000/api/cart/decrease",
        { productId, qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(data.cart);
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };



  //remove qty
  const removeFromCart = async (productId) => {
    try {
      console.log("🛒 Sending productId to backend:", productId);

      if (!productId) {
        console.error("❌ Error: productId is undefined!");
        return;
      }

      const token = localStorage.getItem("token"); // ✅ Get token from localStorage
      if (!token) {
        console.error("❌ Error: Token is missing!");
        return;
      }

      const { data } = await axios.delete(
        `http://localhost:3000/api/cart/remove/${productId}`, // ✅ FIXED URL
        {
          headers: {
            Auth: token,
          },
        }
      );

      setReload(!reload); // ✅ Cart ko reload karein
      console.log("✅ Product removed from cart:", data);

      toast.success("Removed Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    catch (error) {
      console.error("❌ Error removing product:", error.response?.data || error.message);
    }
  };

  //remove from cart
  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`,{
      headers:{
        "Content-Type":"Application/json",
        Auth: token
      },
      withCredentials: true
    })
    setReload(!reload)
    toast.success("Removed Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  //addres 
  const shippingAddress = async (fullName, address, city, state, country, pincode, phoneNumber) => {
    const api = await axios.post(`${url}/address/add`,{fullName, address, city, state, country, pincode, phoneNumber},{
      headers:{
        "Content-Type":"Application/json",
        Auth: token
      },
      withCredentials: true
    })
    setReload(!reload)
    toast.success("Address Add Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    return api.data
  }

  // get User latest address
  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
     console.log("user address ", api.data.userAddress);
    setUserAddress(api.data.userAddress);
  };

  // get User order
  const user_Order = async () => {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    //  console.log("user order ", api.data);
    setUserOrder(api.data)
    
  };
console.log("user order = ", userOrder);

  return (
    <AppContext.Provider value={{ product, register, login, url, token, setIsAuthentication, isAuthentication, logout, user, addToCart, cart, decreaseQty, removeFromCart,clearCart,shippingAddress,getAddress,userAddress,decreaseQty,userOrder }}>
      {props.children}
    </AppContext.Provider>
  )
}
export default Appstate