import React, { useEffect } from 'react';
import { projects } from "../data/projects";
import ChromaGrid from "../components/work/ChromaGrid";

const Work = () => {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="bg-primary min-h-screen py-32">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-6xl md:text-8xl font-heading font-black mb-20 text-text-primary tracking-tighter">
          Projects<span className="text-emerald">.</span>
        </h1>

        <ChromaGrid projects={projects} />

      </div>

    </section>
  );
};

export default Work;
