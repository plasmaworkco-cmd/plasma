import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <div className="relative">
      {/* 🌊 LEAVING WAVE: Sweeps Up to Cover */}
      <motion.div
        className="fixed inset-0 z-[100] pointer-events-none origin-bottom"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        style={{
          background: 'linear-gradient(180deg, var(--color-evergreen) 0%, var(--color-emerald) 50%, var(--color-mint) 100%)',
          width: '120%',
          left: '-10%',
          rotate: '-2deg'
        }}
      >
        <div className="absolute inset-0 blur-[60px] opacity-50 bg-emerald" />
      </motion.div>
      
      {/* 🌊 ENTERING WAVE: Sweeps Up to Clear */}
      <motion.div
        className="fixed inset-0 z-[100] pointer-events-none origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        style={{
          background: 'linear-gradient(180deg, var(--color-evergreen) 0%, var(--color-emerald) 50%, var(--color-mint) 100%)',
          width: '120%',
          left: '-10%',
          rotate: '2deg'
        }}
      >
        <div className="absolute inset-0 blur-[60px] opacity-50 bg-emerald" />
      </motion.div>

      {/* 🚀 PAGE CONTENT REVEAL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageTransition;
