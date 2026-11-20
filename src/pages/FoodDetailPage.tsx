import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { useCart } from '../context/CartContext';
import { FoodItem, SpiceLevel } from '../types';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Star, 
  Clock, 
  Sparkles, 
  Flame, 
  Check, 
  Plus, 
  Minus,
  Share2
} from 'lucide-react';
import { FoodCard } from '../components/menu/FoodCard';

interface FoodDetailPageProps {
  itemId: string;
  navigate: (path: string) => void;
}

export const FoodDetailPage: React.FC<FoodDetailPageProps> = ({ itemId, navigate }) => {
  const { menuItems } = useRestaurant();
  const { addToCart } = useCart();

  const item = menuItems.find(i => i.id === itemId) || menuItems[0];

  const [portion, setPortion] = useState(
    item?.portions && item.portions.length > 0 ? item.portions[0].name : 'Standard'
  );
  const [spiceLevel, setSpiceLevel] = useState<SpiceLevel>(item?.spiceLevel || 'Medium');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-lg font-bold text-forest-950">Food item not found.</p>
          <button onClick={() => navigate('/menu')} className="mt-3 px-5 py-2 bg-forest-900 text-white rounded-xl text-xs font-bold">
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  // Price calculations
  let unitPrice = item.price;
  if (item.portions) {
    const found = item.portions.find(p => p.name === portion);
    if (found?.priceDelta) unitPrice += found.priceDelta;
  }
  const totalPrice = unitPrice * quantity;

  // Related dishes from same category
  const relatedDishes = menuItems.filter(i => i.category === item.category && i.id !== item.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(item, quantity, portion, spiceLevel, notes);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="min-h-screen bg-cream-50/70 pb-20">
      
      {/* Top back bar */}
      <div className="bg-white border-b border-cream-200 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => navigate('/menu')}
            className="flex items-center space-x-2 text-xs font-bold text-forest-950 hover:text-berbere-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Food Menu</span>
          </button>
          <span className="text-xs text-charcoal-400 font-medium">
            Category: {item.category.replace('cat-', '').replace('-', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Main Details Card */}
        <div className="bg-white rounded-3xl border border-cream-200 shadow-luxury overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Hero Image */}
          <div className="lg:col-span-7 relative bg-cream-100 min-h-[380px] lg:min-h-full">
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex flex-wrap gap-2 mb-2">
                {item.isChefSpecial && (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-berbere-500 text-white uppercase tracking-wider shadow">
                    👑 Chef's Signature Special
                  </span>
                )}
                {item.dietaryTags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/30 backdrop-blur text-white">
                    {tag}
                  </span>
                ))}
              </div>
              {item.amharicName && (
                <p className="text-base font-semibold text-berbere-300">
                  {item.amharicName}
                </p>
              )}
              <h1 className="text-2xl sm:text-4xl font-extrabold font-serif">
                {item.name}
              </h1>
            </div>
          </div>

          {/* Right Customization Form */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-5">
              
              {/* Highlights */}
              <div className="flex items-center justify-between pb-4 border-b border-cream-200 text-xs text-charcoal-500">
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-berbere-600" />
                  <span>Prep: {item.preparationTime || '20-25 mins'}</span>
                </div>
                {item.calories && (
                  <div className="flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-forest-700" />
                    <span>{item.calories} Calories</span>
                  </div>
                )}
                {item.rating && (
                  <div className="flex items-center space-x-1 text-amber-600 font-bold">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>{item.rating} ({item.reviewCount || 40} reviews)</span>
                  </div>
                )}
              </div>

              {/* Story */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-1.5">
                  About this Dish
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              {/* Ingredients */}
              {item.ingredients && item.ingredients.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-2">
                    Signature Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {item.ingredients.map((ing, idx) => (
                      <span key={idx} className="text-xs px-3 py-1 rounded-xl bg-cream-100 text-forest-950 font-medium">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Portion Selector */}
              {item.portions && item.portions.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-forest-950 block">
                    Choose Portion Size:
                  </label>
                  <div className="space-y-2">
                    {item.portions.map(p => (
                      <label
                        key={p.name}
                        onClick={() => setPortion(p.name)}
                        className={`flex items-center justify-between p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                          portion === p.name
                            ? 'border-forest-900 bg-forest-50 font-bold text-forest-950 shadow-sm'
                            : 'border-cream-200 hover:bg-cream-50 text-charcoal-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            name="detail-portion" 
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

              {/* Spice Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-forest-950 flex items-center justify-between">
                  <span>Spice Level:</span>
                  <span className="text-xs text-berbere-600 font-bold flex items-center">
                    <Flame className="w-3.5 h-3.5 mr-1 fill-berbere-500 text-berbere-500" />
                    {spiceLevel}
                  </span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Non-Spicy', 'Mild', 'Medium', 'Hot Berbere'] as SpiceLevel[]).map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSpiceLevel(lvl)}
                      className={`py-2 text-xs rounded-xl font-bold transition-all ${
                        spiceLevel === lvl
                          ? 'bg-berbere-600 text-white shadow-sm'
                          : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Note */}
              <div>
                <label className="text-xs font-bold text-forest-950 block mb-1">
                  Special Kitchen Note:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Extra awaze, separate sauce, mild butter..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 border border-cream-300 rounded-xl focus:outline-none focus:border-forest-800"
                />
              </div>

            </div>

            {/* Bottom Add Bar */}
            <div className="pt-6 border-t border-cream-200 flex items-center space-x-4">
              
              {/* Quantity */}
              <div className="flex items-center space-x-2 bg-cream-100 px-3 py-2.5 rounded-xl border border-cream-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-charcoal-700 hover:text-forest-950 font-bold"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-bold w-6 text-center text-forest-950">{quantity}</span>
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
                className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm shadow-luxury transition-all flex items-center justify-center space-x-2.5 ${
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
                    <span>Add to Cart • ETB {totalPrice.toLocaleString()}</span>
                  </>
                )}
              </button>

            </div>

          </div>

        </div>

        {/* Related Dishes */}
        {relatedDishes.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold font-serif text-forest-950 mb-6">
              You Might Also Relish
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedDishes.map(rel => (
                <FoodCard 
                  key={rel.id} 
                  item={rel} 
                  onOpenDetails={(food) => navigate(`/menu/${food.id}`)}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
