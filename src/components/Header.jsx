// src/components/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Header = ({ session }) => {
  const [clickCount, setClickCount] = useState(0);

  const handleBatteryClick = () => {
    setClickCount((prev) => prev + 1);
    if (clickCount >= 5) {
      alert('You found the secret charger dance! 🕺⚡');
      setClickCount(0);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert('Error logging out');
  };

  return (
    <header className="bg-yellow-500 p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-white">
        Battery-Powered Chargers
      </Link>
      <nav className="flex items-center">
        <Link to="/products" className="text-white mr-4 hover:underline">
          Shockingly Good Deals
        </Link>
        <Link to="/blog" className="text-white mr-4 hover:underline">
          Blog
        </Link>
        <Link to="/faq" className="text-white mr-4 hover:underline">
          FAQ
        </Link>
        {session ? (
          <>
            <button
              onClick={handleLogout}
              className="text-white mr-4 hover:underline"
            >
              Logout
            </button>
            <Link to="/cart" className="text-white hover:underline">
              ⚡ Cart
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white mr-4 hover:underline">
              ⚡ Login
            </Link>
            <Link to="/signup" className="text-white hover:underline">
              ⚡ Sign Up
            </Link>
          </>
        )}
        {/* Battery Icon */}
        <button onClick={handleBatteryClick} className="ml-4 text-2xl">
          🔋
        </button>
      </nav>
    </header>
  );
};

export default Header;
