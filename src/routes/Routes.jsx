import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import About from '../components/About';
// Import other components here

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* Add more routes as needed */}
        </Routes>
    <Route path="/products" element={<Products />} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<Cart />} />
    <Route
        path="/checkout"
        element={
            <ProtectedRoute>
                <Checkout />
            </ProtectedRoute>
        }
    />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route
        path="/profile"
        element={
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        }
    />
    <Route path="*" element={<NotFound />} />
    </Router>
);

export default AppRoutes;
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = false; // Replace with your authentication logic
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export { ProtectedRoute };