import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { FadeIn } from '../components/Reveal';
import { ChevronRight, Truck, Clock, Mail, Phone, Globe } from 'lucide-react';

const ShippingPolicy = () => {
    return (
        <div className="bg-white min-h-screen font-sans selection:bg-brand-600 selection:text-white pb-20">
            <SEO
                pageName="shipping_policy"
                fallbackTitle="Shipping & Delivery Policy | Prime Fix Solutions"
                fallbackDesc="Read our shipping and delivery options, timeframes, and policies."
            />

            {/* --- HEADER --- */}
            <header className="bg-slate-50 pt-32 pb-16 border-b border-slate-100">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                            <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
                            <ChevronRight size={10} />
                            <span className="text-slate-900">Shipping Policy</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight uppercase mb-4">
                            Shipping <span className="text-brand-600">& Delivery.</span>
                        </h1>
                        <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
                            <Clock size={16} />
                            <span>Last updated February 11, 2026</span>
                        </div>
                    </FadeIn>
                </div>
            </header>

            {/* --- CONTENT --- */}
            <article className="container mx-auto px-6 py-16 lg:py-24">
                <div className="max-w-4xl mx-auto prose prose-slate prose-lg lg:prose-xl">
                    <FadeIn>
                        <p className="lead">
                            This Shipping & Delivery Policy is part of our Terms and Conditions ("Terms") and should be therefore read alongside our main Terms: <Link to="/terms-and-conditions" className="text-brand-600 font-bold">http://primefixsolutions.shop/terms-and-conditions</Link>.
                        </p>
                        <p>
                            Please carefully review our Shipping & Delivery Policy when purchasing our products. This policy will apply to any order you place with us.
                        </p>

                        <div className="my-12 space-y-12">
                            <section>
                                <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-4">
                                    <Truck className="text-brand-600" /> WHAT ARE MY SHIPPING DELIVERY OPTIONS?
                                </h2>
                                <p>
                                    We offer various shipping options. In some cases a third-party supplier may be managing our inventory and will be responsible for shipping your products.
                                </p>
                                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mt-6">
                                    <h4 className="text-lg font-bold text-slate-900 mb-2">Free Shipping</h4>
                                    <p className="text-slate-600 m-0">We offer free Standard shipping on all orders.</p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-4">
                                    <Globe className="text-brand-600" /> DO YOU DELIVER INTERNATIONALLY?
                                </h2>
                                <p>
                                    We do not offer international shipping.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-4">
                                    <Clock className="text-brand-600" /> WHAT HAPPENS IF MY ORDER IS DELAYED?
                                </h2>
                                <p>
                                    If delivery is delayed for any reason we will let you know as soon as possible and will advise you of a revised estimated date for delivery.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black text-slate-900 uppercase">QUESTIONS ABOUT RETURNS?</h2>
                                <p>
                                    If you have questions about returns, please review our Return Policy: <Link to="/refund-policy" className="text-brand-600 font-bold">http://primefixsolutions.shop/return-policy</Link>.
                                </p>
                            </section>
                        </div>

                        <h2 className="text-2xl font-black text-slate-900 uppercase pt-8 border-t border-slate-100">HOW CAN YOU CONTACT US ABOUT THIS POLICY?</h2>
                        <p>If you have any further questions or comments, you may contact us by:</p>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 my-8">
                            <address className="not-italic text-slate-700 font-bold leading-relaxed space-y-3">
                                <p className="flex items-center gap-3"><Phone size={18} className="text-brand-600" /> <span>Phone: +1-402-508-9751</span></p>
                                <p className="flex items-center gap-3"><Mail size={18} className="text-brand-600" /> <span>Email: info@primefixsolutions.shop</span></p>
                                <p className="flex items-center gap-3">
                                    <ChevronRight size={18} className="text-brand-600" />
                                    <span>Online contact form: <Link to="/contact" className="text-brand-600">https://primefixsolutions.shop/contact</Link></span>
                                </p>
                            </address>
                        </div>
                    </FadeIn>
                </div>
            </article>
        </div>
    );
};

export default ShippingPolicy;