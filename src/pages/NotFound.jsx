import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { FadeIn } from '../components/Reveal';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
            <FadeIn>
                <div className="relative mb-8">
                    <h1 className="text-[12rem] md:text-[18rem] font-black text-slate-100 opacity-[0.3] select-none leading-none">404</h1>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 mb-6 animate-bounce">
                            <Search size={48} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">Page not found</h2>
                    </div>
                </div>
                
                <p className="text-slate-500 max-w-md mx-auto mb-10 font-medium text-lg leading-relaxed">
                    The requested page could not be located. It may have been moved or is no longer available.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link 
                        to="/" 
                        className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-600 transition-all shadow-xl active:scale-95 uppercase text-xs tracking-widest"
                    >
                        <Home size={18} /> Return Home
                    </Link>
                    <Link 
                        to="/products" 
                        className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold hover:border-brand-600 hover:text-brand-600 transition-all active:scale-95 uppercase text-xs tracking-widest"
                    >
                        <ArrowLeft size={18} /> View Catalog
                    </Link>
                </div>
            </FadeIn>
        </div>
    );
};

export default NotFound;