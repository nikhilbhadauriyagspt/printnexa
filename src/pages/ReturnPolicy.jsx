import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { FadeIn } from '../components/Reveal';
import { ChevronRight, RotateCcw, Clock, Mail, Package, AlertCircle } from 'lucide-react';

const ReturnPolicy = () => {
    return (
        <div className="bg-white min-h-screen font-sans selection:bg-brand-600 selection:text-white pb-20">
            <SEO 
                pageName="return_policy" 
                fallbackTitle="Return Policy | Prime Fix Solutions" 
                fallbackDesc="Read our return and refund policy for your purchases." 
            />

            {/* --- HEADER --- */}
            <header className="bg-slate-50 pt-32 pb-16 border-b border-slate-100">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                            <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
                            <ChevronRight size={10} />
                            <span className="text-slate-900">Return Policy</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight uppercase mb-4">
                            Return <span className="text-brand-600">& Refunds.</span>
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
                            Thank you for your purchase. We hope you are happy with your purchase. However, if you are not completely satisfied with your purchase for any reason, you may return it to us for a refund only. Please see below for more information on our return policy.
                        </p>

                        <div className="my-12 space-y-12">
                            <section>
                                <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-4">
                                    <RotateCcw className="text-brand-600" /> RETURNS
                                </h2>
                                <p>
                                    All returns must be postmarked within <strong>seven (7) days</strong> of the purchase date. All returned items must be in new and unused condition, with all original tags and labels attached.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-4">
                                    <Package className="text-brand-600" /> RETURN PROCESS
                                </h2>
                                <p>
                                    To return an item, please email customer service at <a href="mailto:primefixsolutions.us@outlook.com" className="text-brand-600 font-bold">primefixsolutions.us@outlook.com</a> to obtain an Return Merchandise Authorization (RMA) number.
                                </p>
                                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mt-6">
                                    <p className="font-medium text-slate-700 mb-4">After receiving an RMA number, place the item securely in its original packaging and include your proof of purchase, then mail your return to the following address:</p>
                                    <address className="not-italic text-slate-900 font-bold leading-relaxed">
                                        PrimeFix Solutions LLC<br />
                                        Attn: Returns<br />
                                        RMA #<br />
                                        3014 Dauphine st ste A PM3 357287<br />
                                        New Orleans, LA 70117<br />
                                        United States
                                    </address>
                                    <p className="mt-6 text-brand-600 font-black uppercase text-xs tracking-widest">
                                        Return shipping charges will be paid or reimbursed by us.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black text-slate-900 uppercase">REFUNDS</h2>
                                <p>
                                    After receiving your return and inspecting the condition of your item, we will process your return. Please allow at least <strong>seven (7) days</strong> from the receipt of your item to process your return. Refunds may take 1-2 billing cycles to appear on your credit card statement, depending on your credit card company. We will notify you by email when your return has been processed.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black text-slate-900 uppercase flex items-center gap-4">
                                    <AlertCircle className="text-brand-600" /> EXCEPTIONS
                                </h2>
                                <p>
                                    For defective or damaged products, please contact us at the contact details below to arrange a refund or exchange.
                                </p>
                            </section>
                        </div>

                        <h2 className="text-2xl font-black text-slate-900 uppercase pt-8 border-t border-slate-100">QUESTIONS</h2>
                        <p>If you have any questions concerning our return policy, please contact us at:</p>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 my-8">
                            <address className="not-italic text-slate-700 font-bold leading-relaxed space-y-3">
                                <p className="flex items-center gap-3"><Mail size={18} className="text-brand-600" /> <span>primefixsolutions.us@outlook.com</span></p>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Contact support for immediate assistance</p>
                            </address>
                        </div>
                    </FadeIn>
                </div>
            </article>
        </div>
    );
};

export default ReturnPolicy;