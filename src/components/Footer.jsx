import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import {
    Mail, Phone, MapPin, Zap,
    ArrowRight, Globe, ShieldCheck,
    ChevronRight, ArrowUpRight
} from 'lucide-react';

const Footer = () => {
    const [branding, setBranding] = useState({
        name: 'Prime Fix Solutions',
        contact_email: 'primefixsolutions.us@outlook.com',
        contact_address: '3014 Dauphine st ste A PM3 357287 New Orleans, Louisiana 70117-6755 US',
        phone: '',
        logo_url: '/logo/primefixlogo.png'
    });
    const [email, setEmail] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
                const [brandingRes, catRes] = await Promise.all([
                    api.get(`/websites/${websiteId}`),
                    api.get('/categories')
                ]);
                if (brandingRes.data) setBranding(brandingRes.data);
                setCategories(catRes.data.slice(0, 5));
            } catch (error) {
                console.error("Footer data fetch error", error);
            }
        };
        fetchData();
    }, []);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        toast.success("Subscribed successfully.");
        setEmail('');
    };

    const hasContactInfo = branding.phone || branding.contact_email || branding.contact_address;

    return (
        <footer className="bg-slate-950 text-slate-400 relative font-sans border-t border-slate-900">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">

                {/* --- TOP SECTION: BRAND & NEWSLETTER --- */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-12 lg:py-16 border-b border-white/5 gap-12">
                    <div className="max-w-xl">


                        {/* Unified Logo Box - Moved to Top */}
                        <div className="bg-white px-6 py-3 rounded-2xl flex items-center gap-6 shadow-2xl border border-white/10 mb-8 w-fit">

                            <div className="flex items-center gap-3">
                                <img src="/logo/primefixlogo.png" alt="PrimeFix" className="h-10 object-contain" />
                            </div>
                            <div className="w-px h-5 bg-slate-200"></div>


                            <div className="flex items-center gap-3">
                                <img src="/logo/hp-logo.png" alt="HP" className="h-6 object-contain" />
                                <span className="text-[14px] font-black text-slate-400 capitalize tracking-widest">Authorized</span>
                            </div>

                        </div>

                        <h2 className="text-4xl font-black text-white leading-tight capitalize mb-6 tracking-tight">
                            Professional <span className="text-brand-600">Printing Solutions.</span>
                        </h2>
                        <p className="text-sm font-medium text-slate-500 capitalize tracking-widest max-w-md">
                            Authorized retailer of professional printing equipment and industrial supplies.
                        </p>
                    </div>

                    <div className="w-full lg:w-1/3">
                        <p className="text-white text-[14px] font-black capitalize tracking-[0.2em] mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></span>
                            Newsletter
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="relative">
                            <input
                                type="email"
                                placeholder="Subscribe to newsletter..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-600 transition-all font-medium"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-600 text-white p-2.5 rounded-xl hover:bg-brand-500 transition-colors">
                                <ArrowRight size={20} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* --- MIDDLE SECTION: LINKS GRID --- */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16 border-b border-white/5">
                    {/* ... (Columns remain similar but with tighter spacing) */}
                    <div className="space-y-4">
                        <h4 className="text-[14px] font-black text-white capitalize tracking-[0.2em] mb-4 opacity-50">Explore</h4>
                        <ul className="space-y-2.5">
                            {['Home', 'Products', 'About Us', 'Contact'].map((item, i) => (
                                <li key={i}>
                                    <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-xs font-bold hover:text-white transition-colors block capitalize tracking-wider">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[14px] font-black text-white capitalize tracking-[0.2em] mb-4 opacity-50">Categories</h4>
                        <ul className="space-y-2.5">
                            {categories.length > 0 ? categories.map(cat => (
                                <li key={cat.id}>
                                    <Link to={`/products?category=${cat.slug}`} className="text-xs font-bold hover:text-white transition-colors block capitalize tracking-wider">
                                        {cat.name}
                                    </Link>
                                </li>
                            )) : (
                                <li><Link to="/products" className="text-xs font-bold hover:text-white transition-colors block">All Printers</Link></li>
                            )}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[14px] font-black text-white capitalize tracking-[0.2em] mb-4 opacity-50">Support</h4>
                        <ul className="space-y-2.5">
                            <li><Link to="/privacy-policy" className="text-xs font-bold hover:text-white transition-colors block capitalize tracking-wider">Privacy Policy</Link></li>
                            <li><Link to="/cookie-policy" className="text-xs font-bold hover:text-white transition-colors block capitalize tracking-wider">Cookie Policy</Link></li>
                            <li><Link to="/terms-and-conditions" className="text-xs font-bold hover:text-white transition-colors block capitalize tracking-wider">Terms & Conditions</Link></li>
                            <li><Link to="/refund-policy" className="text-xs font-bold hover:text-white transition-colors block capitalize tracking-wider">Return Policy</Link></li>
                            <li><Link to="/shipping-policy" className="text-xs font-bold hover:text-white transition-colors block capitalize tracking-wider">Shipping Policy</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[14px] font-black text-white capitalize tracking-[0.2em] mb-4 opacity-50">Contact</h4>
                        <div className="space-y-3">
                            {branding.contact_email && (
                                <a href={`mailto:${branding.contact_email}`} className="block text-xs font-bold text-white hover:text-brand-500 transition-colors capitalize tracking-wider">{branding.contact_email}</a>
                            )}
                            {branding.phone && (
                                <p className="text-xs font-bold text-slate-500 capitalize tracking-wider">{branding.phone}</p>
                            )}
                            {branding.contact_address && (
                                <p className="text-[10px] font-bold text-slate-500 capitalize tracking-wider leading-relaxed">{branding.contact_address}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- DISCLAIMER --- */}
                <div className="py-8 border-t border-white/5">
                    <p className="text-sm text-slate-600 leading-relaxed font-bold capitalize tracking-wide">
                        Disclaimer: All product names, logos, and brands are property of their respective owners. All company, product and service names used in this website are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.
                    </p>
                </div>

                {/* --- BOTTOM BAR --- */}
                <div className="py-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-4">
                        <p className="text-sm font-black capitalize tracking-[0.2em] text-slate-500">
                            © 2026 {branding.name} Inc. | All Rights Reserved.
                        </p>
                    </div>

                    <div className="flex items-center gap-8 grayscale opacity-30 hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="PayPal" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3.5" alt="Visa" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="Mastercard" />
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;