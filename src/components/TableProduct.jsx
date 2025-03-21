import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

const TableProduct = () => {
  const { cart, decreaseQty, addToCart, removeFromCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let totalQty = 0;
    let totalPrice = 0;
    if (cart?.items) {
      cart.items.forEach((item) => {
        totalQty += item.qty;
        totalPrice += item.qty * item.price;
      });
    }
    setQty(totalQty);
    setPrice(totalPrice);
  }, [cart]);

  const handleDecreaseQty = (productId, qty) => {
    if (!productId) return;

    if (qty > 1) {
      decreaseQty(productId, 1);
    } else {
      removeFromCart(productId);
    }
  };

  return (
    <table className="table table-bordered border-primary bg-dark text-center">
      <thead>
        <tr>
          <th className="bg-dark text-light">Product Img</th>
          <th className="bg-dark text-light">Title</th>
          <th className="bg-dark text-light">Price</th>
          <th className="bg-dark text-light">Qty</th>
        </tr>
      </thead>
      <tbody>
        {cart?.items?.map((product) => (
          <tr key={product._id}>
            <td className="bg-dark text-light">
              <img src={product.imgSrc} style={{ width: "50px", height: "50px" }} alt="product" />
            </td>
            <td className="bg-dark text-light">{product.title}</td>
            <td className="bg-dark text-light">{product.price}</td>
            <td className="bg-dark text-light">{product.qty}</td>

            {/* Increase Quantity */}
           

            
            {/* Remove Product */}
           
          </tr>
        ))}

        {/* Total Row */}
        <tr>
          <td className="bg-dark text-light"></td>
          <td className="bg-dark text-light">
            <button className="btn btn-primary" style={{ fontWeight: "bold" }}>Total</button>
          </td>
          <td className="bg-dark text-light">
            <button className="btn btn-warning" style={{ fontWeight: "bold" }}>{price}</button>
          </td>
          <td className="bg-dark text-light">
            <button className="btn btn-info" style={{ fontWeight: "bold" }}>{qty}</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableProduct;
