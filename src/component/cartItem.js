import React from 'react';

const CartItem = ({ item }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="cart-item-details" style={{color:'white',textAlign:'right'}}>
        <h3>name:{item.name}</h3>
        <p>description:{item.description}</p>
        <p>Price: ${item.price}</p>
      </div>
    </div>
  );
};

export default CartItem;
