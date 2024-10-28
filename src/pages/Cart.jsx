// src/pages/Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <Helmet>
        <title>Cart - Battery-Powered Chargers</title>
        <meta
          name="description"
          content="Review the chargers you've added to your cart before proceeding to checkout."
        />
      </Helmet>
      <h2 className="text-3xl font-bold mb-6">Your Charged Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is currently empty. Maybe add a charger to keep yourself charged!</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">
                  ${item.price} × {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right">
            <p className="text-2xl font-bold">Total: ${total.toFixed(2)}</p>
            <Link
              to="/checkout"
              className="mt-4 inline-block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
