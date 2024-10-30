import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { insertOrUpdateUserData } from '../userHelpers';

const Login = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginWithMagicLink = async (e) => {
    e.preventDefault();

    try {
      console.log('Attempting to log in user with magic link...');
      
      // Send magic link to the user's email
      const { data, error } = await supabase.auth.signInWithOtp({ email });

      if (error) {
        console.error('Error sending magic link:', error.message);
        setErrorMessage(error.message);
        return;
      }

      alert('Login successful! Please check your email for the magic link to complete the login.');
    } catch (error) {
      console.error('Login process failed:', error.message);
      setErrorMessage(error.message);
    }
  };

  // Effect to run when the user is logged in
  React.useEffect(() => {
    const getUserAndInsertData = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        console.log('User session found:', session.user);
        await insertOrUpdateUserData(session.user); // Insert user data if not already in the table
        navigate('/home'); // Redirect after successful login
      }
    };

    getUserAndInsertData();
  }, []);

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
      <form onSubmit={handleLoginWithMagicLink} className="space-y-4">
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
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Send Magic Link
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
