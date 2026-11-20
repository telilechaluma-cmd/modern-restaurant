import React from 'react';
import { ArrowRight, ShoppingBag, Flame, Sparkles, Star, ShieldCheck, Bike } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface HeroSectionProps {
  navigate: (path: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ navigate }) => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 via-white to-cream-50 pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-cream-200">
      
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-berbere-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-forest-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-forest-950 text-cream-100 text-xs font-bold shadow-md border border-forest-800">
              <span className="text-berbere-400 flex items-center">
                <Flame className="w-3.5 h-3.5 mr-1 fill-berbere-500 text-berbere-500" />
                {t('hero.badge')}
              </span>
              <span className="text-forest-700">|</span>
              <span className="text-cream-300 font-medium">{t('hero.location')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-forest-950 leading-[1.15] tracking-tight">
              {t('hero.title1')} <br className="hidden sm:inline" />
              {t('hero.title2')} <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-berbere-600 via-berbere-500 to-amber-600">
                {t('hero.title3')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-charcoal-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              {t('hero.subtitle')}
            </p>

            {/* CTAs: Order Now, Explore Menu & Reserve Table */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  navigate('/menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-forest-900 to-forest-950 hover:from-forest-800 hover:to-forest-900 text-white rounded-2xl font-bold text-sm shadow-luxury hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 group"
              >
                <ShoppingBag className="w-4 h-4 text-gold-400 group-hover:rotate-6 transition-transform" />
                <span>{t('hero.orderNow')}</span>
                <ArrowRight className="w-4 h-4 text-cream-300 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  navigate('/reservation');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-dark-900 font-bold text-sm rounded-2xl shadow-gold hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-dark-900" />
                <span>{t('nav.reservation')}</span>
              </button>

              <button
                onClick={() => {
                  navigate('/menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-cream-100 text-dark-900 border-2 border-cream-300 hover:border-gold-500 rounded-2xl font-bold text-sm shadow-sm hover:scale-105 active:scale-95 transition-all"
              >
                {t('hero.exploreMenu')}
              </button>
            </div>

            {/* Trust highlights */}
            <div className="pt-6 border-t border-cream-200/90 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-forest-100 text-forest-900 flex items-center justify-center flex-shrink-0">
                  <Bike className="w-4 h-4 text-forest-800" />
                </div>
                <div>
                  <p className="text-xs font-bold text-forest-950">{t('hero.fastDelivery')}</p>
                  <p className="text-[11px] text-charcoal-500">{t('hero.fastDeliverySub')}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-berbere-100 text-berbere-900 flex items-center justify-center flex-shrink-0">
                  <Flame className="w-4 h-4 text-berbere-700" />
                </div>
                <div>
                  <p className="text-xs font-bold text-forest-950">{t('hero.authenticKibe')}</p>
                  <p className="text-[11px] text-charcoal-500">{t('hero.authenticKibeSub')}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs font-bold text-forest-950">{t('hero.safePay')}</p>
                  <p className="text-[11px] text-charcoal-500">{t('hero.safePaySub')}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Circular Food Hero Frame */}
              <div className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="/images/dishes/doro-wat.jpg" 
                  alt="Royal Doro Wat Platter"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-berbere-500 text-white uppercase tracking-wider inline-block mb-1.5 shadow">
                    Chef's Daily Special
                  </span>
                  <h3 className="text-xl font-bold font-serif">TALILE Royal Doro Wat</h3>
                  <p className="text-xs text-cream-200 mt-1">Slow-cooked tender chicken, spiced butter, farm egg & fresh teff injera</p>
                  <div className="mt-2 text-base font-extrabold text-berbere-300">
                    ETB 680
                  </div>
                </div>
              </div>

              {/* Floating Customer Rating Card */}
              <div className="absolute -top-5 -left-5 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-luxury border border-cream-200 hidden sm:flex items-center space-x-3 animate-in slide-in-from-top-4 duration-500">
                <div className="w-10 h-10 rounded-xl bg-berbere-500 text-white flex items-center justify-center font-bold text-base shadow">
                  <Star className="w-5 h-5 fill-white text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-extrabold text-forest-950">4.9 / 5.0</span>
                    <span className="text-[10px] text-charcoal-400">(600+ reviews)</span>
                  </div>
                  <p className="text-[11px] text-charcoal-600 font-medium">Bole's top rated restaurant</p>
                </div>
              </div>

              {/* Floating Speed Delivery Badge */}
              <div className="absolute -bottom-5 -right-5 bg-forest-950 text-white rounded-2xl p-4 shadow-luxury border border-forest-800 hidden sm:flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-forest-900 border border-forest-700 flex items-center justify-center text-xl">
                  ⚡
                </div>
                <div>
                  <p className="text-xs font-bold text-cream-100">Average 35 Mins</p>
                  <p className="text-[11px] text-berbere-400 font-medium">Addis Sub-City Express</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
