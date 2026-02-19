import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary pt-16 pb-8 md:pt-24 md:pb-12 border-t border-mint/5 relative overflow-hidden">
      {/* Subtle Bottom Glow for Depth */}
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-full h-[200px] bg-evergreen opacity-10 blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 relative z-10">
        
        {/* Brand Identity Section */}
        <div className="col-span-1">
          <h3 className="text-3xl font-black text-text-primary mb-6 tracking-tighter font-heading">
            PLASMA<span className="text-emerald">.</span>
          </h3>
          <p className="text-text-secondary leading-relaxed mb-8 font-body">
            Architecting high-performance digital engines for brands that refuse to blend in.
          </p>
          {/* Status Indicator: Human Touch */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald"></span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-emerald font-bold font-heading">
              Systems Operational
            </span>
          </div>
        </div>
        
        {/* Navigation Mapping */}
        <div>
          <h4 className="text-text-primary font-black uppercase tracking-widest text-xs mb-8 font-heading">Navigation</h4>
          <ul className="space-y-4">
            {['Home', 'Services', 'Work', 'The Stack'].map((item) => (
              <li key={item}>
                <a 
                  href={item === 'Home' ? '#' : `#${item.toLowerCase().replace(' ', '-')}`} 
                  className="text-text-secondary hover:text-emerald transition-all duration-300 flex items-center group font-body cursor-pointer"
                >
                  <span className="w-0 group-hover:w-4 h-[1px] bg-emerald mr-0 group-hover:mr-2 transition-all"></span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Governance / Legal */}
        <div>
           <h4 className="text-text-primary font-black uppercase tracking-widest text-xs mb-8 font-heading">Governance</h4>
           <ul className="space-y-4">
             <li><a href="#" className="text-text-secondary hover:text-mint transition-colors font-body">Privacy Policy</a></li>
             <li><a href="#" className="text-text-secondary hover:text-mint transition-colors font-body">Terms of Service</a></li>
             <li><a href="#" className="text-text-secondary hover:text-mint transition-colors font-body">Cookie Policy</a></li>
           </ul>
        </div>

        {/* Connection Matrix (Socials) */}
        <div>
          <h4 className="text-text-primary font-black uppercase tracking-widest text-xs mb-8 font-heading">Connect</h4>
          <div className="flex gap-4">
            {/* Social Icons with Plasma Style */}
            {[
              { name: 'X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
              { name: 'LinkedIn', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
              { name: 'GitHub', path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' }
            ].map((social) => (
              <a key={social.name} href="#" className="w-12 h-12 rounded-xl bg-secondary border border-mint/10 flex items-center justify-center transition-all duration-500 hover:border-emerald group relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <svg className="w-5 h-5 text-text-secondary group-hover:text-black relative z-10 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Final Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-mint/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-text-secondary text-xs font-medium uppercase tracking-widest opacity-60 font-heading">
          © {currentYear} PLASMA ENGINE. ALL RIGHTS RESERVED.
        </p>
        <p className="text-text-secondary text-xs font-medium uppercase tracking-widest opacity-60 font-heading">
          DEPLOYED FROM NASHIK // MS IN
        </p>
      </div>
    </footer>
  );
};

export default Footer;
