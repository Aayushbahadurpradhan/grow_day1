import React from 'react';
import useStore from '../slices/store';

const CartStatus = () => {
  const cart = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);
  const clearCart = useStore((state) => state.clearCart);

  return (
    <div>
      <h2>Cart ({cart.length})</h2>
      <button onClick={() => addToCart({ id: Date.now(), name: "Item " + Date.now() })}>
        Add Item
      </button>
      <button onClick={clearCart}>Clear Cart</button>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CartStatus;
