import React, { useState } from 'react';

const Process = () => {
    const steps = [
        { 
            id: "01", 
            name: "Audit & Strategy", 
            tag: "DISCOVERY",
            desc: "We dissect your business goals and technical constraints to build a roadmap for success." 
        },
        { 
            id: "02", 
            name: "Design & Architecture", 
            tag: "VISUALIZATION",
            desc: "Crafting intuitive, high-converting interfaces that align with your digital brand identity." 
        },
        { 
            id: "03", 
            name: "Development", 
            tag: "ENGINEERING",
            desc: "Writing clean, scalable code using cutting-edge frameworks like React, Next.js, and Node." 
        },
        { 
            id: "04", 
            name: "Launch & Scale", 
            tag: "DEPLOYMENT",
            desc: "Rigorous testing, followed by a seamless deployment and continuous performance optimization." 
        }
    ];

    const [activeStep, setActiveStep] = useState(0);

    return (
        <section id="process" className="bg-secondary py-24 md:py-40 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")'}}></div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                
                {/* Left: Interactive Timeline */}
                <div>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-text-primary mb-8 tracking-tighter font-heading">
                        THE PLASMA <span className="text-emerald drop-shadow-[0_0_15px_rgba(80,200,120,0.3)]">BLUEPRINT.</span>
                    </h2>
                    <p className="text-text-secondary text-xl mb-16 max-w-md font-medium font-body">
                        A calibrated engineering process designed to eliminate guesswork and deliver excellence.
                    </p>

                    <div className="relative space-y-12 pl-10">
                        {/* The Active Circuit Line */}
                        <div className="absolute left-[19px] top-0 w-[2px] h-full bg-mint/10">
                            <div 
                                className="absolute top-0 left-0 w-full bg-emerald transition-all duration-700 ease-in-out shadow-[0_0_10px_#50C878]"
                                style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
                            ></div>
                        </div>

                        {steps.map((step, idx) => (
                            <div 
                                key={step.id} 
                                className={`relative cursor-pointer transition-all duration-500 py-4 ${idx === activeStep ? 'opacity-100 translate-x-4' : 'opacity-30 hover:opacity-50'}`}
                                onMouseEnter={() => setActiveStep(idx)}
                            >
                                {/* Digital Node */}
                                <div className={`absolute -left-[31px] top-2 w-3 h-3 rounded-full transition-all duration-500 z-10 
                                    ${idx === activeStep ? 'bg-emerald scale-150 shadow-[0_0_20px_#50C878]' : 'bg-mint/30'}`}>
                                </div>
                                
                                <span className="text-emerald text-[10px] font-black tracking-[0.3em] mb-2 block font-heading">{step.tag}</span>
                                <h3 className="text-3xl font-black text-text-primary mb-4 tracking-tight font-heading">
                                    {step.name}
                                </h3>
                                <p className={`text-text-secondary leading-relaxed transition-all duration-500 overflow-hidden max-w-sm font-body ${idx === activeStep ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Technical Visualization */}
                <div className="hidden lg:block relative group">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-emerald/20 to-transparent blur-2xl rounded-[3rem] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="relative bg-primary rounded-[3rem] border border-mint/10 p-16 h-[600px] flex flex-col justify-between overflow-hidden">
                        {/* Grid Overlay */}
                        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#D1F2EB 1px, transparent 0)', backgroundSize: '30px 30px'}}></div>
                        
                        <div className="flex justify-between items-start relative z-10">
                            <div className="text-text-secondary font-mono text-xs tracking-widest uppercase">
                                System Status: <span className="text-emerald">Optimized</span>
                            </div>
                            <div className="text-emerald font-black text-xl italic tracking-tighter font-heading">P-0{activeStep + 1}</div>
                        </div>

                        {/* Central Animated Core */}
                        <div className="relative flex items-center justify-center">
                            <div className={`absolute w-64 h-64 bg-emerald rounded-full blur-[100px] transition-all duration-1000 opacity-20 ${activeStep % 2 === 0 ? 'scale-110' : 'scale-90'}`}></div>
                            <span className="text-[180px] font-black text-text-primary/5 select-none tracking-tighter font-heading">
                                {steps[activeStep].id}
                            </span>
                        </div>

                        <div className="relative z-10">
                            <div className="h-[2px] w-full bg-mint/5 mb-6">
                                <div className="h-full bg-emerald transition-all duration-1000" style={{ width: `${(activeStep + 1) * 25}%` }}></div>
                            </div>
                            <div className="flex justify-between text-[10px] font-mono text-text-secondary uppercase tracking-widest">
                                <span>Phase: {steps[activeStep].tag}</span>
                                <span>Ref: PLASMA_PROTO_v2</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
