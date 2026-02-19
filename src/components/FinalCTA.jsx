import React from 'react';

const FinalCTA = () => {
    return (
        <section className="relative bg-deep-black py-24 md:py-40 overflow-hidden flex flex-col items-center text-center border-t border-mint/5">
            {/* Layered Atmospheric Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[1000px] md:h-[400px] bg-evergreen opacity-20 blur-[100px] md:blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[200px] h-[200px] md:w-[600px] md:h-[300px] bg-emerald opacity-10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>
            
            <div className="max-w-5xl mx-auto px-6 relative z-10">
                {/* Visual Hook */}
                <span className="text-emerald text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] mb-4 md:mb-6 block font-heading">
                    Available for Q2 2026 Projects
                </span>

                <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-primary-text mb-8 md:mb-10 leading-[0.9] tracking-tighter uppercase italic font-heading">
                    READY TO LIGHT <br/>
                    THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald via-mint to-emerald drop-shadow-[0_0_35px_rgba(80,200,120,0.5)]">PLASMA?</span>
                </h2>

                <p className="text-muted-text text-lg md:text-xl md:text-2xl mb-12 md:mb-16 max-w-2xl mx-auto leading-relaxed font-body">
                    Stop waiting for the "right time." Build the high-performance platform your business deserves <span className="text-primary-text">today.</span>
                </p>
                
                {/* The "Mjölnir" Button */}
                <button className="group relative px-16 py-7 bg-emerald text-deep-black font-black text-xl rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_60px_rgba(80,200,120,0.3)] font-heading">
                    <span className="relative z-10 tracking-[0.1em]">WORK WITH US</span>
                    
                    {/* High-Voltage Hover Effect */}
                    <div className="absolute inset-0 bg-mint translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                    
                    {/* Animated Edge Light */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-mint/50 rounded-xl transition-all duration-500"></div>
                </button>
            </div>

            {/* Subtle Tech-Detail */}
            <div className="mt-20 flex items-center gap-4 opacity-20">
                <div className="h-[1px] w-12 bg-muted-text"></div>
                <span className="text-[10px] text-muted-text font-mono uppercase tracking-widest">Connect to Server</span>
                <div className="h-[1px] w-12 bg-muted-text"></div>
            </div>
        </section>
    );
};

export default FinalCTA;
