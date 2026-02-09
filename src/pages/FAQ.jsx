import React, { useState, useEffect } from 'react';
import api from '../api/api';
import SEO from '../components/SEO';
import { HelpCircle, ChevronDown, MessageSquare, ArrowRight, Search, ChevronRight, Sparkles, AlertCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../components/Reveal';

const FAQ = () => {
    const [faqs, setFaqs] = useState([]);
    const [filteredFaqs, setFilteredFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
                const res = await api.get('/faqs', { params: { website_id: websiteId } });
                setFaqs(res.data);
                setFilteredFaqs(res.data);
            } catch (error) {
                console.error("Failed to fetch FAQs");
            } finally {
                setLoading(false);
            }
        };
        fetchFaqs();
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            setFilteredFaqs(faqs);
        } else {
            const lower = searchTerm.toLowerCase();
            setFilteredFaqs(faqs.filter(faq => 
                faq.question.toLowerCase().includes(lower) || 
                faq.answer.toLowerCase().includes(lower)
            ));
        }
    }, [searchTerm, faqs]);

    return (
        <div className="bg-slate-50 min-h-screen pb-20 font-sans selection:bg-brand-600 selection:text-white">
            <SEO 
                pageName="faq" 
                fallbackTitle="Help Center | Support" 
                fallbackDesc="Find answers to common questions about our products and services." 
            />

            {/* --- 1. CLEAN TECHNICAL HEADER --- */}
            <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-white border-b border-slate-200 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <FadeIn>
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full mb-8 shadow-sm">
                                <Info className="text-brand-600" size={12} />
                                <span className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Information Hub</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-none tracking-tight uppercase mb-8">
                                Frequently <span className="text-brand-600">Asked</span> <br/>Questions.
                            </h1>
                            <p className="text-slate-500 font-medium text-lg max-w-xl mx-auto mb-12">
                                Search our database for technical specifications, order information, and product support.
                            </p>
                            
                            {/* Search Bar Integration */}
                            <div className="relative max-w-2xl mx-auto">
                                <input 
                                    type="text" 
                                    placeholder="Search by topic or keyword..." 
                                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:border-brand-600 focus:bg-white outline-none transition-all shadow-sm font-medium"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* --- 2. FAQ ACCORDION LIST --- */}
            <section className="py-20 relative z-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="space-y-4">
                        {loading ? (
                            <div className="flex flex-col items-center py-20 gap-4">
                                <div className="w-10 h-10 border-2 border-slate-200 border-t-brand-600 rounded-full animate-spin"></div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loading Records</p>
                            </div>
                        ) : filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq, index) => (
                                <FadeIn key={faq.id} delay={index * 0.05}>
                                    <FAQItem 
                                        faq={faq} 
                                        isOpen={activeIndex === index} 
                                        onClick={() => setActiveIndex(activeIndex === index ? null : index)} 
                                    />
                                </FadeIn>
                            ))
                        ) : (
                            <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-200 border-dashed">
                                <AlertCircle size={48} className="text-slate-200 mx-auto mb-6" />
                                <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase">No Results Found</h3>
                                <p className="text-slate-500 mb-8 max-w-xs mx-auto text-sm font-medium">Try a different keyword or contact our support team directly.</p>
                                <button onClick={() => setSearchTerm('')} className="text-brand-600 font-bold uppercase text-xs tracking-widest hover:underline">Clear Search</button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* --- 3. CTA SECTION --- */}
            <section className="container mx-auto px-6 pb-24">
                <FadeIn>
                    <div className="relative rounded-[3rem] bg-slate-900 overflow-hidden p-10 md:p-20 text-center border border-white/5 shadow-2xl">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[120px]"></div>
                        
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <div className="w-14 h-14 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center text-brand-500 mx-auto mb-10 border border-white/10">
                                <MessageSquare size={28} />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase leading-tight">Need Support <br/> Assistance?</h2>
                            <p className="text-slate-400 mb-12 text-lg font-medium">Our support team is available to help with product specifications and order-related inquiries.</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link to="/contact" className="px-10 py-5 bg-brand-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-xl group">
                                    Contact Support <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link to="/" className="px-10 py-5 border border-white/10 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all">
                                    Return Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </section>
        </div>
    );
};

// --- HELPER COMPONENT ---

const FAQItem = ({ faq, isOpen, onClick }) => (
    <div className={`group bg-white rounded-[2rem] border transition-all duration-500 ${isOpen ? 'border-brand-600 ring-4 ring-brand-600/5 shadow-xl' : 'border-slate-200 hover:border-slate-300 shadow-sm'}`}>
        <button 
            onClick={onClick}
            className="w-full flex items-center justify-between p-6 md:p-8 text-left"
        >
            <span className={`font-bold text-base md:text-lg pr-8 transition-colors duration-500 ${isOpen ? 'text-brand-600' : 'text-slate-900'}`}>
                {faq.question}
            </span>
            <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-brand-600 text-white rotate-180 shadow-md' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'}`}>
                <ChevronDown size={20} />
            </div>
        </button>
        
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                >
                    <div className="px-6 pb-6 md:px-8 md:pb-8">
                        <div className="pt-6 border-t border-slate-100 text-slate-500 text-base leading-relaxed font-medium">
                            {faq.answer}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export default FAQ;