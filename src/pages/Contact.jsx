import React, { useState, useEffect } from 'react';
import api from '../api/api';
import SEO from '../components/SEO';
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronRight, Clock, Info, MessageSquare, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../components/Reveal';

const Contact = () => {
    const [branding, setBranding] = useState({
        name: 'PrintNexa',
        contact_email: '',
        contact_address: '',
        phone: '',
        logo_url: ''
    });

    useEffect(() => {
        const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
        const fetchBranding = async () => {
            try {
                const res = await api.get(`/websites/${websiteId}`);
                if (res.data) {
                    setBranding(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch contact branding");
            }
        };
        fetchBranding();
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        website_id: import.meta.env.VITE_WEBSITE_ID || 1
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/contact', formData);
            setSuccess(true);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '', website_id: import.meta.env.VITE_WEBSITE_ID || 1 });
        } catch (error) {
            alert('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans selection:bg-brand-600 selection:text-white pb-20">
            <SEO
                pageName="contact"
                fallbackTitle={`Contact Us | ${branding.name}`}
                fallbackDesc="Get in touch with our support team for inquiries."
            />

            {/* --- 1. CLEAN TECHNICAL HEADER --- */}
            <header className="bg-white border-b border-slate-200 pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full mb-8 shadow-sm">
                            <MessageSquare className="text-brand-600" size={12} />
                            <span className="text-slate-500 font-bold uppercase tracking-widest text-[9px]">Inquiry Hub</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-none tracking-tight uppercase mb-8">
                            Get in <span className="text-brand-600">Touch.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                            Our support team is available to assist with product specifications, corporate inquiries, and technical assistance.
                        </p>
                    </FadeIn>
                </div>
            </header>

            <div className="container mx-auto px-6 py-20 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    
                    {/* --- 2. LEFT: CONTACT INFO --- */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="space-y-6">
                            <FadeIn delay={0.1}>
                                <ContactInfoItem 
                                    icon={<Mail size={20} />} 
                                    title="Email Support" 
                                    value={branding.contact_email} 
                                />
                            </FadeIn>
                            <FadeIn delay={0.2}>
                                <ContactInfoItem 
                                    icon={<Phone size={20} />} 
                                    title="Phone Assistance" 
                                    value={branding.phone} 
                                />
                            </FadeIn>
                            <FadeIn delay={0.3}>
                                <ContactInfoItem 
                                    icon={<MapPin size={20} />} 
                                    title="Corporate Location" 
                                    value={branding.contact_address} 
                                />
                            </FadeIn>
                        </div>

                        {/* Operational Hours */}
                        <FadeIn delay={0.4}>
                            <div className="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm">
                                <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-3">
                                    <Clock size={16} className="text-brand-600" /> Operational Hours
                                </h4>
                                <div className="space-y-4 text-sm font-medium">
                                    <div className="flex justify-between border-b border-slate-100 pb-3">
                                        <span className="text-slate-400">Mon - Fri</span>
                                        <span className="text-slate-900">09:00 - 18:00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Weekend</span>
                                        <span className="text-brand-600 font-bold uppercase text-[10px]">By Inquiry</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* --- 3. RIGHT: CONTACT FORM --- */}
                    <div className="lg:col-span-8">
                        <FadeIn delay={0.2}>
                            <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/20">
                                {success ? (
                                    <div className="py-16 text-center animate-in fade-in zoom-in duration-500">
                                        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                                            <CheckCircle2 size={40} />
                                        </div>
                                        <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Message Received</h2>
                                        <p className="text-slate-500 mb-10 font-medium">Your inquiry has been successfully submitted. We will review your message promptly.</p>
                                        <button onClick={() => setSuccess(false)} className="text-brand-600 font-bold uppercase text-xs tracking-widest hover:underline underline-offset-8">Send New Inquiry</button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                                <input 
                                                    type="text" required 
                                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-brand-600 outline-none transition-all font-medium text-slate-900" 
                                                    placeholder="Alex Vane"
                                                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                                <input 
                                                    type="email" required 
                                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-brand-600 outline-none transition-all font-medium text-slate-900" 
                                                    placeholder="email@example.com"
                                                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Inquiry Subject</label>
                                            <input 
                                                type="text" required 
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-brand-600 outline-none transition-all font-medium text-slate-900" 
                                                placeholder="Product Specifications"
                                                value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
                                            <textarea 
                                                rows="5" required 
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-brand-600 outline-none transition-all resize-none font-medium text-slate-900" 
                                                placeholder="Provide details regarding your request..."
                                                value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                                            ></textarea>
                                        </div>
                                        <button 
                                            disabled={loading}
                                            className="w-full md:w-auto px-12 py-5 bg-slate-900 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-brand-600 transition-all shadow-xl disabled:bg-slate-200 flex items-center justify-center gap-3"
                                        >
                                            {loading ? 'Processing...' : 'Send Inquiry'} 
                                            {!loading && <Send size={16} />}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- HELPER COMPONENT ---

const ContactInfoItem = ({ icon, title, value }) => {
    if (!value) return null;
    return (
        <div className="flex gap-6 group items-start">
            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500 shrink-0 shadow-sm">
                {icon}
            </div>
            <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</h4>
                <p className="text-base font-bold text-slate-900 leading-tight break-all">{value}</p>
            </div>
        </div>
    );
};

export default Contact;