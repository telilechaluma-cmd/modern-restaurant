import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useRestaurant } from '../context/RestaurantContext';
import { 
  CheckCircle2, 
  Bike, 
  MapPin, 
  Phone, 
  Printer, 
  MessageCircle, 
  ArrowRight,
  Clock,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface OrderConfirmationPageProps {
  orderId: string;
  navigate: (path: string) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ orderId, navigate }) => {
  const { getOrderById, settings } = useRestaurant();
  const order = getOrderById(orderId);

  useEffect(() => {
    // Fire festive celebration confetti!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0f3a28', '#ea580c', '#f59e0b', '#10b981']
      });
    } catch {
      // fallback
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-cream-50">
        <div className="bg-white p-8 rounded-3xl border border-cream-200 text-center max-w-md shadow-sm">
          <p className="text-base font-bold text-forest-950">Order not found.</p>
          <button
            onClick={() => navigate('/menu')}
            className="mt-4 px-6 py-2.5 bg-forest-900 text-white rounded-xl text-xs font-bold"
          >
            Go to Menu
          </button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppNotify = () => {
    const text = encodeURIComponent(
      `Hello TALILE Restaurant! I just placed order #${order.orderNumber} for ETB ${order.total}. Customer: ${order.customer.fullName}, Phone: ${order.customer.phoneNumber}. Please confirm kitchen preparation!`
    );
    window.open(`https://wa.me/251911234567?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-cream-50/70 pb-20 pt-8 print:bg-white print:p-0">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Celebration Card */}
        <div className="bg-white rounded-3xl border border-cream-200 shadow-luxury overflow-hidden p-6 sm:p-10 text-center space-y-6">
          
          {/* Animated Success Icon */}
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </div>

          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-berbere-600">
              Order Received Successfully
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-forest-950 mt-1">
              Melkam Megeb! Thank You
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-2 max-w-md mx-auto">
              Your order has been queued in our Bole kitchen. Our chefs are preparing your authentic delicacies.
            </p>
          </div>

          {/* Unique Order Number Pill */}
          <div className="inline-block p-4 bg-forest-950 text-white rounded-2xl shadow-md border border-forest-800">
            <p className="text-[10px] text-berbere-400 uppercase tracking-widest font-bold">Your Unique Order Reference</p>
            <p className="text-2xl sm:text-3xl font-mono font-black tracking-widest text-white mt-0.5">
              {order.orderNumber}
            </p>
            <p className="text-[11px] text-cream-300 mt-1">
              Estimated Delivery: <strong>{order.estimatedDeliveryTime || '30 - 45 mins'}</strong>
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 print:hidden">
            <button
              onClick={() => navigate(`/track-order?id=${order.orderNumber}`)}
              className="px-6 py-3 bg-forest-900 hover:bg-forest-950 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-2"
            >
              <Bike className="w-4 h-4 text-berbere-400" />
              <span>Track Live Order Status</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleWhatsAppNotify}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center space-x-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Notify Kitchen on WhatsApp</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-3 bg-cream-100 hover:bg-cream-200 text-forest-950 text-xs font-bold rounded-xl border border-cream-300 transition-colors flex items-center space-x-1.5"
            >
              <Printer className="w-4 h-4 text-charcoal-700" />
              <span>Print Receipt</span>
            </button>
          </div>

          {/* Itemized Printable Receipt */}
          <div className="text-left bg-cream-50/60 p-6 rounded-2xl border border-cream-200/90 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <div>
                <h4 className="text-sm font-bold text-forest-950">TALILE Restaurant & Lounge</h4>
                <p className="text-[11px] text-charcoal-500">Camerun St, Bole Medhanialem, Addis Ababa</p>
              </div>
              <div className="text-right text-[11px] text-charcoal-500">
                <p>{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p className="font-semibold text-forest-950">{order.orderType}</p>
              </div>
            </div>

            {/* Customer info */}
            <div className="text-xs text-charcoal-700 grid grid-cols-1 sm:grid-cols-2 gap-2 pb-3 border-b border-cream-200">
              <div>
                <span className="font-bold text-forest-950">Customer:</span> {order.customer.fullName}
              </div>
              <div>
                <span className="font-bold text-forest-950">Phone:</span> {order.customer.phoneNumber}
              </div>
              <div className="sm:col-span-2">
                <span className="font-bold text-forest-950">Address:</span> {order.customer.deliveryAddress} ({order.customer.subCity})
              </div>
              {order.customer.orderNotes && (
                <div className="sm:col-span-2 italic text-charcoal-500">
                  <span className="font-bold">Notes:</span> "{order.customer.orderNotes}"
                </div>
              )}
            </div>

            {/* Items */}
            <div className="space-y-2 text-xs">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-1">
                  <div>
                    <span className="font-bold text-forest-950">{item.quantity}x</span> {item.foodItem.name}
                    <span className="text-[11px] text-charcoal-500 ml-2">({item.selectedPortion})</span>
                  </div>
                  <span className="font-semibold text-charcoal-900">
                    ETB {(item.unitPrice * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Breakdown */}
            <div className="pt-3 border-t border-cream-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-charcoal-600">
                <span>Subtotal</span>
                <span>ETB {order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-charcoal-600">
                <span>Delivery Fee</span>
                <span>{order.deliveryFee === 0 ? 'FREE' : `ETB ${order.deliveryFee}`}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-berbere-700 font-bold">
                  <span>Discount</span>
                  <span>- ETB {order.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-forest-950 pt-2 border-t border-cream-200">
                <span>Total Amount</span>
                <span>ETB {order.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[11px] text-charcoal-500 pt-1">
                <span>Payment Method</span>
                <span className="font-bold text-forest-950">
                  {order.paymentMethod} • <span className={order.paymentStatus === 'Paid' ? 'text-emerald-700' : 'text-amber-700'}>{order.paymentStatus}</span>
                  {order.paymentReference && ` (Ref: ${order.paymentReference})`}
                </span>
              </div>
            </div>

          </div>

          <div className="pt-4 text-center print:hidden">
            <button
              onClick={() => navigate('/menu')}
              className="text-xs font-bold text-forest-900 hover:text-berbere-600 hover:underline"
            >
              Order more delicious dishes →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
