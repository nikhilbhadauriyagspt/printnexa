import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import SEO from '../components/SEO';
import { FadeIn } from '../components/Reveal';
import { motion } from 'framer-motion';
import { 
    ShieldCheck, 
    ArrowRight, 
    Award, 
    Globe, 
    CheckCircle2, 
    Monitor, 
    Printer, 
    Settings, 
    Package, 
    Zap, 
    Quote,
    MapPin,
    Target,
    Compass
} from 'lucide-react';

const AboutUs = () => {
    const [branding, setBranding] = useState({ name: 'Prime Fix Solutions' });
    
    useEffect(() => {
        const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
        api.get(`/websites/${websiteId}`).then(res => setBranding(res.data)).catch(() => { });
    }, []);

    return (
        <div className="bg-white min-h-screen relative font-sans selection:bg-brand-600 selection:text-white">
            <SEO
                pageName="about"
                fallbackTitle={`Corporate Profile | ${branding.name}`}
                fallbackDesc={`Authorized HP Partner providing authentic technology solutions nationwide.`}
            />

            {/* --- SECTION 1: CINEMATIC HERO --- */}
            <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden bg-slate-950">
                <div className="absolute inset-0 z-0">
                    <img src="/about-us.jpg" className="w-full h-full object-cover opacity-30 grayscale" alt="HQ" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
                </div>
                
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <FadeIn direction="right">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-600 text-white rounded-full mb-8 shadow-xl shadow-brand-600/20">
                            <Award size={16} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Authorized HP Partner</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none uppercase mb-8 tracking-tighter">
                            Innovation <br/> <span className="text-brand-600">Meets Trust.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mb-12">
                            Prime Fix Solutions delivers complete technology ecosystems designed for reliability, efficiency, and long-term value from our headquarters in Louisiana.
                        </p>
                        <div className="flex flex-wrap gap-12">
                            <StatItem label="Established" value="2015" />
                            <StatItem label="U.S. States" value="50+" />
                            <StatItem label="Authenticity" value="100%" />
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* --- SECTION 2: THE NARRATIVE --- */}
            <section className="py-24 lg:py-40 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="relative">
                            <FadeIn direction="right">
                                <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border-8 border-slate-50">
                                    <img src="/why-choose-us.jpg" className="w-full h-full object-cover" alt="Team" />
                                </div>
                                <div className="absolute -bottom-10 -right-10 hidden xl:block w-64 p-8 bg-brand-600 rounded-[2.5rem] shadow-2xl text-white">
                                    <Quote size={32} className="mb-4 opacity-50" />
                                    <p className="text-sm font-bold leading-relaxed italic">"We deliver tech that drives business excellence."</p>
                                </div>
                            </FadeIn>
                        </div>
                        
                        <div className="space-y-10">
                            <FadeIn direction="left">
                                <div className="inline-flex items-center gap-2 text-brand-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
                                    <span className="w-8 h-px bg-brand-600"></span> Our Story
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tight">
                                    Redefining the <br/> Tech Experience.
                                </h2>
                                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                                    Founded in New Orleans, we saw a gap in the market — too many people struggled to find authentic, affordable, and dependable computing and printing solutions from trusted sources. 
                                </p>
                                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                                    That’s why we partnered with HP, one of the world’s most respected names in innovation, to bring customers a seamless shopping experience backed by expert service.
                                </p>
                                <div className="pt-6">
                                    <Link to="/contact" className="inline-flex items-center gap-4 text-slate-900 font-black text-xs uppercase tracking-widest hover:text-brand-600 transition-colors group">
                                        Partner With Us <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: THE ECOSYSTEM --- */}
            <section className="py-24 lg:py-40 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-600/5 -skew-x-12 transform translate-x-20"></div>
                
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="max-w-3xl mb-20">
                        <FadeIn>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-6">What We Do.</h2>
                            <p className="text-slate-500 text-lg font-medium">Comprehensive technology distribution and management services.</p>
                        </FadeIn>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<Monitor size={24} />} 
                            title="Laptops & Computers" 
                            desc="High-performance systems for home, business, and professional use." 
                        />
                        <FeatureCard 
                            icon={<Printer size={24} />} 
                            title="Printers & Scanners" 
                            desc="Inkjet, LaserJet, and Enterprise All-in-One models tailored to you." 
                        />
                        <FeatureCard 
                            icon={<Settings size={24} />} 
                            title="Printing Supplies" 
                            desc="Genuine HP ink, toner, and paper for consistent professional results." 
                        />
                        <FeatureCard 
                            icon={<Package size={24} />} 
                            title="Accessories" 
                            desc="Productivity tools, keyboards, and networking devices for your workspace." 
                        />
                        <FeatureCard 
                            icon={<Zap size={24} />} 
                            title="Business Solutions" 
                            desc="Managed print, bulk purchase programs, and enterprise device management." 
                        />
                        <FeatureCard 
                            icon={<ShieldCheck size={24} />} 
                            title="Expert Support" 
                            desc="Direct technical assistance for installation, troubleshooting, and repairs." 
                        />
                    </div>
                </div>
            </section>

            {/* --- SECTION 4: MISSION & VISION (CARDS) --- */}
            <section className="py-24 lg:py-40 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <FadeIn direction="right">
                            <div className="bg-slate-950 p-12 md:p-20 rounded-[4rem] text-white h-full flex flex-col justify-center shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 rounded-full blur-[100px] group-hover:bg-brand-600/20 transition-all"></div>
                                <Target size={48} className="text-brand-600 mb-8" />
                                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">Our Mission</h3>
                                <p className="text-slate-400 text-xl leading-relaxed font-light">
                                    To empower every customer with reliable, efficient, and sustainable technology solutions through genuine products and a customer-first approach.
                                </p>
                            </div>
                        </FadeIn>
                        
                        <FadeIn direction="left" delay={0.2}>
                            <div className="bg-brand-600 p-12 md:p-20 rounded-[4rem] text-white h-full flex flex-col justify-center shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] group-hover:bg-white/20 transition-all"></div>
                                <Compass size={48} className="text-white mb-8" />
                                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">Our Vision</h3>
                                <p className="text-brand-50 text-xl leading-relaxed font-light">
                                    To become a leading HP-partner brand in the United States, known for delivering cutting-edge technology and unmatched service excellence.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* --- SECTION 5: WHY PRIME FIX --- */}
            <section className="py-24 lg:py-40 bg-slate-50 border-y border-slate-200">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                        <div>
                            <FadeIn>
                                <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-8 leading-tight">
                                    Why Choose <br/> <span className="text-brand-600">Prime Fix.</span>
                                </h2>
                                <p className="text-slate-500 font-medium leading-relaxed mb-10">
                                    Serving customers nationwide with an uncompromising commitment to authenticity and secure logistics.
                                </p>
                                <Link to="/products" className="inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-600 transition-all shadow-xl">
                                    Browse Products <ArrowRight size={16} />
                                </Link>
                            </FadeIn>
                        </div>
                        
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                            <WhyBox title="Authorized Partner" desc="100% genuine HP products with full manufacturer warranty." />
                            <WhyBox title="Fast Logistics" desc="Secure packaging and tracked nationwide delivery across all 50 states." />
                            <WhyBox title="Safe Transactions" desc="Protected shopping with encrypted payments and verified gateways." />
                            <WhyBox title="Sustainability" desc="Promoting energy-efficient devices and green printing initiatives." />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 6: LOCATION --- */}
            <section className="py-24 lg:py-40 bg-white">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <FadeIn>
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-100 rounded-full mb-8">
                            <MapPin size={16} className="text-brand-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">New Orleans, Louisiana</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tight mb-8">Serving Nationwide.</h2>
                        <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto mb-16">
                            Our headquarters serves as the hub for operations and logistics. We proudly ship across the United States, providing responsive support before and after your purchase.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40">
                            {['Integrity', 'Innovation', 'Excellence', 'Commitment'].map(val => (
                                <span key={val} className="text-2xl font-black uppercase tracking-[0.25em] text-slate-400">{val}</span>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const StatItem = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-3xl md:text-4xl font-black text-white tracking-tighter">{value}</span>
        <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest mt-1">{label}</span>
    </div>
);

const FeatureCard = ({ icon, title, desc }) => (
    <div className="p-10 bg-white rounded-[3rem] border border-slate-200 hover:border-brand-600 transition-all group shadow-sm hover:shadow-2xl">
        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-600 group-hover:text-white transition-all mb-8 shadow-inner">
            {icon}
        </div>
        <h4 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-4">{title}</h4>
        <p className="text-slate-500 text-sm font-medium leading-relaxed">{desc}</p>
    </div>
);

const WhyBox = ({ title, desc }) => (
    <div className="flex gap-6">
        <div className="shrink-0 w-8 h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center">
            <CheckCircle2 size={16} />
        </div>
        <div>
            <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider mb-2">{title}</h4>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">{desc}</p>
        </div>
    </div>
);

export default AboutUs;