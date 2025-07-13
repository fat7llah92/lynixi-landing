'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      console.log('Submitted email:', email);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#071E26] text-white flex flex-col items-center justify-center p-6">
      <img src="lynixi-landing/lynixi-logo.png" alt="Lynixi Logo" className="h-16 mb-4" />

      <motion.h1
        className="text-5xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Lynixi
      </motion.h1>

      <motion.p
        className="text-xl text-center max-w-xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Securing talent. Securing the future. Join our wait-list and be the first to access our cybersecurity talent marketplace.
      </motion.p>

      <div className="w-full max-w-md bg-white text-black shadow-2xl rounded-2xl p-6">
        {submitted ? (
          <p className="text-center text-green-600 font-semibold">
            ✅ Thank you! You’re on the wait-list.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 border rounded focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#00A896] hover:bg-[#028090] text-white py-2 px-4 rounded"
            >
              Join Wait-list
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
