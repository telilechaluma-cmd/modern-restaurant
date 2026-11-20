import React, { useState } from 'react';
import { Plus, Check, Flame, Clock, Star, Heart } from 'lucide-react';
import { FoodItem, SpiceLevel } from '../../types';
import { useCart } from '../../context/CartContext';
import { useRestaurant } from '../../context/RestaurantContext';
import { useLanguage } from '../../context/LanguageContext';

interface FoodCardProps {
  item: FoodItem;
  onOpenDetails: (item: FoodItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onOpenDetails }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useRestaurant();
  const { language, t } = useLanguage();
  const [selectedPortion, setSelectedPortion] = useState(
    item.portions && item.portions.length > 0 ? item.portions[0].name : 'Standard'
  );
  const [selectedSpice, setSelectedSpice] = useState<SpiceLevel>(item.spiceLevel || 'Medium');
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);

  const isFav = isFavorite(item.id);

  // Determine local secondary title
  const localizedSubname = language === 'om' 
    ? (item.oromoName || item.amharicName) 
    : (item.amharicName || item.oromoName);

  // Price with portion
  let currentPrice = item.price;
  if (item.portions) {
    const p = item.portions.find(x => x.name === selectedPortion);
    if (p?.priceDelta) currentPrice += p.priceDelta;
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item, 1, selectedPortion, selectedSpice);
    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 1200);
  };

  return (
    <div 
      onClick={() => onOpenDetails(item)}
      className="group bg-white rounded-3xl border border-cream-200/80 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-1"
    >
      {/* Top Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden bg-cream-100">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {item.isChefSpecial && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-forest-950 text-berbere-400 border border-forest-800 shadow-sm flex items-center">
              👑 Chef's Choice
            </span>
          )}
          {item.isPopular && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-berbere-500 text-white shadow-sm">
              Popular
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id);
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all"
          title={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 transition-colors ${
            isFav ? 'text-red-500 fill-red-500' : 'text-charcoal-400 hover:text-red-500'
          }`} />
        </button>

        {/* Prep Time or Rating */}
        <div className="absolute bottom-3 right-3 flex items-center space-x-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow text-[11px] font-bold text-forest-950">
          <Clock className="w-3 h-3 text-berbere-600" />
          <span>{item.preparationTime || '20 min'}</span>
        </div>

        {item.rating && (
          <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full shadow text-[11px] font-bold text-charcoal-900">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>{item.rating}</span>
            <span className="text-[10px] text-charcoal-400">({item.reviewCount || 40})</span>
          </div>
        )}

        {/* Unavailable Overlay */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-charcoal-950/70 backdrop-blur-[2px] flex items-center justify-center">
            <span className="px-4 py-1.5 rounded-full bg-red-600 text-white font-bold text-xs uppercase tracking-wider shadow">
              Sold Out Today
            </span>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Localized Subname (Amharic / Afaan Oromoo) */}
          {localizedSubname && (
            <p className="text-[11px] font-semibold text-berbere-700 tracking-wide mb-0.5">
              {localizedSubname}
            </p>
          )}
          <h3 className="text-base font-bold font-serif text-forest-950 group-hover:text-berbere-600 transition-colors line-clamp-1">
            {item.name}
          </h3>

          <p className="text-xs text-charcoal-500 mt-1.5 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Portion Options Pills (if more than 1) */}
          {item.portions && item.portions.length > 1 && (
            <div className="mt-3.5 space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block">
                Portion Size:
              </label>
              <div className="flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
                {item.portions.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setSelectedPortion(p.name)}
                    className={`text-[10px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                      selectedPortion === p.name
                        ? 'bg-forest-900 text-white shadow-sm'
                        : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
                    }`}
                  >
                    {p.name.split('(')[0].trim()}
                    {p.priceDelta ? ` (+${p.priceDelta})` : ''}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Spice Indicator if applicable */}
          {item.spiceLevel && item.spiceLevel !== 'Non-Spicy' && (
            <div className="mt-2.5 flex items-center space-x-1 text-[11px] text-amber-700">
              <Flame className="w-3.5 h-3.5 text-berbere-500 fill-berbere-500" />
              <span className="font-medium">{item.spiceLevel}</span>
            </div>
          )}
        </div>

        {/* Pricing & Add To Cart Button */}
        <div className="mt-5 pt-3.5 border-t border-cream-200/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-charcoal-400 block uppercase font-medium">Price</span>
            <span className="text-lg font-extrabold text-forest-950 tracking-tight">
              ETB {currentPrice.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={!item.isAvailable}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 shadow-sm ${
              !item.isAvailable
                ? 'bg-cream-200 text-charcoal-400 cursor-not-allowed'
                : isAddedAnimation
                  ? 'bg-emerald-600 text-white scale-105'
                  : 'bg-forest-900 hover:bg-forest-950 text-white hover:shadow hover:scale-[1.02] active:scale-95'
            }`}
          >
            {isAddedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-berbere-400" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
