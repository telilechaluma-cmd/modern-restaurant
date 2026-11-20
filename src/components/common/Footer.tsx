import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Heart, 
  ShieldCheck, 
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { settings } = useRestaurant();

  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-forest-950 text-cream-100 border-t-4 border-berbere-500 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-forest-900">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNav('/')}>
              <div className="w-10 h-10 rounded-xl bg-berbere-500 flex items-center justify-center text-white text-xl shadow-lg">
                🍽️
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-white tracking-wide">TALILE</h3>
                <p className="text-[10px] text-berbere-400 font-semibold tracking-widest uppercase">
                  Restaurant & Lounge
                </p>
              </div>
            </div>
            
            <p className="text-sm text-cream-300 leading-relaxed">
              Addis Ababa’s premier culinary destination where authentic Ethiopian heritage meets elevated contemporary dining. Delicious food, prepared with pure highland ingredients and delivered piping hot to your door.
            </p>

            <div className="flex items-center space-x-2 pt-2">
              <span className="text-xs px-2.5 py-1 rounded-md bg-forest-900 text-cream-200 border border-forest-800">
                🇪🇹 Proudly Ethiopian
              </span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-berbere-950 text-berbere-300 border border-berbere-800">
                100% Halal Options
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base font-bold font-serif text-white tracking-wide border-b border-forest-800 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-cream-300">
              <li>
                <button onClick={() => handleNav('/menu')} className="hover:text-berbere-400 transition-colors flex items-center">
                  <span className="mr-2">›</span> Explore Food Menu
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/track-order')} className="hover:text-berbere-400 transition-colors flex items-center">
                  <span className="mr-2">›</span> Track Live Order Status
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/about')} className="hover:text-berbere-400 transition-colors flex items-center">
                  <span className="mr-2">›</span> Our Culinary Story & Chefs
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/contact')} className="hover:text-berbere-400 transition-colors flex items-center">
                  <span className="mr-2">›</span> Table Reservation & Catering
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/admin')} className="text-berbere-400 hover:text-berbere-300 transition-colors flex items-center font-semibold">
                  <ShieldCheck className="w-4 h-4 mr-1.5" /> Staff & Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Opening Hours & Service */}
          <div className="space-y-4">
            <h4 className="text-base font-bold font-serif text-white tracking-wide border-b border-forest-800 pb-2">
              Hours & Service
            </h4>
            <div className="space-y-3 text-sm text-cream-300">
              <div className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-berbere-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Monday – Friday</p>
                  <p className="text-xs text-cream-400">{settings.openingHoursWeekday || '7:00 AM – 11:30 PM'}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-berbere-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Saturday – Sunday</p>
                  <p className="text-xs text-cream-400">{settings.openingHoursWeekend || '7:00 AM – 12:30 AM'}</p>
                </div>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-2"></span>
                  Kitchen is currently accepting orders!
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Local Payments */}
          <div className="space-y-4">
            <h4 className="text-base font-bold font-serif text-white tracking-wide border-b border-forest-800 pb-2">
              Bole Location & Payments
            </h4>
            <div className="space-y-2.5 text-sm text-cream-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-berbere-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs leading-relaxed">
                  {settings.address || 'Camerun Street, Near Bole Medhanialem Cathedral, Next to Edna Mall, Addis Ababa'}
                </p>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-berbere-400 flex-shrink-0" />
                <a href={`tel:${settings.phone1}`} className="text-xs text-white hover:text-berbere-400">
                  {settings.phone1 || '+251 911 234 567'}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-berbere-400 flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-xs text-white hover:text-berbere-400">
                  {settings.email || 'orders@talilerestaurant.com'}
                </a>
              </div>
            </div>

            {/* Local payment badges */}
            <div className="pt-2">
              <p className="text-[11px] font-bold text-cream-400 uppercase tracking-wider mb-2">
                Accepted Payment Methods:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded bg-[#005cb9] text-white text-[11px] font-bold shadow-sm">
                  Telebirr
                </span>
                <span className="px-2.5 py-1 rounded bg-[#702170] text-white text-[11px] font-bold shadow-sm">
                  CBE Birr
                </span>
                <span className="px-2.5 py-1 rounded bg-forest-900 border border-forest-700 text-cream-200 text-[11px] font-semibold">
                  Cash on Delivery
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-400 space-y-4 sm:space-y-0">
          <p>
            © {new Date().getFullYear()} TALILE Restaurant & Lounge. All rights reserved. Addis Ababa, Ethiopia.
          </p>
          <div className="flex items-center space-x-4">
            <button onClick={() => handleNav('/contact')} className="hover:text-white">
              Customer Support
            </button>
            <span>•</span>
            <button onClick={() => handleNav('/about')} className="hover:text-white">
              Privacy & Hygiene
            </button>
            <span>•</span>
            <a 
              href="https://wa.me/251911234567" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center text-emerald-400 hover:text-emerald-300"
            >
              <MessageCircle className="w-3.5 h-3.5 mr-1" />
              WhatsApp Help
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
