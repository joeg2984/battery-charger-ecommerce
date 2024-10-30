import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { insertOrUpdateUserData } from '../userHelpers';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignupWithMagicLink = async (e) => {
    e.preventDefault();

    try {
      console.log('Attempting to sign up user with magic link...');
      
      // Send magic link to the user's email
      const { data, error } = await supabase.auth.signInWithOtp({ email });

      if (error) {
        console.error('Error sending magic link:', error.message);
        setErrorMessage(error.message);
        return;
      }

      alert('Signup successful! Please check your email for the magic link to complete the login.');
    } catch (error) {
      console.error('Signup process failed:', error.message);
      setErrorMessage(error.message);
    }
  };

  // Effect to run when the user is logged in
  React.useEffect(() => {
    const getUserAndInsertData = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        // User is logged in
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
        <title>Sign Up - Battery-Powered Chargers</title>
        <meta
          name="description"
          content="Create a Battery-Powered Chargers account to start shopping."
        />
      </Helmet>
      <h2 className="text-3xl font-bold mb-4">Sign Up to Charge Ahead!</h2>
      <form onSubmit={handleSignupWithMagicLink} className="space-y-4">
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
        Already have an account?{' '}
        <Link to="/login" className="text-yellow-500 hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Signup;
