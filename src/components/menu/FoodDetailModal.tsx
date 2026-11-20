import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Minus, 
  Clock, 
  Flame, 
  Star, 
  ShieldCheck, 
  Check, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { FoodItem, SpiceLevel } from '../../types';
import { useCart } from '../../context/CartContext';

interface FoodDetailModalProps {
  item: FoodItem | null;
  onClose: () => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({ item, onClose }) => {
  const { addToCart } = useCart();

  if (!item) return null;

  const [portion, setPortion] = useState(
    item.portions && item.portions.length > 0 ? item.portions[0].name : 'Standard'
  );
  const [spiceLevel, setSpiceLevel] = useState<SpiceLevel>(item.spiceLevel || 'Medium');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  // Calculate unit price based on portion
  let unitPrice = item.price;
  if (item.portions) {
    const found = item.portions.find(p => p.name === portion);
    if (found?.priceDelta) unitPrice += found.priceDelta;
  }

  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(item, quantity, portion, spiceLevel, notes);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-cream-200 z-10 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur text-charcoal-800 hover:text-charcoal-950 flex items-center justify-center shadow hover:scale-105 transition-transform"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image */}
        <div className="w-full md:w-1/2 relative bg-cream-100 min-h-[260px] md:min-h-full">
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {item.isChefSpecial && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-berbere-500 text-white uppercase tracking-wider">
                  Chef's Signature
                </span>
              )}
              {item.dietaryTags.map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/30 backdrop-blur text-white">
                  {tag}
                </span>
              ))}
            </div>
            {item.amharicName && (
              <p className="text-sm font-semibold text-berbere-300 drop-shadow">
                {item.amharicName}
              </p>
            )}
            <h2 className="text-xl font-bold font-serif leading-tight drop-shadow">
              {item.name}
            </h2>
          </div>
        </div>

        {/* Right Column: Details & Customizer */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-5">
          
          <div className="space-y-4">
            {/* Highlights row */}
            <div className="flex items-center justify-between text-xs text-charcoal-500 pb-3 border-b border-cream-200">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-berbere-600" />
                <span>Prep: {item.preparationTime || '20 min'}</span>
              </div>
              {item.calories && (
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-4 h-4 text-forest-700" />
                  <span>{item.calories} kcal</span>
                </div>
              )}
              {item.rating && (
                <div className="flex items-center space-x-1 text-amber-600 font-bold">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{item.rating} ({item.reviewCount || 35})</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-1">
                About this Dish
              </h4>
              <p className="text-xs text-charcoal-700 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Ingredients */}
            {item.ingredients && item.ingredients.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-1.5">
                  Fresh Ingredients
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {item.ingredients.map((ing, i) => (
                    <span 
                      key={i} 
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-cream-100 text-forest-950 font-medium"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Portion selection */}
            {item.portions && item.portions.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-forest-950 block">
                  Select Portion Size:
                </label>
                <div className="space-y-1.5">
                  {item.portions.map(p => (
                    <label 
                      key={p.name}
                      onClick={() => setPortion(p.name)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        portion === p.name 
                          ? 'border-forest-800 bg-forest-50 font-bold text-forest-950 shadow-sm'
                          : 'border-cream-200 hover:bg-cream-50 text-charcoal-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="portion" 
                          checked={portion === p.name} 
                          onChange={() => setPortion(p.name)}
                          className="accent-forest-800"
                        />
                        <span>{p.name}</span>
                      </div>
                      <span className="font-extrabold text-forest-900">
                        {p.priceDelta ? `+ ETB ${p.priceDelta}` : 'Included'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Spice Level selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-forest-950 flex items-center justify-between">
                <span>Spice Preference:</span>
                <span className="text-[11px] text-berbere-600 font-semibold flex items-center">
                  <Flame className="w-3.5 h-3.5 mr-0.5 fill-berbere-500 text-berbere-500" />
                  {spiceLevel}
                </span>
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['Non-Spicy', 'Mild', 'Medium', 'Hot Berbere'] as SpiceLevel[]).map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSpiceLevel(lvl)}
                    className={`py-1.5 text-[11px] rounded-lg font-medium transition-all ${
                      spiceLevel === lvl 
                        ? 'bg-berbere-600 text-white font-bold shadow-sm' 
                        : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Kitchen note */}
            <div>
              <label className="text-[11px] font-bold text-charcoal-500 block mb-1">
                Special Kitchen Request (Optional):
              </label>
              <input 
                type="text" 
                placeholder="e.g. Extra awaze, separate sauce, mild butter..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-cream-300 rounded-xl focus:outline-none focus:border-forest-700"
              />
            </div>

          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-cream-200 flex items-center justify-between space-x-3">
            
            {/* Quantity */}
            <div className="flex items-center space-x-2 bg-cream-100 px-3 py-2 rounded-xl border border-cream-200">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 text-charcoal-700 hover:text-forest-950 font-bold"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold w-6 text-center text-forest-950">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 text-charcoal-700 hover:text-forest-950 font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Cart button */}
            <button
              onClick={handleAddToCart}
              disabled={!item.isAvailable}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 ${
                !item.isAvailable
                  ? 'bg-cream-300 text-charcoal-500 cursor-not-allowed'
                  : isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-forest-900 to-forest-950 hover:from-forest-800 hover:to-forest-900 text-white hover:scale-[1.02] active:scale-95'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-berbere-400" />
                  <span>Add • ETB {totalPrice.toLocaleString()}</span>
                </>
              )}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
