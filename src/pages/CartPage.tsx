import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  Bike, 
  Store, 
  ShoppingBag, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { ADDIS_SUB_CITIES } from '../data/initialData';

interface CartPageProps {
  navigate: (path: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ navigate }) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    orderType,
    setOrderType,
    selectedSubCity,
    setSelectedSubCity,
    subtotal,
    deliveryFee,
    discount,
    couponCode,
    applyCoupon,
    removeCoupon,
    total,
    itemCount
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
  };

  return (
    <div className="min-h-screen bg-cream-50/70 pb-20">
      
      {/* Header */}
      <div className="bg-forest-950 text-cream-100 py-10 border-b-4 border-berbere-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-berbere-400">
              Review Your Selected Delights
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
              Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </h1>
          </div>
          <button
            onClick={() => navigate('/menu')}
            className="self-start sm:self-auto text-xs font-bold text-cream-200 hover:text-white flex items-center space-x-1.5 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Browsing Menu</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl border border-cream-200 p-12 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-24 h-24 mx-auto rounded-full bg-cream-100 flex items-center justify-center text-5xl mb-5">
              🥘
            </div>
            <h2 className="text-2xl font-bold font-serif text-forest-950">
              Your cart is empty
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-2 leading-relaxed">
              You haven't selected any dishes yet. Discover our authentic slow-cooked Habesha favorites, pizzas, and artisan drinks.
            </p>
            <button
              onClick={() => navigate('/menu')}
              className="mt-6 px-8 py-3.5 bg-forest-900 text-white rounded-2xl text-xs font-bold hover:bg-forest-800 transition-colors shadow-md inline-flex items-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4 text-berbere-400" />
              <span>Explore Food Menu</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 8 cols: Cart Items Table */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Delivery vs Pickup Selector Card */}
              <div className="bg-white p-5 rounded-3xl border border-cream-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-forest-950">Order Method</h3>
                  <p className="text-xs text-charcoal-500">Choose between door dispatch or restaurant pickup in Bole</p>
                </div>
                <div className="grid grid-cols-2 gap-2 p-1.5 bg-cream-100 rounded-2xl w-full sm:w-auto">
                  <button
                    onClick={() => setOrderType('Delivery')}
                    className={`flex items-center justify-center space-x-2 px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${
                      orderType === 'Delivery'
                        ? 'bg-forest-900 text-white shadow'
                        : 'text-charcoal-600 hover:text-forest-950'
                    }`}
                  >
                    <Bike className="w-4 h-4 text-berbere-400" />
                    <span>Door Delivery</span>
                  </button>
                  <button
                    onClick={() => setOrderType('Pickup')}
                    className={`flex items-center justify-center space-x-2 px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${
                      orderType === 'Pickup'
                        ? 'bg-forest-900 text-white shadow'
                        : 'text-charcoal-600 hover:text-forest-950'
                    }`}
                  >
                    <Store className="w-4 h-4 text-emerald-400" />
                    <span>Bole Pickup (FREE)</span>
                  </button>
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-white rounded-3xl border border-cream-200 shadow-sm divide-y divide-cream-100 overflow-hidden">
                <div className="p-5 flex items-center justify-between bg-cream-50/50">
                  <h3 className="text-sm font-bold text-forest-950">Itemized Meals</h3>
                  <button
                    onClick={clearCart}
                    className="text-xs font-bold text-red-600 hover:underline flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Entire Cart</span>
                  </button>
                </div>

                {cart.map((item) => (
                  <div key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-cream-50/30 transition-colors">
                    
                    <div className="flex items-center space-x-4">
                      <img 
                        src={item.foodItem.imageUrl} 
                        alt={item.foodItem.name} 
                        className="w-20 h-20 rounded-2xl object-cover border border-cream-200 flex-shrink-0"
                      />
                      <div>
                        {item.foodItem.amharicName && (
                          <span className="text-[11px] font-semibold text-berbere-700 block">
                            {item.foodItem.amharicName}
                          </span>
                        )}
                        <h4 className="text-sm font-bold text-forest-950">
                          {item.foodItem.name}
                        </h4>
                        <div className="flex flex-wrap gap-2 text-xs text-charcoal-500 mt-1">
                          <span className="bg-cream-100 px-2 py-0.5 rounded-md font-medium text-forest-950">
                            {item.selectedPortion}
                          </span>
                          <span className="bg-berbere-50 text-berbere-800 px-2 py-0.5 rounded-md font-medium">
                            {item.selectedSpiceLevel}
                          </span>
                        </div>
                        {item.specialInstructions && (
                          <p className="text-[11px] text-charcoal-400 italic mt-1">
                            Note: "{item.specialInstructions}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-6 pt-2 sm:pt-0 border-t sm:border-0 border-cream-100">
                      
                      {/* Quantity counter */}
                      <div className="flex items-center space-x-2 bg-cream-100 px-3 py-1.5 rounded-xl border border-cream-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-charcoal-700 hover:text-forest-950"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold w-6 text-center text-forest-950">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-charcoal-700 hover:text-forest-950"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total for this line */}
                      <div className="text-right min-w-[90px]">
                        <span className="text-xs text-charcoal-400 block sm:hidden">Item Subtotal</span>
                        <span className="text-base font-extrabold text-forest-950">
                          ETB {(item.unitPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-charcoal-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        title="Remove dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>

                  </div>
                ))}
              </div>

            </div>

            {/* Right 4 cols: Order Summary & Checkout Card */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-luxury space-y-5">
                <h3 className="text-lg font-bold font-serif text-forest-950 border-b border-cream-200 pb-3">
                  Order Summary
                </h3>

                {/* Sub-city Selector (if delivery) */}
                {orderType === 'Delivery' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-forest-950 block">
                      Delivery Destination:
                    </label>
                    <select
                      value={selectedSubCity}
                      onChange={(e) => setSelectedSubCity(e.target.value)}
                      className="w-full text-xs p-2.5 bg-cream-50 border border-cream-300 rounded-xl font-medium focus:outline-none focus:border-forest-800"
                    >
                      {ADDIS_SUB_CITIES.map(sub => (
                        <option key={sub.name} value={sub.name}>
                          {sub.name} (ETB {sub.deliveryFee})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Pricing Breakdown */}
                <div className="space-y-2.5 text-xs text-charcoal-600">
                  <div className="flex justify-between">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-bold text-charcoal-900">ETB {subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>{orderType === 'Delivery' ? 'Delivery Fee' : 'Pickup Fee'}</span>
                    <span className="font-bold text-charcoal-900">
                      {orderType === 'Pickup' 
                        ? 'FREE' 
                        : deliveryFee === 0 
                          ? <span className="text-emerald-700 font-bold">FREE (Above ETB 2000)</span> 
                          : `ETB ${deliveryFee}`}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-berbere-700 font-bold">
                      <span>Discount Coupon</span>
                      <span>- ETB {discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-lg font-extrabold text-forest-950 pt-3 border-t border-cream-200">
                    <span>Total Amount</span>
                    <span className="text-forest-900">ETB {total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Coupon Input */}
                <div className="pt-2">
                  {couponCode ? (
                    <div className="flex items-center justify-between p-3 bg-berbere-50 border border-berbere-200 rounded-xl text-xs">
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-berbere-600" />
                        <div>
                          <p className="font-bold text-berbere-900">{couponCode} Applied</p>
                          <p className="text-[10px] text-berbere-700">Saved ETB {discount}</p>
                        </div>
                      </div>
                      <button onClick={removeCoupon} className="text-xs font-bold text-red-600 hover:underline">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Promo code (TALILE10)"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value);
                          setCouponFeedback(null);
                        }}
                        className="flex-1 text-xs px-3.5 py-2.5 border border-cream-300 rounded-xl uppercase tracking-wider focus:outline-none focus:border-forest-800"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-cream-200 hover:bg-cream-300 text-charcoal-900 text-xs font-bold rounded-xl transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {couponFeedback && (
                    <p className={`text-[11px] mt-1.5 font-medium ${couponFeedback.success ? 'text-emerald-700' : 'text-red-600'}`}>
                      {couponFeedback.message}
                    </p>
                  )}
                </div>

                {/* Proceed Button */}
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-4 bg-gradient-to-r from-forest-900 to-forest-950 hover:from-forest-800 hover:to-forest-900 text-white rounded-2xl font-bold text-sm shadow-luxury hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-berbere-400" />
                </button>

                <p className="text-[10px] text-charcoal-400 text-center flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  Telebirr, CBE Birr & Cash on Delivery supported
                </p>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};
