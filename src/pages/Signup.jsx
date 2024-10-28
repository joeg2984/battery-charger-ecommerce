// src/pages/Signup.jsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) alert(error.message);
    else {
      alert('Signup successful! Please check your email to confirm.');
      navigate('/login');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Helmet>
        <title>Sign Up - Battery-Powered Chargers</title>
        <meta
          name="description"
          content="Create a Battery-Powered Chargers account to start shopping."
        />
      </Helmet>
      <h2 className="text-3xl font-bold mb-4">Sign Up to Charge Ahead!</h2>
      <form onSubmit={handleSignup} className="space-y-4">
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
          Sign Up
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-yellow-500 hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Signup;
