
'use client';

import { useState } from 'react';
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
      <motion.img
        src="/cyberhoc_logo.png"
        alt="Cyberhoc Logo"
        className="h-44 md:h-56 mb-10 drop-shadow-[0_0_12px_rgba(0,168,150,0.4)] opacity-95"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />

      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Join the Cyberhoc Alpha Waitlist
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl mb-8 text-center max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Be the first to access our curated cybersecurity talent marketplace.
      </motion.p>

      {!submitted ? (
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-6 py-3 rounded-md text-black"
            required
          />
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-md transition duration-300"
          >
            Notify Me
          </button>
        </motion.form>
      ) : (
        <motion.p
          className="text-xl text-green-400 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Thanks for signing up!
        </motion.p>
      )}
    </div>
  );
}
