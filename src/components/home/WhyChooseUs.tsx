import React from 'react';
import { Flame, ShieldCheck, Bike, Sparkles, HeartHandshake, Award } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Flame,
      color: 'bg-berbere-100 text-berbere-700',
      title: 'Authentic Ethiopian Ingredients',
      description: 'We source hand-picked organic berbere from highland spice growers and churn pure clarified spiced butter (nitir kibe).'
    },
    {
      icon: Bike,
      color: 'bg-forest-100 text-forest-800',
      title: 'Rapid Temperature-Controlled Delivery',
      description: 'Our fleet delivers orders across Bole, Kazanchis, Piassa, and Greater Addis in insulated containers so your meal arrives steaming hot.'
    },
    {
      icon: ShieldCheck,
      color: 'bg-blue-100 text-[#005cb9]',
      title: 'Seamless Telebirr & Cash on Delivery',
      description: 'Pay safely using verified Telebirr instant transfer, CBE Birr mobile banking, or convenient Cash on Delivery.'
    },
    {
      icon: Award,
      color: 'bg-amber-100 text-amber-800',
      title: 'Five-Star Clean Kitchen Standards',
      description: 'Award-winning food safety protocols and spotless preparation by experienced master culinary artists.'
    }
  ];

  return (
    <section className="py-20 bg-cream-50/70 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-berbere-600 block mb-2">
            The TALILE Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-forest-950">
            Why Addis Ababa Chooses TALILE
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
            Every dish we prepare reflects our obsession with quality, heritage Ethiopian flavors, and exceptional hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div 
                key={i}
                className="bg-white p-7 rounded-3xl border border-cream-200 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${feat.color} flex items-center justify-center mb-5 shadow-sm`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-forest-950 mb-2 font-serif">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
