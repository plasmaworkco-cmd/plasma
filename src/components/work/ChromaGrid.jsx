import React from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ChromaGrid = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 auto-rows-[420px]">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Link
            to={`/work/${project.slug}`}
            data-cursor="View"
            data-accent={project.accent}
            className="group relative block w-full h-full overflow-hidden rounded-3xl bg-secondary border border-mint/10 hover:border-emerald/40 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >
            {/* Improved Image Visibility (Less Foggy) */}
            <img
              src={project.image}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600/0B0F14/50C878?text=Image+Not+Found'; }}
            />

            {/* Refined Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent z-10 pointer-events-none" />

            {/* Dynamic Chroma Aura */}
            <div 
              className="absolute -inset-24 opacity-0 group-hover:opacity-20 blur-[120px] transition-opacity duration-700 pointer-events-none z-0"
              style={{ background: project.accent || 'var(--color-emerald)' }}
            />

            {/* Content Container - Flex anchored to bottom */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span
                    className="w-6 h-[2px]"
                    style={{ backgroundColor: project.categoryColor || project.accent || 'var(--color-emerald)' }}
                  ></span>
                  <p 
                    className="text-[11px] tracking-[0.25em] uppercase font-semibold font-heading"
                    style={{ color: project.categoryColor || project.accent || 'var(--color-emerald)' }}
                  >
                    {project.category}
                  </p>
                </div>

                <h3 className="text-4xl font-heading font-black text-text-primary tracking-tighter leading-tight line-clamp-2">
                  {project.name}<span style={{ color: project.accent || 'var(--color-emerald)' }}>.</span>
                </h3>

                <p className="text-text-secondary text-sm font-body max-w-xs min-h-[48px] line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Top Right Visit Indicator */}
            <div className="absolute top-8 right-8 text-emerald opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0 z-20 pointer-events-none">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
               </svg>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ChromaGrid;
