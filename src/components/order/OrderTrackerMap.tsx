import React from 'react';
import { 
  Bike, 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  ChefHat,
  PackageCheck
} from 'lucide-react';
import { Order, OrderStatus } from '../../types';

interface OrderTrackerMapProps {
  order: Order;
}

const STATUS_STEPS: { status: OrderStatus; label: string; icon: any; description: string }[] = [
  { 
    status: 'Pending', 
    label: 'Order Placed', 
    icon: Clock, 
    description: 'We received your order and sent it to TALILE staff.' 
  },
  { 
    status: 'Confirmed', 
    label: 'Confirmed', 
    icon: CheckCircle2, 
    description: 'Order confirmed and ingredients queued for preparation.' 
  },
  { 
    status: 'Preparing', 
    label: 'Kitchen Cooking', 
    icon: ChefHat, 
    description: 'Executive chef is freshly cooking your dishes with spiced butter.' 
  },
  { 
    status: 'Ready', 
    label: 'Packed & Ready', 
    icon: PackageCheck, 
    description: 'Piping hot meals packed in sealed thermal insulated bags.' 
  },
  { 
    status: 'Out for Delivery', 
    label: 'Dispatched to You', 
    icon: Bike, 
    description: 'Driver is on the way through Addis Ababa streets.' 
  },
  { 
    status: 'Delivered', 
    label: 'Delivered Fresh', 
    icon: ShieldCheck, 
    description: 'Enjoy your delicious TALILE feast! Melkam Megeb.' 
  }
];

export const OrderTrackerMap: React.FC<OrderTrackerMapProps> = ({ order }) => {
  const currentStepIndex = STATUS_STEPS.findIndex(s => s.status === order.orderStatus);
  const isCancelled = order.orderStatus === 'Cancelled';

  return (
    <div className="bg-white rounded-3xl border border-cream-200 shadow-luxury overflow-hidden">
      
      {/* Top Banner Status */}
      <div className={`p-6 ${
        isCancelled 
          ? 'bg-red-50 border-b border-red-200 text-red-900' 
          : order.orderStatus === 'Delivered'
            ? 'bg-emerald-50 border-b border-emerald-200 text-emerald-950'
            : 'bg-forest-950 text-white'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-berbere-400">
                Order #{order.orderNumber}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                order.paymentStatus === 'Paid' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                {order.paymentMethod} • {order.paymentStatus}
              </span>
            </div>
            <h2 className="text-2xl font-bold font-serif mt-1">
              {isCancelled 
                ? 'Order Cancelled' 
                : order.orderStatus === 'Delivered' 
                  ? 'Delivered to Your Door!' 
                  : order.orderStatus === 'Out for Delivery' 
                    ? 'Driver is En Route!' 
                    : `Status: ${order.orderStatus}`}
            </h2>
          </div>

          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
            <Clock className="w-5 h-5 text-berbere-400 animate-pulse" />
            <div>
              <p className="text-[10px] text-cream-300 uppercase tracking-wider font-semibold">Estimated Arrival</p>
              <p className="text-sm font-extrabold text-white">
                {order.estimatedDeliveryTime || '30 - 40 mins'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Timeline Tracker */}
      <div className="p-6 md:p-8 bg-cream-50/50 border-b border-cream-200">
        <div className="relative">
          {/* Step Connecting Line */}
          <div className="absolute top-5 left-4 right-4 h-1 bg-cream-200 hidden md:block">
            <div 
              className="h-full bg-forest-800 transition-all duration-700"
              style={{
                width: isCancelled ? '0%' : `${(Math.max(0, currentStepIndex) / (STATUS_STEPS.length - 1)) * 100}%`
              }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 relative z-10">
            {STATUS_STEPS.map((step, idx) => {
              const isCompleted = idx <= currentStepIndex && !isCancelled;
              const isCurrent = idx === currentStepIndex && !isCancelled;
              const StepIcon = step.icon;

              return (
                <div key={step.status} className="flex flex-col items-center text-center">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                    isCurrent 
                      ? 'bg-berbere-600 text-white shadow-lg ring-4 ring-berbere-200 scale-110'
                      : isCompleted
                        ? 'bg-forest-900 text-cream-100 shadow'
                        : 'bg-white border-2 border-cream-300 text-charcoal-400'
                  }`}>
                    <StepIcon className="w-5 h-5" />
                  </div>
                  
                  <span className={`text-xs mt-2.5 font-bold ${
                    isCurrent ? 'text-berbere-700' : isCompleted ? 'text-forest-950' : 'text-charcoal-400'
                  }`}>
                    {step.label}
                  </span>
                  
                  <p className="text-[10px] text-charcoal-500 mt-1 max-w-[120px] hidden md:block leading-tight">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map & Driver Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        
        {/* Visual Simulated Route in Addis Ababa */}
        <div className="lg:col-span-2 relative h-72 rounded-2xl overflow-hidden border border-cream-200 bg-[#e8ece9]">
          
          {/* SVG Map Graphic */}
          <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 600 300">
            {/* Background Grid Roads */}
            <rect width="600" height="300" fill="#f0ede6" />
            <path d="M 50 150 Q 200 80, 350 160 T 550 120" stroke="#d5d0c5" strokeWidth="18" fill="none" />
            <path d="M 120 20 L 150 280" stroke="#d5d0c5" strokeWidth="14" fill="none" />
            <path d="M 400 30 L 370 270" stroke="#d5d0c5" strokeWidth="14" fill="none" />
            <path d="M 280 20 L 290 280" stroke="#d5d0c5" strokeWidth="12" fill="none" />
            <circle cx="280" cy="150" r="45" fill="#e2ded4" />

            {/* Active Delivery Route */}
            <path 
              d="M 140 180 C 220 120, 340 220, 480 140" 
              stroke="#0f3a28" 
              strokeWidth="5" 
              strokeDasharray="8 8" 
              fill="none" 
              className="animate-pulse"
            />

            {/* Hub: TALILE Bole Medhanialem */}
            <circle cx="140" cy="180" r="14" fill="#092318" />
            <circle cx="140" cy="180" r="7" fill="#f97316" />
            <text x="140" y="210" fontSize="11" fontWeight="bold" fill="#092318" textAnchor="middle">
              TALILE Kitchen (Bole)
            </text>

            {/* Destination Pin */}
            <circle cx="480" cy="140" r="14" fill="#ea580c" />
            <circle cx="480" cy="140" r="6" fill="#ffffff" />
            <text x="480" y="170" fontSize="11" fontWeight="bold" fill="#ea580c" textAnchor="middle">
              {order.customer.subCity.split('(')[0].trim()}
            </text>

            {/* Moving Courier icon marker along path if Out for Delivery */}
            {order.orderStatus === 'Out for Delivery' && (
              <g transform="translate(320, 165)">
                <circle cx="0" cy="0" r="18" fill="#f97316" className="animate-ping" opacity="0.4" />
                <circle cx="0" cy="0" r="14" fill="#ea580c" />
                <text x="0" y="5" fontSize="13" textAnchor="middle" fill="#ffffff">🛵</text>
              </g>
            )}
          </svg>

          {/* Floating Live Badge */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-cream-200 text-xs font-bold text-forest-950 flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Addis Ababa Live Dispatch Route</span>
          </div>

          <div className="absolute bottom-3 left-3 bg-forest-950/90 text-white text-[11px] px-3 py-1 rounded-lg backdrop-blur">
            Origin: Camerun St, Bole Medhanialem ➔ {order.customer.subCity}
          </div>
        </div>

        {/* Courier & Delivery Details Card */}
        <div className="bg-cream-50/80 rounded-2xl p-5 border border-cream-200 flex flex-col justify-between space-y-4">
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
              Delivery Assignment
            </h4>

            {order.driverInfo ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-forest-900 text-berbere-400 flex items-center justify-center font-bold text-lg shadow">
                    🚴
                  </div>
                  <div>
                    <p className="text-sm font-bold text-forest-950">{order.driverInfo.name}</p>
                    <p className="text-xs text-charcoal-500">{order.driverInfo.vehicle}</p>
                    <span className="inline-block mt-0.5 text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      TALILE Certified Courier
                    </span>
                  </div>
                </div>

                <a
                  href={`tel:${order.driverInfo.phone}`}
                  className="mt-2 w-full py-2.5 px-3 bg-white hover:bg-cream-100 border border-cream-300 rounded-xl text-xs font-bold text-forest-950 transition-colors flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-forest-800" />
                  <span>Call Driver ({order.driverInfo.phone})</span>
                </a>
              </div>
            ) : (
              <div className="p-3 bg-white rounded-xl border border-cream-200 text-xs text-charcoal-600">
                <p className="font-semibold text-forest-950">Driver Assignment Pending</p>
                <p className="text-[11px] text-charcoal-500 mt-1">
                  A courier from our Bole dispatch center will be assigned once meals are sealed from the kitchen.
                </p>
              </div>
            )}
          </div>

          {/* Delivery Address Details */}
          <div className="pt-3 border-t border-cream-200 text-xs space-y-1.5">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-berbere-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-forest-950">{order.customer.fullName}</p>
                <p className="text-charcoal-600">{order.customer.deliveryAddress}</p>
                <p className="text-[11px] text-charcoal-500">{order.customer.subCity}</p>
                {order.customer.landmark && (
                  <p className="text-[11px] text-forest-800 italic mt-0.5">
                    Landmark: {order.customer.landmark}
                  </p>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
