import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import SEO from '../components/SEO';
import { FadeIn } from '../components/Reveal';
import { 
    ShieldCheck, 
    Zap, 
    ArrowRight, 
    Quote, 
    Award, 
    Globe, 
    Eye, 
    CheckCircle2, 
    Leaf, 
    Users, 
    Briefcase,
    Settings,
    Package,
    History
} from 'lucide-react';

const AboutUs = () => {
    const [branding, setBranding] = useState({ name: 'PrintNexa' });
    
    useEffect(() => {
        const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
        api.get(`/websites/${websiteId}`).then(res => setBranding(res.data)).catch(() => { });
    }, []);

    return (
        <div className="bg-white min-h-screen relative font-sans selection:bg-brand-600 selection:text-white pb-20">
            <SEO
                pageName="about"
                fallbackTitle={`Company Overview | ${branding.name}`}
                fallbackDesc={`Discover the mission and operational standards of ${branding.name}.`}
            />

            {/* --- 1. MODERN MINIMAL HERO --- */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-50 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
                <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full mb-8 shadow-sm">
                            <Briefcase size={12} className="text-brand-600" />
                            <span className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">About Our Operations</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-none uppercase mb-8 tracking-tight">
                            Professional <span className="text-brand-600">Hardware</span> <br/>Distribution.
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto mb-12">
                            We specialize in the supply of high-performance printing technology for business environments and creative workspaces.
                        </p>
                        <div className="flex justify-center items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm"><Users size={16} /></div>)}
                            </div>
                            <div className="h-8 w-px bg-slate-200"></div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">Internal<br/>Support Team</p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* --- 2. STAGGERED STORY SECTION --- */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12">
                    
                    {/* Row 1: History */}
                    <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
                        <div className="w-full lg:w-1/2">
                            <FadeIn direction="right">
                                <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl">
                                    <img src="/about-us.jpg" className="w-full h-full object-cover" alt="Logistics" />
                                </div>
                            </FadeIn>
                        </div>
                        <div className="w-full lg:w-1/2 space-y-6">
                            <FadeIn direction="left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 w-fit mb-6">
                                    <History size={14} className="text-brand-600" />
                                    <span className="text-brand-600 font-bold uppercase tracking-widest text-[10px]">Company History</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight leading-tight">Established Distribution <br/>Networks Since 2015.</h2>
                                <p className="text-slate-500 leading-relaxed font-medium">Founded as a technical supplier for business equipment, we have spent over a decade refining our inventory to include the most reliable models in the market.</p>
                                <div className="pt-4 grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <p className="text-2xl font-black text-slate-900 tracking-tighter italic">2015</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Establishment</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-2xl font-black text-slate-900 tracking-tighter italic">2026</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Digital Scale</p>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>

                    {/* Row 2: Commitment */}
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                        <div className="w-full lg:w-1/2">
                            <FadeIn direction="left">
                                <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl">
                                    <img src="/banner/banner-2.jpg" className="w-full h-full object-cover" alt="Product Quality" />
                                </div>
                            </FadeIn>
                        </div>
                        <div className="w-full lg:w-1/2 space-y-6">
                            <FadeIn direction="right">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 w-fit mb-6">
                                    <Leaf size={14} className="text-emerald-600" />
                                    <span className="text-emerald-600 font-bold uppercase tracking-widest text-[10px]">Environmental Focus</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight leading-tight">Supporting Sustainable <br/>Printing Practices.</h2>
                                <p className="text-slate-500 leading-relaxed font-medium">We prioritize hardware that supports energy-efficiency standards and manufacturer recycling programs, helping to reduce operational waste.</p>
                                <ul className="space-y-3 pt-4">
                                    <li className="flex items-center gap-3 text-xs font-bold text-slate-700">
                                        <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><CheckCircle2 size={12}/></div>
                                        Low-Energy Standby Modes
                                    </li>
                                    <li className="flex items-center gap-3 text-xs font-bold text-slate-700">
                                        <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><CheckCircle2 size={12}/></div>
                                        High-Yield Consumable Options
                                    </li>
                                </ul>
                            </FadeIn>
                        </div>
                    </div>

                </div>
            </section>

            {/* --- 3. VALUES GRID --- */}
            <section className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <FadeIn>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight mb-4">Core Operational Standards</h2>
                            <p className="text-slate-500 font-medium text-sm">Our catalog is curated based on three fundamental principles.</p>
                        </FadeIn>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FadeIn delay={0.1}><AboutCard icon={<ShieldCheck size={24} />} title="Authenticity" desc="All hardware and accessories are sourced through authorized manufacturer channels." /></FadeIn>
                        <FadeIn delay={0.2}><AboutCard icon={<Eye size={24} />} title="Transparency" desc="We provide verified technical specifications to ensure accurate product matching for your needs." /></FadeIn>
                        <FadeIn delay={0.3}><AboutCard icon={<Settings size={24} />} title="Reliability" desc="Models are selected based on consistent performance benchmarks and build quality." /></FadeIn>
                    </div>
                </div>
            </section>

            {/* --- 4. DARK METRICS SECTION --- */}
            <section className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <FadeIn>
                                <Quote size={48} className="text-brand-600 mb-8 opacity-20" />
                                <h3 className="text-2xl md:text-4xl font-bold text-white leading-relaxed mb-10">
                                    "We provide the specialized equipment that businesses and creators need to maintain consistent productivity."
                                </h3>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center text-white text-lg font-black">IT</div>
                                    <div>
                                        <p className="text-white font-bold text-xs uppercase tracking-widest">{branding.name} Logistics</p>
                                        <p className="text-brand-500 font-bold text-[9px] uppercase tracking-widest">Inventory Management</p>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                        <div className="grid grid-cols-2 gap-6 md:gap-8">
                            <FadeIn delay={0.1}><MetricItem icon={<Package />} label="Inventory" value="Verified" /></FadeIn>
                            <FadeIn delay={0.2}><MetricItem icon={<Globe />} label="Shipping" value="Tracked" /></FadeIn>
                            <FadeIn delay={0.3}><MetricItem icon={<Award />} label="Support" value="Business" /></FadeIn>
                            <FadeIn delay={0.4}><MetricItem icon={<Zap />} label="Response" value="Prompt" /></FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 5. FINAL ACTION --- */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <FadeIn fullWidth>
                        <div className="relative rounded-[3rem] bg-slate-50 border border-slate-100 overflow-hidden p-12 md:p-20 text-center group">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/5 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000"></div>
                            <div className="relative z-10 max-w-3xl mx-auto">
                                <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase leading-tight mb-10 tracking-tight">Access Professional <br/><span className="text-brand-600">Equipment.</span></h2>
                                <Link to="/products" className="group inline-flex items-center gap-4 px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-brand-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                                    Browse Inventory <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <div className="mt-12 text-[9px] text-slate-400 font-medium leading-relaxed max-w-lg mx-auto uppercase tracking-wider">
                                    Disclaimer: All product specifications are provided by manufacturers. Configuration and regional availability may vary.
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
};

// --- HELPER COMPONENTS ---

const AboutCard = ({ icon, title, desc }) => (
    <div className="p-10 rounded-[2.5rem] bg-white border border-slate-200 hover:border-brand-600/20 transition-all duration-500 group shadow-sm hover:shadow-xl">
        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-brand-600 group-hover:text-white transition-all mb-8 shadow-inner">{icon}</div>
        <h3 className="text-lg font-bold uppercase tracking-tight text-slate-900 mb-4">{title}</h3>
        <p className="text-slate-500 leading-relaxed font-medium text-xs">{desc}</p>
    </div>
);

const MetricItem = ({ icon, label, value }) => (
    <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all group text-center lg:text-left">
        <div className="text-brand-500 mb-4 flex justify-center lg:justify-start group-hover:scale-110 transition-transform">{icon}</div>
        <div className="text-2xl md:text-3xl font-black italic tracking-tighter text-white leading-none mb-2">{value}</div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{label}</p>
    </div>
);

export default AboutUs;