// src/pages/Blog.jsx
import React from 'react';
import { Helmet } from 'react-helmet';

const Blog = () => {
  const articles = [
    {
      title: '10 Reasons Why Charging Your Charger is the Future',
      date: 'October 1, 2024',
      content:
        'In a world where redundancy reigns, why settle for a charger when you can have a charger that charges itself? Here are 10 compelling reasons to embrace the future...',
    },
    {
      title: 'The Infinite Loop: When Chargers Charge Themselves',
      date: 'September 15, 2024',
      content:
        'Ever wondered what happens when your charger becomes self-aware? Dive into the fascinating (and slightly absurd) world of infinite charging loops.',
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Blog - Battery-Powered Chargers</title>
        <meta
          name="description"
          content="Read the latest updates and insights from Battery-Powered Chargers."
        />
      </Helmet>
      <h2 className="text-3xl font-bold mb-6">Blog</h2>
      <div className="space-y-6">
        {articles.map((article, index) => (
          <div key={index} className="border-b pb-4">
            <h3 className="text-2xl font-semibold">{article.title}</h3>
            <p className="text-gray-500 mb-2">{article.date}</p>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
