import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { useAuth } from '../context/AuthContext';
import { FoodItem, Category, Order, OrderStatus, RestaurantSettings, TableReservation } from '../types';
import { 
  ShieldCheck, 
  ShoppingBag, 
  Utensils, 
  Settings, 
  TrendingUp, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Bike, 
  Phone, 
  MapPin, 
  DollarSign, 
  Eye, 
  AlertCircle,
  Save,
  RotateCcw,
  Sparkles,
  Layers,
  CalendarCheck
} from 'lucide-react';

interface AdminPageProps {
  navigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ navigate }) => {
  const { 
    menuItems, 
    categories, 
    orders, 
    reservations,
    settings, 
    saveMenuItem, 
    deleteMenuItem, 
    toggleItemAvailability,
    saveCategory,
    deleteCategory,
    updateOrderStatus,
    updateReservationStatus,
    updateSettings,
    resetToDefaults
  } = useRestaurant();

  const { user, isAdmin, loginAsDemoAdmin } = useAuth();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'categories' | 'reservations' | 'settings'>('orders');

  // Order status filter
  const [orderFilter, setOrderFilter] = useState<'All' | OrderStatus>('All');

  // Menu item modal state
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<FoodItem> | null>(null);

  // Category modal state
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<Partial<Category> | null>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<RestaurantSettings>(settings);

  // Notification feedback
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  // If user is not admin, provide password or one-click staff access
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl border border-cream-200 text-center max-w-md shadow-luxury space-y-5">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-forest-950 text-berbere-400 flex items-center justify-center shadow">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <h2 className="text-xl font-bold font-serif text-forest-950">Staff & Admin Access</h2>
          <p className="text-xs text-charcoal-500 leading-relaxed">
            This dashboard is reserved for authorized restaurant staff, managers, and kitchen dispatchers.
          </p>
          <button
            onClick={() => loginAsDemoAdmin()}
            className="w-full py-3.5 bg-forest-900 hover:bg-forest-950 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4 text-berbere-400" />
            <span>Enter as Restaurant Manager</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-xs text-charcoal-500 hover:text-forest-950"
          >
            ← Back to Customer Website
          </button>
        </div>
      </div>
    );
  }

  // Analytics Calculations
  const totalRevenue = orders.reduce((acc, o) => acc + (o.paymentStatus === 'Paid' ? o.total : 0), 0);
  const pendingOrdersCount = orders.filter(o => o.orderStatus === 'Pending' || o.orderStatus === 'Preparing').length;
  const averageOrderValue = orders.length > 0 ? Math.round(orders.reduce((acc, o) => acc + o.total, 0) / orders.length) : 0;

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    if (orderFilter === 'All') return true;
    return o.orderStatus === orderFilter;
  });

  // Handle Save Menu Item
  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.name || !editingItem?.price) return;

    const itemToSave: FoodItem = {
      id: editingItem.id || `dish-${Date.now()}`,
      name: editingItem.name,
      amharicName: editingItem.amharicName || '',
      description: editingItem.description || '',
      price: Number(editingItem.price),
      category: editingItem.category || categories[0]?.id || 'cat-ethiopian',
      imageUrl: editingItem.imageUrl || '/images/dishes/shekla-tibs.jpg',
      isAvailable: editingItem.isAvailable !== undefined ? editingItem.isAvailable : true,
      isPopular: editingItem.isPopular || false,
      isChefSpecial: editingItem.isChefSpecial || false,
      preparationTime: editingItem.preparationTime || '20 mins',
      dietaryTags: editingItem.dietaryTags || ['Halal'],
      spiceLevel: editingItem.spiceLevel || 'Medium',
      portions: editingItem.portions || [{ name: 'Standard Portion', priceDelta: 0 }],
      ingredients: editingItem.ingredients || []
    };

    await saveMenuItem(itemToSave);
    setIsItemModalOpen(false);
    setEditingItem(null);
    triggerToast('Dish saved successfully!');
  };

  // Handle Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(settingsForm);
    triggerToast('Restaurant settings updated successfully!');
  };

  return (
    <div className="min-h-screen bg-cream-50/70 pb-20">
      
      {/* Toast popup */}
      {toastMsg && (
        <div className="fixed top-24 right-6 z-50 bg-forest-950 text-white px-5 py-3 rounded-2xl shadow-2xl border border-forest-800 text-xs font-bold flex items-center space-x-2 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Admin Header */}
      <div className="bg-forest-950 text-cream-100 py-6 border-b-4 border-berbere-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-berbere-500 text-white flex items-center justify-center font-bold text-xl shadow">
              👑
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  TALILE Admin & Kitchen Portal
                </h1>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live System
                </span>
              </div>
              <p className="text-xs text-cream-300">
                Logged in as <strong>{user?.fullName}</strong> ({user?.email})
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => resetToDefaults()}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-cream-200 text-xs font-bold rounded-xl transition-colors flex items-center space-x-1.5"
              title="Reset data back to original sample menu & orders"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Sample Data</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-cream-100 hover:bg-cream-200 text-forest-950 text-xs font-bold rounded-xl transition-colors"
            >
              Customer Site →
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Analytics Highlights Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-charcoal-400 uppercase tracking-wider">Total Sales</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-forest-950 mt-2">
              ETB {totalRevenue.toLocaleString()}
            </p>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">Confirmed payments</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-charcoal-400 uppercase tracking-wider">Total Orders</span>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-forest-950 mt-2">
              {orders.length}
            </p>
            <p className="text-[11px] text-blue-700 font-semibold mt-1">{pendingOrdersCount} active in kitchen</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-charcoal-400 uppercase tracking-wider">Average Order</span>
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-forest-950 mt-2">
              ETB {averageOrderValue.toLocaleString()}
            </p>
            <p className="text-[11px] text-amber-800 font-semibold mt-1">Per dining check</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-cream-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-charcoal-400 uppercase tracking-wider">Menu Dishes</span>
              <div className="w-8 h-8 rounded-lg bg-berbere-100 text-berbere-800 flex items-center justify-center">
                <Utensils className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-forest-950 mt-2">
              {menuItems.length}
            </p>
            <p className="text-[11px] text-charcoal-500 font-semibold mt-1">
              {menuItems.filter(i => i.isAvailable).length} currently active
            </p>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-cream-200 pb-3 mb-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-forest-900 text-white shadow'
                : 'text-charcoal-700 hover:bg-cream-100'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders & Dispatch ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'menu'
                ? 'bg-forest-900 text-white shadow'
                : 'text-charcoal-700 hover:bg-cream-100'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Food Menu Manager ({menuItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'categories'
                ? 'bg-forest-900 text-white shadow'
                : 'text-charcoal-700 hover:bg-cream-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'reservations'
                ? 'bg-forest-900 text-white shadow'
                : 'text-charcoal-700 hover:bg-cream-100'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>VIP Reservations ({reservations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-forest-900 text-white shadow'
                : 'text-charcoal-700 hover:bg-cream-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Restaurant & Telebirr Settings</span>
          </button>
        </div>

        {/* TAB 1: ORDERS & DISPATCH */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Status Filter Tabs */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
              {(['All', 'Pending', 'Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered', 'Cancelled'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setOrderFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    orderFilter === st
                      ? 'bg-berbere-600 text-white shadow-sm'
                      : 'bg-white text-charcoal-700 hover:bg-cream-100 border border-cream-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {filteredOrders.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-cream-200 text-center">
                <p className="text-xs text-charcoal-500">No orders matching status "{orderFilter}".</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white p-6 rounded-3xl border border-cream-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    {/* Left: Info */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-black text-sm text-forest-950">
                          #{ord.orderNumber}
                        </span>
                        <span className="text-xs text-charcoal-400">•</span>
                        <span className="text-xs text-charcoal-500">
                          {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({new Date(ord.createdAt).toLocaleDateString()})
                        </span>
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                          ord.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ord.paymentMethod} • {ord.paymentStatus}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cream-100 text-forest-950">
                          {ord.orderType}
                        </span>
                      </div>

                      {/* Items string */}
                      <p className="text-xs font-semibold text-charcoal-900">
                        {ord.items.map(i => `${i.quantity}x ${i.foodItem.name} (${i.selectedPortion})`).join(', ')}
                      </p>

                      {/* Customer & address */}
                      <div className="text-xs text-charcoal-600 flex flex-wrap gap-x-4 gap-y-1">
                        <span><strong>Customer:</strong> {ord.customer.fullName} ({ord.customer.phoneNumber})</span>
                        <span><strong>Address:</strong> {ord.customer.deliveryAddress} - {ord.customer.subCity}</span>
                        {ord.customer.orderNotes && (
                          <span className="text-berbere-700 italic">"Notes: {ord.customer.orderNotes}"</span>
                        )}
                        {ord.paymentReference && (
                          <span className="text-blue-700 font-mono">Ref: {ord.paymentReference}</span>
                        )}
                      </div>
                    </div>

                    {/* Right: Total & Status Changer */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:border-l lg:border-cream-200 lg:pl-6">
                      <div className="text-left sm:text-right">
                        <span className="text-[11px] text-charcoal-400 uppercase font-semibold block">Order Total</span>
                        <span className="text-lg font-black text-forest-950">
                          ETB {ord.total.toLocaleString()}
                        </span>
                      </div>

                      {/* Quick Status Dropdown */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-charcoal-400 uppercase tracking-wider block">
                          Change Status:
                        </label>
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className={`text-xs font-bold p-2.5 rounded-xl border focus:outline-none ${
                            ord.orderStatus === 'Delivered'
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                              : ord.orderStatus === 'Out for Delivery'
                                ? 'bg-amber-50 border-amber-300 text-amber-900'
                                : ord.orderStatus === 'Preparing'
                                  ? 'bg-blue-50 border-blue-300 text-blue-900'
                                  : 'bg-cream-50 border-cream-300 text-forest-950'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Preparing">Preparing in Kitchen</option>
                          <option value="Ready">Ready for Pickup/Courier</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      <button
                        onClick={() => navigate(`/track-order?id=${ord.orderNumber}`)}
                        className="p-2 text-forest-900 hover:bg-cream-100 rounded-xl"
                        title="View Live Map View"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 2: MENU ITEMS MANAGER */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-serif text-forest-950">
                  Manage Restaurant Food Items ({menuItems.length})
                </h3>
                <p className="text-xs text-charcoal-500">
                  Add new dishes, update Ethiopian Birr pricing, modify ingredients, and toggle out-of-stock items.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingItem({
                    name: '',
                    amharicName: '',
                    description: '',
                    price: 450,
                    category: categories[0]?.id || 'cat-ethiopian',
                    imageUrl: '/images/dishes/shekla-tibs.jpg',
                    isAvailable: true,
                    isPopular: false,
                    isChefSpecial: false,
                    preparationTime: '20 mins',
                    dietaryTags: ['Halal'],
                    spiceLevel: 'Medium',
                    portions: [{ name: 'Standard Portion', priceDelta: 0 }],
                    ingredients: []
                  });
                  setIsItemModalOpen(true);
                }}
                className="px-4 py-2.5 bg-berbere-600 hover:bg-berbere-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Food Item</span>
              </button>
            </div>

            {/* Menu Items Table */}
            <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-cream-100/70 border-b border-cream-200 text-charcoal-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Dish Details</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Price (ETB)</th>
                      <th className="py-3.5 px-4">Stock Status</th>
                      <th className="py-3.5 px-4">Badges</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-100">
                    {menuItems.map((item) => (
                      <tr key={item.id} className="hover:bg-cream-50/50 transition-colors">
                        
                        {/* Dish Details */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="w-12 h-12 rounded-xl object-cover border border-cream-200 flex-shrink-0"
                            />
                            <div>
                              <p className="font-bold text-forest-950">{item.name}</p>
                              {item.amharicName && (
                                <p className="text-[11px] text-berbere-700">{item.amharicName}</p>
                              )}
                              <p className="text-[10px] text-charcoal-400 line-clamp-1 max-w-xs">{item.description}</p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-charcoal-700">
                            {categories.find(c => c.id === item.category)?.name || item.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-3.5 px-4 font-black text-forest-950">
                          ETB {item.price.toLocaleString()}
                        </td>

                        {/* Stock toggle */}
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => toggleItemAvailability(item.id)}
                            className={`px-3 py-1 rounded-full text-[11px] font-extrabold transition-colors ${
                              item.isAvailable
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            {item.isAvailable ? '● In Stock' : '✕ Out of Stock'}
                          </button>
                        </td>

                        {/* Badges */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1">
                            {item.isChefSpecial && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-forest-900 text-berbere-400 font-bold">
                                Chef
                              </span>
                            )}
                            {item.isPopular && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-berbere-100 text-berbere-800 font-bold">
                                Popular
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => {
                                setEditingItem({ ...item });
                                setIsItemModalOpen(true);
                              }}
                              className="p-1.5 text-forest-900 hover:bg-cream-100 rounded-lg transition-colors"
                              title="Edit item"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={async () => {
                                if (confirm(`Are you sure you want to delete ${item.name}?`)) {
                                  await deleteMenuItem(item.id);
                                  triggerToast(`Deleted ${item.name}`);
                                }
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: CATEGORIES MANAGER */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-serif text-forest-950">
                  Food Categories ({categories.length})
                </h3>
                <p className="text-xs text-charcoal-500">
                  Organize menus into traditional Ethiopian, breakfasts, lunch/dinners, pizzas, and fresh drinks.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingCat({
                    id: `cat-${Date.now()}`,
                    name: '',
                    slug: '',
                    amharicName: '',
                    description: '',
                    imageUrl: '/images/dishes/shekla-tibs.jpg'
                  });
                  setIsCatModalOpen(true);
                }}
                className="px-4 py-2.5 bg-berbere-600 hover:bg-berbere-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-white rounded-2xl border border-cream-200 p-5 shadow-sm space-y-3">
                  <div className="aspect-[16/9] rounded-xl overflow-hidden bg-cream-100">
                    <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-forest-950">{cat.name}</h4>
                    {cat.amharicName && <p className="text-[11px] text-berbere-700">{cat.amharicName}</p>}
                    <p className="text-xs text-charcoal-500 mt-1 line-clamp-2">{cat.description}</p>
                  </div>
                  <div className="pt-2 flex items-center justify-between text-xs border-t border-cream-100">
                    <span className="font-semibold text-charcoal-500">
                      {menuItems.filter(i => i.category === cat.id).length} dishes
                    </span>
                    <button
                      onClick={() => {
                        setEditingCat({ ...cat });
                        setIsCatModalOpen(true);
                      }}
                      className="text-xs font-bold text-forest-900 hover:underline"
                    >
                      Edit Category
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: VIP TABLE RESERVATIONS */}
        {activeTab === 'reservations' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-serif text-forest-950">
                  Customer Table Reservations ({reservations.length})
                </h3>
                <p className="text-xs text-charcoal-500">
                  Manage incoming VIP table bookings, seating schedules, guest requirements, and phone confirmations.
                </p>
              </div>
            </div>

            {reservations.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-cream-200 text-center">
                <p className="text-xs text-charcoal-500">No table reservations recorded yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reservations.map((res) => (
                  <div
                    key={res.id}
                    className="bg-white p-6 rounded-3xl border border-cream-200 shadow-sm space-y-4 hover:border-cream-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-400">
                          Ref #{res.id}
                        </span>
                        <h4 className="text-base font-bold text-forest-950 mt-0.5">
                          {res.fullName}
                        </h4>
                        <a
                          href={`tel:${res.phoneNumber}`}
                          className="text-xs text-forest-900 font-bold hover:underline flex items-center mt-1"
                        >
                          <Phone className="w-3.5 h-3.5 mr-1 text-berbere-600" />
                          <span>{res.phoneNumber}</span>
                        </a>
                      </div>

                      {/* Status select */}
                      <select
                        value={res.status}
                        onChange={async (e) => {
                          await updateReservationStatus(res.id, e.target.value as TableReservation['status']);
                          triggerToast('Reservation status updated');
                        }}
                        className={`text-xs font-bold p-2 rounded-xl border focus:outline-none ${
                          res.status === 'Confirmed'
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                            : res.status === 'Seated'
                              ? 'bg-blue-50 border-blue-300 text-blue-900'
                              : res.status === 'Cancelled'
                                ? 'bg-red-50 border-red-300 text-red-900'
                                : 'bg-amber-50 border-amber-300 text-amber-900'
                        }`}
                      >
                        <option value="Pending">Pending Confirmation</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Seated">Guests Seated</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="p-3.5 bg-cream-50 rounded-2xl border border-cream-200 grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-charcoal-400 block font-bold uppercase">Date</span>
                        <span className="font-bold text-forest-950">{res.date}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-charcoal-400 block font-bold uppercase">Time</span>
                        <span className="font-bold text-forest-950">{res.time}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-charcoal-400 block font-bold uppercase">Party Size</span>
                        <span className="font-bold text-forest-950">{res.guests}</span>
                      </div>
                    </div>

                    {res.specialNotes && (
                      <p className="text-xs text-charcoal-600 italic bg-white p-2.5 rounded-xl border border-cream-200">
                        "Notes: {res.specialNotes}"
                      </p>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-charcoal-400 pt-2 border-t border-cream-100">
                      <span>Booked: {new Date(res.createdAt).toLocaleDateString()}</span>
                      <a
                        href={`https://wa.me/${res.phoneNumber.replace(/[^0-9]/g, '')}?text=Selam%20${encodeURIComponent(res.fullName)},%20this%20is%20TALILE%20Restaurant%20confirming%20your%20table%20reservation!`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-700 font-bold hover:underline"
                      >
                        Confirm via WhatsApp →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: RESTAURANT & TELEBIRR SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl border border-cream-200 p-8 shadow-sm max-w-4xl space-y-6">
            <div>
              <h3 className="text-lg font-bold font-serif text-forest-950">
                Restaurant Operational & Payment Settings
              </h3>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Configure delivery fee thresholds, Telebirr merchant ID, opening hours, and promotional announcement banner.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              
              {/* Restaurant basics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest-950">Restaurant Name</label>
                  <input
                    type="text"
                    value={settingsForm.name}
                    onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-forest-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest-950">Primary Phone Hotline</label>
                  <input
                    type="text"
                    value={settingsForm.phone1}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone1: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-forest-900"
                  />
                </div>
              </div>

              {/* Delivery Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest-950">Base Delivery Fee (ETB)</label>
                  <input
                    type="number"
                    value={settingsForm.baseDeliveryFee}
                    onChange={(e) => setSettingsForm({ ...settingsForm, baseDeliveryFee: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-forest-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest-950">Free Delivery Minimum (ETB)</label>
                  <input
                    type="number"
                    value={settingsForm.freeDeliveryThreshold}
                    onChange={(e) => setSettingsForm({ ...settingsForm, freeDeliveryThreshold: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-forest-900"
                  />
                </div>
              </div>

              {/* Telebirr Settings */}
              <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center space-x-2">
                  <span>Telebirr Merchant Integration</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-blue-950">Telebirr Merchant ID</label>
                    <input
                      type="text"
                      value={settingsForm.telebirrMerchantId}
                      onChange={(e) => setSettingsForm({ ...settingsForm, telebirrMerchantId: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-blue-200 bg-white focus:outline-none focus:border-blue-600 font-mono font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-blue-950">Merchant Account Name</label>
                    <input
                      type="text"
                      value={settingsForm.telebirrAccountName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, telebirrAccountName: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-blue-200 bg-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Announcement Bar */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-forest-950">Top Banner Announcement</label>
                <input
                  type="text"
                  value={settingsForm.announcement}
                  onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-forest-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-forest-900 hover:bg-forest-950 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Settings</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>

      {/* Item Modal (Add / Edit) */}
      {isItemModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div onClick={() => setIsItemModalOpen(false)} className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-sm" />
          
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-cream-200 z-10 p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold font-serif text-forest-950 border-b border-cream-200 pb-3">
              {editingItem.id ? 'Edit Food Item' : 'Add New Food Item'}
            </h3>

            <form onSubmit={handleSaveItem} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest-950">Dish Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest-950">Amharic Name</label>
                  <input
                    type="text"
                    placeholder="e.g. ልዩ የሀበሻ ዶሮ ወጥ"
                    value={editingItem.amharicName || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, amharicName: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest-950">Base Price (ETB) *</label>
                  <input
                    type="number"
                    required
                    value={editingItem.price || 0}
                    onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest-950">Category *</label>
                  <select
                    value={editingItem.category || categories[0]?.id}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-none"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-forest-950">Description</label>
                <textarea
                  rows={3}
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-forest-950">Food Image URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={editingItem.imageUrl || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex items-center space-x-2 text-xs font-bold text-forest-950">
                  <input
                    type="checkbox"
                    checked={editingItem.isAvailable !== false}
                    onChange={(e) => setEditingItem({ ...editingItem, isAvailable: e.target.checked })}
                    className="accent-forest-800"
                  />
                  <span>Available in Stock</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-bold text-forest-950">
                  <input
                    type="checkbox"
                    checked={editingItem.isChefSpecial || false}
                    onChange={(e) => setEditingItem({ ...editingItem, isChefSpecial: e.target.checked })}
                    className="accent-berbere-600"
                  />
                  <span>👑 Chef's Special</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-bold text-forest-950">
                  <input
                    type="checkbox"
                    checked={editingItem.isPopular || false}
                    onChange={(e) => setEditingItem({ ...editingItem, isPopular: e.target.checked })}
                    className="accent-berbere-600"
                  />
                  <span>⭐ Popular Item</span>
                </label>
              </div>

              <div className="pt-4 border-t border-cream-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsItemModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-charcoal-600 hover:bg-cream-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-forest-900 hover:bg-forest-950 text-white text-xs font-bold rounded-xl shadow"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {isCatModalOpen && editingCat && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div onClick={() => setIsCatModalOpen(false)} className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-sm" />
          
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-cream-200 z-10 p-6 space-y-4">
            <h3 className="text-base font-bold font-serif text-forest-950 border-b border-cream-200 pb-2">
              Category Details
            </h3>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!editingCat.name) return;
                await saveCategory({
                  id: editingCat.id || `cat-${Date.now()}`,
                  name: editingCat.name,
                  slug: editingCat.slug || editingCat.name.toLowerCase().replace(/\s+/g, '-'),
                  amharicName: editingCat.amharicName || '',
                  description: editingCat.description || '',
                  imageUrl: editingCat.imageUrl || '/images/dishes/shekla-tibs.jpg'
                });
                setIsCatModalOpen(false);
                triggerToast('Category saved!');
              }}
              className="space-y-3"
            >
              <div className="space-y-1">
                <label className="text-xs font-bold text-forest-950">Category Name *</label>
                <input
                  type="text"
                  required
                  value={editingCat.name || ''}
                  onChange={(e) => setEditingCat({ ...editingCat, name: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-forest-950">Amharic Translation</label>
                <input
                  type="text"
                  value={editingCat.amharicName || ''}
                  onChange={(e) => setEditingCat({ ...editingCat, amharicName: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-forest-950">Category Image URL</label>
                <input
                  type="url"
                  value={editingCat.imageUrl || ''}
                  onChange={(e) => setEditingCat({ ...editingCat, imageUrl: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCatModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-charcoal-600 hover:bg-cream-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-forest-900 text-white text-xs font-bold rounded-xl shadow"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
