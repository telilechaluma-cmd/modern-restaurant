import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRestaurant } from '../context/RestaurantContext';
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  LogOut,
  ShoppingBag,
  Clock
} from 'lucide-react';

interface AuthPageProps {
  navigate: (path: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ navigate }) => {
  const { 
    user, 
    isLoggedIn, 
    isAdmin, 
    login, 
    register, 
    logout, 
    loginAsDemoAdmin, 
    loginAsDemoCustomer 
  } = useAuth();
  const { orders } = useRestaurant();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [msg, setMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (isRegisterMode) {
      if (!fullName.trim() || !email.trim() || !phoneNumber.trim()) {
        setMsg({ text: 'Please fill in all registration fields.', isError: true });
        return;
      }
      const res = await register(fullName, email, phoneNumber, password);
      setMsg({ text: res.message, isError: !res.success });
      if (res.success) {
        setTimeout(() => navigate('/menu'), 1000);
      }
    } else {
      if (!email.trim()) {
        setMsg({ text: 'Please enter your email address.', isError: true });
        return;
      }
      const res = await login(email, password);
      setMsg({ text: res.message, isError: !res.success });
      if (res.success) {
        setTimeout(() => navigate('/menu'), 1000);
      }
    }
  };

  // If already logged in, show user profile overview with past orders
  if (isLoggedIn && user) {
    const userOrders = orders.filter(o => 
      o.userId === user.id || 
      o.customer.email === user.email || 
      o.customer.phoneNumber === user.phoneNumber
    );

    return (
      <div className="min-h-screen bg-cream-50/70 pb-20 pt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="bg-white rounded-3xl border border-cream-200 shadow-luxury p-8 sm:p-10 space-y-8">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-cream-200 gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-forest-950 text-berbere-400 flex items-center justify-center font-bold text-2xl shadow-md">
                  {user.fullName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-bold font-serif text-forest-950">{user.fullName}</h2>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      isAdmin ? 'bg-berbere-100 text-berbere-800' : 'bg-forest-100 text-forest-800'
                    }`}>
                      {isAdmin ? '👑 Restaurant Admin' : '👤 Loyal Customer'}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-500 mt-0.5">{user.email} • {user.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {isAdmin && (
                  <button
                    onClick={() => navigate('/admin')}
                    className="px-4 py-2.5 bg-berbere-600 hover:bg-berbere-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Go to Admin Dashboard</span>
                  </button>
                )}
                <button
                  onClick={logout}
                  className="px-4 py-2.5 bg-cream-100 hover:bg-red-50 hover:text-red-600 text-charcoal-700 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Past orders section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-serif text-forest-950">
                  Your Order History ({userOrders.length})
                </h3>
                <button
                  onClick={() => navigate('/menu')}
                  className="text-xs font-bold text-berbere-600 hover:underline flex items-center"
                >
                  <span>Order New Meal</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>

              {userOrders.length === 0 ? (
                <div className="p-8 text-center bg-cream-50 rounded-2xl border border-cream-200">
                  <p className="text-xs text-charcoal-500">You haven't placed any orders with this account yet.</p>
                  <button
                    onClick={() => navigate('/menu')}
                    className="mt-3 px-5 py-2 bg-forest-900 text-white rounded-xl text-xs font-bold"
                  >
                    Browse Food Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {userOrders.map((ord) => (
                    <div
                      key={ord.id}
                      onClick={() => navigate(`/track-order?id=${ord.orderNumber}`)}
                      className="p-4 rounded-2xl border border-cream-200 hover:border-berbere-300 bg-white hover:bg-cream-50/50 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-xs text-forest-950">#{ord.orderNumber}</span>
                          <span className="text-xs text-charcoal-400">•</span>
                          <span className="text-[11px] text-charcoal-500">{new Date(ord.createdAt).toLocaleDateString()}</span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            ord.orderStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-berbere-100 text-berbere-800'
                          }`}>
                            {ord.orderStatus}
                          </span>
                        </div>
                        <p className="text-xs text-charcoal-700 mt-1 font-medium line-clamp-1">
                          {ord.items.map(i => `${i.quantity}x ${i.foodItem.name}`).join(', ')}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end space-x-4">
                        <span className="text-sm font-extrabold text-forest-950">
                          ETB {ord.total.toLocaleString()}
                        </span>
                        <span className="text-xs font-bold text-forest-800 flex items-center">
                          <span>Track</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50/70 pb-20 pt-10">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-cream-200 shadow-luxury p-8 sm:p-10 space-y-6">
          
          <div className="text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-forest-950 text-white flex items-center justify-center text-2xl shadow-md mb-3">
              👑
            </div>
            <h1 className="text-2xl font-bold font-serif text-forest-950">
              {isRegisterMode ? 'Create Customer Account' : 'Welcome to TALILE'}
            </h1>
            <p className="text-xs text-charcoal-500 mt-1">
              {isRegisterMode 
                ? 'Join to track orders, save delivery addresses & earn discounts'
                : 'Sign in to manage your orders & profile'}
            </p>
          </div>

          {/* Quick Demo Switcher Banner */}
          <div className="p-3 bg-cream-100 rounded-2xl border border-cream-200 text-center space-y-2">
            <p className="text-[11px] font-bold text-forest-950 uppercase tracking-wider">
              ⚡ Quick Instant Demo Logins:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  loginAsDemoCustomer();
                  navigate('/menu');
                }}
                className="py-1.5 px-2 bg-white hover:bg-forest-50 text-forest-950 text-[11px] font-bold rounded-lg border border-cream-300 shadow-sm transition-colors"
              >
                👤 Customer Demo
              </button>
              <button
                type="button"
                onClick={() => {
                  loginAsDemoAdmin();
                  navigate('/admin');
                }}
                className="py-1.5 px-2 bg-forest-900 hover:bg-forest-950 text-white text-[11px] font-bold rounded-lg shadow-sm transition-colors"
              >
                👑 Admin Portal
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {isRegisterMode && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-forest-950">Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dawit Alene"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-forest-900"
                  />
                  <User className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3" />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-forest-950">Email Address *</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="e.g. dawit@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-forest-900"
                />
                <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3" />
              </div>
            </div>

            {isRegisterMode && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-forest-950">Ethiopian Phone Number *</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0911234567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-forest-900"
                  />
                  <Phone className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3" />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-forest-950">Password *</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-forest-900"
                />
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3" />
              </div>
            </div>

            {msg && (
              <p className={`text-xs p-2.5 rounded-xl ${
                msg.isError ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-800'
              }`}>
                {msg.text}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-forest-900 to-forest-950 hover:from-forest-800 hover:to-forest-900 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:scale-[1.02] active:scale-95"
            >
              {isRegisterMode ? 'Complete Registration' : 'Sign In to TALILE'}
            </button>
          </form>

          {/* Toggle mode */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setMsg(null);
              }}
              className="text-xs font-bold text-forest-900 hover:text-berbere-600 transition-colors"
            >
              {isRegisterMode 
                ? 'Already have an account? Sign In' 
                : "Don't have an account yet? Register"}
            </button>
          </div>

          <div className="border-t border-cream-200 pt-4 text-center">
            <button
              type="button"
              onClick={() => navigate('/menu')}
              className="text-xs text-charcoal-500 hover:text-forest-950"
            >
              ← Skip and continue browsing menu as guest
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
