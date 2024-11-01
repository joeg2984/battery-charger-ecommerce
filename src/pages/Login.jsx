import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log('Attempting to log in user...');
      
      // Log in user with email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        setErrorMessage(error.message);
        return;
      }

      // Notify the user and navigate to the home page
      alert('Login successful! Redirecting...');
      navigate('/home');
    } catch (error) {
      console.error('Login process failed:', error.message);
      setErrorMessage(`Login process failed: ${error.message}`);
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
        {errorMessage && (
          <p className="text-red-500">{errorMessage}</p>
        )}
        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            autoComplete="email"
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
            autoComplete="current-password"
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
