import React from "react";
import { BaseURL } from "../../global";

const CartItem = ({ item, onUpdateQuantity, handleDelete }) => {
  const handleUpdateQuantity = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1) {
      onUpdateQuantity(item._id, newQuantity);
    }
  };


  return (
    <div className="cart-item">
      <img
        style={{ height: "100px", width: "100px" }}
        src={`${BaseURL}/productImages/${item.product_id.photo}`}
        alt={item.product_id.name}
        className="cart-item-image"
      />
      <div className="cart-item-details">
        <h3>{item.product_id.name}</h3>
        <p>Price: Rs. {item.amount}</p>
        <p>
          Quantity:
          <input
            type="number"
            value={item.quantity}
            onChange={handleUpdateQuantity}
            min="1"
          />
        </p>
        <button onClick={() => handleDelete(item._id)} className="delete-button">Remove Product</button>
      </div>
    </div>
  );
};

export default CartItem;
