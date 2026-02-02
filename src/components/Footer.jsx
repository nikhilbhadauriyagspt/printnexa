import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import { 
    Mail, Phone, MapPin, Zap, 
    ArrowRight, Globe, ShieldCheck
} from 'lucide-react';

const Footer = () => {
    const [branding, setBranding] = useState({
        name: 'Inktrix',
        contact_email: '',
        contact_address: '',
        phone: '',
        logo_url: ''
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
                if (brandingRes.data) {
                    setBranding(brandingRes.data);
                }
                setCategories(catRes.data.slice(0, 5));
            } catch (error) {
                console.error("Footer data fetch error", error);
            }
        };
        fetchData();
    }, []);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }
        toast.success("Successfully Subscribed!");
        setEmail('');
    };

    return (
        <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 relative overflow-hidden font-sans border-t border-white/5">
            {/* Ambient Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link to="/" className="flex items-center gap-3 group">
                            {branding.logo_url ? (
                                <img 
                                    src={branding.logo_url} 
                                    alt={branding.name} 
                                    className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <>
                                    <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-600/20 group-hover:scale-110 transition-transform duration-500">
                                        <Zap size={24} fill="currentColor" />
                                    </div>
                                    <span className="text-3xl font-black text-white tracking-tighter uppercase">
                                        {branding.name}
                                    </span>
                                </>
                            )}
                        </Link>
                        <p className="text-lg text-slate-500 leading-relaxed max-w-sm">
                            Setting the gold standard in premium printing solutions and enterprise technology.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
                        <FooterColumn title="Explore" links={[
                            { label: 'Home', to: '/' },
                            { label: 'All Products', to: '/products' },
                            { label: 'About Us', to: '/about' },
                            { label: 'Support Center', to: '/faq' },
                            { label: 'Contact', to: '/contact' }
                        ]} />
                        <FooterColumn title="Categories" links={
                            categories.length > 0 
                            ? categories.map(cat => ({ label: cat.name, to: `/products?category=${cat.slug}` }))
                            : [
                                { label: 'Laser Printers', to: '/products' },
                                { label: 'Inkjet Printers', to: '/products' },
                                { label: 'Office Supplies', to: '/products' }
                            ]
                        } />
                        <div className="col-span-2 md:col-span-1">
                            {(branding.phone || branding.contact_email || branding.contact_address) && (
                                <>
                                    <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8 border-l-2 border-brand-600 pl-4">Get in Touch</h4>
                                    <div className="space-y-6">
                                        {branding.phone && <ContactItem icon={<Phone size={18} />} text={branding.phone} />}
                                        {branding.contact_email && <ContactItem icon={<Mail size={18} />} text={branding.contact_email} />}
                                        {branding.contact_address && <ContactItem icon={<MapPin size={18} />} text={branding.contact_address} />}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Newsletter Box */}
                <div className="relative group overflow-hidden bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-[2.5rem] p-8 md:p-12 mb-20 backdrop-blur-sm">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="text-center lg:text-left max-w-md">
                            <h3 className="text-2xl font-bold text-white mb-3">Stay in the Loop</h3>
                            <p className="text-slate-500 font-medium">Subscribe for exclusive updates, new arrivals, and professional insights.</p>
                        </div>
                        <form onSubmit={handleNewsletterSubmit} className="flex w-full lg:w-auto gap-3">
                            <input 
                                type="email" 
                                placeholder="Email address" 
                                className="flex-1 md:w-80 bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-500 transition-all placeholder:text-slate-600"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-brand-600/20 group flex items-center gap-2">
                                Subscribe <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left space-y-2">
                        <p className="text-xs font-medium text-slate-600 uppercase tracking-widest">
                            © 2026 {branding.name}. A subsidiary of PrimeFix Solutions LLC. All Rights Reserved.
                        </p>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start">
                            <Link to="/privacy-policy" className="text-[10px] font-bold text-slate-700 hover:text-brand-500 transition-colors uppercase tracking-widest">Privacy Policy</Link>
                            <Link to="/terms-of-service" className="text-[10px] font-bold text-slate-700 hover:text-brand-500 transition-colors uppercase tracking-widest">Terms of Service</Link>
                            <Link to="/shipping-policy" className="text-[10px] font-bold text-slate-700 hover:text-brand-500 transition-colors uppercase tracking-widest">Shipping Policy</Link>
                            <Link to="/refund-policy" className="text-[10px] font-bold text-slate-700 hover:text-brand-500 transition-colors uppercase tracking-widest">Refund Policy</Link>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-4">
                        <div className="flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="PayPal" />
                             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3" alt="Visa" />
                             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="Mastercard" />
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-700 uppercase tracking-widest bg-white/[0.02] px-3 py-1.5 rounded-lg border border-white/5">
                            <ShieldCheck size={14} className="text-brand-600" />
                            <span>100% Secure Transaction</span>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

const FooterColumn = ({ title, links }) => (
    <div>
        <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8 border-l-2 border-brand-600 pl-4">{title}</h4>
        <ul className="space-y-4">
            {links.map((link, i) => (
                <li key={i}>
                    <Link to={link.to} className="text-sm font-medium hover:text-brand-500 transition-colors block py-0.5">
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

const ContactItem = ({ icon, text }) => (
    <div className="flex items-start gap-4 group">
        <div className="mt-1 text-brand-600 group-hover:scale-110 transition-transform">{icon}</div>
        <p className="text-sm font-medium leading-relaxed group-hover:text-slate-300 transition-colors">{text}</p>
    </div>
);

export default Footer;