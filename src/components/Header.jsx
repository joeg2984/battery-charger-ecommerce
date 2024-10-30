// src/components/Header.jsx
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { CartContext } from '../context/CartContext'; // Adjust the path as necessary

const Header = ({ session }) => {
  const [clickCount, setClickCount] = useState(0);
  const { cartItems } = useContext(CartContext);

  // Calculate the total number of items in the cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleBatteryClick = () => {
    setClickCount((prev) => prev + 1);
    if (clickCount >= 5) {
      alert('You found the secret charger dance! 🕺⚡');
      setClickCount(0);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('Error logging out');
    } else {
      // Optionally, you can redirect the user after logout
      // window.location.href = '/';
    }
  };

  return (
    <header className="bg-yellow-500 p-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-2xl font-bold text-white"
        onClick={handleBatteryClick}
      >
        ⚡ Battery-Powered Battery Chargers ⚡
      </Link>
      <nav className="flex items-center">
        <Link to="/products" className="text-white mr-4 hover:underline">
          Products
        </Link>
        <Link to="/blog" className="text-white mr-4 hover:underline">
          Blog
        </Link>
        <Link to="/faq" className="text-white mr-4 hover:underline">
          FAQ
        </Link>

        {/* Conditional rendering based on session */}
        {!session ? (
          <>
            <Link to="/login" className="text-white mr-4 hover:underline">
              🤝 Login
            </Link>
            <Link to="/signup" className="text-white mr-4 hover:underline">
              📋 Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-white mr-4 hover:underline"
          >
            👋 Logout
          </button>
        )}

        {/* Cart Link with Item Count */}
        <Link to="/cart" className="relative text-white mr-4 hover:underline">
  <span className="relative inline-block">
    🛒
    {totalItems > 0 && (
      <span
        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center"
      >
        {totalItems}
      </span>
    )}
  </span>
  <span className="ml-1">Cart</span>
</Link>
      </nav>
    </header>
  );
};

export default Header;
