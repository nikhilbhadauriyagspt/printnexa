import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SEO from '../components/SEO';
import SchemaMarkup from '../components/SchemaMarkup';
import toast from 'react-hot-toast';
import Skeleton from '../components/Skeleton';
import { 
    Star, ShoppingBag, Heart, ShieldCheck, Truck, 
    Minus, Plus, ChevronRight, Zap, RotateCcw,
    CheckCircle2, ArrowRight, Award, Globe, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist: checkWishlist } = useWishlist();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true);
                const productRes = await api.get(`/products/slug/${slug}`);
                setProduct(productRes.data);

                const relRes = await api.get('/products');
                const allProducts = relRes.data;
                const related = allProducts
                    .filter(p => p.category_name === productRes.data.category_name && p.id !== productRes.data.id)
                    .slice(0, 4);
                
                setRelatedProducts(related.length === 0 ? allProducts.filter(p => p.id !== productRes.data.id).slice(0, 4) : related);

            } catch (error) {
                console.error("Failed to fetch product data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductData();
        window.scrollTo(0, 0);
    }, [slug]);

    const activeWishlist = product ? checkWishlist(product.id) : false;

    const handleAddToCart = () => {
        addToCart(product, quantity);
        toast.success(`Acquired ${product.name}`);
    };

    if (loading) {
        return (
            <div className="bg-white min-h-screen font-sans pb-32">
                {/* Skeleton Header */}
                <div className="bg-neutral-950 pt-32 pb-12 lg:pt-40 lg:pb-16 relative overflow-hidden">
                    <div className="container mx-auto px-6 relative z-10">
                        <Skeleton className="h-4 w-64 bg-white/10 rounded-full" />
                    </div>
                </div>
                
                <div className="container mx-auto px-6 -mt-8 relative z-20">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                        {/* Left Skeleton */}
                        <div className="w-full lg:w-1/2">
                            <Skeleton className="h-[500px] w-full rounded-[4rem] bg-neutral-100" />
                        </div>
                        {/* Right Skeleton */}
                        <div className="w-full lg:w-1/2 pt-10">
                            <Skeleton className="h-6 w-32 mb-6 rounded-full" />
                            <Skeleton className="h-16 w-3/4 mb-8 rounded-2xl" />
                            <Skeleton className="h-12 w-48 mb-10 rounded-xl" />
                            <Skeleton className="h-24 w-full mb-12 rounded-2xl" />
                            <div className="flex gap-6">
                                <Skeleton className="h-16 w-40 rounded-2xl" />
                                <Skeleton className="h-16 flex-1 rounded-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-6">
            <h1 className="text-4xl font-serif text-neutral-900 mb-4">Unit Not Found</h1>
            <p className="text-neutral-500 mb-8">The requested hardware index does not exist in our archive.</p>
            <Link to="/products" className="px-10 py-4 bg-brand-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-neutral-900 transition-all gold-shadow">Return to Archive</Link>
        </div>
    );

    const imageUrl = product.image_url ? (product.image_url.startsWith('http') ? product.image_url : `/products/${product.image_url}`) : 'https://via.placeholder.com/800';

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-brand-500 selection:text-white pb-32">
            <SEO pageName={`prod_${product.id}`} fallbackTitle={`${product.name} | Elite Series`} fallbackDesc={product.description} image={imageUrl} type="product" />
            <SchemaMarkup type="product" data={product} />

            {/* --- TOP HEADER / BREADCRUMB --- */}
            <div className="bg-neutral-950 pt-32 pb-12 lg:pt-40 lg:pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/5 rounded-full blur-[120px]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-black uppercase tracking-[0.2em] mb-4">
                        <Link to="/" className="hover:text-brand-500 transition-colors">Home</Link>
                        <ChevronRight size={10} />
                        <Link to="/products" className="hover:text-brand-500 transition-colors">Archive</Link>
                        <ChevronRight size={10} />
                        <span className="text-neutral-300">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-8 relative z-20">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                    
                    {/* --- LEFT: VISUAL ASSET --- */}
                    <div className="w-full lg:w-1/2 lg:sticky lg:top-32">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-neutral-50 rounded-[4rem] p-12 lg:p-20 flex items-center justify-center relative group border border-neutral-100 shadow-inner"
                        >
                            <img 
                                src={imageUrl} 
                                alt={product.name} 
                                className="w-full max-h-[550px] object-contain mix-blend-multiply transition-transform duration-[2000ms] group-hover:scale-110" 
                            />
                            
                            {/* Actions Overlay */}
                            <div className="absolute top-10 right-10 flex flex-col gap-4">
                                <button 
                                    onClick={() => toggleWishlist(product)} 
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border shadow-xl ${activeWishlist ? 'bg-brand-500 border-brand-500 text-white' : 'bg-white border-neutral-100 text-neutral-400 hover:text-brand-600'}`}
                                >
                                    <Heart size={22} className={activeWishlist ? 'fill-current' : ''} />
                                </button>
                            </div>

                            {/* Status Badge */}
                            {product.stock > 0 ? (
                                <div className="absolute bottom-10 left-10 flex items-center gap-3 px-5 py-2.5 bg-green-500/10 border border-green-500/20 rounded-full">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Available in Archive</span>
                                </div>
                            ) : (
                                <div className="absolute bottom-10 left-10 flex items-center gap-3 px-5 py-2.5 bg-red-500/10 border border-red-500/20 rounded-full">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Archive Depleted</span>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* --- RIGHT: TECHNICAL BRIEF --- */}
                    <div className="w-full lg:w-1/2">
                        <div className="mb-12">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-brand-600 font-black text-[10px] uppercase tracking-[0.4em] bg-brand-50 px-4 py-1.5 rounded-lg">{product.category_name}</span>
                                <div className="flex text-amber-400 gap-1">
                                    <Star size={14} fill="currentColor" />
                                    <Star size={14} fill="currentColor" />
                                    <Star size={14} fill="currentColor" />
                                    <Star size={14} fill="currentColor" />
                                    <Star size={14} fill="currentColor" />
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-serif text-neutral-900 leading-tight mb-8 tracking-tighter">{product.name}</h1>
                            
                            <div className="flex items-end gap-4 mb-10">
                                <span className="text-5xl font-black text-neutral-900 tracking-tighter">${product.price}</span>
                                {parseFloat(product.mrp) > parseFloat(product.price) && (
                                    <span className="text-xl text-neutral-300 line-through font-bold mb-1">${product.mrp}</span>
                                )}
                            </div>

                            <p className="text-neutral-500 text-lg leading-relaxed font-light mb-12 border-l-2 border-brand-500/20 pl-8 line-clamp-4">
                                {product.description}
                            </p>
                        </div>

                        {/* TRANSACTION AREA */}
                        <div className="space-y-8 pb-12 border-b border-neutral-100">
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex items-center bg-neutral-50 border border-neutral-100 rounded-2xl h-16 w-full sm:w-40 p-2 shadow-inner">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-full flex items-center justify-center hover:bg-white rounded-xl transition-all text-neutral-400"><Minus size={18}/></button>
                                    <span className="flex-1 text-center font-black text-neutral-900 text-lg">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-full flex items-center justify-center hover:bg-white rounded-xl transition-all text-neutral-400"><Plus size={18}/></button>
                                </div>
                                <button 
                                    onClick={handleAddToCart}
                                    disabled={product.stock <= 0}
                                    className="flex-[2] h-16 bg-brand-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-neutral-900 transition-all flex items-center justify-center gap-3 gold-shadow disabled:bg-neutral-200"
                                >
                                    <ShoppingBag size={20} /> {product.stock > 0 ? 'Acquire Unit' : 'Sold Out'}
                                </button>
                            </div>

                            {product.stock > 0 && (
                                <button 
                                    onClick={() => { handleAddToCart(); navigate('/checkout'); }}
                                    className="w-full h-16 border-2 border-neutral-950 text-neutral-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-neutral-950 hover:text-white transition-all flex items-center justify-center gap-3 group"
                                >
                                    <Zap size={20} fill="currentColor" className="text-brand-500 group-hover:text-white" /> Instant Purchase
                                </button>
                            )}
                        </div>

                        {/* TRUST GRID */}
                        <div className="grid grid-cols-2 gap-10 mt-12">
                            <TrustModule icon={<Truck size={22} />} title="Global Logistics" desc="Secured transit protocol" />
                            <TrustModule icon={<ShieldCheck size={22} />} title="Elite Warranty" desc="2-Year full coverage" />
                            <TrustModule icon={<Award size={22} />} title="Certified Origin" desc="100% Authentic hardware" />
                            <TrustModule icon={<Globe size={22} />} title="Cloud Support" desc="24/7 technical concierge" />
                        </div>
                    </div>
                </div>

                {/* --- DATA TABS SECTION --- */}
                <div className="mt-32 border-t border-neutral-100 pt-20">
                    <div className="flex justify-center gap-12 mb-16">
                        {['Description', 'Specifications', 'Shipping', 'Support'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase())}
                                className={`pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${
                                    activeTab === tab.toLowerCase() 
                                    ? 'text-brand-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-brand-600' 
                                    : 'text-neutral-300 hover:text-neutral-500'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    
                    <div className="max-w-4xl mx-auto">
                        <AnimatePresence mode='wait'>
                            {activeTab === 'description' && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                    className="prose max-w-none text-neutral-500 leading-relaxed font-light text-lg"
                                >
                                    <p className="mb-6">{product.description}</p>
                                    <p>
                                        Engineered for high-performance environments, this {product.category_name} unit represents the pinnacle of current hardware logic. 
                                        Every component has been validated for professional endurance and aesthetic integration.
                                    </p>
                                </motion.div>
                            )}
                            {activeTab === 'specifications' && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-100 border border-neutral-100 rounded-[3rem] overflow-hidden"
                                >
                                    <SpecRow label="Industrial Model" value={`PN-EK${product.id}X`} />
                                    <SpecRow label="Interface" value="Wi-Fi 6, USB-C, BLE 5.2" />
                                    <SpecRow label="Energy Profile" value="Ultra Low (EnergyStar 4.0)" />
                                    <SpecRow label="Precision" value="Up to 9600 x 2400 DPI" />
                                    <SpecRow label="System Logic" value="macOS, Win 11, Enterprise Linux" />
                                    <SpecRow label="Warranty Tier" value="Premier Professional" />
                                </motion.div>
                            )}
                            {['shipping', 'support'].includes(activeTab) && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-20 bg-neutral-50 rounded-[3rem] border border-neutral-100"
                                >
                                    <p className="text-neutral-400 text-lg font-light italic">Documentation for {activeTab} currently being indexed...</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* --- RELATED UNITS --- */}
                {relatedProducts.length > 0 && (
                    <div className="mt-40">
                        <div className="flex justify-between items-end mb-16">
                            <h3 className="text-4xl font-serif text-neutral-900 tracking-tight">Complementary <span className="italic text-brand-500">Hardware.</span></h3>
                            <Link to="/products" className="text-brand-600 font-black text-[10px] uppercase tracking-widest hover:underline underline-offset-8">Browse Full Ecosystem</Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                            {relatedProducts.map((relProduct) => (
                                <Link key={relProduct.id} to={`/product/${relProduct.slug}`} className="group bg-white rounded-[3rem] border border-neutral-100 overflow-hidden hover:shadow-2xl transition-all duration-700">
                                    <div className="aspect-[4/5] bg-neutral-50 p-10 flex items-center justify-center overflow-hidden">
                                        <img 
                                            src={relProduct.image_url?.startsWith('http') ? relProduct.image_url : `/products/${relProduct.image_url}`} 
                                            alt={relProduct.name} 
                                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-[2000ms] group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-8">
                                        <p className="text-[9px] font-black text-brand-600 uppercase tracking-widest mb-2">{relProduct.category_name}</p>
                                        <h4 className="font-bold text-neutral-900 truncate mb-4 group-hover:text-brand-600 transition-colors">{relProduct.name}</h4>
                                        <div className="flex justify-between items-center pt-4 border-t border-neutral-50">
                                            <span className="font-black text-neutral-900 tracking-tight">${relProduct.price}</span>
                                            <ArrowUpRight size={16} className="text-neutral-300 group-hover:text-brand-600 transition-colors" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

// --- HELPER COMPONENTS ---

const TrustModule = ({ icon, title, desc }) => (
    <div className="flex gap-5 group cursor-default">
        <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-brand-600 transition-all duration-500 group-hover:bg-brand-600 group-hover:text-white shadow-sm shrink-0">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-neutral-900 text-sm mb-1">{title}</h4>
            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{desc}</p>
        </div>
    </div>
);

const SpecRow = ({ label, value }) => (
    <div className="bg-white p-8 flex justify-between items-center border-neutral-100">
        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{label}</span>
        <span className="text-neutral-900 font-bold text-sm">{value}</span>
    </div>
);

export default ProductDetails;