// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NotFound = () => {
  return (
    <div className="text-center">
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta
          name="description"
          content="Oops! The page you're looking for doesn't exist."
        />
      </Helmet>
      <h2 className="text-4xl font-bold mb-4">404 Error: Page Not Found</h2>
      <p className="mb-6">
        Oops! It seems our charger couldn't find the page. Maybe it's charging itself?
      </p>
      <Link
        to="/"
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Go Back to Charging
      </Link>
    </div>
  );
};

export default NotFound;
