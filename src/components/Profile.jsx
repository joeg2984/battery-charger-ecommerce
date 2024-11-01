// src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Profile = () => {
  const [profile, setProfile] = useState({ full_name: '', avatar_url: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        const { user } = session;

        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error.message);
        } else {
          setProfile(data);
        }
      }

      setLoading(false);
    };

    getProfile();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();

    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      const { user } = session;

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error.message);
      } else {
        alert('Profile updated successfully!');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>My Profile</h2>
      <form onSubmit={updateProfile}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={profile.full_name}
            onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
          />
        </div>
        <div>
          <label>Avatar URL:</label>
          <input
            type="text"
            value={profile.avatar_url}
            onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
