// src/components/Reviews.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });
      if (error) console.error('Error fetching reviews:', error);
      else setReviews(data);
    };

    fetchReviews();

    // Get current session
    setSession(supabase.auth.getSession());

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: currentSession, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !currentSession.data.session) {
      alert('Please log in to leave a review.');
      return;
    }

    const { user } = currentSession.data.session;

    const { error } = await supabase.from('reviews').insert([
      {
        product_id: productId,
        user_id: user.id, // or user.email for display
        rating,
        comment,
      },
    ]);

    if (error) alert(error.message);
    else {
      alert('Review submitted! Your charger is now even more charged.');
      setRating(5);
      setComment('');
      // Refresh reviews
      const { data, error: fetchError } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });
      if (fetchError) console.error('Error fetching reviews:', fetchError);
      else setReviews(data);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to leave a charger-friendly comment!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-2">
              <p className="font-semibold">{'⭐'.repeat(review.rating)}</p>
              <p>{review.comment}</p>
              <p className="text-sm text-gray-500">
                - {review.user_id} on {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
      {/* Review Submission Form */}
      {session && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <h4 className="text-xl font-semibold">Leave a Review</h4>
          <div>
            <label className="block mb-1">Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="w-full border p-2 rounded"
              required
            >
              <option value={5}>⭐⭐⭐⭐⭐</option>
              <option value={4}>⭐⭐⭐⭐</option>
              <option value={3}>⭐⭐⭐</option>
              <option value={2}>⭐⭐</option>
              <option value={1}>⭐</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border p-2 rounded"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
};

export default Reviews;
