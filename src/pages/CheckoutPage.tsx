import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useRestaurant } from '../context/RestaurantContext';
import { TelebirrModal } from '../components/checkout/TelebirrModal';
import { CbeBirrModal } from '../components/checkout/CbeBirrModal';
import { Order, OrderType, PaymentMethod, CustomerInfo } from '../types';
import { ADDIS_SUB_CITIES } from '../data/initialData';
import { 
  ShieldCheck, 
  Bike, 
  Store, 
  Phone, 
  MapPin, 
  User, 
  FileText, 
  AlertCircle,
  CreditCard,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';

interface CheckoutPageProps {
  navigate: (path: string) => void;
  onOrderCompleted: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ navigate, onOrderCompleted }) => {
  const { 
    cart, 
    orderType, 
    setOrderType, 
    selectedSubCity, 
    setSelectedSubCity, 
    subtotal, 
    deliveryFee, 
    discount, 
    total,
    clearCart 
  } = useCart();

  const { user } = useAuth();
  const { placeOrder, settings } = useRestaurant();

  // Form Fields
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [email, setEmail] = useState(user?.email || '');
  const [deliveryAddress, setDeliveryAddress] = useState(
    user?.savedAddresses && user.savedAddresses.length > 0 ? user.savedAddresses[0].address : ''
  );
  const [landmark, setLandmark] = useState(
    user?.savedAddresses && user.savedAddresses.length > 0 ? user.savedAddresses[0].landmark || '' : ''
  );
  const [orderNotes, setOrderNotes] = useState('');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Telebirr');

  // Modals for Telebirr / CBE Birr verification
  const [isTelebirrOpen, setIsTelebirrOpen] = useState(false);
  const [isCbeOpen, setIsCbeOpen] = useState(false);
  const [pendingOrderNumber, setPendingOrderNumber] = useState('');

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate Ethiopian phone number (+251 9..., +251 7..., 09..., 07...)
  const validateForm = () => {
    const err: Record<string, string> = {};

    if (!fullName.trim()) {
      err.fullName = 'Please enter your full name.';
    }

    const cleanPhone = phoneNumber.replace(/[\s-]/g, '');
    const phoneRegex = /^(\+251|0)?(9|7)\d{8}$/;
    if (!cleanPhone) {
      err.phoneNumber = 'Phone number is required for delivery coordination.';
    } else if (!phoneRegex.test(cleanPhone)) {
      err.phoneNumber = 'Please enter a valid Ethiopian phone number (e.g. 0911234567 or +251911234567).';
    }

    if (orderType === 'Delivery') {
      if (!deliveryAddress.trim()) {
        err.deliveryAddress = 'Please enter your delivery street, building, or apartment address.';
      }
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const generateOrderNumber = () => {
    const random = Math.floor(10000 + Math.random() * 90000);
    return `TAL-${random}`;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (cart.length === 0) {
      navigate('/menu');
      return;
    }

    const newOrderNumber = generateOrderNumber();
    setPendingOrderNumber(newOrderNumber);

    if (paymentMethod === 'Telebirr') {
      setIsTelebirrOpen(true);
    } else if (paymentMethod === 'CBE Birr') {
      setIsCbeOpen(true);
    } else {
      // Cash on Delivery
      finalizeOrder(newOrderNumber, 'Cash on Delivery', 'Pending');
    }
  };

  const finalizeOrder = async (
    orderNum: string, 
    method: PaymentMethod, 
    payStatus: 'Pending' | 'Paid',
    referenceCode?: string
  ) => {
    setIsSubmitting(true);
    try {
      const customerInfo: CustomerInfo = {
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim() || undefined,
        subCity: orderType === 'Delivery' ? selectedSubCity : 'Bole Medhanialem (Restaurant Pickup)',
        deliveryAddress: orderType === 'Delivery' ? deliveryAddress.trim() : 'TALILE Restaurant Bole (Pickup counter)',
        landmark: landmark.trim() || undefined,
        orderNotes: orderNotes.trim() || undefined
      };

      const newOrder: Order = {
        id: orderNum,
        orderNumber: orderNum,
        createdAt: new Date().toISOString(),
        orderType,
        items: [...cart],
        subtotal,
        deliveryFee,
        discount,
        tax: 0,
        total,
        customer: customerInfo,
        paymentMethod: method,
        paymentStatus: payStatus,
        paymentReference: referenceCode,
        orderStatus: 'Pending',
        estimatedDeliveryTime: orderType === 'Delivery' ? '30 - 45 mins' : '15 - 20 mins',
        userId: user?.id
      };

      const saved = await placeOrder(newOrder);
      clearCart();
      onOrderCompleted(saved);
      navigate(`/order-confirmation/${saved.id}`);
    } catch (err) {
      console.error('Error placing order:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-cream-50/80">
        <div className="bg-white p-8 rounded-3xl border border-cream-200 text-center max-w-md shadow-sm">
          <p className="text-base font-bold text-forest-950">Your cart is currently empty.</p>
          <button
            onClick={() => navigate('/menu')}
            className="mt-4 px-6 py-2.5 bg-forest-900 text-white rounded-xl text-xs font-bold"
          >
            Explore Menu First
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50/70 pb-20">
      
      {/* Header */}
      <div className="bg-forest-950 text-cream-100 py-10 border-b-4 border-berbere-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase font-extrabold tracking-widest text-berbere-400">
            Secure Ethiopian Birr Ordering
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
            Checkout & Confirmation
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <form onSubmit={handleCheckoutSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 7 cols: Customer Details & Payment Options */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Order Method Selector */}
              <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold font-serif text-forest-950 flex items-center space-x-2">
                  <span>1. Choose Delivery or Pickup</span>
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div 
                    onClick={() => setOrderType('Delivery')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      orderType === 'Delivery' 
                        ? 'border-forest-900 bg-forest-50/50 shadow-sm'
                        : 'border-cream-200 hover:border-cream-300 bg-cream-50/30'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 mb-1">
                      <Bike className={`w-5 h-5 ${orderType === 'Delivery' ? 'text-forest-900' : 'text-charcoal-400'}`} />
                      <span className="text-sm font-bold text-forest-950">Door Delivery</span>
                    </div>
                    <p className="text-xs text-charcoal-500">
                      Dispatched across Addis Ababa sub-cities
                    </p>
                  </div>

                  <div 
                    onClick={() => setOrderType('Pickup')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      orderType === 'Pickup' 
                        ? 'border-forest-900 bg-forest-50/50 shadow-sm'
                        : 'border-cream-200 hover:border-cream-300 bg-cream-50/30'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 mb-1">
                      <Store className={`w-5 h-5 ${orderType === 'Pickup' ? 'text-forest-900' : 'text-charcoal-400'}`} />
                      <span className="text-sm font-bold text-forest-950">Restaurant Pickup</span>
                    </div>
                    <p className="text-xs text-charcoal-500">
                      Collect at Bole Medhanialem branch (FREE)
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Contact & Address Info */}
              <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold font-serif text-forest-950">
                  2. Customer & Delivery Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-forest-950 flex items-center space-x-1">
                      <User className="w-3.5 h-3.5 text-berbere-600" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dawit Alene"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none ${
                        errors.fullName ? 'border-red-500 bg-red-50' : 'border-cream-300 focus:border-forest-900'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-600">{errors.fullName}</p>}
                  </div>

                  {/* Ethiopian Phone Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-forest-950 flex items-center space-x-1">
                      <Phone className="w-3.5 h-3.5 text-berbere-600" />
                      <span>Ethiopian Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 0911234567 or +251 9..."
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none ${
                        errors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-cream-300 focus:border-forest-900'
                      }`}
                    />
                    {errors.phoneNumber && <p className="text-[11px] text-red-600">{errors.phoneNumber}</p>}
                  </div>

                </div>

                {/* Optional Email */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-charcoal-700">
                    Email Address (For receipt copy, optional):
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. yourname@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-forest-900"
                  />
                </div>

                {/* Delivery Address Details (only if delivery) */}
                {orderType === 'Delivery' && (
                  <div className="space-y-4 pt-2 border-t border-cream-100">
                    
                    {/* Sub-City Selector */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-forest-950">
                        Addis Ababa Sub-City / District:
                      </label>
                      <select
                        value={selectedSubCity}
                        onChange={(e) => setSelectedSubCity(e.target.value)}
                        className="w-full text-xs p-2.5 bg-cream-50 border border-cream-300 rounded-xl font-medium focus:outline-none focus:border-forest-900"
                      >
                        {ADDIS_SUB_CITIES.map(sub => (
                          <option key={sub.name} value={sub.name}>
                            {sub.name} (Delivery Fee: ETB {sub.deliveryFee})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Street Address */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-forest-950 flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-berbere-600" />
                        <span>Specific Delivery Address (Street / House / Floor) *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Atlas Road, Near Aster Awaze, Bldg 3, Flat 4A"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className={`w-full text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none ${
                          errors.deliveryAddress ? 'border-red-500 bg-red-50' : 'border-cream-300 focus:border-forest-900'
                        }`}
                      />
                      {errors.deliveryAddress && <p className="text-[11px] text-red-600">{errors.deliveryAddress}</p>}
                    </div>

                    {/* Landmark */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-charcoal-700">
                        Prominent Landmark (Optional):
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Behind Edna Mall / Next to Commercial Bank branch"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-forest-900"
                      />
                    </div>

                  </div>
                )}

                {/* Order notes */}
                <div className="space-y-1 pt-2">
                  <label className="text-xs font-bold text-charcoal-700 flex items-center space-x-1">
                    <FileText className="w-3.5 h-3.5 text-forest-700" />
                    <span>Special Instructions / Delivery Notes:</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Please bring extra awaze and napkins, call upon reaching main gate..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-forest-900"
                  />
                </div>

              </div>

              {/* Payment Methods */}
              <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold font-serif text-forest-950">
                  3. Select Payment Method
                </h3>

                <div className="space-y-3">
                  
                  {/* Option 1: Telebirr */}
                  <label
                    onClick={() => setPaymentMethod('Telebirr')}
                    className={`flex items-start justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'Telebirr'
                        ? 'border-[#005cb9] bg-blue-50/40 shadow-sm'
                        : 'border-cream-200 hover:border-cream-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === 'Telebirr'} 
                        onChange={() => setPaymentMethod('Telebirr')}
                        className="mt-1 accent-blue-600"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded bg-[#005cb9] text-white text-[10px] font-bold">
                            telebirr
                          </span>
                          <span className="text-xs font-bold text-forest-950">Telebirr Mobile Wallet</span>
                        </div>
                        <p className="text-[11px] text-charcoal-500 mt-1">
                          Fast & secure. Pay to Merchant ID <strong>{settings.telebirrMerchantId || '928471'}</strong> with reference code verification.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-700 hidden sm:inline">Recommended</span>
                  </label>

                  {/* Option 2: CBE Birr */}
                  <label
                    onClick={() => setPaymentMethod('CBE Birr')}
                    className={`flex items-start justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'CBE Birr'
                        ? 'border-[#702170] bg-purple-50/40 shadow-sm'
                        : 'border-cream-200 hover:border-cream-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === 'CBE Birr'} 
                        onChange={() => setPaymentMethod('CBE Birr')}
                        className="mt-1 accent-purple-700"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded bg-[#702170] text-white text-[10px] font-bold">
                            CBE Birr
                          </span>
                          <span className="text-xs font-bold text-forest-950">Commercial Bank of Ethiopia</span>
                        </div>
                        <p className="text-[11px] text-charcoal-500 mt-1">
                          Transfer directly to our CBE business account with instant FT reference confirmation.
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Option 3: Cash on Delivery */}
                  <label
                    onClick={() => setPaymentMethod('Cash on Delivery')}
                    className={`flex items-start justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'Cash on Delivery'
                        ? 'border-forest-900 bg-forest-50/50 shadow-sm'
                        : 'border-cream-200 hover:border-cream-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === 'Cash on Delivery'} 
                        onChange={() => setPaymentMethod('Cash on Delivery')}
                        className="mt-1 accent-forest-900"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded bg-forest-900 text-cream-100 text-[10px] font-bold">
                            COD
                          </span>
                          <span className="text-xs font-bold text-forest-950">
                            {orderType === 'Delivery' ? 'Cash on Delivery (Pay Driver)' : 'Pay at Restaurant Counter'}
                          </span>
                        </div>
                        <p className="text-[11px] text-charcoal-500 mt-1">
                          Pay in cash directly to our rider upon safe meal arrival at your door.
                        </p>
                      </div>
                    </div>
                  </label>

                </div>
              </div>

            </div>

            {/* Right 5 cols: Order Review Summary */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-luxury space-y-5 sticky top-28">
                <h3 className="text-lg font-bold font-serif text-forest-950 border-b border-cream-200 pb-3">
                  Order Breakdown
                </h3>

                {/* Items preview list */}
                <div className="max-h-64 overflow-y-auto space-y-3 pr-1 divide-y divide-cream-100">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-2 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={item.foodItem.imageUrl} 
                          alt={item.foodItem.name} 
                          className="w-12 h-12 rounded-xl object-cover border border-cream-200"
                        />
                        <div>
                          <p className="font-bold text-forest-950 line-clamp-1">{item.foodItem.name}</p>
                          <p className="text-[11px] text-charcoal-500">
                            Qty: {item.quantity} • {item.selectedPortion}
                          </p>
                        </div>
                      </div>
                      <span className="font-extrabold text-forest-950 whitespace-nowrap">
                        ETB {(item.unitPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Cost Calculations */}
                <div className="space-y-2 text-xs text-charcoal-600 pt-3 border-t border-cream-200">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-charcoal-900">ETB {subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>{orderType === 'Delivery' ? 'Delivery Fee' : 'Pickup'}</span>
                    <span className="font-bold text-charcoal-900">
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

                  <div className="flex justify-between text-xl font-extrabold text-forest-950 pt-3 border-t border-cream-200">
                    <span>Total Amount</span>
                    <span className="text-forest-900">ETB {total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Place Order CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-berbere-600 via-berbere-500 to-amber-600 hover:from-berbere-500 hover:to-berbere-600 text-white rounded-2xl font-bold text-sm shadow-warm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Order...</span>
                    </div>
                  ) : (
                    <>
                      <span>
                        {paymentMethod === 'Cash on Delivery' 
                          ? 'Confirm & Place Order' 
                          : `Pay with ${paymentMethod}`}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-[11px] text-charcoal-400 text-center space-y-1">
                  <p className="flex items-center justify-center">
                    <Lock className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                    Verified Addis Ababa Food Dispatch Service
                  </p>
                  <p>Order details are directly received by the restaurant kitchen.</p>
                </div>

              </div>

            </div>

          </div>
        </form>
      </div>

      {/* Telebirr Verification Modal */}
      {isTelebirrOpen && (
        <TelebirrModal
          amount={total}
          orderNumber={pendingOrderNumber}
          onSuccess={(refCode) => {
            setIsTelebirrOpen(false);
            finalizeOrder(pendingOrderNumber, 'Telebirr', 'Paid', refCode);
          }}
          onCancel={() => setIsTelebirrOpen(false)}
        />
      )}

      {/* CBE Birr Verification Modal */}
      {isCbeOpen && (
        <CbeBirrModal
          amount={total}
          orderNumber={pendingOrderNumber}
          onSuccess={(refCode) => {
            setIsCbeOpen(false);
            finalizeOrder(pendingOrderNumber, 'CBE Birr', 'Paid', refCode);
          }}
          onCancel={() => setIsCbeOpen(false)}
        />
      )}

    </div>
  );
};
