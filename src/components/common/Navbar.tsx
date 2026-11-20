import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  ShieldCheck, 
  User as UserIcon, 
  Search, 
  Clock, 
  MapPin,
  ChevronDown,
  Sparkles,
  Heart,
  Globe
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useRestaurant } from '../../context/RestaurantContext';
import { useLanguage, Language } from '../../context/LanguageContext';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { itemCount, subtotal, setIsCartDrawerOpen } = useCart();
  const { user, isLoggedIn, isAdmin, logout, loginAsDemoAdmin } = useAuth();
  const { settings, favorites } = useRestaurant();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.menu'), path: '/menu' },
    { label: t('nav.reservation'), path: '/reservation' },
    { label: t('nav.track'), path: '/track-order' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.contact'), path: '/contact' }
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'om', label: 'Afaan Oromoo', flag: '🇪🇹' },
    { code: 'am', label: 'አማርኛ', flag: '🇪🇹' }
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-cream-200 transition-all shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-forest-950 text-cream-100 text-xs py-2 px-4 border-b border-forest-900 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-berbere-400 font-medium">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              {settings.announcement || 'Fresh Authentic Ethiopian & International Dining • Fast Addis Delivery'}
            </span>
          </div>
          <div className="flex items-center space-x-5 text-cream-300">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-1.5 text-xs text-cream-200 hover:text-white py-0.5 px-2 rounded-lg bg-forest-900 border border-forest-800 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-berbere-400" />
                <span className="font-bold uppercase tracking-wider">{language}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-cream-200 py-1 text-charcoal-900 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-semibold flex items-center justify-between hover:bg-cream-100 ${
                        language === l.code ? 'text-forest-900 font-bold bg-cream-50' : ''
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-[10px]">{l.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-forest-700">|</span>
            <span className="flex items-center hover:text-white transition-colors">
              <Clock className="w-3.5 h-3.5 mr-1 text-berbere-400" />
              {t('nav.hours')}
            </span>
            <span className="text-forest-700">|</span>
            <a href={`tel:${settings.phone1}`} className="flex items-center hover:text-berbere-400 transition-colors">
              <Phone className="w-3.5 h-3.5 mr-1 text-berbere-400" />
              {settings.phone1 || '+251 911 234 567'}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('/')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-forest-950 via-forest-900 to-forest-800 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-forest-700/50">
              <span className="text-2xl select-none">👑</span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-2xl font-extrabold tracking-tight font-serif text-forest-950 group-hover:text-berbere-600 transition-colors">TALILE</span>
                <span className="text-xs uppercase tracking-widest font-bold px-1.5 py-0.5 rounded bg-berbere-100 text-berbere-700 border border-berbere-200">
                  Addis
                </span>
              </div>
              <p className="text-[11px] font-medium tracking-wider text-charcoal-800 uppercase">
                Restaurant & Lounge
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive 
                      ? 'text-forest-950 bg-forest-50/90 font-bold border border-forest-200/60 shadow-sm' 
                      : 'text-charcoal-800 hover:text-forest-900 hover:bg-cream-100/80'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Quick Menu Search / Explore */}
            <button
              onClick={() => handleNavClick('/menu')}
              className="p-2.5 text-charcoal-800 hover:text-forest-900 hover:bg-cream-100 rounded-xl transition-colors hidden sm:flex items-center"
              title="Search Food Menu"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Favorites Button */}
            <button
              onClick={() => handleNavClick('/menu?filter=favorites')}
              className="p-2.5 text-charcoal-700 hover:text-red-500 hover:bg-cream-100 rounded-xl transition-colors relative"
              title="Your Favorite Dishes"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-red-500 fill-red-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Pill Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center space-x-2.5 px-4 py-2.5 bg-gradient-to-r from-forest-900 to-forest-950 text-white rounded-xl shadow-md hover:from-forest-800 hover:to-forest-900 transition-all hover:scale-[1.02] active:scale-95 group"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-berbere-400 group-hover:rotate-6 transition-transform" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-berbere-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse-soft shadow">
                    {itemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[10px] text-cream-300 font-medium uppercase tracking-wider">Cart</span>
                <span className="text-xs font-bold text-white">ETB {subtotal.toLocaleString()}</span>
              </div>
            </button>

            {/* User Account / Auth Dropdown */}
            <div className="relative">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-2 py-1.5 px-3 rounded-xl border border-cream-300 hover:bg-cream-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-forest-900 text-berbere-300 flex items-center justify-center font-bold text-xs uppercase shadow-inner">
                      {user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <span className="text-xs font-semibold text-charcoal-900 max-w-[90px] truncate hidden lg:inline">
                      {user?.fullName?.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-charcoal-800" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-luxury border border-cream-200 py-2 z-50">
                      <div className="px-4 py-2.5 border-b border-cream-100">
                        <p className="text-xs text-charcoal-800">Signed in as</p>
                        <p className="text-sm font-bold text-forest-950 truncate">{user?.fullName}</p>
                        <span className={`inline-block mt-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          isAdmin ? 'bg-berbere-100 text-berbere-800' : 'bg-forest-100 text-forest-800'
                        }`}>
                          {isAdmin ? '👑 Restaurant Admin' : '👤 Customer'}
                        </span>
                      </div>

                      {isAdmin && (
                        <button
                          onClick={() => handleNavClick('/admin')}
                          className="w-full text-left px-4 py-2.5 text-xs font-bold text-forest-900 hover:bg-forest-50 flex items-center"
                        >
                          <ShieldCheck className="w-4 h-4 mr-2 text-forest-700" />
                          Admin Dashboard
                        </button>
                      )}

                      <button
                        onClick={() => handleNavClick('/track-order')}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-charcoal-800 hover:bg-cream-50 flex items-center"
                      >
                        <Clock className="w-4 h-4 mr-2 text-charcoal-800" />
                        My Order Status
                      </button>

                      <button
                        onClick={() => {
                          logout();
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center border-t border-cream-100 mt-1"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleNavClick('/login')}
                    className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold text-forest-950 hover:bg-cream-100 rounded-xl transition-colors border border-transparent hover:border-cream-300"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>
                  <button
                    onClick={() => {
                      loginAsDemoAdmin();
                      navigate('/admin');
                    }}
                    className="hidden lg:flex items-center space-x-1 px-3 py-2 text-[11px] font-bold text-berbere-700 bg-berbere-50 hover:bg-berbere-100 rounded-xl transition-colors border border-berbere-200"
                    title="Quick preview as Restaurant Owner / Staff"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin Mode</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden text-charcoal-800 hover:text-forest-950 hover:bg-cream-100 rounded-xl transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-cream-200 px-4 pt-2 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  currentPath === link.path
                    ? 'bg-forest-900 text-white'
                    : 'text-charcoal-800 hover:bg-cream-100'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            <button
              onClick={() => handleNavClick('/admin')}
              className="text-left px-4 py-3 rounded-xl text-sm font-semibold text-berbere-700 hover:bg-berbere-50 flex items-center"
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              Restaurant Admin Dashboard
            </button>
          </div>

          <div className="pt-3 border-t border-cream-200 flex flex-col space-y-2 text-xs text-charcoal-800">
            {/* Mobile Language Switcher */}
            <div className="flex items-center space-x-2 py-1">
              <Globe className="w-4 h-4 text-berbere-600" />
              <span className="font-bold">Language:</span>
              <div className="flex space-x-1.5">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      language === l.code ? 'bg-forest-900 text-white' : 'bg-cream-100 text-charcoal-700'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-berbere-600" />
              <span>Bole Medhanialem, Camerun St, Addis Ababa</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-forest-700" />
              <span>Order Hotline: {settings.phone1 || '+251 911 234 567'}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
