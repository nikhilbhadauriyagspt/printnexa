import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, X, Package, TrendingUp, ArrowRight, Loader2, AlertCircle, ChevronRight, Zap, History, Sparkles, Filter, ArrowUpRight } from 'lucide-react';
import api from '../api/api';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => inputRef.current?.focus(), 100);
            
            // Load some categories for suggestions
            api.get('/categories').then(res => setCategories(res.data.slice(0, 4))).catch(() => {});
        } else {
            document.body.style.overflow = 'unset';
            setQuery('');
            setSuggestions([]);
            setError(null);
        }
    }, [isOpen]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.trim().length > 1) {
                setLoading(true);
                setError(null);
                try {
                    const res = await api.get(`/products?search=${query}`);
                    const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
                    setSuggestions(data.slice(0, 5)); 
                } catch (err) {
                    setError("Search failed.");
                } finally {
                    setLoading(false);
                }
            } else {
                setSuggestions([]);
                setError(null);
            }
        };

        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [query]);

    const handleSearch = (e) => {
        e?.preventDefault();
        if (query.trim()) {
            onClose();
            navigate(`/products?search=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-white/95 backdrop-blur-3xl pt-12 md:pt-24 pb-12">
                    {/* 1. Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                        style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="relative w-full max-w-6xl px-6 z-10"
                    >
                        {/* Header: Close & Input */}
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-600 rounded-2xl flex items-center justify-center text-white">
                                    <Search size={20} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Search Engine</span>
                            </div>
                            <button 
                                onClick={onClose}
                                className="p-3 bg-slate-900 text-white rounded-full hover:bg-brand-600 transition-all shadow-xl"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="mb-16">
                            <form onSubmit={handleSearch} className="relative group">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Search products, series, or parts..."
                                    className="w-full bg-transparent border-b-[6px] border-slate-100 py-10 text-4xl md:text-7xl font-black text-slate-900 placeholder:text-slate-100 focus:border-brand-600 outline-none transition-all uppercase tracking-tighter"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                                    {loading ? <Loader2 className="animate-spin text-brand-600" size={48} /> : null}
                                </div>
                            </form>
                        </div>

                        {/* Results / Suggestion Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            
                            {/* Left Side: Dynamic Results (8 Columns) */}
                            <div className="lg:col-span-8">
                                {query.length < 2 ? (
                                    <div className="space-y-12">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {categories.map(cat => (
                                                <Link key={cat.id} to={`/products?category=${cat.id}`} onClick={onClose} className="group p-6 bg-slate-50 rounded-3xl flex items-center justify-between border border-transparent hover:border-brand-600 hover:bg-white transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                                            <Filter size={18} className="text-brand-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-black uppercase tracking-widest text-slate-900">{cat.name}</p>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Browse Series</p>
                                                        </div>
                                                    </div>
                                                    <ChevronRight size={18} className="text-slate-200 group-hover:text-brand-600 transition-colors" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Search Results</h3>
                                            <span className="text-[10px] font-bold bg-slate-100 px-3 py-1 rounded-full">{suggestions.length} Units Found</span>
                                        </div>

                                        <AnimatePresence mode="popLayout">
                                            {suggestions.length > 0 ? (
                                                suggestions.map((item, idx) => (
                                                    <motion.div
                                                        key={item.id}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: idx * 0.05 }}
                                                    >
                                                        <Link 
                                                            to={`/product/${item.slug}`} 
                                                            onClick={onClose}
                                                            className="flex items-center gap-8 p-4 bg-white border border-slate-100 rounded-[2rem] hover:border-brand-600 hover:shadow-2xl hover:shadow-brand-900/5 transition-all group"
                                                        >
                                                            <div className="w-24 h-24 bg-slate-50 rounded-2xl flex items-center justify-center p-4 shrink-0 group-hover:bg-white transition-colors">
                                                                <img 
                                                                    src={item.image_url?.startsWith('http') ? item.image_url : `/products/${item.image_url}`} 
                                                                    alt={item.name}
                                                                    className="max-h-full object-contain mix-blend-multiply transition-transform group-hover:scale-110 duration-500"
                                                                />
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="text-[8px] font-black uppercase tracking-widest bg-brand-50 text-brand-600 px-2 py-0.5 rounded">Series: {item.category_name || 'PN'}</span>
                                                                </div>
                                                                <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight group-hover:text-brand-600 transition-colors line-clamp-1">{item.name}</h4>
                                                                <p className="text-sm font-bold text-slate-400 tracking-widest mt-1">${item.price}</p>
                                                            </div>
                                                            <div className="pr-6 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                                                                <ArrowRight className="text-brand-600" size={24} />
                                                            </div>
                                                        </Link>
                                                    </motion.div>
                                                ))
                                            ) : (
                                                !loading && (
                                                    <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                                                        <Package size={48} className="mx-auto mb-4 text-slate-200" />
                                                        <p className="text-xl font-bold text-slate-400 uppercase tracking-tighter">No Units Matched</p>
                                                    </div>
                                                )
                                            )}
                                        </AnimatePresence>

                                        {suggestions.length > 0 && (
                                            <button onClick={handleSearch} className="w-full py-6 mt-4 border-2 border-slate-900 bg-slate-900 text-white rounded-3xl text-xs font-black uppercase tracking-[0.3em] hover:bg-brand-600 hover:border-brand-600 transition-all flex items-center justify-center gap-3 group">
                                                Discover Full Archive <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Right Side: Featured/Promotional (4 Columns) */}
                            <div className="lg:col-span-4 space-y-12">
                                <div className="p-8 bg-[#0f172a] rounded-[2.5rem] text-white relative overflow-hidden group">
                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-600/20 rounded-full blur-3xl group-hover:bg-brand-600/40 transition-all duration-700"></div>
                                    <div className="relative z-10">
                                        <Zap className="text-brand-500 mb-6 fill-current" size={32} />
                                        <h4 className="text-xl font-black uppercase tracking-tight mb-4 leading-tight">Need expert help identifying a part?</h4>
                                        <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">Our technical team is ready to assist you via direct line.</p>
                                        <Link to="/contact" onClick={onClose} className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white hover:text-brand-500 transition-colors">
                                            Contact Support <ArrowUpRight size={16} />
                                        </Link>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                                        <Sparkles size={14} className="text-amber-500" /> New Arrivals
                                    </h3>
                                    <div className="space-y-4">
                                        {['Industrial LaserJet P-200', 'Office Jet G-Series', 'Wide Format Pro'].map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-4 group cursor-pointer" onClick={() => setQuery(item)}>
                                                <div className="w-2 h-2 rounded-full bg-brand-600"></div>
                                                <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SearchBar;