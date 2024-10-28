// src/pages/Login.jsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Oops! It seems like your charger is not compatible. Please try again.");
    } else {
      alert('Logged in successfully! Your charger is now fully charged.');
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Helmet>
        <title>Login - Battery-Powered Chargers</title>
        <meta
          name="description"
          content="Log in to your Battery-Powered Chargers account to manage your purchases."
        />
      </Helmet>
      <h2 className="text-3xl font-bold mb-4">Log In to Stay Charged!</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Log In
        </button>
      </form>
      <p className="mt-4">
        Don't have an account?{' '}
        <Link to="/signup" className="text-yellow-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
