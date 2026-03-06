import React from 'react';
import { projects } from "../data/projects";
import ChromaGrid from "./work/ChromaGrid";
import { Link } from "react-router-dom";

const FeaturedWork = () => {

  const featured = projects.slice(0, 3);

  return (
    <section id="work" className="bg-primary py-28 border-t border-mint/10">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-heading font-black mb-16 text-text-primary tracking-tighter">
          Featured Work<span className="text-emerald">.</span>
        </h2>

        <ChromaGrid projects={featured} />

        <div className="text-center mt-20">

          <Link
            to="/work"
            className="text-2xl font-heading font-black text-text-primary hover:text-emerald transition-all duration-300 group inline-flex items-center gap-4"
          >
            Explore Projects
            <span className="text-emerald group-hover:translate-x-3 transition-transform duration-300"> →</span>
          </Link>

        </div>

      </div>

    </section>
  );
};

export default FeaturedWork;
