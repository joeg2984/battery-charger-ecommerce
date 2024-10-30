// src/components/Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return <p className="p-4">Your cart is currently empty.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center mb-2 border-b pb-2"
          >
            <div>
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-gray-600">
                Price: ${item.price.toFixed(2)} each
              </p>
            </div>
            <div>
              <p className="text-lg font-bold">
                ${ (item.price * item.quantity).toFixed(2) }
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <p className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</p>
        <button
          onClick={clearCart}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
        {/* You can add a Checkout button or functionality here */}
      </div>
    </div>
  );
};

export default Cart;
