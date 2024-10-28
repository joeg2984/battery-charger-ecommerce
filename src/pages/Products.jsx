// src/pages/Products.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import ProductCard from '../components/ProductCard';
import { Helmet } from 'react-helmet';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) console.error('Error fetching products:', error);
      else setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Products - Battery-Powered Chargers</title>
        <meta
          name="description"
          content="Discover our shockingly good battery chargers that charge themselves while charging your devices."
        />
      </Helmet>
      <h2 className="text-3xl font-bold mb-6">Our Shockingly Good Chargers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
