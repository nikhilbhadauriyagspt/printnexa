import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import api from '../api/api';
import SearchBar from './SearchBar';
import CartDrawer from './CartDrawer';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingCart,
    User,
    Heart,
    Menu,
    Search,
    LogOut,
    Package,
    LayoutDashboard,
    Zap,
    X,
    ChevronDown,
    MapPin,
    Layers,
    Phone,
    ArrowUpRight,
    Tag
} from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems, isCartOpen, openCart, closeCart } = useCart();
    const { wishlistItems } = useWishlist();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [branding, setBranding] = useState({
        name: 'PrintNexa',
        logo_url: '/logo/logo.png' // Default static logo
    });

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
        api.get(`/websites/${websiteId}`).then(res => {
            if (res.data) {
                setBranding(prev => ({
                    ...prev,
                    ...res.data,
                    logo_url: res.data.logo_url || '/logo/logo.png'
                }));
            }
        }).catch(() => { });

        // Fetch Categories for the search filter
        api.get('/categories').then(res => {
            setCategories(res.data);
        }).catch(() => { });
    }, []);

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <CartDrawer isOpen={isCartOpen} onClose={closeCart} />

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md lg:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="absolute top-0 left-0 w-[80%] h-full bg-white p-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-12">
                                <img
                                    src={branding.logo_url || '/logo/logo.png'}
                                    alt={branding.name}
                                    className="h-14 w-auto"
                                    onError={(e) => { e.target.src = '/logo/logo.png'; }}
                                />
                                <X size={24} onClick={() => setIsMenuOpen(false)} />
                            </div>
                            <nav className="space-y-6">
                                <MobileLink to="/" icon={<Zap size={20} />} label="Home" onClick={() => setIsMenuOpen(false)} />
                                <MobileLink to="/products" icon={<Layers size={20} />} label="All Products" onClick={() => setIsMenuOpen(false)} />
                                <MobileLink to="/about" icon={<User size={20} />} label="About Us" onClick={() => setIsMenuOpen(false)} />
                                <MobileLink to="/contact" icon={<MapPin size={20} />} label="Find Us" onClick={() => setIsMenuOpen(false)} />
                            </nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <header className={`sticky top-0 z-[60] bg-white transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>

                {/* Main Navbar Deck */}
                <div className="border-b border-slate-100">
                    <div className="container mx-auto px-4 md:px-8 py-4">
                        <div className="flex items-center gap-8 md:gap-12">

                            {/* 1. Logo Section */}
                            <Link to="/" className="shrink-0">
                                <img
                                    src={branding.logo_url || '/logo/logo.png'}
                                    alt={branding.name}
                                    className="h-14 w-auto"
                                    onError={(e) => { e.target.src = '/logo/logo.png'; }}
                                />
                            </Link>

                            {/* 2. Mega-Search Bar with Integrated Category List */}
                            <div className="hidden lg:flex flex-1 relative group">
                                <div className="flex items-center w-full bg-slate-50 border border-slate-200 rounded-full focus-within:ring-4 focus-within:ring-brand-500/10 focus-within:border-brand-500 transition-all">

                                    {/* Category Toggle */}
                                    <div className="relative border-r border-slate-200 shrink-0">
                                        <button
                                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                            className="flex items-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-colors"
                                        >
                                            <Tag size={14} className="text-brand-500" />
                                            {selectedCategory}
                                            <ChevronDown size={14} className={`transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* Category Dropdown List */}
                                        <AnimatePresence>
                                            {isCategoryOpen && (
                                                <>
                                                    <div className="fixed inset-0 z-40" onClick={() => setIsCategoryOpen(false)} />
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                                        className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 z-50 max-h-80 overflow-y-auto"
                                                    >
                                                        <button
                                                            onClick={() => { setSelectedCategory('All Categories'); setIsCategoryOpen(false); }}
                                                            className="w-full text-left px-5 py-3 text-xs font-bold text-slate-600 hover:bg-brand-50 hover:text-brand-600 transition-all border-b border-slate-50"
                                                        >
                                                            ALL CATEGORIES
                                                        </button>
                                                        {categories.map((cat) => (
                                                            <button
                                                                key={cat.id}
                                                                onClick={() => { setSelectedCategory(cat.name); setIsCategoryOpen(false); navigate(`/products?category=${cat.id}`); }}
                                                                className="w-full text-left px-5 py-3 text-xs font-bold text-slate-600 hover:bg-brand-50 hover:text-brand-600 transition-all uppercase tracking-wider"
                                                            >
                                                                {cat.name}
                                                            </button>
                                                        ))}
                                                    </motion.div>
                                                </>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Search Input */}
                                    <div className="flex-1 flex items-center pl-4 relative">
                                        <Search size={18} className="text-slate-400" />
                                        <input
                                            type="text"
                                            onClick={() => setIsSearchOpen(true)}
                                            placeholder="What are you looking for today?"
                                            className="w-full bg-transparent border-none focus:ring-0 py-3.5 pl-3 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 cursor-pointer"
                                            readOnly
                                        />
                                        <div className="absolute right-4 flex gap-2">
                                            <span className="bg-white border border-slate-200 px-2 py-1 rounded-lg text-[9px] font-black text-slate-400 shadow-sm">SEARCH</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Actions Deck */}
                            <div className="flex items-center gap-2 md:gap-5 ml-auto">
                                <button onClick={() => setIsSearchOpen(true)} className="lg:hidden p-2.5 text-slate-600 hover:bg-slate-50 rounded-full transition-all">
                                    <Search size={22} />
                                </button>

                                <Link to="/wishlist" className="hidden sm:flex flex-col items-center gap-0.5 group relative">
                                    <div className="p-2 text-slate-600 group-hover:text-rose-600 transition-colors">
                                        <Heart size={22} />
                                        {wishlistItems.length > 0 && (
                                            <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[8px] font-black flex items-center justify-center rounded-full ring-2 ring-white">
                                                {wishlistItems.length}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-rose-600">Saved</span>
                                </Link>

                                <button
                                    onClick={openCart}
                                    className="flex items-center gap-3 bg-brand-50 border border-brand-100 hover:bg-brand-600 hover:border-brand-600 group px-4 py-2.5 rounded-full transition-all"
                                >
                                    <div className="relative">
                                        <ShoppingCart size={20} className="text-brand-600 group-hover:text-white transition-colors" />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#0f172a] text-white text-[8px] font-black flex items-center justify-center rounded-full ring-2 ring-brand-50 group-hover:ring-brand-600">
                                                {cartCount}
                                            </span>
                                        )}
                                    </div>
                                    <div className="hidden sm:flex flex-col -space-y-1 text-left">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-brand-400 group-hover:text-brand-100 transition-colors">My Bag</span>
                                        <span className="text-xs font-black text-brand-700 group-hover:text-white transition-colors">View Cart</span>
                                    </div>
                                </button>

                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="w-11 h-11 bg-slate-900 text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/10"
                                    >
                                        <User size={20} />
                                    </button>

                                    <AnimatePresence>
                                        {isProfileOpen && (
                                            <>
                                                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    className="absolute top-full right-0 mt-4 w-64 bg-white border border-slate-100 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-3 z-50 overflow-hidden"
                                                >
                                                    {user ? (
                                                        <div className="space-y-1">
                                                            <div className="px-4 py-4 mb-2 bg-slate-50 rounded-2xl">
                                                                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Account</p>
                                                                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                                                            </div>
                                                            <DropdownLink to="/orders" icon={<Package size={16} />} text="Orders" />
                                                            {user.role === 'admin' && <DropdownLink to="/admin" icon={<LayoutDashboard size={16} />} text="Admin Panel" highlight />}
                                                            <div className="h-px bg-slate-50 my-2 mx-2" />
                                                            <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                                                                <LogOut size={16} /> Sign Out
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="p-2 space-y-2">
                                                            <Link to="/login" className="flex items-center justify-center w-full py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-800 transition-all">Log In</Link>
                                                            <Link to="/register" className="block text-center w-full py-3 text-slate-500 text-xs font-bold hover:bg-slate-50 rounded-2xl transition-all">Sign Up</Link>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 text-slate-600">
                                    <Menu size={28} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sub-Navbar Deck (Left Links + Capsule Button) */}
                <div className="hidden lg:block bg-white border-b border-slate-100">
                    <div className="container mx-auto px-8">
                        <div className="flex items-center justify-between py-2">
                            {/* Navigation Links Aligned to the Left */}
                            <nav className="flex items-center gap-2">
                                <NavLink to="/" label="Home" active={location.pathname === '/'} />
                                <NavLink to="/products" label="Shop All" active={location.pathname === '/products'} />
                                <NavLink to="/about" label="Our Vision" active={location.pathname === '/about'} />
                                <NavLink to="/faq" label="Help Center" active={location.pathname === '/faq'} />
                                <NavLink to="/contact" label="Contact" active={location.pathname === '/contact'} />
                            </nav>

                            {/* Right Side: Fully Rounded Capsule Button */}
                            <div className="flex justify-end">
                                <Link to="/contact" className="group flex items-center gap-3 bg-[#0f172a] text-white pl-1.5 pr-5 py-1.5 rounded-full hover:bg-brand-600 transition-all shadow-lg shadow-slate-900/10">
                                    <div className="w-9 h-9 bg-brand-500 rounded-full flex items-center justify-center text-white brand-shadow group-hover:bg-white group-hover:text-brand-600 transition-all">
                                        <Phone size={16} fill="currentColor" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.15em]">Direct Support</span>
                                    <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all">
                                        <ArrowUpRight size={14} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

const NavLink = ({ to, label, active }) => (
    <Link 
        to={to} 
        className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all relative flex items-center gap-2 group ${
            active ? 'text-white' : 'text-slate-500 hover:text-slate-900'
        }`}
    >
        <span className="relative z-10">{label}</span>
        {active && (
            <motion.div 
                layoutId="active-pill"
                className="absolute inset-0 bg-[#0f172a] rounded-full shadow-lg shadow-slate-900/20"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
        )}
        {active && (
            <span className="relative z-10 w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
        )}
        {!active && (
            <div className="absolute inset-0 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
        )}
    </Link>
);

const MobileLink = ({ to, icon, label, onClick, active }) => (
    <Link to={to} onClick={onClick} className={`flex items-center gap-4 p-4 rounded-2xl text-base font-bold ${active ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-50'}`}>
        {icon} {label}
    </Link>
);

const DropdownLink = ({ to, icon, text, highlight }) => (
    <Link to={to} className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${highlight ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-50'}`}>
        {icon} {text}
    </Link>
);

export default Navbar;