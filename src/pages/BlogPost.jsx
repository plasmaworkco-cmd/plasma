import React from 'react';
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blogs } from "../data/blogs";

const BlogPost = () => {
  const { slug } = useParams();
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-heading font-black text-text-primary mb-4">Post not found.</h1>
        <Link to="/#insights" className="text-emerald font-bold hover:underline">Back to Insights</Link>
      </div>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-primary min-h-screen pt-40 pb-32"
    >
      <div className="max-w-4xl mx-auto px-6">
        <Link 
          to="/" 
          className="text-text-secondary hover:text-emerald transition-colors inline-flex items-center gap-2 mb-12 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
        </Link>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-emerald uppercase tracking-[0.3em] font-black text-xs md:text-sm mb-6"
        >
          {blog.category}
        </motion.p>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-heading font-black text-text-primary leading-tight tracking-tighter"
        >
          {blog.title}<span className="text-emerald">.</span>
        </motion.h1>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4 mt-8 text-text-secondary font-body font-medium"
        >
          <span>{blog.date}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-mint/30" />
          <span>{blog.readTime}</span>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 rounded-[40px] overflow-hidden border border-mint/10 shadow-2xl"
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full aspect-video object-cover"
          />
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 prose prose-invert prose-emerald max-w-none"
        >
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed font-body">
            This is a placeholder for the article content. In a production environment, 
            this would likely be rendered from a CMS or a Markdown file. 
            The goal is to maintain the premium typography and spacing seen across the Plasma platform.
          </p>
          {/* Add more placeholder content to show depth */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-mint/20 to-transparent my-12" />
          <p className="text-lg text-text-secondary/80 leading-relaxed font-body mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BlogPost;
