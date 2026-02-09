import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ChevronRight, ShieldCheck, ArrowRight } from 'lucide-react';

const CartDrawer = ({ isOpen, onClose }) => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const navigate = useNavigate();

    const subtotal = getCartTotal();
    const shipping = subtotal > 500 ? 0 : 49;
    const total = subtotal + shipping;

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                                    <ShoppingBag size={20} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Your Cart</h2>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</p>
                                </div>
                            </div>
                            <button 
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center pb-20">
                                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
                                        <ShoppingBag size={40} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase">Empty Cart</h3>
                                    <p className="text-slate-400 text-sm font-medium mb-8 max-w-[200px]">Your shopping cart is currently empty.</p>
                                    <button 
                                        onClick={() => { onClose(); navigate('/products'); }}
                                        className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-600 transition-all shadow-lg"
                                    >
                                        Browse Catalog
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-4 group">
                                            <div className="w-24 h-24 bg-slate-50 rounded-2xl flex items-center justify-center p-2 shrink-0 border border-slate-100 group-hover:border-brand-200 transition-colors">
                                                <img 
                                                    src={item.image_url ? (item.image_url.startsWith('http') ? item.image_url : `/products/${item.image_url}`) : 'https://via.placeholder.com/100'} 
                                                    alt={item.name} 
                                                    className="max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" 
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                                                <div>
                                                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-tight truncate mb-1">{item.name}</h4>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${item.price}</p>
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center bg-slate-50 rounded-lg border border-slate-100 p-0.5">
                                                        <button 
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-6 h-6 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-md text-slate-600 transition-all disabled:opacity-50"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus size={12} />
                                                        </button>
                                                        <span className="w-6 text-center text-xs font-bold text-slate-900">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-6 h-6 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-md text-slate-600 transition-all"
                                                        >
                                                            <Plus size={12} />
                                                        </button>
                                                    </div>
                                                    <button 
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-slate-300 hover:text-rose-500 transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium uppercase text-[10px] tracking-widest">Subtotal</span>
                                        <span className="text-slate-900 font-black tracking-tighter">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 font-medium uppercase text-[10px] tracking-widest">Shipping</span>
                                        <span className="text-emerald-600 font-bold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="h-px bg-slate-200 my-2"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-black text-slate-900 text-sm uppercase tracking-widest">Total</span>
                                        <span className="text-2xl font-black text-slate-900 tracking-tighter">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    <button 
                                        onClick={() => { onClose(); navigate('/checkout'); }}
                                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-brand-600 transition-all shadow-xl flex items-center justify-center gap-3 group"
                                    >
                                        Checkout Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <button 
                                        onClick={() => { onClose(); navigate('/cart'); }}
                                        className="w-full bg-white border-2 border-slate-200 text-slate-900 py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:border-slate-900 transition-all flex items-center justify-center gap-2"
                                    >
                                        View Full Bag
                                    </button>
                                </div>

                                <div className="flex items-center justify-center gap-2 pt-2 opacity-50">
                                    <ShieldCheck size={12} className="text-emerald-600" />
                                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">Secure Encrypted Transaction</span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;