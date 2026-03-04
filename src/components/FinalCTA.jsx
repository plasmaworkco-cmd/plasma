import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

const FinalCTA = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });
  const [focused, setFocused] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const SERVICE_ID = 'service_gt51qen';
      const TEMPLATE_ID = 'template_93q44pl';
      const AUTO_REPLY_TEMPLATE_ID = 'template_9w1ae4l';
      const PUBLIC_KEY = 'XokZQ_9fj51aMNjVI';
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        budget: formData.budget,
        message: formData.message,
      };
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      try {
        await emailjs.send(SERVICE_ID, AUTO_REPLY_TEMPLATE_ID, templateParams, PUBLIC_KEY);
      } catch (autoReplyError) {
        console.log("Auto reply failed, but main email sent.");
      }
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', budget: '', message: '' });
    } catch (error) {
      console.error('FAILED...', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const budgetOptions = ['₹15K – ₹25K', '₹25K – ₹50K', '₹50K – ₹75K', '₹75K+'];

  // All glass styles via inline — Tailwind arbitrary opacity values need JIT to work
  const glass = {
    background: 'rgba(255,255,255,0.62)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.90)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 4px rgba(0,0,0,0.06)',
    transition: 'border 0.2s ease, box-shadow 0.2s ease',
  };

  const glassFocused = {
    ...glass,
    border: '1px solid rgba(52,168,83,0.45)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 0 0 3px rgba(52,168,83,0.09)',
  };

  const inputClass = `w-full px-5 py-4 rounded-md text-neutral-800 text-sm placeholder:text-neutral-400 outline-none`;

  return (
    <section
      id="contact"
      className="relative pt-12 md:pt-20 pb-24 md:pb-40 overflow-hidden font-body"
      style={{ backgroundColor: '#ecf4e5' }}
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(52,168,83,0.05) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(52,168,83,0.03) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <span className="text-emerald text-[10px] font-black uppercase tracking-[0.4em] mb-5 block font-heading">
              Start a Project
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-neutral-900 tracking-tighter uppercase leading-[0.95] font-heading mb-8">
              Let's Build<br />
              Something{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald to-teal-500 italic">
                Electric.
              </span>
            </h2>
            <p className="text-neutral-500 text-lg md:text-xl leading-relaxed mb-12 max-w-md">
              Have a project in mind? Fill out the form and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-5">
              {[
                { label: 'Email', value: 'plasma.work.co@gmail.com', icon: '✉' },
                { label: 'Based in', value: 'Available Worldwide', icon: '◎' },
                { label: 'Availability', value: '24 Hrs', icon: '◈' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-md flex items-center justify-center text-emerald text-sm flex-shrink-0"
                    style={glass}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[11px] text-neutral-400 uppercase tracking-widest font-heading font-bold">
                      {item.label}
                    </p>
                    <p className="text-neutral-900 text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[11px] text-neutral-400 uppercase tracking-widest font-heading font-bold mb-2 block">
                    Your Name *
                  </label>
                  <input
                    type="text" name="name" required
                    value={formData.name} onChange={handleChange}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                    placeholder="John Doe"
                    className={inputClass}
                    style={focused === 'name' ? glassFocused : glass}
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400 uppercase tracking-widest font-heading font-bold mb-2 block">
                    Email *
                  </label>
                  <input
                    type="email" name="email" required
                    value={formData.email} onChange={handleChange}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                    placeholder="john@company.com"
                    className={inputClass}
                    style={focused === 'email' ? glassFocused : glass}
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="text-[11px] text-neutral-400 uppercase tracking-widest font-heading font-bold mb-2 block">
                  Company / Brand
                </label>
                <input
                  type="text" name="company"
                  value={formData.company} onChange={handleChange}
                  onFocus={() => setFocused('company')} onBlur={() => setFocused(null)}
                  placeholder="Acme Inc."
                  className={inputClass}
                  style={focused === 'company' ? glassFocused : glass}
                />
              </div>

              {/* Budget */}
              <div>
                <label className="text-[11px] text-neutral-400 uppercase tracking-widest font-heading font-bold mb-3 block">
                  Project Budget
                </label>
                <div className="flex flex-wrap gap-2">
                  {budgetOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: option })}
                      className="px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider"
                      style={
                        formData.budget === option
                          ? {
                              background: 'rgba(52,168,83,0.88)',
                              backdropFilter: 'blur(10px)',
                              WebkitBackdropFilter: 'blur(10px)',
                              border: '1px solid rgba(52,168,83,0.5)',
                              color: '#fff',
                              boxShadow: '0 4px 14px rgba(52,168,83,0.22)',
                              transition: 'all 0.2s ease',
                            }
                          : { ...glass, color: '#737373' }
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-[11px] text-neutral-400 uppercase tracking-widest font-heading font-bold mb-2 block">
                  Tell us about your project *
                </label>
                <textarea
                  name="message" required rows={5}
                  value={formData.message} onChange={handleChange}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                  placeholder="We're looking to build a..."
                  className={`${inputClass} resize-none`}
                  style={focused === 'message' ? glassFocused : glass}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  group relative w-full px-8 py-5 bg-neutral-900 text-white font-black text-sm uppercase tracking-[0.15em]
                  rounded-md overflow-hidden transition-all duration-300 font-heading
                  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] active:scale-[0.98]'}
                `}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && (
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  )}
                </span>
                {!isSubmitting && (
                  <div className="absolute inset-0 bg-emerald translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                )}
              </button>

              {submitStatus === 'success' && (
                <p className="text-center text-emerald text-sm font-medium mt-4">
                  Message sent successfully! We'll be in touch soon.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-center text-red-500 text-sm font-medium mt-4">
                  Failed to send message. Please try again later.
                </p>
              )}
              <p className="text-center text-[11px] text-neutral-400 mt-2">
                We'll respond within 24 hours. No spam, ever.
              </p>
            </form>
          </motion.div>
        </div>

        {/* Bottom divider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.3, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 flex items-center justify-center gap-4"
        >
          <div className="h-[1px] w-12 bg-neutral-300" />
          <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest">Let's Connect</span>
          <div className="h-[1px] w-12 bg-neutral-300" />
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;