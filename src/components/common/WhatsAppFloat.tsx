import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';

export const WhatsAppFloat: React.FC = () => {
  const { settings } = useRestaurant();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const phone = settings.whatsappNumber ? settings.whatsappNumber.replace(/[^0-9]/g, '') : '251911234567';

  const handleSend = (text?: string) => {
    const msg = encodeURIComponent(text || customMsg || 'Hello TALILE Restaurant! I would like to make an inquiry regarding your food menu and delivery.');
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-cream-200 p-4 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-cream-200">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-forest-950">TALILE WhatsApp Support</h4>
                <p className="text-[11px] text-emerald-600 font-medium">● Typically replies in 5 minutes</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-charcoal-400 hover:text-charcoal-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-charcoal-700 space-y-2">
            <p className="bg-cream-100 p-2.5 rounded-xl text-charcoal-800 leading-relaxed">
              Selam! How can we assist you today? You can place an order directly or ask about any meal ingredients.
            </p>
            
            <div className="space-y-1.5 pt-1">
              <button
                onClick={() => handleSend('Selam TALILE! What are your daily chef specials today?')}
                className="w-full text-left text-xs px-3 py-1.5 rounded-lg border border-cream-300 hover:bg-cream-50 text-charcoal-800 transition-colors"
              >
                🍲 What are today's chef specials?
              </button>
              <button
                onClick={() => handleSend('Selam! I want to check my order delivery status.')}
                className="w-full text-left text-xs px-3 py-1.5 rounded-lg border border-cream-300 hover:bg-cream-50 text-charcoal-800 transition-colors"
              >
                🚴 Inquire about my order status
              </button>
            </div>

            <div className="pt-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full text-xs px-3 py-2 border border-cream-300 rounded-xl focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => handleSend()}
                className="w-full mt-2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow flex items-center justify-center space-x-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white px-4 py-3 rounded-full shadow-luxury hover:scale-105 active:scale-95 transition-all group"
        aria-label="WhatsApp Contact"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600 group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold tracking-wide pr-1 hidden sm:inline">
          Order via WhatsApp
        </span>
      </button>
    </div>
  );
};
