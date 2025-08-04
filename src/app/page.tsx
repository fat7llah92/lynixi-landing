
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/.netlify/functions/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit email');
      }

      setSubmitted(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
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
        Join the Cyberhoc Waitlist
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl mb-8 text-center max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Be the first to access our cybersecurity talent marketplace.
      </motion.p>

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col sm:flex-row items-center justify-center gap-4"
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
        </form>
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

      {error && (
        <p className="text-red-400 mt-4">{error}</p>
      )}

      <div className="mt-10">
        <a
          href="https://www.linkedin.com/company/cyberhoc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.473 0 16 
              .513 16 1.146v13.708c0 .633-.527 1.146-1.175 
              1.146H1.175C.527 16 0 15.487 0 14.854V1.146zm4.943 
              12.248V6.169H2.542v7.225h2.401zm-1.2-8.21c.837 
              0 1.358-.554 1.358-1.248-.015-.71-.52-1.248-1.342-
              1.248C3.528 2.661 3 3.2 3 3.91c0 .694.52 1.248 
              1.327 1.248h.016zm4.908 8.21V9.359c0-.215.016-.43.08-
              .584.175-.43.572-.875 1.24-.875.875 
              0 1.223.66 1.223 1.63v3.864h2.401V9.25c0-2.22-1.184-
              3.252-2.762-3.252-1.274 0-1.845.705-2.165 
              1.2h.03V6.169h-2.4c.03.705 0 7.225 0 7.225h2.4z"/>
          </svg>
          Follow us on LinkedIn
        </a>
      </div>
    </div>
  );
}
