import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { Phone, Mail, ShieldCheck, Globe } from 'lucide-react';

const TopBar = () => {
    const [branding, setBranding] = useState({
        contact_email: 'support@primefixsolutions.shop',
        phone: '+1 (555) 123-4567'
    });

    useEffect(() => {
        const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
        api.get(`/websites/${websiteId}`).then(res => setBranding(res.data)).catch(() => {});
    }, []);

    return (
        <div className="bg-[#0f172a] text-white py-1.5 border-b border-white/5 relative z-[70]">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex justify-between items-center">
                    
                    {/* Left: Trust Badges */}
                    <div className="hidden lg:flex items-center gap-6">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            SECURE PAYMENTS
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                            <Globe size={14} className="text-blue-500" />
                            NATIONWIDE DELIVERY
                        </div>
                    </div>

                    {/* Center: Dynamic Info */}
                    <div className="flex-1 text-center">
                        <p className="text-[10px] md:text-[11px] font-black tracking-[0.2em] uppercase">
                            <span className="text-brand-400">Limited Time:</span> Free Shipping on all orders over $499
                        </p>
                    </div>

                    {/* Right: Contact & Language */}
                    <div className="hidden md:flex items-center gap-6 text-[10px] font-bold">
                        <a href={`tel:${branding.phone}`} className="text-slate-300 hover:text-white transition-colors">
                            {branding.phone}
                        </a>
                        <div className="w-[1px] h-3 bg-slate-700"></div>
                        <a href={`mailto:${branding.contact_email}`} className="text-slate-300 hover:text-white transition-colors uppercase tracking-widest">
                            Support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
