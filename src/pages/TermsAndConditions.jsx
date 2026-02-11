import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { FadeIn } from '../components/Reveal';
import { ChevronRight, FileText, Clock, Mail, Phone, MapPin } from 'lucide-react';

const TermsAndConditions = () => {
    return (
        <div className="bg-white min-h-screen font-sans selection:bg-brand-600 selection:text-white pb-20">
            <SEO
                pageName="terms_and_conditions"
                fallbackTitle="Terms and Conditions | Prime Fix Solutions"
                fallbackDesc="Read our legal terms and conditions for using our services."
            />

            {/* --- HEADER --- */}
            <header className="bg-slate-50 pt-32 pb-16 border-b border-slate-100">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                            <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
                            <ChevronRight size={10} />
                            <span className="text-slate-900">Terms & Conditions</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight uppercase mb-4">
                            Terms and <span className="text-brand-600">Conditions.</span>
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
                        <h2 className="text-2xl font-black text-slate-900 uppercase">AGREEMENT TO OUR LEGAL TERMS</h2>
                        <p>
                            We are PrimeFix Solutions LLC ("Company," "we," "us," "our"), a company registered in Louisiana, United States at 3014 Dauphine st ste A PM3 357287, New Orleans, LA 70117.
                        </p>
                        <p>
                            We operate the website <a href="http://primefixsolutions.shop/" className="text-brand-600 font-bold">http://primefixsolutions.shop/</a> (the "Site"), as well as any other related products and services that refer or link to these legal terms (the "Legal Terms") (collectively, the "Services").
                        </p>
                        <p>
                            Prime Fix Solutions is your trusted destination for authentic, high-performance printers and printing accessories from HP and other leading technology brands.
                        </p>
                        <p>
                            You can contact us by phone at 00000000000, email at <a href="mailto:info@primefixsolutions.shop" className="text-brand-600 font-bold">info@primefixsolutions.shop</a>, or by mail to 3014 Dauphine st ste A PM3 357287, New Orleans, LA 70117, United States.
                        </p>
                        <p>
                            These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and PrimeFix Solutions LLC, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. <strong>IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</strong>
                        </p>
                        <p>
                            Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of these Legal Terms, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Legal Terms to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Legal Terms by your continued use of the Services after the date such revised Legal Terms are posted.
                        </p>
                        <p>
                            The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
                        </p>
                        <p>
                            We recommend that you print a copy of these Legal Terms for your records.
                        </p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">TABLE OF CONTENTS</h2>
                        <ol className="text-brand-600 font-bold grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <li>OUR SERVICES</li>
                            <li>INTELLECTUAL PROPERTY RIGHTS</li>
                            <li>USER REPRESENTATIONS</li>
                            <li>USER REGISTRATION</li>
                            <li>PRODUCTS</li>
                            <li>PURCHASES AND PAYMENT</li>
                            <li>RETURN POLICY</li>
                            <li>PROHIBITED ACTIVITIES</li>
                            <li>USER GENERATED CONTRIBUTIONS</li>
                            <li>CONTRIBUTION LICENSE</li>
                            <li>SERVICES MANAGEMENT</li>
                            <li>PRIVACY POLICY</li>
                            <li>TERM AND TERMINATION</li>
                            <li>MODIFICATIONS AND INTERRUPTIONS</li>
                            <li>GOVERNING LAW</li>
                            <li>DISPUTE RESOLUTION</li>
                            <li>CORRECTIONS</li>
                            <li>DISCLAIMER</li>
                            <li>LIMITATIONS OF LIABILITY</li>
                            <li>INDEMNIFICATION</li>
                            <li>USER DATA</li>
                            <li>ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</li>
                            <li>CALIFORNIA USERS AND RESIDENTS</li>
                            <li>MISCELLANEOUS</li>
                            <li>CONTACT US</li>
                        </ol>

                        <hr className="my-12" />

                        <h2 className="text-2xl font-black text-slate-900 uppercase">1. OUR SERVICES</h2>
                        <p>The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.</p>
                        <p>The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">2. INTELLECTUAL PROPERTY RIGHTS</h2>
                        <h3>Our intellectual property</h3>
                        <p>We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").</p>
                        <p>Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.</p>
                        <p>The Content and Marks are provided in or through the Services "AS IS" for your personal, non-commercial use or internal business purpose only.</p>
                        <h3>Your use of our Services</h3>
                        <p>Subject to your compliance with these Legal Terms, including the "PROHIBITED ACTIVITIES" section below, we grant you a non-exclusive, non-transferable, revocable license to:</p>
                        <ul>
                            <li>access the Services; and</li>
                            <li>download or print a copy of any portion of the Content to which you have properly gained access,</li>
                        </ul>
                        <p>solely for your personal, non-commercial use or internal business purpose.</p>
                        <p>Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.</p>
                        <p>If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to: <a href="mailto:info@primefixsolutions.shop">info@primefixsolutions.shop</a>. If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content.</p>
                        <p>We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.</p>
                        <p>Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.</p>
                        <h3>Your submissions</h3>
                        <p>Please review this section and the "PROHIBITED ACTIVITIES" section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.</p>
                        <p><strong>Submissions:</strong> By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services ("Submissions"), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.</p>
                        <p><strong>You are responsible for what you post or upload:</strong> By sending us Submissions through any part of the Services you:</p>
                        <ul>
                            <li>confirm that you have read and agree with our "PROHIBITED ACTIVITIES" and will not post, send, publish, upload, or transmit through the Services any Submission that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading;</li>
                            <li>to the extent permissible by applicable law, waive any and all moral rights to any such Submission;</li>
                            <li>warrant that any such Submission are original to you or that you have the necessary rights and licenses to submit such Submissions and that you have full authority to grant us the above-mentioned rights in relation to your Submissions; and</li>
                            <li>warrant and represent that your Submissions do not constitute confidential information.</li>
                        </ul>
                        <p>You are solely responsible for your Submissions and you expressly agree to reimburse us for any and all losses that we may suffer because of your breach of (a) this section, (b) any third party’s intellectual property rights, or (c) applicable law.</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">3. USER REPRESENTATIONS</h2>
                        <p>By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Legal Terms; (4) you are not a minor in the jurisdiction in which you reside; (5) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (6) you will not use the Services for any illegal or unauthorized purpose; and (7) your use of the Services will not violate any applicable law or regulation.</p>
                        <p>If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">4. USER REGISTRATION</h2>
                        <p>You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">5. PRODUCTS</h2>
                        <p>We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Services. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products. All products are subject to availability, and we cannot guarantee that items will be in stock. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">6. PURCHASES AND PAYMENT</h2>
                        <p>We accept the following forms of payment: - Visa - Mastercard - PayPal</p>
                        <p>You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in US dollars.</p>
                        <p>You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you authorize us to charge your chosen payment provider for any such amounts upon placing your order. We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment.</p>
                        <p>We reserve the right to refuse any order placed through the Services. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same payment method, and/or orders that use the same billing or shipping address. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers, or distributors.</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">7. RETURN POLICY</h2>
                        <p>Please review our Return Policy prior to making any purchases: <a href="http://primefixsolutions.shop/refund-policy" className="text-brand-600 font-bold">http://primefixsolutions.shop/return-policy</a>.</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">8. PROHIBITED ACTIVITIES</h2>
                        <p>You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
                        <p>As a user of the Services, you agree not to:</p>
                        <ul>
                            <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                            <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                            <li>Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein.</li>
                            <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
                            <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
                            <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                            <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
                            <li>Engage in unauthorized framing of or linking to the Services.</li>
                            <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming.</li>
                            <li>Engage in any automated use of the system, such as using scripts to send comments or messages.</li>
                            <li>Delete the copyright or other proprietary rights notice from any Content.</li>
                            <li>Attempt to impersonate another user or person or use the username of another user.</li>
                            <li>Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism.</li>
                            <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.</li>
                            <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.</li>
                            <li>Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services.</li>
                            <li>Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
                            <li>Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.</li>
                            <li>Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system.</li>
                            <li>Use a buying agent or purchasing agent to make purchases on the Services.</li>
                            <li>Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means.</li>
                            <li>Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
                            <li>Use the Services to advertise or offer to sell goods and services.</li>
                            <li>Sell or otherwise transfer your profile.</li>
                        </ul>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">9. USER GENERATED CONTRIBUTIONS</h2>
                        <p>The Services does not offer users to submit or post content. We may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). Contributions may be viewable by other users of the Services and through third-party websites. As such, any Contributions you transmit may be treated in accordance with the Services' Privacy Policy. When you create or make available any Contributions, you thereby represent and warrant that:</p>
                        <ul>
                            <li>The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights of any third party.</li>
                            <li>You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions.</li>
                            <li>You have the written consent, release, and/or permission of each and every identifiable individual person.</li>
                            <li>Your Contributions are not false, inaccurate, or misleading.</li>
                            <li>Your Contributions are not unsolicited or unauthorized advertising.</li>
                            <li>Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable.</li>
                            <li>Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.</li>
                            <li>Your Contributions are not used to harass or threaten any other person.</li>
                            <li>Your Contributions do not violate any applicable law, regulation, or rule.</li>
                            <li>Your Contributions do not violate the privacy or publicity rights of any third party.</li>
                            <li>Your Contributions do not violate any applicable law concerning child pornography.</li>
                            <li>Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.</li>
                            <li>Your Contributions do not otherwise violate, or link to material that violates, any provision of these Legal Terms.</li>
                        </ul>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">10. CONTRIBUTION LICENSE</h2>
                        <p>You and Services agree that we may access, store, process, and use any information and personal data that you provide following the terms of the Privacy Policy and your choices (including settings).</p>
                        <p>By submitting suggestions or other feedback regarding the Services, you agree that we can use and share such feedback for any purpose without compensation to you.</p>
                        <p>We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Services. You are solely responsible for your Contributions to the Services and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">11. SERVICES MANAGEMENT</h2>
                        <p>We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable any of your Contributions; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size; and (5) otherwise manage the Services in a manner designed to protect our rights and property.</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">12. PRIVACY POLICY</h2>
                        <p>We care about data privacy and security. Please review our Privacy Policy: <a href="http://primefixsolutions.shop/privacy-policy" className="text-brand-600 font-bold">http://primefixsolutions.shop/privacy-policy</a>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted in the United States. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in the United States, then through your continued use of the Services, you are transferring your data to the United States, and you expressly consent to have your data transferred to and processed in the United States.</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">13. TERM AND TERMINATION</h2>
                        <p>These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.</p>
                        <p>If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action.</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">14. MODIFICATIONS AND INTERRUPTIONS</h2>
                        <p>We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We also reserve the right to modify or discontinue all or part of the Services without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.</p>
                        <p>We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services.</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">15. GOVERNING LAW</h2>
                        <p>These Legal Terms and your use of the Services are governed by and construed in accordance with the laws of the State of Louisiana applicable to agreements made and to be entirely performed within the State of Louisiana, without regard to its conflict of law principles.</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">16. DISPUTE RESOLUTION</h2>
                        <p>Any legal action of whatever nature brought by either you or us (collectively, the "Parties" and individually, a "Party") shall be commenced or prosecuted in the state and federal courts located in Louisiana, and the Parties hereby consent to, and waive all defenses of lack of personal jurisdiction and forum non conveniens with respect to venue and jurisdiction in such state and federal courts. In no event shall any claim, action, or proceeding brought by either Party related in any way to the Services be commenced more than one (1) years after the cause of action arose.</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">17. CORRECTIONS</h2>
                        <p>There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">18. DISCLAIMER</h2>
                        <p className="font-bold">THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF.</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">19. LIMITATIONS OF LIABILITY</h2>
                        <p>IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES.</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">20. INDEMNIFICATION</h2>
                        <p>You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) use of the Services; (2) breach of these Legal Terms; (3) any breach of your representations and warranties set forth in these Legal Terms; (4) your violation of the rights of a third party; or (5) any overt harmful act toward any other user of the Services.</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">21. USER DATA</h2>
                        <p>We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services.</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">22. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</h2>
                        <p>Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS.</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">23. CALIFORNIA USERS AND RESIDENTS</h2>
                        <p>If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">24. MISCELLANEOUS</h2>
                        <p>These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision.</p>

                        <h2 className="text-2xl font-black text-slate-900 uppercase">25. CONTACT US</h2>
                        <p>In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:</p>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 my-8">
                            <address className="not-italic text-slate-700 font-bold leading-relaxed space-y-2">
                                <p>PrimeFix Solutions LLC</p>
                                <p>3014 Dauphine st ste A PM3 357287</p>
                                <p>New Orleans, LA 70117</p>
                                <p>United States</p>
                                <p className="pt-4 flex items-center gap-3 text-brand-600"><Phone size={16} /> 00000000000</p>
                                <p className="flex items-center gap-3 text-brand-600"><Mail size={16} /> info@primefixsolutions.shop</p>
                            </address>
                        </div>
                    </FadeIn>
                </div>
            </article>
        </div>
    );
};

export default TermsAndConditions;