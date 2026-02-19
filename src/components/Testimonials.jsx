import React from 'react';

const Testimonials = () => {
    const stories = [
        {
            quote: "PLASMA didn't just build a website; they built a revenue engine. The UX changes alone increased our conversion rate by 40% in the first month.",
            author: "Founder, Bridlelink",
            result: "+40% Conversion",
            type: "SaaS Architecture"
        },
        {
            quote: "The technical depth is unmatched. We threw complex real-time requirements at them, and they delivered a flawless, scalable solution for our heritage brand.",
            author: "Director, Indic",
            result: "Flawless Scalability",
            type: "E-commerce"
        }
    ];

    return (
        <section className="bg-secondary-black py-20 md:py-40 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-evergreen opacity-10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8">
                    <div className="max-w-2xl">
                        <span className="text-emerald text-[10px] font-black uppercase tracking-[0.5em] mb-4 block font-heading">Validation Matrix</span>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-primary-text tracking-tighter uppercase italic font-heading">
                            FOUNDER <span className="text-mint">STORIES.</span>
                        </h2>
                    </div>
                    <p className="text-muted-text text-base md:text-lg max-w-xs border-l border-emerald/30 pl-6 font-body">
                        Real-world impact delivered through precise engineering.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {stories.map((story, idx) => (
                        <div key={idx} className="group relative p-8 md:p-12 bg-deep-black rounded-[2.5rem] border border-mint/5 hover:border-emerald/30 transition-all duration-700">
                            
                            {/* Technical Metadata Header */}
                            <div className="flex justify-between items-start mb-8 md:mb-10">
                                <span className="text-[9px] md:text-[10px] font-mono text-emerald uppercase tracking-widest px-3 py-1 bg-evergreen/20 rounded-full border border-emerald/20">
                                    {story.type}
                                </span>
                                <span className="text-[9px] md:text-[10px] font-mono text-muted-text opacity-40">VERIFIED_LOG_0{idx + 1}</span>
                            </div>

                            <p className="text-xl md:text-2xl text-primary-text leading-relaxed font-medium mb-8 md:mb-10 relative font-body">
                                <span className="text-6xl text-emerald absolute -top-8 -left-6 opacity-20 font-serif leading-none">"</span>
                                {story.quote}
                            </p>

                            <div className="flex items-center justify-between pt-8 border-t border-mint/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-secondary-black border border-mint/10 rounded-full flex items-center justify-center text-emerald font-black font-heading">
                                        {story.author.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-primary-text tracking-tight font-heading">{story.author}</h4>
                                        <p className="text-[10px] uppercase tracking-widest text-emerald font-bold">{story.result}</p>
                                    </div>
                                </div>
                                <div className="h-2 w-2 rounded-full bg-emerald shadow-[0_0_10px_#50C878] animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
