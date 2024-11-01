// src/components/Welcome.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserProfile = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error.message);
        navigate('/login');
        return;
      }

      if (session) {
        const user = session.user;

        // Upsert the user's profile
        const { error: upsertError } = await supabase.from('profiles').upsert({
          id: user.id,
          full_name: user.user_metadata.full_name || '',
          avatar_url: user.user_metadata.avatar_url || '',
        });

        if (upsertError) {
          console.error('Error upserting profile:', upsertError.message);
        }

        navigate('/home');
      } else {
        navigate('/login');
      }
    };

    handleUserProfile();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Welcome;
