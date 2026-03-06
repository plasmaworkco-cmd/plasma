import React, { useState } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform, useVelocity } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogs } from '../../data/blogs';

const InsightsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // High-performance spring animation for cursor following
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Track Velocity (Speed of movement)
  const xVelocity = useVelocity(mouseX);
  const yVelocity = useVelocity(mouseY);

  // Map Velocity to Rotation (e.g., fast move right = tilt right)
  const rotateX = useTransform(yVelocity, [-3000, 3000], [15, -15]);
  const rotateY = useTransform(xVelocity, [-3000, 3000], [-15, 15]);

  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    // We want the FIXED position for the floating image portal
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section 
      id="insights"
      className="bg-primary py-40 relative overflow-hidden" 
      onMouseMove={handleMouseMove}
    >
      {/* 🚀 LARGE BACKGROUND TYPOGRAPHY */}
      <h2 className="text-[15vw] md:text-[12vw] font-black font-heading text-mint/5 uppercase leading-none absolute top-10 left-10 pointer-events-none select-none tracking-tighter">
        INSIGHTS
      </h2>

      <div className="max-w-7xl mx-auto px-6 relative z-10 mt-20 md:mt-0">
        <div className="flex flex-col border-t border-mint/10">
          {blogs.map((blog, idx) => (
            <Link 
              to={`/insights/${blog.slug}`} 
              key={blog.id} 
              data-cursor="Read" 
              data-accent="var(--color-emerald)"
            >
              <motion.div
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group relative border-b border-mint/10 py-16 md:py-24 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center px-4 overflow-hidden"
              >
                {/* CONTENT LEFT SIDE */}
                <div className="flex flex-col relative z-20 pointer-events-none">
                  <span className="text-emerald font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 md:mb-6 font-heading">
                    {blog.category} / {blog.readTime}
                  </span>
                  <div className="flex items-center gap-6">
                    <div className="relative overflow-hidden py-1">
                      <h3 className="text-4xl md:text-7xl font-heading font-black tracking-tighter leading-[0.9] flex flex-col">
                        <span className="block text-text-primary group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                          {blog.title}
                        </span>
                        <span className="absolute top-full left-0 block text-emerald group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                          {blog.title}
                        </span>
                      </h3>
                    </div>
                    <span className="text-3xl md:text-5xl text-emerald opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-20px] group-hover:translate-x-0 hidden md:block">
                      →
                    </span>
                  </div>
                </div>
                
                {/* DATE RIGHT SIDE */}
                <div className="mt-8 md:mt-0 text-text-secondary font-body text-sm md:text-base font-bold uppercase tracking-widest relative z-20 group-hover:text-text-primary transition-colors duration-300">
                  {blog.date}
                </div>

                {/* BACKGROUND SLIDE EFFECT ON HOVER */}
                <div 
                  className="absolute inset-0 bg-secondary/30 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* 🔮 THE IMAGE PORTAL: Floating Mouse Follower with 3D Tilt */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            style={{ 
              x: springX,
              y: springY,
              rotateX,
              rotateY,
              translateX: "-50%",
              translateY: "-50%",
              perspective: 1000
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed pointer-events-none z-50 w-[450px] h-[320px] rounded-[40px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border-2 border-emerald/20 origin-center"
          >
            <motion.img 
              key={blogs[hoveredIndex].image}
              src={blogs[hoveredIndex].image} 
              className="w-full h-full object-cover" 
              alt="insight preview"
              style={{ scale: 1.1 }} // Slight overscale to prevent edges showing on tilt
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            {/* Dark glass overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            
            {/* Corner Accent Sparkle */}
            <div className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-emerald shadow-[0_0_20px_#50C878]" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InsightsSection;
