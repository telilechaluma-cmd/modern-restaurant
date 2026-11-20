import React from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { reviews } = useRestaurant();

  return (
    <section className="py-20 bg-white border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-widest text-berbere-600 block mb-2">
            Real Customer Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-forest-950">
            Loved by Food Lovers in Addis
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-2">
            Over 5,000 satisfied orders delivered with smiles across the city.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-cream-50/70 p-6 rounded-3xl border border-cream-200 shadow-sm flex flex-col justify-between hover:border-berbere-300 transition-colors"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < rev.rating ? 'text-amber-500 fill-amber-500' : 'text-cream-300'
                      }`} 
                    />
                  ))}
                  <span className="text-xs font-bold text-forest-950 ml-1.5">{rev.rating}.0</span>
                </div>

                {/* Comment */}
                <p className="text-xs text-charcoal-700 leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-cream-200/90">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-forest-950 flex items-center">
                      <span>{rev.author}</span>
                      {rev.verifiedOrder && (
                        <span title="Verified Customer" className="inline-flex">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-1" />
                        </span>
                      )}
                    </h4>
                    <p className="text-[10px] text-charcoal-500">{rev.location}</p>
                  </div>
                  <span className="text-[10px] text-charcoal-400 font-medium">{rev.date}</span>
                </div>
                {rev.dishName && (
                  <div className="mt-2 text-[10px] font-semibold text-berbere-700 bg-berbere-50 px-2 py-0.5 rounded-md inline-block">
                    Ordered: {rev.dishName}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
