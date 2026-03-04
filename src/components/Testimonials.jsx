//size medium-large
import React, { useRef, useState, useEffect, useCallback } from 'react';

import { motion } from 'framer-motion';

const Testimonials = () => {
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = useRef({});
  const offsetRef = useRef(0);
  const rafRef = useRef(null);

  const clientVideos = [
    {
      id: 1,
      videoSrc: '/videos/client1.mp4',
      poster: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=800&fit=crop',
      author: 'Elena R.',
      role: 'Founder, Bridlelink',
    },
    {
      id: 2,
      videoSrc: '/videos/client2.mp4',
      poster: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=800&fit=crop',
      author: 'Marcus T.',
      role: 'CTO, Indic',
    },
    {
      id: 3,
      videoSrc: '/videos/client3.mp4',
      poster: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=800&fit=crop',
      author: 'Sarah J.',
      role: 'VP Design, Aura',
    },
    {
      id: 4,
      videoSrc: '/videos/client4.mp4',
      poster: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=800&fit=crop',
      author: 'David K.',
      role: 'CEO, Flux',
    },
    {
      id: 5,
      videoSrc: '/videos/client5.mp4',
      poster: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&h=800&fit=crop',
      author: 'Priya M.',
      role: 'Head of Product, Nova',
    },
    {
      id: 6,
      videoSrc: '/videos/client6.mp4',
      poster: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&h=800&fit=crop',
      author: 'James L.',
      role: 'Director, Helix',
    },
  ];

  const videos = [...clientVideos, ...clientVideos, ...clientVideos, ...clientVideos];

  const CARD_WIDTH_DESKTOP = 420;
  const singleSetWidth = clientVideos.length * CARD_WIDTH_DESKTOP;

  const animate = useCallback(() => {
    if (!isPaused) {
      offsetRef.current -= 0.6;
      if (Math.abs(offsetRef.current) >= singleSetWidth) {
        offsetRef.current += singleSetWidth;
      }
    }
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, [isPaused, singleSetWidth]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  const handleCardHover = (uniqueId) => {
    setIsPaused(true);
    setActiveVideo(uniqueId);
    const video = videoRefs.current[uniqueId];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleCardLeave = (uniqueId) => {
    const video = videoRefs.current[uniqueId];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setActiveVideo(null);
    setIsPaused(false);
  };

  return (
    <section className="bg-mint pt-24 md:pt-40 pb-10 md:pb-16 relative overflow-hidden font-body">

      {/* --- Header --- */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 mb-16 relative z-10 text-center"
      >
        <span className="text-emerald text-[10px] font-black uppercase tracking-[0.4em] mb-4 block font-heading">
          Validation Matrix
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tighter uppercase font-heading">
          Client{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 italic">
            Stories.
          </span>
        </h2>
      </motion.div>

      {/* --- Carousel --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden"
      >

        <div className="relative overflow-hidden">
          <div
            ref={trackRef}
            className="flex will-change-transform"
          >
            {videos.map((video, idx) => {
              const uniqueId = `${video.id}-${idx}`;
              const isActive = activeVideo === uniqueId;

              return (
                <div
                  key={uniqueId}
                  className="flex-shrink-0 w-[300px] sm:w-[360px] md:w-[420px] group cursor-pointer"
                  onMouseEnter={() => handleCardHover(uniqueId)}
                  onMouseLeave={() => handleCardLeave(uniqueId)}
                >
                  <div className="relative h-[450px] sm:h-[520px] md:h-[600px] overflow-hidden bg-neutral-200">

                    {/* Thumbnail */}
                    <img
                      src={video.poster}
                      alt={video.author}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Video */}
                    <video
                      ref={(el) => (videoRefs.current[uniqueId] = el)}
                      src={video.videoSrc}
                      poster={video.poster}
                      muted
                      loop
                      playsInline
                      preload="none"
                      className={`
                        absolute inset-0 w-full h-full object-cover transition-opacity duration-500
                        ${isActive ? 'opacity-100' : 'opacity-0'}
                      `}
                    />

                    {/* Bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Center: Play + Name */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-5">

                      <div
                        className={`
                          w-14 h-14 md:w-16 md:h-16 rounded-full
                          bg-white/20 backdrop-blur-sm border border-white/30
                          flex items-center justify-center
                          transition-all duration-300
                          group-hover:scale-110 group-hover:bg-white/30
                          ${isActive ? 'opacity-0 scale-90' : 'opacity-100'}
                        `}
                      >
                        <svg className="w-7 h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>

                      <div className="text-center px-4">
                        <h4 className="font-bold text-emerald font-heading uppercase text-base md:text-lg tracking-wide drop-shadow-lg">
                          {video.author}
                        </h4>
                        <p className="text-xs text-evergreen mt-1 drop-shadow-md">
                          {video.role}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- Curve Overlays --- */}
        {/* 
          FIX: On mobile the curves were visibly incomplete because:
          1. The SVG container height was too short (h-12 = 48px), cutting off the arc
          2. The viewBox arc depth didn't match the rendered height

          Solution: Use a tall, fixed-pixel container with overflow-hidden removed,
          position the SVGs with negative offsets so they bleed fully over the edge,
          and use a deeper viewBox arc so the curve fully covers at all screen widths.
        */}
        <div className="absolute inset-0 pointer-events-none z-20">

          {/* Top curve — sits above carousel, fully covers the seam */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none" style={{ height: '80px' }}>
            <svg
              className="absolute top-0 left-0 w-full"
              style={{ height: '80px' }}
              preserveAspectRatio="none"
              viewBox="0 0 1440 80"
            >
              <path fill="#ecf4e5" d="M0,0 Q720,80 1440,0 L1440,0 L0,0 Z" />
            </svg>
          </div>

          {/* Bottom curve — sits below carousel, fully covers the seam */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" style={{ height: '80px' }}>
            <svg
              className="absolute bottom-0 left-0 w-full"
              style={{ height: '80px' }}
              preserveAspectRatio="none"
              viewBox="0 0 1440 80"
            >
              <path fill="#ecf4e5" d="M0,80 Q720,0 1440,80 L1440,80 L0,80 Z" />
            </svg>
          </div>

        </div>

      </motion.div>
    </section>
  );
};

export default Testimonials;

//size small
// import React, { useRef, useState, useEffect, useCallback } from 'react';

// const Testimonials = () => {
//   const trackRef = useRef(null);
//   const [isPaused, setIsPaused] = useState(false);
//   const [activeVideo, setActiveVideo] = useState(null);
//   const videoRefs = useRef({});
//   const offsetRef = useRef(0);
//   const rafRef = useRef(null);

//   const clientVideos = [
//     {
//       id: 1,
//       videoSrc: '/videos/client1.mp4',
//       poster: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=800&fit=crop',
//       author: 'Elena R.',
//       role: 'Founder, Bridlelink',
//     },
//     {
//       id: 2,
//       videoSrc: '/videos/client2.mp4',
//       poster: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=800&fit=crop',
//       author: 'Marcus T.',
//       role: 'CTO, Indic',
//     },
//     {
//       id: 3,
//       videoSrc: '/videos/client3.mp4',
//       poster: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=800&fit=crop',
//       author: 'Sarah J.',
//       role: 'VP Design, Aura',
//     },
//     {
//       id: 4,
//       videoSrc: '/videos/client4.mp4',
//       poster: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=800&fit=crop',
//       author: 'David K.',
//       role: 'CEO, Flux',
//     },
//     {
//       id: 5,
//       videoSrc: '/videos/client5.mp4',
//       poster: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&h=800&fit=crop',
//       author: 'Priya M.',
//       role: 'Head of Product, Nova',
//     },
//     {
//       id: 6,
//       videoSrc: '/videos/client6.mp4',
//       poster: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&h=800&fit=crop',
//       author: 'James L.',
//       role: 'Director, Helix',
//     },
//   ];

//   const videos = [...clientVideos, ...clientVideos, ...clientVideos, ...clientVideos];

//   const CARD_WIDTH_DESKTOP = 380;
//   const singleSetWidth = clientVideos.length * CARD_WIDTH_DESKTOP;

//   const animate = useCallback(() => {
//     if (!isPaused) {
//       offsetRef.current -= 0.6;
//       if (Math.abs(offsetRef.current) >= singleSetWidth) {
//         offsetRef.current += singleSetWidth;
//       }
//     }
//     if (trackRef.current) {
//       trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
//     }
//     rafRef.current = requestAnimationFrame(animate);
//   }, [isPaused, singleSetWidth]);

//   useEffect(() => {
//     rafRef.current = requestAnimationFrame(animate);
//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, [animate]);

//   const handleCardHover = (uniqueId) => {
//     setIsPaused(true);
//     setActiveVideo(uniqueId);
//     const video = videoRefs.current[uniqueId];
//     if (video) {
//       video.currentTime = 0;
//       video.play().catch(() => {});
//     }
//   };

//   const handleCardLeave = (uniqueId) => {
//     const video = videoRefs.current[uniqueId];
//     if (video) {
//       video.pause();
//       video.currentTime = 0;
//     }
//     setActiveVideo(null);
//     setIsPaused(false);
//   };

//   return (
//     <section className="bg-white py-24 md:py-40 relative overflow-hidden font-body">

//       {/* --- Header --- */}
//       <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10 text-center">
//         <span className="text-emerald text-[10px] font-black uppercase tracking-[0.4em] mb-4 block font-heading">
//           Validation Matrix
//         </span>
//         <h2 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tighter uppercase font-heading">
//           Client{' '}
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 italic">
//             Stories.
//           </span>
//         </h2>
//       </div>

//       {/* --- Carousel --- */}
//       <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden">

//         <div className="relative overflow-hidden">
//           <div
//             ref={trackRef}
//             className="flex will-change-transform"
//           >
//             {videos.map((video, idx) => {
//               const uniqueId = `${video.id}-${idx}`;
//               const isActive = activeVideo === uniqueId;

//               return (
//                 <div
//                   key={uniqueId}
//                   className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] group cursor-pointer"
//                   onMouseEnter={() => handleCardHover(uniqueId)}
//                   onMouseLeave={() => handleCardLeave(uniqueId)}
//                 >
//                   <div className="relative h-[360px] sm:h-[420px] md:h-[500px] overflow-hidden bg-neutral-200">

//                     {/* Thumbnail */}
//                     <img
//                       src={video.poster}
//                       alt={video.author}
//                       className="absolute inset-0 w-full h-full object-cover"
//                       loading="lazy"
//                     />

//                     {/* Video */}
//                     <video
//                       ref={(el) => (videoRefs.current[uniqueId] = el)}
//                       src={video.videoSrc}
//                       poster={video.poster}
//                       muted
//                       loop
//                       playsInline
//                       preload="none"
//                       className={`
//                         absolute inset-0 w-full h-full object-cover transition-opacity duration-500
//                         ${isActive ? 'opacity-100' : 'opacity-0'}
//                       `}
//                     />

//                     {/* Bottom gradient */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

//                     {/* Center: Play + Name */}
//                     <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-4">
//                       <div
//                         className={`
//                           w-14 h-14 md:w-16 md:h-16 rounded-full
//                           bg-white/20 backdrop-blur-sm border border-white/30
//                           flex items-center justify-center
//                           transition-all duration-300
//                           group-hover:scale-110 group-hover:bg-white/30
//                           ${isActive ? 'opacity-0 scale-90' : 'opacity-100'}
//                         `}
//                       >
//                         <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M8 5v14l11-7z" />
//                         </svg>
//                       </div>

//                       <div className="text-center">
//                         <h4 className="font-bold text-white font-heading uppercase text-sm md:text-base tracking-wide drop-shadow-lg">
//                           {video.author}
//                         </h4>
//                         <p className="text-[11px] text-white/70 mt-0.5 drop-shadow-md">
//                           {video.role}
//                         </p>
//                       </div>
//                     </div>

//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* --- Wider, Deeper Curves --- */}
//         <div className="absolute inset-0 pointer-events-none z-20">
//           {/* Top Curve — taller, deeper arc */}
//           <svg
//             className="absolute -top-1 left-0 w-full h-16 md:h-32"
//             preserveAspectRatio="none"
//             viewBox="0 0 1440 200"
//           >
//             <path fill="#ffffff" d="M0,0 L0,0 Q720,200 1440,0 L1440,0 Z" />
//           </svg>
//           {/* Bottom Curve — taller, deeper arc */}
//           <svg
//             className="absolute -bottom-1 left-0 w-full h-16 md:h-32"
//             preserveAspectRatio="none"
//             viewBox="0 0 1440 200"
//           >
//             <path fill="#ffffff" d="M0,200 L0,200 Q720,0 1440,200 L1440,200 Z" />
//           </svg>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Testimonials;