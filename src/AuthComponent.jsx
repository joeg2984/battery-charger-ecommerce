import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL, 
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

function AuthComponent() {
  // State management
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  // Signup handler
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // 1. Create user authentication
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // 2. Create user profile in profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user?.id,
          username,
          email
        })
        .select();

      if (profileError) throw profileError;

      alert('Signup successful! Please check your email to verify.');
    } catch (err) {
      setError(err.message);
    }
  };

  // Username availability check
  const checkUsernameAvailability = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single();

    return !data; // Returns true if username is available
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSignup} className="space-y-4">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required 
          className="w-full p-2 border"
        />
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required 
          className="w-full p-2 border"
        />
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required 
          className="w-full p-2 border"
        />
        <button 
          type="submit" 
          className="w-full p-2 bg-blue-500 text-white"
        >
          Sign Up
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default AuthComponent;