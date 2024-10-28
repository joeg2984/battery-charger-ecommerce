// src/components/ProductCard.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <motion.div
      className="border rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300"
      whileHover={{ scale: 1.05 }}
    >
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-48 object-cover mb-4"
      />
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="mt-2 text-lg font-bold">${product.price}</p>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => addToCart(product)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Add to Cart
        </button>
        <Link
          to={`/products/${product.id}`}
          className="text-yellow-500 hover:underline"
        >
          Charge Now!
        </Link>
      </div>
      {/* Charging Animation */}
      <div className="mt-2">
        <motion.div
          className="w-8 h-8 bg-yellow-500 rounded-full mx-auto"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    </motion.div>
  );
};

export default ProductCard;
