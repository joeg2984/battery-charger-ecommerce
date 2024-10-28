// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Home = () => {
  useEffect(() => {
    alert(
      "Welcome to Battery-Powered Battery Chargers! Where we charge chargers with... chargers!"
    );
  }, []);

  return (
    <div className="text-center">
      <Helmet>
        <title>Home - Battery-Powered Chargers</title>
        <meta
          name="description"
          content="Welcome to Battery-Powered Battery Chargers, where we charge chargers with chargers! Explore our infinite range of redundant charging solutions."
        />
      </Helmet>
      <h1 className="text-4xl font-bold mb-4">Welcome to Battery-Powered Chargers!</h1>
      <p className="text-lg mb-6">
        Charging your chargers with chargers—because why not?
      </p>
      <Link
        to="/products"
        className="bg-yellow-500 text-white px-6 py-3 rounded-full text-xl hover:bg-yellow-600"
      >
        Explore Our Infinite Chargers
      </Link>
    </div>
  );
};

export default Home;