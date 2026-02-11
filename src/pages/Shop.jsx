import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../api/api';
import SEO from '../components/SEO';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FadeIn } from '../components/Reveal';
import { 
    Filter, Search, Heart, ShoppingBag, X, 
    CheckCircle2, ChevronDown, SlidersHorizontal, ArrowUpRight, Zap, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Shop = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Static Categories Fallback
    const staticCategories = [
        {id: 8, name: "All-In-One Printers", slug: "all-in-one-printers", image: "All-In-One.jpg"},
        {id: 6, name: "Dot Matrix Printers", slug: "dot-matrix-printers", image: "Dot Matrix.jpg"},
        {id: 2, name: "Inkjet Printers", slug: "inkjet-printers", image: "Inkjet.jpg"},
        {id: 10, name: "Large Format Printers", slug: "large-format-printers", image: "Large-Format.jpg"},
        {id: 5, name: "Laser Printers", slug: "laser-printers", image: "Laser.jpg"},
        {id: 3, name: "LED Printers", slug: "led-printers", image: "LED.jpg"},
        {id: 9, name: "Printer Accessories", slug: "printer-accessories", image: "Printer-as.jpg"},
        {id: 4, name: "Supertank Printers", slug: "supertank-printers", image: "Supertank.jpg"},
        {id: 7, name: "Thermal Printers", slug: "thermal-printers", image: "Thermal.jpg"}
    ];

    // State
    const [priceRange, setPriceRange] = useState(100000);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(staticCategories);
    const [loading, setLoading] = useState(true);
    const [categorySEO, setCategorySEO] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // Filters State
    const [searchTerm, setSearchTerm] = useState(new URLSearchParams(location.search).get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState(new URLSearchParams(location.search).get('category') || 'All');
    const [sortBy, setSortBy] = useState('newest');
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
    const [debouncedPrice, setDebouncedPrice] = useState(priceRange);

    const fetchProducts = async () => {
        try {
            if (products.length === 0) setLoading(true);
            
            const params = new URLSearchParams();
            if (selectedCategory !== 'All') params.append('category', selectedCategory);
            if (debouncedSearch) params.append('search', debouncedSearch);
            if (debouncedPrice < 100000) params.append('maxPrice', debouncedPrice);
            if (sortBy) params.append('sort', sortBy);
            
            const res = await api.get(`/products?${params.toString()}`);
            setProducts(res.data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    // Initial Load Priority
    useEffect(() => {
        // 1. Fetch Products Immediately
        fetchProducts();

        // 2. Fetch Categories in background with delay
        const timer = setTimeout(() => {
            api.get('/categories').then(res => {
                if (res.data && res.data.length > 0) setCategories(res.data);
            }).catch(() => {});
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    // Filter changes (excluding mount)
    useEffect(() => {
        const isInitialMount = products.length === 0 && loading;
        if (!isInitialMount) {
            fetchProducts();
        }
    }, [selectedCategory, debouncedSearch, debouncedPrice, sortBy]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, debouncedSearch, debouncedPrice, sortBy]);

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        if (selectedCategory !== 'All') {
            const cat = categories.find(c => c.slug === selectedCategory);
            if (cat) setCategorySEO(cat);
        } else {
            setCategorySEO(null);
        }
    }, [selectedCategory, categories]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setSearchTerm(queryParams.get('search') || '');
        setSelectedCategory(queryParams.get('category') || 'All');
    }, [location.search]);

    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedCategory('All');
        setPriceRange(100000);
        setSortBy('newest');
        navigate('/products');
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans selection:bg-brand-600 selection:text-white pb-20">
            {categorySEO ? (
                <Helmet>
                    <title>{categorySEO.meta_title || `${categorySEO.name} | Product Catalog`}</title>
                    <meta name="description" content={categorySEO.meta_description || `View our inventory of ${categorySEO.name}.`} />
                </Helmet>
            ) : (
                <SEO pageName="shop" fallbackTitle="Product Catalog | Professional Hardware" fallbackDesc="Browse our full inventory of professional printing technology and supplies." />
            )}

            {/* --- MINIMALIST HEADER --- */}
            <header className="bg-white border-b border-slate-200 pt-32 pb-12 lg:pt-40 lg:pb-16 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                            <div>
                                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                                    <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
                                    <ChevronRight size={10} />
                                    <span className="text-slate-900">Products</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
                                    {selectedCategory !== 'All' ? categories.find(c => c.slug === selectedCategory)?.name : 'Full'} <span className="text-brand-600">Catalog</span>
                                </h1>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-slate-50 border border-slate-100 px-5 py-2.5 rounded-2xl">
                                    <span className="text-slate-900 font-bold text-sm">{products.length}</span>
                                    <span className="text-slate-400 font-bold uppercase text-[10px] ml-2 tracking-wide">Available Models</span>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </header>

            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* --- MODERN SIDEBAR --- */}
                    <aside className={`fixed inset-0 z-[100] lg:sticky lg:top-32 lg:z-0 lg:w-64 lg:h-auto bg-white lg:bg-transparent lg:inset-auto transition-all duration-500 lg:block ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                        <div className="h-full overflow-y-auto lg:overflow-visible bg-white lg:bg-transparent p-6 lg:p-0">
                            
                            {/* Mobile Close */}
                            <div className="flex lg:hidden justify-between items-center mb-10">
                                <h3 className="text-xl font-bold uppercase tracking-tight">Filters</h3>
                                <button onClick={() => setIsSidebarOpen(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"><X size={20}/></button>
                            </div>

                            {/* Search Block */}
                            <div className="mb-8">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Identify Product</h4>
                                <div className="relative group">
                                    <input 
                                        type="text" 
                                        placeholder="Search..." 
                                        className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl text-sm font-medium focus:border-brand-600 outline-none transition-all shadow-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-600 transition-colors" size={14} />
                                </div>
                            </div>

                            {/* Category List */}
                            <div className="mb-8">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Categories</h4>
                                <div className="space-y-1 bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm">
                                    <CategoryButton 
                                        label="All Inventory" 
                                        isActive={selectedCategory === 'All'} 
                                        onClick={() => setSelectedCategory('All')} 
                                        isAll
                                    />
                                    {categories.map((cat) => (
                                        <CategoryButton 
                                            key={cat.id}
                                            label={cat.name}
                                            image={cat.image}
                                            isActive={selectedCategory === cat.slug}
                                            onClick={() => setSelectedCategory(cat.slug)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Price Block */}
                            <div className="mb-8 bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Price Limit</h4>
                                <input 
                                    type="range" min="0" max="100000" step="1000"
                                    value={priceRange} onChange={(e) => setPriceRange(e.target.value)}
                                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-600 mb-3"
                                />
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 text-[10px] font-bold">$0</span>
                                    <span className="text-brand-600 text-xs font-black tracking-tight">${priceRange}</span>
                                </div>
                            </div>

                            <button onClick={clearAllFilters} className="w-full py-3.5 border-2 border-slate-200 text-slate-400 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:border-brand-600 hover:text-brand-600 transition-all duration-300">
                                Reset Filters
                            </button>
                        </div>
                    </aside>

                    {/* --- PRODUCT GRID --- */}
                    <main className="flex-1 w-full">
                        
                        {/* Mobile & Layout Controls */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
                               {['newest', 'price-low', 'price-high'].map(s => (
                                   <button 
                                        key={s}
                                        onClick={() => setSortBy(s)}
                                        className={`whitespace-nowrap px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${sortBy === s ? 'bg-slate-900 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-400 hover:bg-slate-50'}`}
                                   >
                                       {s.replace('-', ' ')}
                                   </button>
                               ))}
                            </div>
                            <button 
                                onClick={() => setIsSidebarOpen(true)}
                                className="lg:hidden w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm"
                            >
                                <SlidersHorizontal size={16} className="text-brand-600"/> Refine Search
                            </button>
                        </div>

                        {/* List */}
                        <AnimatePresence mode='wait'>
                            {loading ? (
                                <motion.div 
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
                                >
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="aspect-[4/5] bg-white border border-slate-100 rounded-[3rem] animate-pulse"></div>
                                    ))}
                                </motion.div>
                            ) : products.length > 0 ? (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10"
                                >
                                    {currentProducts.map((product) => (
                                        <ShopProductCard key={product.id} product={product} />
                                    ))}
                                </motion.div>
                            ) : (
                                <div className="py-24 text-center bg-white rounded-[3rem] border border-slate-200 border-dashed">
                                    <ShoppingBag size={48} className="text-slate-200 mx-auto mb-6" />
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2 uppercase">No Models Found</h3>
                                    <p className="text-slate-500 mb-8 max-w-xs mx-auto font-medium text-sm">We couldn't find any products matching your current filter criteria.</p>
                                    <button onClick={clearAllFilters} className="text-brand-600 font-bold hover:underline underline-offset-8 uppercase text-xs tracking-widest">View All Inventory</button>
                                </div>
                            )}
                        </AnimatePresence>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="mt-16 flex justify-center items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:border-brand-600 hover:text-brand-600 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-400 transition-all"
                                >
                                    <ChevronRight size={18} className="rotate-180" />
                                </button>
                                
                                <div className="flex items-center gap-2">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${
                                                currentPage === i + 1
                                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                                    : 'bg-white border border-slate-200 text-slate-400 hover:border-brand-600 hover:text-brand-600'
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:border-brand-600 hover:text-brand-600 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-400 transition-all"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        )}

                    </main>
                </div>
            </div>
        </div>
    );
};

// --- HELPERS ---

const CategoryButton = ({ label, isActive, onClick, image, isAll }) => (
    <button 
        onClick={onClick}
        className={`w-full group flex items-center justify-between px-3 py-2.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
    >
        <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full overflow-hidden border ${isActive ? 'border-white/20 bg-white/10' : 'border-slate-100 bg-slate-50'} flex items-center justify-center shrink-0`}>
                {isAll ? (
                    <Zap size={14} className={isActive ? 'text-brand-500' : 'text-slate-400'} />
                ) : (
                    <img 
                        src={`/category/${image}`} 
                        alt={label} 
                        className={`w-full h-full object-cover ${isActive ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'} transition-all`}
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                )}
            </div>
            <span className={`text-xs font-bold uppercase tracking-tight ${isActive ? 'text-white' : ''}`}>{label}</span>
        </div>
        <ChevronRight size={12} className={`transition-transform duration-300 ${isActive ? 'translate-x-0 opacity-100 text-brand-500' : '-translate-x-2 opacity-0'}`} />
    </button>
);

const ShopProductCard = ({ product }) => {
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

    return (
        <div className="group flex flex-col h-full bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 p-4">
            <div className="relative aspect-square bg-slate-50 rounded-[2rem] overflow-hidden mb-6 flex items-center justify-center transition-colors group-hover:bg-white">
                {parseFloat(product.mrp) > parseFloat(product.price) && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-brand-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg z-10 shadow-lg">
                        Special Price
                    </span>
                )}
                
                <Link to={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center p-8">
                    <img 
                        src={imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
                    />
                </Link>

                <div className="absolute top-4 right-4 flex flex-col gap-2 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <button 
                        onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-md ${
                            activeWishlist ? 'bg-brand-500 text-white' : 'bg-white text-slate-400 hover:text-brand-600'
                        }`}
                    >
                        <Heart size={16} className={activeWishlist ? 'fill-current' : ''} />
                    </button>
                </div>
            </div>

            <div className="px-2 pb-4 flex flex-col items-center text-center flex-1">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{product.category_name || 'Series'}</p>
                <Link to={`/product/${product.slug}`} className="flex-1">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2 mb-3 px-2 uppercase tracking-tight">{product.name}</h3>
                </Link>
                <div className="flex items-center gap-2 mt-auto">
                    <span className="text-base font-black text-slate-900 tracking-tighter">${product.price}</span>
                    {parseFloat(product.mrp) > parseFloat(product.price) && <span className="text-[10px] text-slate-300 line-through font-bold">${product.mrp}</span>}
                </div>
                <button 
                    onClick={handleAddToCart}
                    className={`mt-4 w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest transition-all ${
                        isAdded ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-brand-600'
                    }`}
                >
                    {isAdded ? <CheckCircle2 size={14} /> : <><ShoppingBag size={14} /> Add to Cart</>}
                </button>
            </div>
        </div>
    );
};

export default Shop;