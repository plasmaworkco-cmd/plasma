import React from 'react';
import { motion } from 'framer-motion';

const SkeletonCard = () => (
  <div className="relative overflow-hidden rounded-2xl bg-secondary border border-mint/10 h-[420px] p-8 flex flex-col justify-end">
    {/* Shimmer Effect */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-mint/5 to-transparent z-10"
      initial={{ x: '-100%' }}
      animate={{ x: '100%' }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
        ease: 'linear',
      }}
    />

    {/* Content Skeletons */}
    <div className="w-24 h-4 bg-mint/10 rounded mb-4" /> {/* Category */}
    <div className="w-3/4 h-8 bg-mint/10 rounded mb-4" /> {/* Title */}
    <div className="w-full h-4 bg-mint/10 rounded mb-2" /> {/* Desc Line 1 */}
    <div className="w-2/3 h-4 bg-mint/10 rounded" /> {/* Desc Line 2 */}
  </div>
);

const ChromaGridSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-[420px] gap-8 p-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default ChromaGridSkeleton;
