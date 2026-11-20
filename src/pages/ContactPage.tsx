import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Calendar, 
  Users, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, bookTable } = useRestaurant();

  // Table reservation form state
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('19:30');
  const [resGuests, setResGuests] = useState('2');
  const [resNotes, setResNotes] = useState('');
  const [resSuccess, setResSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName || !resPhone) return;
    setIsSubmitting(true);
    try {
      await bookTable({
        id: `res-${Date.now()}`,
        fullName: resName.trim(),
        phoneNumber: resPhone.trim(),
        date: resDate || new Date().toISOString().split('T')[0],
        time: resTime,
        guests: resGuests,
        specialNotes: resNotes.trim() || undefined,
        status: 'Pending',
        createdAt: new Date().toISOString()
      });
      setResSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent('Hello TALILE Restaurant! I would like to make an inquiry regarding your restaurant.');
    window.open(`https://wa.me/251911234567?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-cream-50/70 pb-20">
      
      {/* Header */}
      <div className="bg-forest-950 text-cream-100 py-12 md:py-16 border-b-4 border-berbere-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-extrabold tracking-widest text-berbere-400 block mb-2">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white">
            Contact & Table Reservations
          </h1>
          <p className="text-xs sm:text-sm text-cream-300 mt-2 max-w-xl mx-auto leading-relaxed">
            We are here to make your dining experience extraordinary. Book a VIP booth, request catering, or reach our kitchen team directly.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold font-serif text-forest-950 border-b border-cream-200 pb-3">
                TALILE Information
              </h3>

              <div className="space-y-5 text-xs text-charcoal-700">
                
                {/* Location */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-900 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-forest-950">Addis Ababa Address</h4>
                    <p className="text-charcoal-600 mt-0.5 leading-relaxed">
                      {settings.address || 'Camerun Street, Near Bole Medhanialem Cathedral, Next to Edna Mall'}
                    </p>
                    <p className="text-[11px] text-berbere-700 font-semibold mt-0.5">Bole Sub-City, Addis Ababa, Ethiopia</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-berbere-100 text-berbere-700 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-forest-950">Restaurant Operating Hours</h4>
                    <p className="text-charcoal-600 mt-0.5">
                      Monday – Friday: {settings.openingHoursWeekday || '7:00 AM – 11:30 PM'}
                    </p>
                    <p className="text-charcoal-600">
                      Saturday – Sunday: {settings.openingHoursWeekend || '7:00 AM – 12:30 AM'}
                    </p>
                  </div>
                </div>

                {/* Hotlines */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-forest-950">Phone & Ordering Hotlines</h4>
                    <a href={`tel:${settings.phone1}`} className="text-forest-900 font-bold hover:underline block mt-0.5">
                      {settings.phone1 || '+251 911 234 567'}
                    </a>
                    <a href={`tel:${settings.phone2}`} className="text-forest-900 font-bold hover:underline block">
                      {settings.phone2 || '+251 922 890 123'}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-forest-950">Email Support</h4>
                    <a href={`mailto:${settings.email}`} className="text-forest-900 hover:underline block mt-0.5">
                      {settings.email || 'orders@talilerestaurant.com'}
                    </a>
                  </div>
                </div>

              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-4 border-t border-cream-200">
                <button
                  onClick={handleWhatsAppChat}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat Directly on WhatsApp</span>
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Table Reservation Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-10 shadow-luxury">
              
              <div className="mb-6">
                <span className="text-xs uppercase font-extrabold tracking-widest text-berbere-600 block mb-1">
                  Table Reservations
                </span>
                <h3 className="text-2xl font-bold font-serif text-forest-950">
                  Book a Table at TALILE
                </h3>
                <p className="text-xs text-charcoal-500 mt-1">
                  Enjoy our cozy dining room, private VIP booths, or romantic outdoor terrace.
                </p>
              </div>

              {resSuccess ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-bold font-serif text-emerald-950">
                    Table Reservation Requested!
                  </h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{resName}</strong>. We received your booking for <strong>{resGuests} guests</strong> on {resDate || 'tonight'} at {resTime}. Our host will confirm via SMS/call to {resPhone}.
                  </p>
                  <button
                    onClick={() => setResSuccess(false)}
                    className="mt-2 px-6 py-2.5 bg-emerald-700 text-white text-xs font-bold rounded-xl"
                  >
                    Make Another Booking
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReservation} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-forest-950">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bethlehem Haile"
                        value={resName}
                        onChange={(e) => setResName(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-forest-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-forest-950">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0911 234 567"
                        value={resPhone}
                        onChange={(e) => setResPhone(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-forest-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-forest-950">Date *</label>
                      <input
                        type="date"
                        required
                        value={resDate}
                        onChange={(e) => setResDate(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-forest-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-forest-950">Time *</label>
                      <input
                        type="time"
                        required
                        value={resTime}
                        onChange={(e) => setResTime(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-forest-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-forest-950">Guests *</label>
                      <select
                        value={resGuests}
                        onChange={(e) => setResGuests(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-forest-900"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="3-4">3 - 4 Persons</option>
                        <option value="5-8">5 - 8 Persons (VIP Area)</option>
                        <option value="9+">9+ Persons (Private Hall)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-charcoal-700">
                      Seating Preference & Requests:
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Outdoor terrace table, birthday celebration cake request, quiet corner..."
                      value={resNotes}
                      onChange={(e) => setResNotes(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-cream-300 focus:outline-none focus:border-forest-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-forest-900 to-forest-950 hover:from-forest-800 hover:to-forest-900 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Confirm Table Reservation
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
