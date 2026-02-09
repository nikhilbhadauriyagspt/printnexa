import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    ShieldCheck,
    Zap,
    ArrowRight,
    Printer,
    Wifi,
    Layers,
    Palette,
    CheckCircle2
} from 'lucide-react';

const HeroCinematic = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    const slides = [
        {
            id: 1,
            image: "/banner/banner-1.jpg",
            tag: "Business Printing",
            title: "HIGH VOLUME",
            highlight: "LASER SERIES",
            desc: "Laser printers designed for office environments. Supports print speeds up to 45 ppm depending on configuration.",
            stats: { label: "Speed", value: "Up to 45 PPM" }
        },
        {
            id: 2,
            image: "/banner/banner-2.jpg",
            tag: "Creative Studio",
            title: "COLOR PRECISION",
            highlight: "INKJET SERIES",
            desc: "High-resolution inkjet systems for photography and design. Compatible with various media types and pigment inks.",
            stats: { label: "System", value: "Multi-Ink" }
        },
        {
            id: 3,
            image: "/banner/banner-4.jpg",
            tag: "Home Office",
            title: "HIGH CAPACITY",
            highlight: "TANK SERIES",
            desc: "Refillable ink tank printers designed for document printing efficiency and reduced maintenance frequency.",
            stats: { label: "Type", value: "Refillable" }
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    setCurrentSlide((s) => (s + 1) % slides.length);
                    return 0;
                }
                return prev + 0.5;
            });
        }, 30);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <section className="relative w-full h-[80vh] min-h-[600px] bg-white overflow-hidden">

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                >
                    {/* FULL BACKGROUND VISUAL */}
                    <div className="absolute inset-0">
                        <motion.div
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="w-full h-full"
                        >
                            <img
                                src={slides[currentSlide].image}
                                alt="banner"
                                className="w-full h-full object-cover object-right lg:object-center"
                            />
                            {/* Subtle Overlay to make text pop on the left space */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent"></div>
                        </motion.div>

                        {/* Floating Tech Stat */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            className="absolute bottom-40 right-8 lg:right-20 bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 z-30 hidden md:flex"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-lg">
                                <Zap size={24} fill="currentColor" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 leading-none mb-1">{slides[currentSlide].stats.label}</p>
                                <p className="text-3xl font-black italic text-white leading-none">{slides[currentSlide].stats.value}</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* CONTENT OVERLAY - LEFT FOCUSED */}
                    <div className="relative z-20 h-full container mx-auto px-8 flex items-center">
                        <div className="max-w-3xl">
                            {/* HP AUTHORIZED PARTNER BADGE - BANNER */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="inline-flex items-center gap-4 bg-slate-900/5 border border-slate-900/10 rounded-2xl p-4 mb-8"
                            >
                                <div className="w-10 h-10 shrink-0">
                                    <img src="/logo/hp-logo.png" alt="HP Logo" className="w-full h-full object-contain" />
                                </div>
                                <div className="flex flex-col leading-none">
                                    <span className="text-slate-900 text-[10px] font-black uppercase tracking-[0.2em]">HP AUTHORIZED</span>
                                    <span className="text-brand-600 text-[10px] font-black uppercase tracking-[0.2em] mt-1">PARTNER</span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex items-center gap-2 mb-6"
                            >
                                <div className="p-1.5 bg-brand-50 rounded-lg text-brand-600">
                                    <Printer size={14} />
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-600">
                                    {slides[currentSlide].tag}
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-8"
                            >
                                {slides[currentSlide].title} <br />
                                <span className="text-brand-600 italic tracking-tight">{slides[currentSlide].highlight}</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed mb-12 max-w-xl border-l-4 border-brand-500/20 pl-8"
                            >
                                {slides[currentSlide].desc}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-wrap items-center gap-8"
                            >
                                <Link
                                    to="/products"
                                    className="group relative px-12 py-5 bg-[#0f172a] text-white rounded-full overflow-hidden shadow-2xl transition-all hover:scale-105 active:scale-95"
                                >
                                    <div className="absolute inset-0 bg-brand-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                    <span className="relative z-10 flex items-center gap-3 text-[11px] font-black uppercase tracking-widest">
                                        Shop All Printers <ArrowRight size={18} />
                                    </span>
                                </Link>

                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <Wifi size={20} className="text-brand-600" />
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 leading-tight">Smart<br />Connect</p>
                                    </div>
                                    <div className="w-[1px] h-8 bg-slate-200"></div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 size={20} className="text-emerald-500" />
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 leading-tight">In Stock<br />Ready</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* REFINED PROGRESS NAVIGATION */}
            <div className="absolute bottom-0 left-0 right-0 z-40 bg-white/30 backdrop-blur-sm border-t border-slate-100">
                <div className="container mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between py-8">
                    <div className="flex items-center gap-10 flex-1 lg:pl-0">
                        {slides.map((slide, idx) => (
                            <button
                                key={slide.id}
                                onClick={() => { setCurrentSlide(idx); setProgress(0); }}
                                className={`group flex flex-col gap-3 transition-all ${currentSlide === idx ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black text-slate-900">0{idx + 1}</span>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-brand-600 transition-colors hidden md:block">
                                        {slide.tag.split(' ')[0]}
                                    </span>
                                </div>
                                <div className="w-24 md:w-40 h-[1px] bg-slate-200 relative overflow-hidden">
                                    {currentSlide === idx && (
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            className="absolute inset-0 bg-brand-600"
                                        />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => { setCurrentSlide(s => (s === 0 ? slides.length - 1 : s - 1)); setProgress(0); }}
                            className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all active:scale-90"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => { setCurrentSlide(s => (s + 1) % slides.length); setProgress(0); }}
                            className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all active:scale-90"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default HeroCinematic;