// src/pages/FAQ.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const FAQ = () => {
  const faqs = [
    {
      question: 'Why is this charger powered by batteries?',
      answer: 'Because who needs logic when you have batteries!',
    },
    {
      question: 'Can my charger charge my charger?',
      answer: 'Absolutely! It\'s a charger inception.',
    },
    {
      question: 'Is there a warranty on infinite charging?',
      answer: 'Sure! We offer a lifetime supply of chargers to cover any infinite loops.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div>
      <Helmet>
        <title>FAQ - Battery-Powered Chargers</title>
        <meta
          name="description"
          content="Frequently Asked Questions about Battery-Powered Chargers."
        />
      </Helmet>
      <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 bg-gray-100 rounded-t-lg focus:outline-none"
            >
              {faq.question}
            </button>
            {activeIndex === index && (
              <div className="p-4 bg-white">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
