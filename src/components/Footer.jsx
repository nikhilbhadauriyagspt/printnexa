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
        name: 'PrintNexa',
        contact_email: '',
        contact_address: '',
        phone: '',
        logo_url: '/logo/logo.png'
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
        <footer className="bg-slate-950 text-slate-400 relative overflow-hidden font-sans border-t border-slate-900">
            {/* Vector Background Pattern - Tech Dot Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }}>
            </div>

            {/* Circuit Line Accents (Decorative Vectors) */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 100 Q 250 50 500 100 T 1000 100" fill="none" stroke="white" strokeWidth="2" />
                <path d="M0 150 Q 250 100 500 150 T 1000 150" fill="none" stroke="white" strokeWidth="2" />
                <circle cx="80%" cy="20%" r="300" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
            </svg>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">

                {/* --- TOP SECTION: BRAND & NEWSLETTER --- */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end py-16 lg:py-24 border-b border-white/5 gap-12">
                    <div className="max-w-1/2">
                        <div>
                            <Link to="/" className="inline-block group mb-8">
                                <img
                                    src={branding.logo_url || '/logo/logo.png'}
                                    alt={branding.name}
                                    className="h-16 w-auto grayscale group-hover:grayscale-0 transition-all"
                                    onError={(e) => { e.target.src = '/logo/logo.png'; }}
                                />
                            </Link>
                        </div>
                        {/* HP AUTHORIZED PARTNER BADGE */}
                        <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 mb-8">
                            <div className="w-10 h-10 shrink-0">
                                <img src="/logo/hp-logo.png" alt="HP Logo" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">HP AUTHORIZED</span>
                                <span className="text-brand-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">PARTNER</span>
                            </div>
                        </div>


                        <h2 className="text-4xl md:text-5xl font-black text-white leading-none tracking-tight mb-6">
                            PROFESSIONAL <br /> <span className="text-brand-600">PRINTING.</span>
                        </h2>
                        <p className="text-sm font-medium text-slate-500 uppercase tracking-widest ">
                            Authorized retailer of professional printing equipment and supplies. Sourced directly from manufacturers.
                        </p>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <p className="text-white font-bold mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></span>
                            Newsletter
                        </p>
                        <p className="text-slate-500 text-sm mb-6">Subscribe for product updates and company news.</p>
                        <form onSubmit={handleNewsletterSubmit} className="relative group">
                            <input
                                type="email"
                                placeholder="Enter your email address..."
                                className="w-full bg-transparent border-b border-white/20 py-6 text-2xl md:text-3xl text-white placeholder:text-slate-700 focus:outline-none focus:border-brand-600 transition-colors font-medium"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-brand-600 transition-colors p-4">
                                <ArrowRight size={32} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* --- MIDDLE SECTION: LINKS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 py-16 border-b border-white/5">

                    {/* Column 1: Navigation */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-4">Explore</h4>
                        <ul className="space-y-3">
                            {['Home', 'Products', 'About Us', 'Journal', 'Contact'].map((item, i) => (
                                <li key={i}>
                                    <Link to={item === 'Home' ? '/' : item === 'Journal' ? '/blog' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium hover:text-white transition-colors block">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2: Collections */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-4">Collections</h4>
                        <ul className="space-y-3">
                            {categories.length > 0 ? categories.map(cat => (
                                <li key={cat.id}>
                                    <Link to={`/products?category=${cat.slug}`} className="text-sm font-medium hover:text-white transition-colors block">
                                        {cat.name}
                                    </Link>
                                </li>
                            )) : (
                                <>
                                    <li><Link to="/products" className="text-sm font-medium hover:text-white transition-colors block">Laser Tech</Link></li>
                                    <li><Link to="/products" className="text-sm font-medium hover:text-white transition-colors block">Inkjet Pro</Link></li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Column 3: Legal & Help */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-4">Support</h4>
                        <ul className="space-y-3">
                            <li><Link to="/faq" className="text-sm font-medium hover:text-white transition-colors block">Help Center</Link></li>
                            <li><Link to="/shipping-policy" className="text-sm font-medium hover:text-white transition-colors block">Shipping & Returns</Link></li>
                            <li><Link to="/terms-of-service" className="text-sm font-medium hover:text-white transition-colors block">Terms of Service</Link></li>
                            <li><Link to="/privacy-policy" className="text-sm font-medium hover:text-white transition-colors block">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div className="space-y-8">
                        <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-4">Headquarters</h4>
                        <div className="space-y-4">
                            {branding.contact_address && (
                                <p className="text-sm font-medium leading-relaxed">{branding.contact_address}</p>
                            )}
                            {branding.contact_email && (
                                <a href={`mailto:${branding.contact_email}`} className="block text-lg font-bold text-white hover:text-brand-500 transition-colors">{branding.contact_email}</a>
                            )}
                            {branding.phone && (
                                <a href={`tel:${branding.phone}`} className="block text-sm font-medium hover:text-white transition-colors">{branding.phone}</a>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- DISCLAIMER --- */}
                <div className="py-6 border-t border-white/5">
                    <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                        Disclaimer: All product names, logos, and brands are property of their respective owners. All company, product and service names used in this website are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.
                    </p>
                </div>

                {/* --- BOTTOM BAR --- */}
                <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                            © 2026 {branding.name} Inc. | subsidiary of PrimeFix Solutions LLC.
                        </p>

                        {/* PrimeFix Solution Logo */}
                        <div className="bg-white px-4 py-2 rounded-xl flex items-center gap-3">
                            <img src="/logo/primefixlogo.png" alt="PrimeFix" className="h-6 object-contain" />
                            <div className="h-4 border-l border-slate-200"></div>
                            <span className="text-black font-black text-xs tracking-tight">PrimeFix</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="PayPal" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3" alt="Visa" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="Mastercard" />
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;