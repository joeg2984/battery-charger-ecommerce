// src/userHelpers.js
import { supabase } from './supabaseClient';

// Check if user exists in the custom "users" table
export const insertOrUpdateUserData = async (user) => {
  try {
    // Check if user already exists in custom "users" table
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    // If user does not exist, insert new user data
    if (!data) {
      const { insertError } = await supabase
        .from('users')
        .insert([{ user_id: user.id, email: user.email }]);

      if (insertError) {
        throw insertError;
      }
      console.log('User data successfully inserted.');
    }
  } catch (error) {
    console.error('Error inserting/updating user data:', error.message);
  }
};
