import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart} = useContext(AppContext);
  const navigate = useNavigate();
  const [localCart, setLocalCart] = useState(cart || { items: [] });
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  // ✅ Cart update hone par Total Price aur Qty update karega
  useEffect(() => {
    setLocalCart(cart || { items: [] });

    if (!cart || !cart.items || cart.items.length === 0) {
      setQty(0);
      setPrice(0);
      return;
    }

    let totalQty = 0;
    let totalPrice = 0;

    cart.items.forEach((product) => {
      totalQty += product.qty || 0;
      totalPrice += (product.price || 0) * (product.qty || 0);
    });

    setQty(totalQty);
    setPrice(totalPrice);
  }, [cart]);

  console.log("🛒 My Cart:", cart);

  // ✅ Quantity decrease function
  const handleDecreaseQty = async (productId) => {
    if (!productId) {
      console.error("❌ Product ID is missing!");
      return;
    }

    await decreaseQty(productId, 1);

    // ✅ Manually update localCart & Total Price
    setLocalCart((prevCart) => {
      const updatedItems = prevCart.items
        .map((item) => 
          item.productId === productId ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0); // Agar qty 0 ho toh remove kar do

      // ✅ Calculate new total price & quantity
      let totalQty = 0;
      let totalPrice = 0;
      updatedItems.forEach((product) => {
        totalQty += product.qty;
        totalPrice += product.qty * product.price;
      });

      setQty(totalQty);
      setPrice(totalPrice);

      return { ...prevCart, items: updatedItems };
    });
  };

  // ✅ Remove from cart function
  const handleRemoveFromCart = async (productId) => {
    if (!productId) {
      console.error("❌ Product ID is missing!");
      return;
    }

    await removeFromCart(productId);

    // ✅ Update localCart & recalculate total price
    setLocalCart((prevCart) => {
      const updatedItems = prevCart.items.filter((item) => item.productId !== productId);

      // ✅ Calculate new total price & quantity
      let totalQty = 0;
      let totalPrice = 0;
      updatedItems.forEach((product) => {
        totalQty += product.qty;
        totalPrice += product.qty * product.price;
      });

      setQty(totalQty);
      setPrice(totalPrice);

      return { ...prevCart, items: updatedItems };
    });
  };

  // ✅ Add to Cart function (Fix UI update issue)
  const handleAddToCart = async (product) => {
    await addToCart(product.productId, product.title, product.price / product.qty, 1, product.imgSrc);

    // ✅ Manually update localCart
    setLocalCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.productId === product.productId ? { ...item, qty: item.qty + 1 } : item
      );

      // Agar product pehle se exist nahi karta, toh add karna padega
      const existingProduct = prevCart.items.find((item) => item.productId === product.productId);
      if (!existingProduct) {
        updatedItems.push({ ...product, qty: 1 });
      }

      // ✅ Calculate new total price & quantity
      let totalQty = 0;
      let totalPrice = 0;
      updatedItems.forEach((product) => {
        totalQty += product.qty;
        totalPrice += product.qty * product.price;
      });

      setQty(totalQty);
      setPrice(totalPrice);

      return { ...prevCart, items: updatedItems };
    });
  };

  return (
    <div className="container my-4">
      {/* Total Qty & Total Price */}
      <div className="d-flex justify-content-center align-items-center mb-3">
        <button className="btn btn-warning btn-sm mx-2"style={{
          width:"150px",
          height:"60px",
          fontSize:"20px",
          fontWeight:"bold",
          marginTop:"40px"
        }}>Total Qty: {qty}</button>
        <button className="btn btn-info btn-sm mx-2"style={{
          width:"150px",
          height:"60px",
          fontSize:"20px",
          fontWeight:"bold",
          marginTop:"40px"
        }}>Total Price: ₹{price}</button>
      </div>

      {/* Cart Items */}
      {localCart?.items?.length > 0 ? (
        localCart.items.map((product) => (
          <div key={product._id} className="row bg-dark text-white p-3 mb-3 rounded align-items-center">
            {/* Product Image */}
            <div className="col-md-2 text-center">
              <img
                src={product.imgSrc}
                alt={product.title}
                className="img-fluid rounded"
                style={{ maxWidth: "80px", height: "auto" }}
              />
            </div>

            {/* Product Details */}
            <div className="col-md-6">
              <h5 className="mb-1">{product.title}</h5>
              <p className="mb-1">Price: ₹{product.price}</p>
              <p className="mb-0">Qty: {product.qty}</p>
            </div>

            {/* Buttons */}
            <div className="col-md-4 text-end">
              <button
                className="btn btn-warning btn-sm mx-1"
                onClick={() => handleDecreaseQty(product.productId)}
              >
                Qty--
              </button>
              <button
                className="btn btn-info btn-sm mx-1"
                onClick={() => handleAddToCart(product)}
              >
                Qty++
              </button>
              <button
                className="btn btn-danger btn-sm mx-1"
                onClick={() => handleRemoveFromCart(product.productId)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-muted"style={{
          fontSize:"50px",
          fontWeight:"bolder",
          marginTop:"150px"
        }}>Your cart is empty!</p>
      )}

      {cart?.items?.length>0 &&(
        <div className="container text-center">
        <button onClick={()=>navigate("/shipping")}   className="btn btn-warning mx-3" 
         style={{fontWeight:"bold"}}
        >Checkout</button>
        <button className="btn btn-danger mx-3" style={{fontWeight:"bold"}} 
        onClick={clearCart}
        >Clear Cart</button>
       </div>
      )}

      
    </div>
  );
};

export default Cart;
