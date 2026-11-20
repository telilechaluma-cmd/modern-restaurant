import React from 'react';
import { 
  Flame, 
  Award, 
  Heart, 
  Sparkles, 
  MapPin, 
  Users, 
  Coffee, 
  Compass, 
  Target, 
  Eye, 
  Camera, 
  CalendarDays,
  ShoppingBag
} from 'lucide-react';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  const chefs = [
    {
      name: 'Chef Dawit Haile',
      role: 'Executive Head Chef',
      experience: '22+ Years in Ethiopian & International Culinary Arts',
      bio: 'Trained in Addis Ababa and Lyon, Chef Dawit masterfully translates ancient highland recipes into modern culinary celebrations.',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Chef Selamawit Tadesse',
      role: 'Master Traditional Habesha Specialist',
      experience: '18+ Years Heritage Simmering & Berbere Craft',
      bio: 'Guardian of our 18-spice royal berbere blend and slow-simmered Royal Doro Wat, preparing each dish with authentic highland kibe.',
      image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Chef Marco Bellini',
      role: 'Pastry & Wood-Fired Artisan',
      experience: '15+ Years Artisan Baking & Desserts',
      bio: 'Specialist in 72-hour slow-fermented sourdough pizza doughs, gourmet burgers, and rich chocolate ganache desserts.',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const galleryImages = [
    {
      title: 'Main VIP Dining Hall',
      category: 'Dining Atmosphere',
      img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Sizzling Shekla Tibs',
      category: 'Signature Food',
      img: '/images/dishes/shekla-tibs.jpg'
    },
    {
      title: 'Traditional Ethiopian Buna Ceremony',
      category: 'Cultural Ritual',
      img: '/images/dishes/coffee-ceremony.jpg'
    },
    {
      title: 'Candlelight Couples Booth',
      category: 'VIP Seating',
      img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Royal Doro Wat Feast',
      category: 'Authentic Heritage',
      img: '/images/dishes/doro-wat.jpg'
    },
    {
      title: 'Garden Terrace Skyline View',
      category: 'Outdoor Lounge',
      img: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-cream-50/70 pb-24">
      
      {/* Hero Header */}
      <div className="bg-dark-900 text-cream-100 py-16 md:py-24 border-b-4 border-gold-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C9A45C_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-gold-400 block mb-2">
            The Soul of Ethiopian Fine Dining & Lounge
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-white tracking-tight">
            Our Story, Heritage & Vision
          </h1>
          <p className="text-xs sm:text-base text-cream-200 mt-4 max-w-2xl mx-auto leading-relaxed font-sans">
            Born out of a deep reverence for authentic Ethiopian culinary heritage and world-class hospitality, TALILE Restaurant & Lounge brings people together over unforgettable culinary feasts.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {/* Story Section 1: History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-600 flex items-center">
              <Compass className="w-3.5 h-3.5 mr-1.5" />
              Our History
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-dark-900 leading-tight">
              Honoring Centuries of Highland Tradition
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              Founded in the vibrant heart of Addis Ababa, TALILE was established to celebrate the authentic rituals of Ethiopian dining: sharing injera from a communal gebeta, savoring meats seared over glowing charcoal, and pausing for the time-honored aroma of fresh frankincense and roasted coffee.
            </p>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              We partner directly with farmers across Gojjam, Sidama, and Harar to source 100% pure teff grain, hand-churned clarified butter (nitir kibe), and whole organic spices that undergo days of traditional sun-drying and roasting.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-luxury border-2 border-gold-500/20 aspect-[4/3] group">
            <img 
              src="/images/dishes/shekla-tibs.jpg" 
              alt="Traditional Ethiopian Sizzling Shekla Tibs"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Authentic Clay Pot Sizzle • Addis Ababa
              </span>
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-cream-200 shadow-sm space-y-3 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-gold-100 text-gold-700 flex items-center justify-center">
              <Target className="w-6 h-6 text-gold-700" />
            </div>
            <h3 className="text-xl font-bold font-serif text-dark-900">Our Mission</h3>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              To deliver an extraordinary dining experience by combining pure heritage Ethiopian ingredients, uncompromising food hygiene, and gracious hospitality that makes every guest feel like honored family.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-cream-200 shadow-sm space-y-3 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-dark-900 text-gold-400 flex items-center justify-center">
              <Eye className="w-6 h-6 text-gold-400" />
            </div>
            <h3 className="text-xl font-bold font-serif text-dark-900">Our Vision</h3>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              To be recognized as East Africa’s standard-bearer for modern heritage dining, where age-old culinary secrets seamlessly meet contemporary luxury, digital ordering convenience, and community connection.
            </p>
          </div>
        </div>

        {/* Master Chefs Section */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-gold-600 block mb-1">
              Culinary Masters
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold font-serif text-dark-900">
              Meet Our Executive Culinary Team
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
              Passionate master chefs bringing decades of expertise, authentic technique, and culinary innovation to every plate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chefs.map((chef, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-cream-200 shadow-sm hover:shadow-luxury transition-all duration-300 group"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={chef.image} 
                    alt={chef.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent flex items-end p-5">
                    <div>
                      <h4 className="text-lg font-bold font-serif text-white">{chef.name}</h4>
                      <p className="text-xs text-gold-400 font-semibold">{chef.role}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="text-[11px] font-bold text-dark-900 bg-cream-100 px-3 py-1 rounded-full inline-block">
                    {chef.experience}
                  </div>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    {chef.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Four Pillars */}
        <div className="bg-white rounded-3xl border border-cream-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl font-bold font-serif text-dark-900">
              The Four Pillars of TALILE Dining
            </h3>
            <p className="text-xs text-charcoal-500 mt-1">What guides our kitchen every single day</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-cream-50 border border-cream-200 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-dark-900 text-gold-400 flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-dark-900">Authenticity</h4>
              <p className="text-xs text-charcoal-600">No compromises on traditional spice blends or slow simmer methods.</p>
            </div>

            <div className="p-5 rounded-2xl bg-cream-50 border border-cream-200 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-gold-500 text-dark-900 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-dark-900">Pristine Hygiene</h4>
              <p className="text-xs text-charcoal-600">Highest food safety protocols and pristine modern open kitchen spaces.</p>
            </div>

            <div className="p-5 rounded-2xl bg-cream-50 border border-cream-200 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-forest-900 text-emerald-400 flex items-center justify-center">
                <Coffee className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-dark-900">Buna Ceremony</h4>
              <p className="text-xs text-charcoal-600">Freshly roasted single-origin Yirgacheffe and Sidama beans daily.</p>
            </div>

            <div className="p-5 rounded-2xl bg-cream-50 border border-cream-200 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-berbere-600 text-white flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-dark-900">Warm Hospitality</h4>
              <p className="text-xs text-charcoal-600">Ethiopian warmth that makes every guest feel like honored family.</p>
            </div>
          </div>
        </div>

        {/* Atmosphere & Gallery Section */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-gold-600 block mb-1">
              Visual Journey
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold font-serif text-dark-900">
              Restaurant Atmosphere & Gallery
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
              Step inside our warm, sophisticated dining spaces designed for intimate couples, family feasts, and high-profile business dinners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((item, idx) => (
              <div 
                key={idx}
                className="relative rounded-3xl overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-300 group h-64 border border-cream-200"
              >
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent flex flex-col justify-end p-5">
                  <span className="text-[10px] font-bold text-gold-400 uppercase tracking-wider mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold font-serif text-white">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center p-8 sm:p-12 bg-dark-900 text-white rounded-3xl border-2 border-gold-500/40 shadow-luxury space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <h3 className="text-2xl sm:text-4xl font-bold font-serif text-white">
            Experience the Royal Feast Tonight
          </h3>
          <p className="text-xs sm:text-sm text-cream-200 max-w-lg mx-auto leading-relaxed">
            Order online today for rapid Addis delivery, or reserve a table for an unforgettable evening in Bole Medhanialem.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3.5 pt-4">
            <button
              onClick={() => {
                navigate('/menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-gradient-to-r from-forest-800 to-forest-900 hover:from-forest-700 hover:to-forest-800 text-white text-xs font-bold rounded-2xl shadow transition-all flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4 text-gold-400" />
              <span>Order Online Now</span>
            </button>

            <button
              onClick={() => {
                navigate('/reservation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-dark-900 text-xs font-bold rounded-2xl shadow-gold transition-all flex items-center justify-center space-x-2"
            >
              <CalendarDays className="w-4 h-4 text-dark-900" />
              <span>Reserve a Table</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
