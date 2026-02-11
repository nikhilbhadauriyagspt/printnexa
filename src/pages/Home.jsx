import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FadeIn } from '../components/Reveal';
import {
    Zap,
    ShieldCheck,
    Truck,
    Headphones,
    ArrowRight,
    Cpu,
    CheckCircle2,
    ShoppingBag,
    Star,
    ArrowUpRight,
    BookOpen,
    Quote,
    Play,
    Activity,
    Droplets,
    Shield,
    Settings,
    Wifi,
    Heart,
    Home as HomeIcon,
    Briefcase,
    Leaf,
    RotateCcw,
    ChevronRight,
    Globe,
    Package,
    Award,
    Sparkles
} from 'lucide-react';
import HeroCinematic from '../components/HeroCinematic';
import SEO from '../components/SEO';
import Skeleton from '../components/Skeleton';
import toast from 'react-hot-toast';

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [slideIndex1, setSlideIndex1] = useState(0);
    const [slideIndex2, setSlideIndex2] = useState(0);

    useEffect(() => {
        if (products.length > 5) {
            const timer = setInterval(() => {
                setSlideIndex1(prev => (prev + 1) % Math.min(4, Math.max(1, Math.floor(products.length / 2))));
                setSlideIndex2(prev => (prev + 1) % Math.min(4, Math.max(1, Math.floor(products.length / 2))));
            }, 4000);
            return () => clearInterval(timer);
        }
    }, [products.length]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, prodRes, blogRes] = await Promise.all([
                    api.get('/categories'),
                    api.get('/products'),
                    api.get('/blogs')
                ]);
                setCategories(catRes.data);
                setProducts(prodRes.data);
                setBlogs(blogRes.data.slice(0, 3));
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const bestSellers = products.filter(p => p.is_best_selling).slice(0, 4);
    const archiveDeals = products.filter(p => parseFloat(p.mrp) > parseFloat(p.price)).slice(0, 4);
    const newArrivals = [...products].sort((a, b) => b.id - a.id).slice(0, 15);

    const brands = [
        { name: 'HP' }, { name: 'Epson' }, { name: 'Canon' },
        { name: 'Brother' }, { name: 'Xerox' }, { name: 'Lexmark' }
    ];

    // Compliance: Find specific categories for the spotlight section
    const inkjetCat = categories.find(c => c.slug?.toLowerCase().includes('inkjet') || c.name?.toLowerCase().includes('inkjet'));
    const laserCat = categories.find(c => c.slug?.toLowerCase().includes('laser') || c.name?.toLowerCase().includes('laser'));

    return (
        <div className="bg-white min-h-screen relative font-sans selection:bg-brand-600 selection:text-white overflow-hidden">
            <SEO pageName="home" fallbackTitle="Prime Fix Solutions - Printers & Accessories" fallbackDesc="Browse our catalog of professional printers and supplies." />

            {/* 1. HERO SECTION */}
            <HeroCinematic />

            {/* 2. BRANDS */}
            <section className="py-16 bg-slate-50 overflow-hidden border-b border-slate-100">
                <FadeIn>
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full mb-4 shadow-sm">
                            <Globe size={12} className="text-brand-600" />
                            <span className="text-brand-600 font-bold uppercase tracking-widest text-[9px]">Available Brands</span>
                        </div>
                    </div>
                </FadeIn>
                <div className="w-full overflow-hidden group">
                    <div className="flex w-max animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused]">
                        <div className="flex items-center">
                            {[...brands, ...brands, ...brands].map((brand, idx) => (
                                <div key={`a-${idx}`} className="flex items-center gap-8 md:gap-16 mx-4 md:mx-8 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 whitespace-nowrap">
                                        {brand.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center">
                            {[...brands, ...brands, ...brands].map((brand, idx) => (
                                <div key={`b-${idx}`} className="flex items-center gap-8 md:gap-16 mx-4 md:mx-8 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 whitespace-nowrap">
                                        {brand.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. FEATURES */}
            <section className="py-20 bg-white border-b border-slate-100">
                <div className="container mx-auto px-6 text-center lg:text-left">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <FadeIn delay={0.1}><FeatureCard icon={<Wifi size={24} />} title="Connectivity" desc="Supports Wi-Fi and Ethernet connections for network integration." /></FadeIn>
                        <FadeIn delay={0.2}><FeatureCard icon={<Zap size={24} />} title="Resolution" desc="High-resolution output suitable for text and graphics." /></FadeIn>
                        <FadeIn delay={0.3}><FeatureCard icon={<Cpu size={24} />} title="Efficiency" desc="Designed for consistent throughput in busy environments." /></FadeIn>
                        <FadeIn delay={0.4}><FeatureCard icon={<Settings size={24} />} title="Compatibility" desc="Compatible with major operating systems and standard protocols." /></FadeIn>
                    </div>
                </div>
            </section>

            {/* 4. PRODUCT CATEGORIES */}
            <section className="py-24 bg-slate-50/50">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 border border-brand-100 rounded-full mb-4 shadow-sm">
                                    <Package size={12} className="text-brand-600" />
                                    <span className="text-brand-600 font-bold uppercase tracking-widest text-[9px]">Printer Catalog</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight text-center md:text-left uppercase">
                                    Browse <span className="text-brand-600">Categories</span>
                                </h2>
                            </div>
                            <Link to="/products" className="text-sm font-semibold text-slate-400 hover:text-brand-600 flex items-center gap-2 group transition-colors">
                                View Full Catalog <ArrowRight size={16} />
                            </Link>
                        </div>
                    </FadeIn>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {isLoading ? (
                            [1, 2, 3, 4].map(i => <Skeleton key={i} className="h-80 rounded-[2.5rem]" />)
                        ) : (
                            categories.slice(0, 8).map((cat, idx) => (
                                <FadeIn key={cat.id} delay={idx * 0.1}>
                                    <Link to={`/products?category=${cat.slug}`} className="group block bg-white rounded-[2.5rem] p-8 h-full hover:shadow-xl hover:shadow-brand-100/50 border border-slate-100 transition-all duration-500 text-center">
                                        <div className="aspect-square rounded-[2rem] overflow-hidden bg-slate-50 mb-8 relative">
                                            <img src={`/category/${cat.image}`} className="w-full h-full object-contain p-6 grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110" alt={cat.name} />
                                            <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-slate-100 shadow-sm"><ArrowUpRight size={18} /></div>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight mb-1">{cat.name}</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">View Products</p>
                                    </Link>
                                </FadeIn>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* 5. CURATED COLLECTION */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 border border-brand-100 rounded-full mb-4 shadow-sm">
                                    <Zap size={12} className="text-brand-600" />
                                    <span className="text-brand-600 font-bold uppercase tracking-widest text-[9px]">Curated</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 uppercase tracking-tight">Office <span className="text-brand-600">Essentials</span></h2>
                            </div>
                            <Link to="/products" className="hidden md:flex text-sm font-bold uppercase tracking-widest text-slate-900 hover:text-brand-600 transition-colors items-center gap-2">View Collection <ArrowRight size={16} /></Link>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[700px]">
                        {isLoading ? (
                            <>
                                <div className="md:col-span-2 md:row-span-2"><Skeleton className="h-full rounded-[2.5rem]" /></div>
                                <Skeleton className="h-full rounded-[2.5rem]" />
                                <Skeleton className="h-full rounded-[2.5rem]" />
                            </>
                        ) : (
                            <>
                                {/* Left Featured Box - 10 Line Description */}
                                {products[0] && (
                                    <Link
                                        to={`/product/${products[0].slug}`}
                                        className="md:col-span-2 md:row-span-2 bg-slate-50 rounded-[3rem] p-8 md:p-16 relative overflow-hidden group border border-slate-100 hover:border-brand-200 transition-all duration-500 block"
                                    >
                                        <div className="absolute top-0 right-0 w-1/2 h-full bg-white rounded-l-[120px] -mr-16 z-0 group-hover:bg-brand-50/50 transition-colors duration-700"></div>
                                        <div className="relative z-10 h-full flex flex-col justify-center items-start">
                                            <div className="max-w-md">
                                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-full text-[9px] font-black uppercase tracking-widest mb-6">
                                                    Featured Collection
                                                </div>
                                                <h3 className="text-3xl  font-black uppercase text-slate-900 mb-6 leading-[1.1] tracking-tight">{products[0].name}</h3>
                                                <p className="text-slate-500 text-sm md:text-base font-medium leading-[1.8] mb-8 line-clamp-[10]">
                                                    {products[0].description || "Professional printing technology designed for high-performance business environments and creative workspaces. This unit delivers consistent output quality, advanced network integration capabilities, and efficient resource management for demanding workflows. Experience the next generation of office hardware with our latest featured series, engineered for reliability and precision in every task. Optimized for both speed and detail, it ensures that your documents maintain the highest professional standards while minimizing operational overhead and maintenance requirements."}
                                                </p>
                                                <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-brand-600 group-hover:gap-5 transition-all">
                                                    Explore Product <ArrowUpRight size={16} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-12 right-12 w-1/3 h-1/3 z-10 pointer-events-none">
                                            <img
                                                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-1000"
                                                src={products[0].image_url?.startsWith('http') ? products[0].image_url : `/products/${products[0].image_url}`}
                                                alt={products[0].name}
                                            />
                                        </div>
                                    </Link>
                                )}

                                {/* Right Slider 1 */}
                                <div className="relative rounded-[3rem] overflow-hidden border border-slate-100 bg-white group h-full transition-all duration-500 hover:shadow-xl">
                                    <AnimatePresence mode="wait">
                                        {products.length > 1 && products.slice(1, 5).map((product, idx) => (
                                            idx === slideIndex1 && (
                                                <motion.div
                                                    key={product.id}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="h-full w-full"
                                                >
                                                    <Link to={`/product/${product.slug}`} className="h-full flex flex-col p-8 md:p-10 relative block">
                                                        <div className="relative z-20">
                                                            <p className="text-[10px] font-black text-brand-500 uppercase tracking-[0.2em] mb-2">{product.category_name || 'Essentials'}</p>
                                                            <h4 className="text-xl font-black uppercase text-slate-900 leading-tight mb-4 line-clamp-2">{product.name}</h4>
                                                        </div>
                                                        <div className="flex-1 flex items-center justify-center p-4 relative z-10 overflow-hidden">
                                                            <img
                                                                src={product.image_url?.startsWith('http') ? product.image_url : `/products/${product.image_url}`}
                                                                className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-110 transition-transform duration-700"
                                                                alt={product.name}
                                                            />
                                                        </div>
                                                        <div className="flex gap-1.5 mt-4">
                                                            {[0, 1, 2, 3].map(i => (
                                                                <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === slideIndex1 ? 'w-8 bg-brand-500' : 'w-2 bg-slate-100'}`} />
                                                            ))}
                                                        </div>
                                                    </Link>
                                                </motion.div>
                                            )
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {/* Right Slider 2 */}
                                <div className="relative rounded-[3rem] overflow-hidden border border-slate-900 bg-slate-950 group h-full transition-all duration-500 hover:shadow-2xl">
                                    <AnimatePresence mode="wait">
                                        {products.length > 5 && products.slice(5, 9).map((product, idx) => (
                                            idx === slideIndex2 && (
                                                <motion.div
                                                    key={product.id}
                                                    initial={{ opacity: 0, y: 15 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -15 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="h-full w-full"
                                                >
                                                    <Link to={`/product/${product.slug}`} className="h-full flex flex-col p-8 md:p-10 relative block">
                                                        <div className="relative z-20">
                                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{product.category_name || 'Premium'}</p>
                                                            <h4 className="text-xl font-black uppercase text-white leading-tight mb-4 line-clamp-2">{product.name}</h4>
                                                        </div>
                                                        <div className="flex-1 flex items-center justify-center p-4 relative z-10 overflow-hidden">
                                                            <img
                                                                src={product.image_url?.startsWith('http') ? product.image_url : `/products/${product.image_url}`}
                                                                className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-110 transition-transform duration-700 brightness-110"
                                                                alt={product.name}
                                                            />
                                                        </div>
                                                        <div className="flex gap-1.5 mt-4">
                                                            {[0, 1, 2, 3].map(i => (
                                                                <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === slideIndex2 ? 'w-8 bg-brand-500' : 'w-2 bg-white/10'}`} />
                                                            ))}
                                                        </div>
                                                    </Link>
                                                </motion.div>
                                            )
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>


            {/* 7. NEW ARRIVALS */}
            <section className="py-24 bg-slate-50/50">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 border border-brand-100 rounded-full mb-4 shadow-sm">
                                    <Sparkles size={12} className="text-brand-600" />
                                    <span className="text-brand-600 font-bold uppercase tracking-widest text-[9px]">New Products</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1] uppercase text-center md:text-left uppercase">Latest <br /><span className="text-brand-600">Arrivals</span></h2>
                            </div>
                            <Link to="/products" className="px-10 py-5 bg-[#0f172a] text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-brand-600 transition-all border border-slate-800">Explore Store</Link>
                        </div>
                    </FadeIn>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {isLoading ? (
                            [1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="aspect-[3/4] rounded-[2rem]" />)
                        ) : (
                            newArrivals.map((product, idx) => (
                                <FadeIn key={product.id} delay={idx * 0.05}>
                                    <PremiumProductCard product={product} />
                                </FadeIn>
                            ))
                        )}
                    </div>                </div>
            </section>

            {/* 8. WORK & CREATIVE - Dynamic Categories */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Inkjet / Home Focus */}
                        <FadeIn delay={0.1}>
                            <div className="relative h-[550px] rounded-[3rem] overflow-hidden group border border-slate-100 shadow-sm">
                                <img src={inkjetCat?.image ? `/category/${inkjetCat.image}` : "/category/Inkjet.jpg"} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" alt={inkjetCat?.name || "Inkjet"} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10 md:p-16">
                                    <div className="backdrop-blur-md bg-white/10 border border-white/10 p-8 rounded-[2rem] w-fit shadow-2xl">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white">
                                                <HomeIcon size={24} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white uppercase">{inkjetCat?.name || "Inkjet Series"}</h3>
                                        </div>
                                        <p className="text-slate-300 text-sm font-medium mb-8 max-w-xs leading-relaxed">High-resolution inkjet systems designed for detailed document and photo reproduction.</p>
                                        <Link to={inkjetCat ? `/products?category=${inkjetCat.slug}` : "/products"} className="inline-flex items-center gap-3 text-white text-xs font-black uppercase tracking-widest hover:text-brand-500 transition-colors group/btn">
                                            Explore Collection <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Laser / Business Focus */}
                        <FadeIn delay={0.2}>
                            <div className="relative h-[550px] rounded-[3rem] overflow-hidden group border border-slate-100 shadow-sm">
                                <img src={laserCat?.image ? `/category/${laserCat.image}` : "/category/Laser.jpg"} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" alt={laserCat?.name || "Laser"} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10 md:p-16">
                                    <div className="backdrop-blur-md bg-white/10 border border-white/10 p-8 rounded-[2rem] w-fit shadow-2xl">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900">
                                                <Briefcase size={24} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white uppercase">{laserCat?.name || "Laser Series"}</h3>
                                        </div>
                                        <p className="text-slate-300 text-sm font-medium mb-8 max-w-xs leading-relaxed">Laser technology engineered for consistent performance and document management efficiency.</p>
                                        <Link to={laserCat ? `/products?category=${laserCat.slug}` : "/products"} className="inline-flex items-center gap-3 text-white text-xs font-black uppercase tracking-widest hover:text-brand-500 transition-colors group/btn">
                                            View Products <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 9. POPULAR MODELS */}
            <section className="py-24 bg-slate-900 relative">
                <div className="container mx-auto px-6 relative z-10">
                    <FadeIn>
                        <div className=" mb-20">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/10 rounded-full mb-4 shadow-sm">
                                <CheckCircle2 size={12} className="text-brand-500" />
                                <span className="text-brand-500 font-bold uppercase tracking-widest text-[9px]">Catalog Selection</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white uppercase leading-none text-center md:text-left">Popular <span className="text-brand-600">Models</span></h2>
                        </div>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {isLoading ? (
                            [1, 2, 3, 4].map(i => <Skeleton key={i} className="aspect-[4/5] rounded-[3rem] bg-white/5" />)
                        ) : (
                            bestSellers.map((product, idx) => (
                                <FadeIn key={product.id} delay={idx * 0.05} fullWidth>
                                    <PremiumProductCard product={product} dark />
                                </FadeIn>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* 10. SUSTAINABILITY */}
            <section className="py-24 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 rotate-12 group-hover:rotate-0 transition-transform shadow-sm">
                                    <Leaf size={32} />
                                </div>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight uppercase">Sustainability <span className="text-emerald-600">Commitment</span></h2>
                            <p className="text-slate-500 max-w-2xl mx-auto font-medium text-sm leading-relaxed">Supporting energy-efficient technology and programs designed to reduce environmental impact across the printing lifecycle.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8  mx-auto">
                            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                    <Zap size={24} />
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-tight">Energy Efficient</h4>
                                <p className="text-xs text-slate-500 leading-relaxed font-medium">Features including auto-off settings and low-wattage standby modes to help manage power consumption.</p>
                            </div>
                            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                    <Droplets size={24} />
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-tight">High Yield</h4>
                                <p className="text-xs text-slate-500 leading-relaxed font-medium">High-capacity ink and toner systems designed to provide more prints per unit, reducing material waste.</p>
                            </div>
                            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                    <RotateCcw size={24} />
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-tight">Recyclable</h4>
                                <p className="text-xs text-slate-500 leading-relaxed font-medium">Compatible with manufacturer-led recycling initiatives for used cartridges and hardware components.</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 11. TRUST BAR */}
            <section className="py-12 bg-white border-t border-slate-200">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                            <TrustItem icon={<CheckCircle2 size={24} />} title="Authentic Items" sub="Sourced from manufacturers" />
                            <TrustItem icon={<ShieldCheck size={24} />} title="Secure Payment" sub="Encrypted transaction process" />
                            <TrustItem icon={<Shield size={24} />} title="Manufacturer Warranty" sub="Standard coverage included" />
                            <TrustItem icon={<Headphones size={24} />} title="Product Support" sub="Technical assistance available" />
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
};

// --- HELPERS ---

const FeatureCard = ({ icon, title, desc, delay }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, duration: 0.5 }}
        className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-slate-200 transition-all group h-full shadow-sm">
        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-all mb-6 shadow-inner">{icon}</div>
        <h3 className="text-lg font-bold uppercase tracking-tight text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-500 text-xs leading-relaxed font-medium">{desc}</p>
    </motion.div>
);

const PremiumProductCard = ({ product, dark, horizontal }) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [isAdded, setIsAdded] = useState(false);
    const activeWishlist = isInWishlist(product.id);
    const imageUrl = product.image_url?.startsWith('http') ? product.image_url : `/products/${product.image_url}`;

    const handleAddToCart = (e) => {
        e.preventDefault(); e.stopPropagation();
        addToCart(product); setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    if (horizontal) {
        return (
            <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-slate-200 transition-all">
                <div className="w-32 h-32 bg-slate-50 rounded-[1.5rem] overflow-hidden p-4 shrink-0"><img src={imageUrl} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" /></div>
                <div className="flex-1">
                    <h4 className="text-sm font-bold uppercase tracking-tight text-slate-900 mb-1 line-clamp-1">{product.name}</h4>
                    <div className="flex items-center gap-3 mb-4"><span className="text-lg font-bold italic text-brand-600">${product.price}</span></div>
                    <button onClick={handleAddToCart} className="text-[9px] font-bold uppercase tracking-widest text-brand-600 hover:text-brand-700 flex items-center gap-2">{isAdded ? "ADDED" : "ADD TO CART"} <ArrowUpRight size={14} /></button>
                </div>
            </div>
        );
    }

    return (
        <motion.div whileHover={{ y: -5 }} className={`group relative flex flex-col ${dark ? 'text-white' : 'text-slate-900'}`}>
            <div className={`relative aspect-[3/4] ${dark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'} border rounded-[2rem] overflow-hidden m-0.5 p-6 flex items-center justify-center transition-all duration-700`}>
                {parseFloat(product.mrp) > parseFloat(product.price) && <span className="absolute top-4 left-4 px-2 py-0.5 bg-rose-600 text-white text-[8px] font-bold uppercase tracking-widest rounded-md z-10 shadow-lg">Special</span>}
                <Link to={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center relative z-0 p-2"><img src={imageUrl} alt={product.name} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-[2000ms] group-hover:scale-110" /></Link>
                <div className="absolute top-4 right-4 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-10">
                    <button onClick={(e) => { e.preventDefault(); toggleWishlist(product); }} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all border border-slate-100 bg-white ${activeWishlist ? 'text-brand-500' : 'text-neutral-400 hover:text-brand-600'} shadow-md`}><Heart size={14} className={activeWishlist ? 'fill-current' : ''} /></button>
                    <Link to={`/product/${product.slug}`} className="w-8 h-8 rounded-full bg-white border border-slate-100 text-neutral-400 hover:text-brand-600 flex items-center justify-center transition-all shadow-md"><ArrowUpRight size={14} /></Link>
                </div>
                <div className="absolute inset-x-4 bottom-4 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10"><button onClick={handleAddToCart} className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-[8px] uppercase tracking-widest transition-all shadow-xl ${isAdded ? 'bg-emerald-500 text-white' : 'bg-brand-600 text-white hover:bg-brand-500'}`}>{isAdded ? <CheckCircle2 size={12} /> : <><ShoppingBag size={12} /> Add</>}</button></div>
            </div>
            <div className="mt-4 px-2 flex flex-col items-center text-center">
                <p className={`text-[8px] font-black ${dark ? 'text-brand-400' : 'text-brand-600'} uppercase tracking-[0.2em] mb-1.5`}>{product.category_name || 'Series'}</p>
                <Link to={`/product/${product.slug}`} className="min-h-[2.5rem] flex items-center justify-center">
                    <h3 className="text-sm font-bold uppercase tracking-tight group-hover:text-brand-600 transition-colors line-clamp-2 mb-2">{product.name}</h3>
                </Link>
                <div className="flex items-center gap-2 mt-2"><span className={`text-base font-black italic tracking-tighter ${dark ? 'text-white' : 'text-slate-900'}`}>${product.price}</span></div>
            </div>
        </motion.div>
    );
};

const TrustItem = ({ icon, title, sub }) => (
    <div className="flex items-center gap-4 group cursor-default">
        <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all shadow-sm">{icon}</div>
        <div>
            <h5 className="text-slate-900 text-sm font-bold tracking-tight mb-0.5">{title}</h5>
            <p className="text-slate-500 text-xs font-medium">{sub}</p>
        </div>
    </div>
);

export default Home;