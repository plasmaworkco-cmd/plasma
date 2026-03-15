import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SERVICES } from '../data/services';
import { ArrowLeft, CheckCircle2, ChevronDown, Wrench, Briefcase, DollarSign } from 'lucide-react';
import ClickSpark from '../components/ClickSpark';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const service = SERVICES.find(s => s.id === serviceId);

  useEffect(() => {
    // Scroll to top on page load smoothly
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center text-text-primary">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-heading font-bold">Service not found</h2>
          <Link to="/" className="text-emerald hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-primary text-text-primary pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Navigation & Header */}
        <div className="mb-16">
          <Link to="/#solutions" className="inline-flex items-center gap-2 text-text-secondary hover:text-emerald transition-colors duration-300 font-medium font-body mb-8">
            <ArrowLeft size={20} /> Back to Services
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end"
          >
            <div>
              <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tighter mb-6">{service.title}</h1>
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed font-body">
                {service.description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full h-[50vh] md:h-[65vh] rounded-xl overflow-hidden mb-24 relative group"
        >
          <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors duration-700 z-10" />
          <img src={service.image} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-in-out" />
        </motion.div>

        {/* Overview & Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-4">
            <h2 className="text-3xl font-bold font-heading mb-6 tracking-tight">The Pitch</h2>
            <div className="w-16 h-[2px] bg-emerald mb-8" />
          </div>
          <div className="md:col-span-8">
            <p className="text-2xl leading-relaxed text-text-primary/90 font-body mb-10">
              {service.summary}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-primary/50 border border-text-primary/10 p-8 rounded-2xl hover:border-emerald/50 transition-colors">
                <Briefcase className="text-emerald w-8 h-8 mb-4" />
                <h3 className="text-xl font-bold font-heading mb-3">Core Skills</h3>
                <ul className="space-y-2">
                  {service.skills.map((skill, i) => (
                    <li key={i} className="flex items-center gap-2 text-text-secondary font-body">
                      <CheckCircle2 size={16} className="text-emerald shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-primary/50 border border-text-primary/10 p-8 rounded-2xl hover:border-emerald/50 transition-colors">
                <Wrench className="text-emerald w-8 h-8 mb-4" />
                <h3 className="text-xl font-bold font-heading mb-3">Tools We Use</h3>
                <ul className="space-y-2">
                  {service.tools.map((tool, i) => (
                    <li key={i} className="flex items-center gap-2 text-text-secondary font-body">
                      <CheckCircle2 size={16} className="text-emerald shrink-0" />
                      <span>{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Categories / Tags Section */}
        <div className="mb-24 flex flex-wrap gap-4 items-center justify-center border-y border-text-primary/10 py-12">
          <span className="text-sm font-heading font-medium tracking-widest text-text-secondary/50 uppercase mr-4">Capabilities</span>
          {service.categories.map((cat, i) => (
            <span key={i} className="px-5 py-2.5 rounded-full border border-text-primary/10 text-sm tracking-wide text-text-secondary bg-primary/20 hover:bg-emerald hover:text-primary hover:border-emerald transition-all duration-300 font-heading cursor-default">
              {cat}
            </span>
          ))}
        </div>

        {/* Pricing & Packages */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 tracking-tight">Flexible Pricing</h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto font-body">Transparent plans tailored for freelancers, startups, and established firms.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-2xl mx-auto">
            {service.pricing.map((plan, i) => (
              <div key={i} className="bg-primary border border-emerald/30 rounded-3xl p-10 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 shadow-[0_0_30px_rgba(80,200,120,0.1)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald/10 rounded-bl-full group-hover:bg-emerald/20 transition-colors" />

                <h3 className="text-2xl font-bold font-heading mb-2">{plan.plan}</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl font-black text-emerald font-heading">{plan.price}</span>
                </div>

                <ul className="space-y-5 mb-10">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-4 text-text-secondary text-lg font-body">
                      <CheckCircle2 size={24} className="text-emerald shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/#contact" className="inline-block text-center w-full py-4 rounded-xl border-2 border-emerald text-emerald font-bold font-heading hover:bg-emerald hover:text-primary transition-colors text-lg uppercase tracking-wider">
                  Contact Us Now
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold font-heading mb-10 text-center tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {service.faqs.map((faq, i) => (
              <div key={i} className="border border-text-primary/10 rounded-2xl p-6 hover:border-text-primary/30 transition-colors">
                <h4 className="text-xl font-bold font-heading mb-3 flex items-start gap-3">
                  <span className="text-emerald mt-1">Q.</span>
                  {faq.question}
                </h4>
                <p className="text-text-secondary text-lg font-body pl-8 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-emerald text-primary rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-black font-heading tracking-tighter mb-6 text-evergreen">Ready to elevate your {service.title.toLowerCase()}?</h2>
            <p className="text-xl md:text-2xl font-body font-medium opacity-90 mb-10 text-evergreen">
              Let's craft experiences that ignite growth and build trust. Start your project with us today.
            </p>
            <Link to="/#contact" className="inline-block bg-evergreen text-emerald px-10 py-5 rounded-full font-bold font-heading text-xl uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300 shadow-xl">
              Let's Talk
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ServiceDetail;
