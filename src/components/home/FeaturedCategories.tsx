import React from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, Flame, Sun, Utensils, Pizza, Cake, Coffee } from 'lucide-react';

interface FeaturedCategoriesProps {
  onSelectCategory: (categoryId: string) => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ onSelectCategory }) => {
  const { categories } = useRestaurant();
  const { language, t } = useLanguage();

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'traditional-ethiopian':
        return <Flame className="w-5 h-5 text-berbere-500" />;
      case 'breakfast':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'lunch-dinner':
        return <Utensils className="w-5 h-5 text-emerald-600" />;
      case 'pizza-burgers':
        return <Pizza className="w-5 h-5 text-orange-500" />;
      case 'snacks-desserts':
        return <Cake className="w-5 h-5 text-pink-500" />;
      case 'drinks-juices':
        return <Coffee className="w-5 h-5 text-cyan-600" />;
      default:
        return <Utensils className="w-5 h-5 text-forest-700" />;
    }
  };

  return (
    <section className="py-16 bg-cream-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-berbere-600 block mb-1">
              Curated Culinary Selection
            </span>
            <h2 className="text-3xl font-bold font-serif text-forest-950">
              Browse by Categories
            </h2>
          </div>
          <button 
            onClick={() => onSelectCategory('all')}
            className="mt-3 sm:mt-0 text-xs font-bold text-forest-900 hover:text-berbere-600 flex items-center group transition-colors"
          >
            <span>View Complete Menu</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative bg-white rounded-3xl p-4 border border-cream-200/80 shadow-sm hover:shadow-luxury hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col items-center text-center justify-between"
            >
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden mb-3 bg-cream-100 shadow-inner group-hover:scale-105 transition-transform">
                <img 
                  src={cat.imageUrl} 
                  alt={cat.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-forest-950/20 group-hover:bg-forest-950/0 transition-colors" />
                <div className="absolute top-1 right-1 bg-white/90 backdrop-blur rounded-lg p-1 shadow-sm">
                  {getIcon(cat.slug)}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-forest-950 group-hover:text-berbere-600 transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <p className="text-[10px] text-charcoal-400 mt-0.5 truncate">
                  {language === 'om' ? (cat.oromoName || cat.amharicName) : (cat.amharicName || cat.oromoName)}
                </p>
              </div>

              <div className="mt-2 text-[10px] font-bold text-berbere-600 group-hover:underline">
                Explore →
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
