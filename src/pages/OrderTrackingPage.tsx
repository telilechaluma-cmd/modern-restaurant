import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { useAuth } from '../context/AuthContext';
import { OrderTrackerMap } from '../components/order/OrderTrackerMap';
import { 
  Search, 
  Bike, 
  Clock, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  RotateCw,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingPageProps {
  initialOrderId?: string;
  navigate: (path: string) => void;
}

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({ initialOrderId, navigate }) => {
  const { orders, refreshData } = useRestaurant();
  const { user } = useAuth();

  const [searchCode, setSearchCode] = useState(initialOrderId || '');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      const match = orders.find(o => 
        o.orderNumber.toUpperCase() === initialOrderId.toUpperCase() ||
        o.id.toUpperCase() === initialOrderId.toUpperCase()
      );
      if (match) {
        setActiveOrder(match);
      }
    } else if (orders.length > 0) {
      // Default to the most recent order
      setActiveOrder(orders[0]);
    }
  }, [initialOrderId, orders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchCode.trim().toUpperCase();
    if (!clean) return;

    const found = orders.find(o => 
      o.orderNumber.toUpperCase() === clean || 
      o.id.toUpperCase() === clean ||
      o.customer.phoneNumber.includes(clean)
    );

    if (found) {
      setActiveOrder(found);
      setSearchNotFound(false);
    } else {
      setSearchNotFound(true);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
  };

  // Filter orders for logged-in user if any
  const userOrders = user 
    ? orders.filter(o => o.userId === user.id || o.customer.email === user.email || o.customer.phoneNumber === user.phoneNumber)
    : orders;

  return (
    <div className="min-h-screen bg-cream-50/70 pb-20">
      
      {/* Header */}
      <div className="bg-forest-950 text-cream-100 py-10 border-b-4 border-berbere-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-berbere-400">
                Live Kitchen & Dispatch Feed
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
                Live Order Tracking
              </h1>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="self-start sm:self-auto px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-2 border border-white/15"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Status</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="mt-6 max-w-xl">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter Order # (e.g. TAL-89421) or Ethiopian Phone #"
                  value={searchCode}
                  onChange={(e) => {
                    setSearchCode(e.target.value);
                    setSearchNotFound(false);
                  }}
                  className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 bg-white text-forest-950 rounded-2xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-berbere-500 font-mono font-bold"
                />
                <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5" />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-berbere-600 hover:bg-berbere-500 text-white text-xs font-bold rounded-2xl shadow transition-colors"
              >
                Track
              </button>
            </form>
            {searchNotFound && (
              <p className="text-xs text-berbere-300 mt-2 font-medium">
                No active order found for "{searchCode}". Try entering your 5-digit order reference (e.g. TAL-89421).
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Active Order Tracker Map & Status */}
        {activeOrder ? (
          <div className="space-y-8">
            <OrderTrackerMap order={activeOrder} />

            {/* Order Items & Breakdown */}
            <div className="bg-white rounded-3xl border border-cream-200 shadow-sm p-6 sm:p-8">
              <h3 className="text-base font-bold font-serif text-forest-950 mb-4 pb-3 border-b border-cream-200 flex items-center justify-between">
                <span>Items in Order #{activeOrder.orderNumber}</span>
                <span className="text-xs text-charcoal-500 font-sans font-normal">
                  Placed {new Date(activeOrder.createdAt).toLocaleDateString()} at {new Date(activeOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3.5 p-3 rounded-2xl bg-cream-50 border border-cream-200">
                    <img 
                      src={item.foodItem.imageUrl} 
                      alt={item.foodItem.name} 
                      className="w-14 h-14 rounded-xl object-cover border border-cream-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-forest-950 truncate">{item.foodItem.name}</p>
                      <p className="text-[11px] text-charcoal-500">{item.selectedPortion} • {item.selectedSpiceLevel}</p>
                      <p className="text-xs font-extrabold text-berbere-700 mt-0.5">
                        {item.quantity}x @ ETB {item.unitPrice} = ETB {(item.quantity * item.unitPrice).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order financial details */}
              <div className="mt-6 pt-4 border-t border-cream-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="space-x-4 text-charcoal-600">
                  <span>Subtotal: <strong>ETB {activeOrder.subtotal.toLocaleString()}</strong></span>
                  <span>Delivery: <strong>{activeOrder.deliveryFee === 0 ? 'FREE' : `ETB ${activeOrder.deliveryFee}`}</strong></span>
                  {activeOrder.discount > 0 && (
                    <span className="text-berbere-700">Discount: <strong>- ETB {activeOrder.discount}</strong></span>
                  )}
                  <span className="text-forest-950 text-sm font-extrabold">
                    Grand Total: ETB {activeOrder.total.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <a
                    href="https://wa.me/251911234567"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center space-x-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Kitchen Hotline</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-cream-200 p-12 text-center max-w-md mx-auto shadow-sm">
            <Clock className="w-16 h-16 mx-auto text-charcoal-300 mb-4" />
            <h3 className="text-lg font-bold font-serif text-forest-950">No Active Order Selected</h3>
            <p className="text-xs text-charcoal-500 mt-1">
              Enter your order number above to track your fresh food delivery.
            </p>
          </div>
        )}

        {/* Previous Orders List */}
        {userOrders.length > 1 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold font-serif text-forest-950 mb-4">
              All Recent Orders ({userOrders.length})
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userOrders.map((ord) => (
                <div
                  key={ord.id}
                  onClick={() => setActiveOrder(ord)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    activeOrder?.id === ord.id
                      ? 'border-forest-900 bg-forest-50/50 shadow-md ring-2 ring-forest-800'
                      : 'bg-white border-cream-200 hover:border-cream-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-xs text-forest-950">#{ord.orderNumber}</span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      ord.orderStatus === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-berbere-100 text-berbere-800'
                    }`}>
                      {ord.orderStatus}
                    </span>
                  </div>

                  <p className="text-xs text-charcoal-600 line-clamp-1 mb-2 font-medium">
                    {ord.items.map(i => `${i.quantity}x ${i.foodItem.name}`).join(', ')}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-cream-200">
                    <span className="font-extrabold text-forest-950">ETB {ord.total.toLocaleString()}</span>
                    <span className="text-[11px] text-forest-800 font-bold hover:underline">
                      View Live Map →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
