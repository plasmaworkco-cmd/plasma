import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

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
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const SERVICE_ID = 'service_gt51qen';
      const TEMPLATE_ID = 'template_93q44pl';       // Main email (to you)
      const AUTO_REPLY_TEMPLATE_ID = 'template_9w1ae4l'; // Auto reply (to client)
      const PUBLIC_KEY = 'XokZQ_9fj51aMNjVI';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        budget: formData.budget,
        message: formData.message,
      };

      // 1️⃣ Send email to you
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      // 2️⃣ Send auto reply to client
      try {
        await emailjs.send(
          SERVICE_ID,
          AUTO_REPLY_TEMPLATE_ID,
          templateParams,
          PUBLIC_KEY
        );
      } catch (autoReplyError) {
        console.log("Auto reply failed, but main email sent.");
      }

      setSubmitStatus('success');

      setFormData({
        name: '',
        email: '',
        company: '',
        budget: '',
        message: '',
      });

    } catch (error) {
      console.error('FAILED...', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  const budgetOptions = [
  '₹15K – ₹25K',
  '₹25K – ₹50K',
  '₹50K – ₹75K',
  '₹75K+',
] ;

  return (
    // CHANGED: py-24 md:py-40 → pt-12 md:pt-20 pb-24 md:pb-40
    <section className="relative bg-white pt-12 md:pt-20 pb-24 md:pb-40 overflow-hidden font-body">

      {/* Subtle background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-mint/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Top section — headline + form side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — Copy */}
          <div className="flex flex-col justify-center">
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

            {/* Quick info cards */}
            <div className="space-y-5">
              {[
                { label: 'Email', value: 'hello@plasma.studio', icon: '✉' },
                { label: 'Based in', value: 'Available Worldwide', icon: '◎' },
                { label: 'Availability', value: 'Q2 2026 — Open', icon: '◈' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-emerald text-sm">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[11px] text-neutral-400 uppercase tracking-widest font-heading font-bold">
                      {item.label}
                    </p>
                    <p className="text-neutral-900 text-sm font-medium">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name & Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="relative">
                  <label className="text-[11px] text-neutral-400 uppercase tracking-widest font-heading font-bold mb-2 block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    placeholder="John Doe"
                    className={`
                      w-full px-5 py-4 rounded-xl bg-neutral-50 border text-neutral-900 text-sm
                      placeholder:text-neutral-300 outline-none transition-all duration-300
                      ${focused === 'name' ? 'border-emerald shadow-[0_0_0_3px_rgba(80,200,120,0.1)]' : 'border-neutral-200 hover:border-neutral-300'}
                    `}
                  />
                </div>

                <div className="relative">
                  <label className="text-[11px] text-neutral-400 uppercase tracking-widest font-heading font-bold mb-2 block">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder="john@company.com"
                    className={`
                      w-full px-5 py-4 rounded-xl bg-neutral-50 border text-neutral-900 text-sm
                      placeholder:text-neutral-300 outline-none transition-all duration-300
                      ${focused === 'email' ? 'border-emerald shadow-[0_0_0_3px_rgba(80,200,120,0.1)]' : 'border-neutral-200 hover:border-neutral-300'}
                    `}
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="text-[11px] text-neutral-400 uppercase tracking-widest font-heading font-bold mb-2 block">
                  Company / Brand
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  onFocus={() => setFocused('company')}
                  onBlur={() => setFocused(null)}
                  placeholder="Acme Inc."
                  className={`
                    w-full px-5 py-4 rounded-xl bg-neutral-50 border text-neutral-900 text-sm
                    placeholder:text-neutral-300 outline-none transition-all duration-300
                    ${focused === 'company' ? 'border-emerald shadow-[0_0_0_3px_rgba(80,200,120,0.1)]' : 'border-neutral-200 hover:border-neutral-300'}
                  `}
                />
              </div>

              {/* Budget selector */}
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
                      className={`
                        px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider
                        transition-all duration-300 border
                        ${formData.budget === option
                          ? 'bg-emerald text-white border-emerald shadow-[0_4px_12px_rgba(80,200,120,0.3)]'
                          : 'bg-neutral-50 text-neutral-500 border-neutral-200 hover:border-neutral-300 hover:text-neutral-700'
                        }
                      `}
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
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  placeholder="We're looking to build a..."
                  className={`
                    w-full px-5 py-4 rounded-xl bg-neutral-50 border text-neutral-900 text-sm
                    placeholder:text-neutral-300 outline-none transition-all duration-300 resize-none
                    ${focused === 'message' ? 'border-emerald shadow-[0_0_0_3px_rgba(80,200,120,0.1)]' : 'border-neutral-200 hover:border-neutral-300'}
                  `}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  group relative w-full px-8 py-5 bg-neutral-900 text-white font-black text-sm uppercase tracking-[0.15em]
                  rounded-xl overflow-hidden transition-all duration-300
                  font-heading
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

                {/* Hover fill */}
                {!isSubmitting && <div className="absolute inset-0 bg-emerald translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />}
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
          </div>

        </div>

        {/* Bottom divider detail */}
        <div className="mt-24 flex items-center justify-center gap-4 opacity-30">
          <div className="h-[1px] w-12 bg-neutral-300" />
          <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest">Let's Connect</span>
          <div className="h-[1px] w-12 bg-neutral-300" />
        </div>

      </div>
    </section>
  );
};

export default FinalCTA;