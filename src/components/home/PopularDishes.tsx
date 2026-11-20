import React, { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useLanguage } from '../../context/LanguageContext';
import { FoodCard } from '../menu/FoodCard';
import { FoodDetailModal } from '../menu/FoodDetailModal';
import { FoodItem } from '../../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PopularDishesProps {
  navigate: (path: string) => void;
}

export const PopularDishes: React.FC<PopularDishesProps> = ({ navigate }) => {
  const { menuItems } = useRestaurant();
  const { t } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [filterTab, setFilterTab] = useState<'all' | 'ethiopian' | 'chef'>('all');

  // Filter items
  const popularItems = menuItems.filter(item => {
    if (filterTab === 'chef') return item.isChefSpecial;
    if (filterTab === 'ethiopian') return item.category === 'cat-ethiopian';
    return item.isPopular || item.isChefSpecial;
  }).slice(0, 8);

  return (
    <section className="py-20 bg-white border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Tab switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-widest text-berbere-600 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('pop.subheading')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-forest-950">
              {t('pop.heading')}
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1 max-w-xl">
              {t('pop.desc')}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="mt-5 md:mt-0 flex items-center space-x-2 bg-cream-100 p-1 rounded-2xl border border-cream-200">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                filterTab === 'all'
                  ? 'bg-forest-900 text-white shadow-sm'
                  : 'text-charcoal-600 hover:text-forest-950'
              }`}
            >
              {t('pop.all')}
            </button>
            <button
              onClick={() => setFilterTab('ethiopian')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                filterTab === 'ethiopian'
                  ? 'bg-forest-900 text-white shadow-sm'
                  : 'text-charcoal-600 hover:text-forest-950'
              }`}
            >
              {t('pop.habesha')}
            </button>
            <button
              onClick={() => setFilterTab('chef')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                filterTab === 'chef'
                  ? 'bg-forest-900 text-white shadow-sm'
                  : 'text-charcoal-600 hover:text-forest-950'
              }`}
            >
              {t('pop.chef')}
            </button>
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularItems.map((item) => (
            <FoodCard 
              key={item.id} 
              item={item} 
              onOpenDetails={(food) => setSelectedItem(food)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              navigate('/menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-cream-100 hover:bg-cream-200 text-forest-950 font-bold text-xs rounded-2xl border border-cream-300 transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <span>Explore Complete 30+ Meal Menu</span>
            <ArrowRight className="w-4 h-4 text-berbere-600" />
          </button>
        </div>

      </div>

      {/* Modal View */}
      <FoodDetailModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </section>
  );
};
