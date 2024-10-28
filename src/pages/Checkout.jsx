// src/pages/Checkout.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Insert order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: supabase.auth.getSession().then(({ data: { session } }) => session?.user?.id) || 'anonymous',
            total_amount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
            status: 'Pending',
          },
        ])
        .single();

      if (orderError) throw orderError;

      // Insert order items
      const orderItems = cart.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;

      // Clear cart
      clearCart();

      alert(
        'Thank you for your purchase! Your charger is now self-aware and charging itself with gratitude.'
      );
      navigate('/');
    } catch (error) {
      alert('Error processing your order: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Checkout - Battery-Powered Chargers</title>
        <meta
          name="description"
          content="Finalize your purchase of our redundant battery chargers."
        />
      </Helmet>
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>
      <p>
        Proceeding to checkout will charge your charger with more chargers. Proceed?
      </p>
      <button
        onClick={handleCheckout}
        disabled={loading || cart.length === 0}
        className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Confirm Purchase'}
      </button>
    </div>
  );
};

export default Checkout;
