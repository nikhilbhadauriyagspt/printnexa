import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import SEO from '../components/SEO';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CreditCard, Truck, ShieldCheck, User, MapPin, ArrowLeft, ShoppingBag, Zap, Tag, Check, ChevronRight, Globe, X, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [settings, setSettings] = useState(null);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        zip: '',
        payment_method: ''
    });

    const [loading, setLoading] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState('');
    const [availableCoupons, setAvailableCoupons] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        if (cartItems.length === 0 && !orderPlaced) {
            navigate('/cart');
        }

        const fetchSettings = async () => {
            try {
                const res = await api.get('/settings');
                setSettings(res.data);
                // Auto-select first available method
                if (res.data.cod_enabled === '1') setFormData(prev => ({ ...prev, payment_method: 'COD' }));
                else if (res.data.paypal_enabled === '1') setFormData(prev => ({ ...prev, payment_method: 'PayPal' }));
            } catch (error) {
                console.error("Failed to load payment settings");
            }
        };

        const fetchCoupons = async () => {
            try {
                const res = await api.get('/coupons/public');
                setAvailableCoupons(res.data);
            } catch (error) {
                console.error("Failed to fetch coupons");
            }
        };

        fetchSettings();
        fetchCoupons();
    }, [cartItems.length, navigate, orderPlaced]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleApplyCoupon = async (codeOverride = null) => {
        const codeToUse = codeOverride || couponCode;
        if (!codeToUse) return;

        try {
            const res = await api.post('/coupons/validate', {
                code: codeToUse,
                cartTotal: getCartTotal()
            });
            setDiscount(res.data.discountAmount);
            setAppliedCoupon(res.data.code);
            setCouponCode(res.data.code);
            toast.success(`Coupon ${res.data.code} applied!`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid coupon code");
        }
    };

    const placeOrder = async (paypalDetails = null) => {
        setLoading(true);
        try {
            const orderData = {
                user_id: user?.id || null,
                guest_name: formData.name,
                guest_email: formData.email,
                guest_phone: formData.phone,
                shipping_address: `${formData.address}, ${formData.city}, ${formData.zip}`,
                payment_method: formData.payment_method,
                items: cartItems.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                total_amount: total,
                website_id: import.meta.env.VITE_WEBSITE_ID || 1
            };

            const res = await api.post('/orders', orderData);
            setOrderPlaced(true);
            clearCart();
            navigate('/order-success', { state: { orderId: res.data.orderId || res.data.order_id } });
        } catch (error) {
            console.error("Order Failed:", error.response?.data || error);
            toast.error("Failed to place order: " + (error.response?.data?.error || "Please try again."));
        } finally {
            setLoading(false);
        }
    };

    const subtotal = getCartTotal();
    const shipping = subtotal > 500 ? 0 : 49; // Consistent with Cart logic
    const total = subtotal + shipping - discount;

    if (!settings) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
            <div className="w-12 h-12 border-4 border-slate-100 border-t-brand-600 rounded-full animate-spin"></div>
        </div>
    );

    const paypalClientId = settings.paypal_mode === 'live' ? settings.paypal_live_client_id : settings.paypal_sandbox_client_id;

    return (
        <PayPalScriptProvider options={{
            "client-id": paypalClientId || "test",
            "currency": "USD",
            "intent": "capture"
        }}>
            <div className="bg-slate-50 min-h-screen pb-20 font-sans">
                <SEO pageName="checkout" fallbackTitle="Checkout | Prime Fix Solutions" fallbackDesc="Secure Checkout" />

                {/* Mini Hero for Navbar Visibility */}
                <div className="bg-slate-950 h-32 w-full absolute top-0 left-0 right-0 z-0"></div>

                <div className="container mx-auto px-4 lg:px-8 pt-36 relative z-10">
                    
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
                        <div>
                            <Link to="/cart" className="inline-flex items-center gap-2 text-xs font-bold text-brand-500 uppercase tracking-widest mb-3 hover:text-brand-400 transition-colors">
                                <ArrowLeft size={14} /> Back to Cart
                            </Link>
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Checkout</h1>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200 text-slate-600">
                            <Lock size={14} className="text-green-600" />
                            <span className="text-xs font-bold">Secure SSL Encrypted Connection</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        
                        {/* LEFT COLUMN: FORMS */}
                        <div className="lg:col-span-7 space-y-6">
                            
                            {/* Contact Info */}
                            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
                                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                        <User size={16} />
                                    </div>
                                    Contact Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <InputGroup label="Full Name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" disabled={!!user} />
                                    </div>
                                    <InputGroup label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" disabled={!!user} />
                                    <InputGroup label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 000-0000" />
                                </div>
                            </section>

                            {/* Shipping Address */}
                            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
                                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                        <MapPin size={16} />
                                    </div>
                                    Shipping Address
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <InputGroup label="Street Address" name="address" value={formData.address} onChange={handleInputChange} placeholder="123 Main St" />
                                    </div>
                                    <InputGroup label="City" name="city" value={formData.city} onChange={handleInputChange} placeholder="New York" />
                                    <InputGroup label="ZIP / Postal Code" name="zip" value={formData.zip} onChange={handleInputChange} placeholder="10001" />
                                </div>
                            </section>

                            {/* Payment Method */}
                            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
                                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                        <CreditCard size={16} />
                                    </div>
                                    Payment Method
                                </h2>
                                <div className="space-y-4">
                                    {settings.cod_enabled === '1' && (
                                        <PaymentOption 
                                            id="COD" 
                                            title="Cash on Delivery" 
                                            desc="Pay when you receive your order" 
                                            icon={<Truck size={20} />} 
                                            selected={formData.payment_method} 
                                            onChange={handleInputChange} 
                                        />
                                    )}
                                    {settings.paypal_enabled === '1' && (
                                        <PaymentOption 
                                            id="PayPal" 
                                            title="PayPal / Credit Card" 
                                            desc="Safe payment online via PayPal" 
                                            icon={<Globe size={20} />} 
                                            selected={formData.payment_method} 
                                            onChange={handleInputChange} 
                                        />
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* RIGHT COLUMN: SUMMARY */}
                        <div className="lg:col-span-5">
                            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 sticky top-28">
                                <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Order Summary</h3>
                                
                                <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex gap-4 py-2">
                                            <div className="w-16 h-16 bg-slate-50 rounded-lg flex items-center justify-center p-2 border border-slate-100 shrink-0">
                                                <img 
                                                    src={item.image_url ? (item.image_url.startsWith('http') ? item.image_url : `/products/${item.image_url}`) : 'https://via.placeholder.com/100'} 
                                                    alt={item.name} 
                                                    className="w-full h-full object-contain mix-blend-multiply" 
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                <p className="text-sm font-bold text-slate-900 truncate">{item.name}</p>
                                                <p className="text-xs text-slate-500 mt-1">Qty: {item.quantity} × ${item.price}</p>
                                            </div>
                                            <div className="font-bold text-slate-900 text-sm flex flex-col justify-center">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 mb-8 pt-6 border-t border-slate-100">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 font-medium">Subtotal</span>
                                        <span className="text-slate-900 font-bold">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 font-medium">Shipping</span>
                                        <span className="text-green-600 font-bold">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-brand-600 font-bold">Discount</span>
                                            <span className="text-brand-600 font-bold">-${discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="h-px bg-slate-100 my-2"></div>
                                    <div className="flex justify-between items-end">
                                        <span className="font-black text-slate-900 text-lg">Total</span>
                                        <span className="text-3xl font-black text-slate-900 tracking-tighter">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Promo Code</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="ENTER CODE"
                                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-brand-500 outline-none transition-all font-bold uppercase placeholder:font-medium"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            disabled={!!appliedCoupon}
                                        />
                                        <button
                                            onClick={() => handleApplyCoupon()}
                                            disabled={!couponCode || !!appliedCoupon}
                                            className="px-6 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-600 transition-all disabled:bg-slate-200 disabled:text-slate-400"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {appliedCoupon && (
                                        <div className="flex items-center justify-between mt-3 px-4 py-3 bg-green-50 text-green-700 rounded-xl border border-green-100">
                                            <div className="flex items-center gap-2">
                                                <Tag size={14} />
                                                <span className="text-xs font-bold uppercase">Code {appliedCoupon} Applied</span>
                                            </div>
                                            <button onClick={() => { setAppliedCoupon(''); setDiscount(0); setCouponCode(''); }} className="hover:bg-green-100 p-1 rounded-full transition-colors"><X size={14}/></button>
                                        </div>
                                    )}
                                </div>

                                {formData.payment_method === 'COD' ? (
                                    <button
                                        disabled={loading || !formData.address || !formData.phone}
                                        onClick={() => placeOrder()}
                                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-brand-600 transition-all shadow-xl shadow-slate-900/10 hover:shadow-brand-600/20 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none flex items-center justify-center gap-2"
                                    >
                                        {loading ? 'Processing...' : 'Place Order'} <ChevronRight size={16} />
                                    </button>
                                ) : (
                                    <div className="relative z-0">
                                        <PayPalButtons
                                            disabled={!formData.address || !formData.phone}
                                            style={{ layout: "vertical", shape: "rect", label: "pay" }}
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    purchase_units: [{ amount: { value: total.toFixed(2) } }]
                                                });
                                            }}
                                            onApprove={(data, actions) => {
                                                return actions.order.capture().then((details) => {
                                                    placeOrder(details);
                                                });
                                            }}
                                        />
                                    </div>
                                )}
                                
                                <div className="mt-6 flex items-center justify-center gap-2 text-slate-400">
                                    <ShieldCheck size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Secure Checkout</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </PayPalScriptProvider>
    );
};

const InputGroup = ({ label, name, type = "text", value, onChange, placeholder, disabled }) => (
    <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">{label}</label>
        <input 
            type={type} 
            name={name} 
            required 
            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium text-slate-900 text-sm placeholder:text-slate-400 disabled:opacity-60 disabled:cursor-not-allowed" 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder}
            disabled={disabled}
        />
    </div>
);

const PaymentOption = ({ id, title, desc, icon, selected, onChange }) => (
    <label className={`flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all group ${
        selected === id 
        ? 'border-brand-600 bg-brand-50/30' 
        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
    }`}>
        <div className="flex items-center gap-4">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selected === id ? 'border-brand-600' : 'border-slate-300'
            }`}>
                {selected === id && <div className="w-2.5 h-2.5 rounded-full bg-brand-600" />}
            </div>
            <div>
                <p className="font-bold text-slate-900 text-sm">{title}</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{desc}</p>
            </div>
        </div>
        <div className={`transition-colors ${selected === id ? 'text-brand-600' : 'text-slate-300 group-hover:text-slate-400'}`}>
            {icon}
        </div>
        <input type="radio" name="payment_method" value={id} checked={selected === id} onChange={onChange} className="hidden" />
    </label>
);

export default Checkout;
