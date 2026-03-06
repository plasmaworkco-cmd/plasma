import React, { useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import { motion } from "framer-motion";

const ProjectPage = () => {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <section className="bg-primary min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-heading font-black mb-8 text-text-primary uppercase tracking-widest">Project not found</h1>
        <Link to="/work" className="text-emerald font-heading font-black group flex items-center gap-4 text-xl">
           ← Return to Portfolio
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-primary min-h-screen">
      {/* Premium Hero Header */}
      <div className="relative pt-40 pb-20 md:pt-64 md:pb-40 overflow-hidden">
        {/* Dynamic Background Glow */}
        <div 
          className="absolute top-0 right-0 w-[800px] h-[800px] blur-[200px] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"
          style={{ background: project.accent }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[1px]" style={{ backgroundColor: project.accent }}></span>
              <p className="text-emerald uppercase tracking-[0.5em] text-[10px] md:text-xs font-heading font-black">
                {project.category}
              </p>
            </div>

            <h1 className="text-6xl md:text-[10vw] font-heading font-black text-text-primary leading-[0.8] mb-12 tracking-tighter">
              {project.name}<span style={{ color: project.accent }}>.</span>
            </h1>

            <div className="flex flex-wrap gap-3 mt-12 mb-20 md:mb-32">
              {project.tech?.map((item) => (
                <span key={item} className="px-5 py-2 rounded-full border border-mint/10 bg-secondary/50 backdrop-blur-md text-text-secondary text-[10px] uppercase tracking-widest font-black font-heading">
                   {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-7xl mx-auto px-6 pb-24 md:pb-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="aspect-[16/9] w-full rounded-2xl md:rounded-[40px] overflow-hidden bg-secondary border border-mint/5 relative"
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
               <div 
                  className="w-64 h-64 blur-[100px] opacity-20 animate-pulse rounded-full"
                  style={{ background: project.accent }}
               />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
        </motion.div>
      </div>

      {/* Storytelling Content Section */}
      <div className="max-w-7xl mx-auto px-6 pb-40 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
        <div className="lg:col-span-5">
           <h2 className="text-xs uppercase tracking-[0.6em] text-text-secondary font-black mb-12 font-heading">The Vision</h2>
           <p className="text-3xl md:text-5xl font-heading font-black text-text-primary tracking-tighter leading-tight">
             Creating meaningful digital footprints for <span style={{ color: project.accent }}>{project.name}</span>.
           </p>
        </div>
        <div className="lg:col-span-7">
           <h2 className="text-xs uppercase tracking-[0.6em] text-text-secondary font-black mb-12 font-heading">The Strategy</h2>
           <p className="text-lg md:text-2xl text-text-secondary leading-relaxed font-body font-medium mb-12">
             {project.longDescription}
           </p>
           <p className="text-base md:text-lg text-text-secondary/80 leading-relaxed font-body">
             {project.description} We looked into every detail of the user experience to ensure that the platform not only performs efficiently but also resonates with the brand's core values.
           </p>
           
           <div className="mt-20 p-10 md:p-16 rounded-[32px] bg-secondary/30 border border-mint/5 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <p className="text-xl md:text-2xl font-body italic text-text-secondary relative z-10">
                "Our challenge was to blend high-performance infrastructure with a premium aesthetic that speaks to the user. The result is a seamless digital extension of the brand's identity."
              </p>
              <div className="mt-12 flex items-center gap-6 relative z-10">
                <div className="w-14 h-14 rounded-full bg-emerald/10 border border-emerald/20 flex items-center justify-center font-black text-emerald font-heading">PS</div>
                <div>
                   <p className="text-text-primary font-black uppercase tracking-widest text-sm font-heading">Plasma Studio</p>
                   <p className="text-text-secondary text-xs uppercase tracking-[0.3em] font-heading font-black">Lead Design & Build</p>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Discover More Footer */}
      <section className="bg-secondary/20 py-40 text-center border-t border-mint/5 relative overflow-hidden">
        <div 
          className="absolute bottom-0 right-0 w-96 h-96 opacity-10 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"
          style={{ background: project.accent }}
        />
        
        <p className="text-text-secondary mb-8 text-xs uppercase tracking-[0.5em] font-black font-heading">
            Next Project
        </p>
        <Link 
            to="/work"
            className="inline-flex items-center gap-6 text-4xl md:text-8xl font-black text-text-primary group transition-all font-heading tracking-tighter hover:text-emerald"
        >
            Discover More
            <span className="text-emerald group-hover:translate-x-6 transition-transform duration-700">→</span>
        </Link>
      </section>
    </section>
  );
};

export default ProjectPage;
