import React, { useState, useMemo, useEffect } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { FoodCard } from '../components/menu/FoodCard';
import { FoodDetailModal } from '../components/menu/FoodDetailModal';
import { FoodItem, DietaryTag } from '../types';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  X, 
  Utensils, 
  Sparkles,
  Flame,
  Check
} from 'lucide-react';

interface MenuPageProps {
  initialCategory?: string;
  navigate: (path: string) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ initialCategory, navigate }) => {
  const { menuItems, categories, favorites } = useRestaurant();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag[]>([]);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating' | 'name'>('popular');
  const [activeModalItem, setActiveModalItem] = useState<FoodItem | null>(null);

  // Check URL param for favorites
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('filter') === 'favorites') {
      setShowOnlyFavorites(true);
    }
  }, []);

  // Available dietary tags for quick filtering
  const dietaryOptions: DietaryTag[] = [
    'Vegan / Fasting (Tsom)',
    'Vegetarian',
    'Gluten-Free Teff',
    'Halal',
    'Chef Special'
  ];

  const toggleDietary = (tag: DietaryTag) => {
    setSelectedDietary(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setShowOnlyFavorites(false);
    setSearchQuery('');
    setSelectedDietary([]);
    setSortBy('popular');
  };

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // Favorites filter
      if (showOnlyFavorites && !favorites.includes(item.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesAmharic = item.amharicName?.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIng = item.ingredients?.some(i => i.toLowerCase().includes(query));
        if (!matchesName && !matchesAmharic && !matchesDesc && !matchesIng) {
          return false;
        }
      }

      // Dietary tags filter (must match all selected tags)
      if (selectedDietary.length > 0) {
        const hasAllTags = selectedDietary.every(tag => item.dietaryTags.includes(tag));
        if (!hasAllTags) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      // default 'popular'
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });
  }, [menuItems, selectedCategory, searchQuery, selectedDietary, sortBy]);

  return (
    <div className="min-h-screen bg-cream-50/60 pb-20">
      
      {/* Menu Header Banner */}
      <div className="bg-forest-950 text-cream-100 py-12 md:py-16 border-b-4 border-berbere-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-extrabold tracking-widest text-berbere-400 block mb-2">
            Authentic & Contemporary Cuisine
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white">
            TALILE Food Menu
          </h1>
          <p className="text-xs sm:text-sm text-cream-300 mt-2 max-w-xl mx-auto leading-relaxed">
            From royal slow-simmered Habesha stews to crispy Italian wood-fired sourdough pizzas. Filter by your dietary preferences or search your cravings.
          </p>

          {/* Search bar inside header */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by dish name, ingredients (e.g. Doro, Tibs, Shiro, Burger, Spris)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 bg-white text-forest-950 text-xs sm:text-sm rounded-2xl shadow-luxury focus:outline-none focus:ring-2 focus:ring-berbere-500 font-medium"
              />
              <Search className="w-5 h-5 text-charcoal-400 absolute left-4 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3.5 text-charcoal-400 hover:text-charcoal-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Category Pills Slider */}
        <div className="overflow-x-auto pb-4 no-scrollbar">
          <div className="flex items-center space-x-2.5 min-w-max">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setShowOnlyFavorites(false);
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5 ${
                selectedCategory === 'all' && !showOnlyFavorites
                  ? 'bg-forest-900 text-white shadow'
                  : 'bg-white text-charcoal-700 hover:bg-cream-100 border border-cream-200'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>All Dishes ({menuItems.length})</span>
            </button>

            {/* Favorites Pill */}
            <button
              onClick={() => {
                setShowOnlyFavorites(!showOnlyFavorites);
                setSelectedCategory('all');
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5 ${
                showOnlyFavorites
                  ? 'bg-red-600 text-white shadow'
                  : 'bg-white text-charcoal-700 hover:bg-cream-100 border border-cream-200'
              }`}
            >
              <span>❤️ Favorites ({favorites.length})</span>
            </button>

            {categories.map((cat) => {
              const count = menuItems.filter(i => i.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-forest-900 text-white shadow'
                      : 'bg-white text-charcoal-700 hover:bg-cream-100 border border-cream-200'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-forest-800 text-cream-200' : 'bg-cream-100 text-charcoal-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filter & Sort Toolbar */}
        <div className="mt-4 p-4 bg-white rounded-2xl border border-cream-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Dietary Checkboxes */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider mr-1">
              Dietary:
            </span>
            {dietaryOptions.map((tag) => {
              const isSelected = selectedDietary.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleDietary(tag)}
                  className={`text-[11px] px-3 py-1.5 rounded-xl font-medium transition-all flex items-center space-x-1 ${
                    isSelected
                      ? 'bg-emerald-800 text-white font-bold shadow-sm'
                      : 'bg-cream-100 hover:bg-cream-200 text-charcoal-700'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 mr-0.5" />}
                  <span>{tag}</span>
                </button>
              );
            })}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <ArrowUpDown className="w-4 h-4 text-charcoal-500" />
            <span className="text-xs font-bold text-charcoal-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs p-2 bg-cream-50 border border-cream-300 rounded-xl font-semibold text-forest-950 focus:outline-none focus:border-forest-800"
            >
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High (ETB)</option>
              <option value="price-desc">Price: High to Low (ETB)</option>
              <option value="rating">Top Customer Rated</option>
              <option value="name">Alphabetical (A - Z)</option>
            </select>
          </div>

        </div>

        {/* Active Filter Indicators */}
        {(selectedCategory !== 'all' || selectedDietary.length > 0 || searchQuery) && (
          <div className="mt-3 flex items-center justify-between text-xs text-charcoal-500 px-2">
            <div className="flex items-center space-x-2">
              <span>Showing <strong>{filteredItems.length}</strong> items</span>
            </div>
            <button
              onClick={clearAllFilters}
              className="text-xs text-red-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Food Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-cream-200 mt-6 p-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-cream-100 flex items-center justify-center text-4xl mb-4">
              🔍
            </div>
            <h3 className="text-lg font-bold font-serif text-forest-950">
              No matching culinary dishes found
            </h3>
            <p className="text-xs text-charcoal-500 mt-1 max-w-md mx-auto">
              We couldn't find any meals matching your current search or dietary filters. Try broadening your criteria.
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-5 px-6 py-2.5 bg-forest-900 text-white rounded-xl text-xs font-bold hover:bg-forest-800 transition-colors shadow"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {filteredItems.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                onOpenDetails={(food) => setActiveModalItem(food)}
              />
            ))}
          </div>
        )}

      </div>

      {/* Food Detail Modal */}
      <FoodDetailModal
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
      />

    </div>
  );
};
