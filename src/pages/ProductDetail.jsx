// src/pages/ProductDetail.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Reviews from '../components/Reviews';
import { CartContext } from '../context/CartContext';
import { Helmet } from 'react-helmet';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      if (error) console.error('Error fetching product:', error);
      else setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row">
      <Helmet>
        <title>{product.name} - Battery-Powered Chargers</title>
        <meta
          name="description"
          content={product.description}
        />
      </Helmet>
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full md:w-1/2 h-auto object-cover mb-4 md:mb-0"
      />
      <div className="md:ml-6 w-full">
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-2xl font-semibold mb-4">${product.price}</p>
        <p className="mb-4">
          Stock: {product.stock > 0 ? '🔋 In Stock' : '🔌 Out of Stock'}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Add to Cart
        </button>
        <Reviews productId={product.id} />
      </div>
    </div>
  );
};

export default ProductDetail;
