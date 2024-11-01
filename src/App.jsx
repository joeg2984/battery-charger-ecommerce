// src/App.jsx
import './App.css'
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import ShakeDetector from './components/ShakeDetector';
import Welcome from './pages/Welcome';
import Profile from './components/Profile';
import Auth from './Auth'
import Account from './Account'



const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

  

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header session={session} />
        <ShakeDetector />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} /> 
            <Route path="/checkout" element={<ProtectedRoute session={session}>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/account" element={<Account session={session} />} />
            <Route path="/auth" element={<Auth />} />
                  <Checkout />
                </ProtectedRoute>
              }
            />
            
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="*" element={<NotFound />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
