import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Phone, 
  User, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle, 
  MapPin, 
  Heart,
  ChevronRight,
  UtensilsCrossed,
  Info
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { useLanguage } from '../context/LanguageContext';
import { TableReservation } from '../types';

interface ReservationPageProps {
  navigate: (path: string) => void;
}

export const ReservationPage: React.FC<ReservationPageProps> = ({ navigate }) => {
  const { bookTable, settings } = useRestaurant();
  const { language } = useLanguage();

  // Form State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState('2 Guests');
  const [seatingArea, setSeatingArea] = useState('Main Dining Hall');
  const [occasion, setOccasion] = useState('Dinner Dining');
  const [specialNotes, setSpecialNotes] = useState('');
  
  // Submission & Confirmation State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<TableReservation | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const timeSlots = [
    '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  const guestOptions = [
    '1 Person',
    '2 Guests (Couple)',
    '3-4 Guests',
    '5-6 Guests',
    '7-8 Guests (VIP)',
    '10+ Guests (Group Event)'
  ];

  const seatingOptions = [
    { id: 'Main Dining Hall', title: 'Main Dining Hall', desc: 'Vibrant Ethiopian ambiance with traditional music & coffee ceremony' },
    { id: 'Romantic VIP Booth', title: 'Romantic VIP Booth', desc: 'Private candlelit setting tailored for couples and anniversaries' },
    { id: 'Garden Terrace', title: 'Garden Terrace', desc: 'Open-air highland breeze with panoramic Bole skyline views' },
    { id: 'Private Family Lounge', title: 'Private Family Lounge', desc: 'Exclusive secluded lounge for family gatherings and celebrations' },
  ];

  const occasions = [
    'Dinner Dining',
    'Birthday Celebration',
    'Romantic Anniversary',
    'Business Meeting / Dinner',
    'Family Gathering',
    'Traditional Coffee & Feast'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage(language === 'om' ? 'Maaloo maqaa keessan guutuu galchaa' : 'Please enter your full name');
      return;
    }

    if (!phoneNumber.trim() || phoneNumber.trim().length < 9) {
      setErrorMessage(language === 'om' ? 'Maaloo lakkoofsa bilbilaa sirrii galchaa' : 'Please provide a valid phone number (e.g., 0911234567)');
      return;
    }

    setIsSubmitting(true);
    try {
      const reservationData: TableReservation = {
        id: `TAL-RES-${Math.floor(10000 + Math.random() * 90000)}`,
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        date,
        time,
        guests,
        specialNotes: `[Seating: ${seatingArea}] [Occasion: ${occasion}] ${specialNotes.trim()}`.trim(),
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      };

      const result = await bookTable(reservationData);
      setConfirmedReservation(result);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to save reservation. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppBookingConfirm = () => {
    if (!confirmedReservation) return;
    const msg = `*TALILE RESTAURANT TABLE RESERVATION*%0A%0A` +
      `*Reservation Code:* ${confirmedReservation.id}%0A` +
      `*Guest Name:* ${confirmedReservation.fullName}%0A` +
      `*Phone:* ${confirmedReservation.phoneNumber}%0A` +
      `*Date:* ${confirmedReservation.date}%0A` +
      `*Time:* ${confirmedReservation.time}%0A` +
      `*Guests:* ${confirmedReservation.guests}%0A` +
      `*Seating:* ${seatingArea}%0A` +
      `*Occasion:* ${occasion}%0A` +
      `*Special Notes:* ${specialNotes || 'None'}%0A%0A` +
      `Please confirm my VIP table reservation. Thank you!`;
    window.open(`https://wa.me/251911234567?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-cream-50/70 pb-24">
      {/* Hero Header */}
      <div className="bg-dark-900 text-cream-100 py-14 md:py-20 border-b-4 border-gold-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C9A45C_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-dark-800 text-gold-400 text-xs font-bold mb-4 border border-gold-500/30">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>VIP Dining & Table Reservation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-white tracking-tight">
            Reserve Your Table at TALILE
          </h1>
          <p className="text-xs sm:text-base text-cream-200 mt-4 max-w-2xl mx-auto leading-relaxed font-sans">
            Experience royal Ethiopian hospitality, savor slow-cooked classics and prime steaks, and immerse yourself in an atmosphere of warmth and elegance in Bole Medhanialem.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* CONFIRMATION SUCCESS VIEW */}
        {confirmedReservation ? (
          <div className="bg-white rounded-3xl border-2 border-gold-400 p-8 sm:p-12 shadow-luxury text-center space-y-6 animate-fadeIn">
            <div className="w-20 h-20 mx-auto rounded-full bg-forest-100 text-forest-700 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-forest-700" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-gold-600">
                Reservation Confirmed
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-serif text-dark-900">
                We Look Forward to Welcoming You, {confirmedReservation.fullName}!
              </h2>
              <p className="text-sm text-charcoal-700 max-w-lg mx-auto">
                Your table has been reserved. A confirmation SMS/notification has been queued, and our host is preparing your seat.
              </p>
            </div>

            {/* Summary Card */}
            <div className="max-w-xl mx-auto bg-cream-50 rounded-2xl border border-cream-200 p-6 text-left grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-[11px] font-semibold text-charcoal-500 uppercase">Booking Code</p>
                <p className="text-sm font-extrabold text-gold-600 font-mono">{confirmedReservation.id}</p>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-charcoal-500 uppercase">Date</p>
                <p className="text-sm font-bold text-dark-900">{confirmedReservation.date}</p>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-charcoal-500 uppercase">Time</p>
                <p className="text-sm font-bold text-dark-900">{confirmedReservation.time}</p>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-charcoal-500 uppercase">Party Size</p>
                <p className="text-sm font-bold text-dark-900">{confirmedReservation.guests}</p>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-charcoal-500 uppercase">Seating</p>
                <p className="text-sm font-bold text-dark-900">{seatingArea}</p>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-charcoal-500 uppercase">Status</p>
                <span className="inline-block text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Confirmed
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <button
                onClick={handleWhatsAppBookingConfirm}
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm via WhatsApp Concierge</span>
              </button>

              <button
                onClick={() => navigate('/menu')}
                className="w-full sm:w-auto px-6 py-3.5 bg-dark-900 hover:bg-dark-800 text-gold-400 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all"
              >
                <UtensilsCrossed className="w-4 h-4 text-gold-400" />
                <span>Pre-Select Dishes from Menu</span>
              </button>

              <button
                onClick={() => {
                  setConfirmedReservation(null);
                  setFullName('');
                  setPhoneNumber('');
                  setSpecialNotes('');
                }}
                className="w-full sm:w-auto px-5 py-3.5 text-charcoal-700 hover:bg-cream-100 rounded-xl font-semibold text-xs transition-all"
              >
                Make Another Booking
              </button>
            </div>
          </div>
        ) : (
          /* RESERVATION FORM */
          <div className="bg-white rounded-3xl border border-cream-200 shadow-luxury overflow-hidden">
            
            <div className="p-6 sm:p-10 border-b border-cream-200 bg-gradient-to-r from-cream-50 via-white to-cream-50">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-dark-900">
                Table & VIP Reservation Details
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                Please complete the form below. For large private events (+20 guests) or special catering, feel free to contact our events manager directly at 0911-234567.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
              
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center">
                  <Info className="w-4 h-4 mr-2 flex-shrink-0" />
                  {errorMessage}
                </div>
              )}

              {/* Step 1: Guest Contact */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-dark-900 uppercase tracking-wider flex items-center text-gold-600">
                  <User className="w-4 h-4 mr-2 text-gold-500" />
                  1. Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g., Abebe Bikila"
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1.5">
                      Phone Number (for SMS confirmation) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="0911 23 45 67"
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Date, Time & Number of Guests */}
              <div className="space-y-4 pt-4 border-t border-cream-200">
                <h3 className="text-sm font-bold text-dark-900 uppercase tracking-wider flex items-center text-gold-600">
                  <Calendar className="w-4 h-4 mr-2 text-gold-500" />
                  2. Schedule & Party Size
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1.5">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1.5">
                      Time Slot *
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm font-medium bg-white"
                    >
                      {timeSlots.map((ts) => (
                        <option key={ts} value={ts}>{ts}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1.5">
                      Number of Guests *
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm font-medium bg-white"
                    >
                      {guestOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Seating Preference & Occasion */}
              <div className="space-y-4 pt-4 border-t border-cream-200">
                <h3 className="text-sm font-bold text-dark-900 uppercase tracking-wider flex items-center text-gold-600">
                  <Sparkles className="w-4 h-4 mr-2 text-gold-500" />
                  3. Atmosphere & Seating Preference
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {seatingOptions.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setSeatingArea(opt.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        seatingArea === opt.id
                          ? 'border-gold-500 bg-gold-50/60 shadow-sm ring-1 ring-gold-500'
                          : 'border-cream-200 hover:border-cream-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-dark-900">{opt.title}</span>
                        {seatingArea === opt.id && (
                          <span className="w-3.5 h-3.5 rounded-full bg-gold-500 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-charcoal-600 mt-1 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1.5">
                      Occasion
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm font-medium bg-white"
                    >
                      {occasions.map((occ) => (
                        <option key={occ} value={occ}>{occ}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1.5">
                      Special Requests (Allergies, Highchair, Flowers)
                    </label>
                    <input
                      type="text"
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="e.g., Quiet corner, anniversary cake surprise"
                      className="w-full px-4 py-3 rounded-xl border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-500 text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-6 border-t border-cream-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs text-charcoal-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Instant reservation confirmation • No booking fee</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-dark-900 rounded-2xl font-bold text-sm shadow-gold hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-dark-900" />
                  <span>{isSubmitting ? 'Confirming Table...' : 'Confirm Table Reservation'}</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* Info & Atmosphere Highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-sm flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-700 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-gold-700" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-dark-900">Dining Hours</h4>
              <p className="text-[11px] text-charcoal-600 mt-0.5 leading-relaxed">
                Breakfast: 7:00 AM – 11:30 AM<br />
                Lunch & Dinner: 12:00 PM – 11:30 PM
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-sm flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-forest-800" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-dark-900">Location</h4>
              <p className="text-[11px] text-charcoal-600 mt-0.5 leading-relaxed">
                Camerun St, Bole Medhanialem<br />
                Next to Edna Mall, Addis Ababa
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-sm flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-dark-900">Concierge Phone</h4>
              <p className="text-[11px] text-charcoal-600 mt-0.5 leading-relaxed">
                Direct: +251 911 234567<br />
                WhatsApp: +251 911 234567
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
