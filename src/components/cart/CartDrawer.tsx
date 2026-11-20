import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Bike, 
  Store,
  Sparkles
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ADDIS_SUB_CITIES } from '../../data/initialData';

interface CartDrawerProps {
  navigate: (path: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ navigate }) => {
  const { 
    cart, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    deliveryFee, 
    discount, 
    total,
    orderType,
    setOrderType,
    selectedSubCity,
    setSelectedSubCity,
    couponCode,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = React.useState('');
  const [couponFeedback, setCouponFeedback] = React.useState<{ success: boolean; message: string } | null>(null);

  if (!isCartDrawerOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
  };

  const handleProceed = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  const handleGoToMenu = () => {
    setIsCartDrawerOpen(false);
    navigate('/menu');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-cream-200 bg-cream-50/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-forest-900 text-berbere-400 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-forest-950">Your Food Cart</h3>
                  <p className="text-xs text-charcoal-500">
                    {cart.length === 0 ? 'Cart is empty' : `${cart.reduce((a, b) => a + b.quantity, 0)} items selected`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-2 text-charcoal-400 hover:text-charcoal-700 hover:bg-cream-200 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Delivery vs Pickup Toggle */}
            <div className="mt-4 grid grid-cols-2 gap-2 p-1 bg-cream-200/70 rounded-xl">
              <button
                onClick={() => setOrderType('Delivery')}
                className={`flex items-center justify-center space-x-1.5 py-2 text-xs font-bold rounded-lg transition-all ${
                  orderType === 'Delivery'
                    ? 'bg-white text-forest-950 shadow-sm'
                    : 'text-charcoal-600 hover:text-forest-950'
                }`}
              >
                <Bike className="w-4 h-4 text-berbere-600" />
                <span>Door Delivery</span>
              </button>
              <button
                onClick={() => setOrderType('Pickup')}
                className={`flex items-center justify-center space-x-1.5 py-2 text-xs font-bold rounded-lg transition-all ${
                  orderType === 'Pickup'
                    ? 'bg-white text-forest-950 shadow-sm'
                    : 'text-charcoal-600 hover:text-forest-950'
                }`}
              >
                <Store className="w-4 h-4 text-forest-700" />
                <span>Pickup (Bole)</span>
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-cream-100 flex items-center justify-center text-4xl">
                  🥘
                </div>
                <div>
                  <h4 className="text-base font-bold text-forest-950">Your plate is empty</h4>
                  <p className="text-xs text-charcoal-500 mt-1 max-w-xs mx-auto">
                    Explore our royal Ethiopian specialties, wood-fired pizzas, and gourmet burgers.
                  </p>
                </div>
                <button
                  onClick={handleGoToMenu}
                  className="px-6 py-2.5 bg-forest-900 text-white rounded-xl text-xs font-bold hover:bg-forest-800 transition-colors shadow"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {cart.map((item) => (
                  <div 
                    key={item.id}
                    className="p-3.5 bg-cream-50/70 border border-cream-200 rounded-2xl flex space-x-3.5 hover:border-cream-300 transition-colors"
                  >
                    <img 
                      src={item.foodItem.imageUrl} 
                      alt={item.foodItem.name} 
                      className="w-16 h-16 rounded-xl object-cover border border-cream-200 flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs font-bold text-forest-950 truncate pr-1">
                          {item.foodItem.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-charcoal-400 hover:text-red-500 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-charcoal-500 space-y-0.5 mt-0.5">
                        <p className="font-medium text-berbere-700">{item.selectedPortion}</p>
                        <p className="text-charcoal-400">{item.selectedSpiceLevel}</p>
                        {item.specialInstructions && (
                          <p className="italic text-charcoal-500 truncate">Note: "{item.specialInstructions}"</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-cream-100">
                        <span className="text-xs font-extrabold text-forest-900">
                          ETB {(item.unitPrice * item.quantity).toLocaleString()}
                        </span>

                        <div className="flex items-center space-x-2 bg-white px-2 py-1 rounded-lg border border-cream-300">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-0.5 text-charcoal-600 hover:text-forest-950"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-0.5 text-charcoal-600 hover:text-forest-950"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Sub-City Selector if Delivery */}
                {orderType === 'Delivery' && (
                  <div className="p-3 bg-forest-50/50 border border-forest-100 rounded-xl space-y-1.5">
                    <label className="text-[11px] font-bold text-forest-950 block">
                      Addis Ababa Delivery Location:
                    </label>
                    <select
                      value={selectedSubCity}
                      onChange={(e) => setSelectedSubCity(e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-forest-200 rounded-lg focus:outline-none focus:border-forest-600 font-medium"
                    >
                      {ADDIS_SUB_CITIES.map((sub) => (
                        <option key={sub.name} value={sub.name}>
                          {sub.name} (ETB {sub.deliveryFee} • {sub.estimatedMinutes})
                        </option>
                      ))}
                    </select>
                    {subtotal >= 2000 && (
                      <p className="text-[10px] text-emerald-700 font-bold flex items-center">
                        <Sparkles className="w-3 h-3 mr-1" /> Orders above ETB 2,000 get FREE delivery!
                      </p>
                    )}
                  </div>
                )}

                {/* Coupon Code Input */}
                <div className="pt-2">
                  {couponCode ? (
                    <div className="flex items-center justify-between p-2.5 bg-berbere-50 border border-berbere-200 rounded-xl text-xs">
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-berbere-600" />
                        <div>
                          <p className="font-bold text-berbere-800">Coupon {couponCode} applied</p>
                          <p className="text-[10px] text-berbere-600">Saved ETB {discount}</p>
                        </div>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs font-bold text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApply} className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. TALILE10)"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value);
                          setCouponFeedback(null);
                        }}
                        className="flex-1 text-xs px-3 py-2 border border-cream-300 rounded-xl uppercase tracking-wider focus:outline-none focus:border-berbere-500"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-2 bg-cream-200 hover:bg-cream-300 text-charcoal-900 text-xs font-bold rounded-xl transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {couponFeedback && (
                    <p className={`text-[11px] mt-1 font-medium ${couponFeedback.success ? 'text-emerald-700' : 'text-red-600'}`}>
                      {couponFeedback.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Totals & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-cream-200 bg-cream-50/90 space-y-3">
              <div className="space-y-1.5 text-xs text-charcoal-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-charcoal-900">ETB {subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>{orderType === 'Delivery' ? 'Delivery Fee' : 'Restaurant Pickup'}</span>
                  <span className="font-semibold text-charcoal-900">
                    {orderType === 'Pickup' 
                      ? 'FREE' 
                      : deliveryFee === 0 
                        ? <span className="text-emerald-700 font-bold">FREE</span> 
                        : `ETB ${deliveryFee}`}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-berbere-700 font-bold">
                    <span>Discount</span>
                    <span>- ETB {discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-extrabold text-forest-950 pt-2 border-t border-cream-200">
                  <span>Total Amount</span>
                  <span className="text-forest-900">ETB {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/cart');
                  }}
                  className="py-3 px-4 border border-cream-300 hover:bg-white text-forest-950 text-xs font-bold rounded-xl transition-colors text-center"
                >
                  View Full Cart
                </button>
                <button
                  onClick={handleProceed}
                  className="py-3 px-4 bg-gradient-to-r from-forest-900 to-forest-950 hover:from-forest-800 hover:to-forest-900 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5 hover:scale-[1.02] active:scale-95"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5 text-berbere-400" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
