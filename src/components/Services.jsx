import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';

const SERVICES = [
  {
    id: 'brand-identity',
    number: '01',
    title: 'Brand Identity',
    description: 'Complete brand systems that capture your essence and stand out in market. From strategy to execution, we build identities that resonate and scale.',
    categories: ['Logo Design', 'Visual Identity', 'Brand Guidelines', 'Positioning', 'Naming', 'Brand Strategy', 'Brand Packaging'],
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'digital-design',
    number: '02',
    title: 'Digital Design',
    description: 'Websites and digital experiences that convert. We design with purpose, creating user journeys that turn visitors into customers.',
    categories: ['Web Design', 'Landing Pages', 'E-commerce', 'Email Design', 'Digital Campaigns', 'Microsites', 'Web Apps'],
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop'
  },
  {
    id: 'product-design',
    number: '03',
    title: 'Product Design',
    description: 'UI/UX that makes complex products feel simple. We balance user needs with business goals to create experiences that just work.',
    categories: ['User Interface', 'User Experience', 'Design Systems', 'Prototypes', 'Mobile Apps', 'SaaS Products', 'Dashboards'],
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'marketing-growth',
    number: '04',
    title: 'Marketing & Growth',
    description: 'Strategic creative that drives results. From campaigns to pitch decks, we design materials that move your audience to action.',
    categories: ['Campaign Creative', 'Social Media', 'Pitch Decks', 'Sales Materials', 'Reports', 'Infographics', 'Presentations'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
  },
  {
    id: 'development',
    number: '05',
    title: 'Development',
    description: 'Clean code that brings designs to life. Fast, responsive, and pixel-perfect across all devices.',
    categories: ['Front-end', 'Webflow', 'Framer', 'React', 'Marketing Sites', 'Web Apps', 'CMS Integration', 'Performance'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop'
  }
];

const ServiceSection = ({ service, index, setActiveId }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "-30% 0px -70% 0px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  const rawImageY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const rawTextY = useTransform(scrollYProgress, [0, 1], ["200px", "-200px"]);
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  const imageY = useSpring(rawImageY, springConfig);
  const textY = useSpring(rawTextY, springConfig);
  const scale = useSpring(rawScale, springConfig);
  const opacity = useSpring(rawOpacity, springConfig);

  useEffect(() => {
    if (isInView) {
      setActiveId(service.id);
    }
  }, [isInView, service.id, setActiveId]);

  return (
    <div
      ref={containerRef}
      id={service.id}
      className="flex flex-col relative"
    >
      <div className="w-full aspect-[16/10] overflow-hidden bg-primary relative rounded-[2rem]">
        <motion.div
          style={{ y: imageY, scale }}
          className="absolute inset-0 w-full h-[140%] -top-[20%]"
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      <motion.div
        style={{ y: textY, opacity }}
        className="py-40 px-0 z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-2xl font-medium text-text-secondary/40 font-heading">[{service.number}]</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-text-primary font-heading">{service.title}</h2>
            </div>

            <p className="text-xl text-text-secondary leading-relaxed max-w-xl font-body">
              {service.description}
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="flex flex-col gap-8">
              <span className="text-[10px] uppercase tracking-widest text-text-secondary/30 font-bold font-heading">Categories</span>
              <div className="flex flex-wrap gap-3">
                {service.categories.map((cat) => (
                  <span key={cat} className="px-4 py-2 border border-text-primary/10 text-[10px] uppercase tracking-widest text-text-secondary hover:bg-text-primary hover:text-primary hover:border-text-primary transition-all duration-300 cursor-default font-heading">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Services = () => {
  const [activeId, setActiveId] = useState(SERVICES[0].id);

  return (
    <section id="solutions" className="bg-primary py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-32">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-text-primary mb-12 tracking-tighter font-heading">
            OUR <span className="text-emerald drop-shadow-[0_0_15px_rgba(80,200,120,0.3)]">SERVICES.</span>
          </h2>
          <p className="text-text-secondary max-w-2xl text-xl md:text-2xl font-medium font-body leading-relaxed">
            Full-spectrum design capabilities under one roof. Whether you need a complete brand overhaul or ongoing creative support, we have the expertise to deliver.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-40 flex flex-col gap-4">
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    const el = document.getElementById(service.id);
                    if (el) {
                      const offset = 80;
                      const bodyRect = document.body.getBoundingClientRect().top;
                      const elementRect = el.getBoundingClientRect().top;
                      const elementPosition = elementRect - bodyRect;
                      const offsetPosition = elementPosition - offset;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`text-left text-4xl font-bold tracking-tighter transition-all duration-700 ease-in-out font-heading ${activeId === service.id ? 'text-text-primary translate-x-2' : 'text-text-primary/20 hover:text-text-primary/40'
                    }`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </aside>

          <div className="flex-1 space-y-0">
            {SERVICES.map((service, index) => (
              <ServiceSection
                key={service.id}
                service={service}
                index={index}
                setActiveId={setActiveId}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
