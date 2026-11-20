import React from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink } from 'lucide-react';

interface RestaurantInfoProps {
  navigate: (path: string) => void;
}

export const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ navigate }) => {
  const { settings } = useRestaurant();

  return (
    <section className="py-20 bg-forest-950 text-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Info & Hours */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-berbere-400 block mb-2">
                Visit or Dine with Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white">
                TALILE Restaurant & Lounge
              </h2>
              <p className="text-xs sm:text-sm text-cream-300 mt-2 max-w-xl leading-relaxed">
                Located in the heart of Bole, Addis Ababa. Step into an elegant ambiance featuring live traditional acoustic masinko evenings, exquisite Ethiopian hospitality, and high-speed Wi-Fi for remote diners.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Address card */}
              <div className="bg-forest-900/60 p-5 rounded-2xl border border-forest-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-berbere-500 text-white flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Bole Location</h4>
                <p className="text-xs text-cream-300 leading-relaxed">
                  {settings.address || 'Camerun Street, Near Bole Medhanialem Cathedral, Next to Edna Mall'}
                </p>
                <p className="text-[11px] text-berbere-400 font-semibold">
                  Addis Ababa, Ethiopia
                </p>
              </div>

              {/* Hours card */}
              <div className="bg-forest-900/60 p-5 rounded-2xl border border-forest-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Opening Hours</h4>
                <div className="text-xs text-cream-300 space-y-1">
                  <p>Mon - Fri: {settings.openingHoursWeekday || '7:00 AM – 11:30 PM'}</p>
                  <p>Sat - Sun: {settings.openingHoursWeekend || '7:00 AM – 12:30 AM'}</p>
                </div>
                <p className="text-[11px] text-emerald-400 font-semibold">
                  Breakfast, Lunch, Dinner & Late Night
                </p>
              </div>

              {/* Hotline card */}
              <div className="bg-forest-900/60 p-5 rounded-2xl border border-forest-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Direct Hotline</h4>
                <p className="text-xs text-cream-300">
                  {settings.phone1 || '+251 911 234 567'}
                </p>
                <p className="text-xs text-cream-400">
                  {settings.phone2 || '+251 922 890 123'}
                </p>
              </div>

              {/* WhatsApp & Reservation */}
              <div className="bg-forest-900/60 p-5 rounded-2xl border border-forest-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Online Inquiries</h4>
                <p className="text-xs text-cream-300">
                  {settings.email || 'orders@talilerestaurant.com'}
                </p>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-xs font-bold text-berbere-400 hover:text-berbere-300 hover:underline flex items-center"
                >
                  <span>Book a VIP Table</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </button>
              </div>

            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={`tel:${settings.phone1}`}
                className="px-6 py-3 bg-berbere-600 hover:bg-berbere-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call to Order: {settings.phone1}</span>
              </a>
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all"
              >
                Table Reservations
              </button>
            </div>
          </div>

          {/* Right Column: Visual Map Card with Bole pinpoint */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-2 border-forest-800 shadow-2xl bg-forest-900 p-2">
              
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" 
                  alt="TALILE Restaurant Interior" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-950/90 text-berbere-400 text-xs font-bold backdrop-blur mb-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Bole Medhanialem Cathedral Zone</span>
                  </div>
                  <h3 className="text-lg font-bold font-serif text-white">
                    Experience TALILE in Person
                  </h3>
                  <p className="text-xs text-cream-300 mt-0.5">
                    Private dining rooms, outdoor terrace & traditional coffee ceremony.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
