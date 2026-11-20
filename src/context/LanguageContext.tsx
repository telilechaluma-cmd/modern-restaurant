import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'om' | 'am';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.menu': 'Food Menu',
    'nav.reservation': 'Book a Table',
    'nav.track': 'Track Order',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.cart': 'Cart',
    'nav.signIn': 'Sign In',
    'nav.admin': 'Admin Mode',
    'nav.hours': 'Open Daily: 7:00 AM – 11:30 PM',
    'nav.hotline': 'Hotline',
    
    // Hero
    'hero.badge': "Addis Ababa's Premier Culinary Experience",
    'hero.location': 'Bole Medhanialem',
    'hero.title1': 'Delicious Food,',
    'hero.title2': 'Delivered Fresh',
    'hero.title3': 'to Your Door.',
    'hero.subtitle': 'Discover your favorite meals and order online in just a few clicks. From slow-simmered Royal Doro Wat and sizzling Shekla Tibs to artisanal wood-fired pizzas and fresh layered Spris juices.',
    'hero.orderNow': 'Order Now',
    'hero.exploreMenu': 'Explore Menu',
    'hero.fastDelivery': 'Fast Delivery',
    'hero.fastDeliverySub': 'Across Addis Ababa',
    'hero.authenticKibe': 'Authentic Kibe',
    'hero.authenticKibeSub': 'Highland spices',
    'hero.safePay': 'Telebirr & COD',
    'hero.safePaySub': 'Safe payments',

    // Categories
    'cat.heading': 'Browse by Categories',
    'cat.subheading': 'Curated Culinary Selection',
    'cat.viewAll': 'View Complete Menu',

    // Popular
    'pop.heading': 'Popular Dishes & Chef Specials',
    'pop.subheading': 'Crafted with Ethiopian Heritage',
    'pop.desc': 'Freshly prepared by our master chefs using authentic Ethiopian spices, pure butter, and top quality produce.',
    'pop.all': 'All Favorites',
    'pop.habesha': 'Habesha Classics',
    'pop.chef': "👑 Chef's Specials",
    'pop.viewMore': 'Explore Complete 30+ Meal Menu',

    // Why Choose Us
    'why.heading': 'Why Addis Ababa Chooses TALILE',
    'why.subheading': 'The TALILE Standard',
    'why.desc': 'Every dish we prepare reflects our obsession with quality, heritage Ethiopian flavors, and exceptional hospitality.',

    // Testimonials
    'test.heading': 'Loved by Food Lovers in Addis',
    'test.subheading': 'Real Customer Stories',

    // Cart
    'cart.title': 'Your Food Cart',
    'cart.empty': 'Your plate is empty',
    'cart.emptyDesc': 'Explore our royal Ethiopian specialties, wood-fired pizzas, and gourmet burgers.',
    'cart.browse': 'Browse Menu',
    'cart.doorDelivery': 'Door Delivery',
    'cart.pickup': 'Bole Pickup (FREE)',
    'cart.subtotal': 'Subtotal',
    'cart.deliveryFee': 'Delivery Fee',
    'cart.discount': 'Discount',
    'cart.total': 'Total Amount',
    'cart.checkout': 'Checkout',
    'cart.viewFull': 'View Full Cart',
    'cart.add': 'Add to Cart',
    'cart.added': 'Added!',

    // Common
    'common.price': 'Price',
    'common.prepTime': 'Prep',
    'common.calories': 'kcal',
    'common.orderViaWhatsApp': 'Order via WhatsApp',
    'common.reviews': 'Reviews'
  },

  om: {
    // Nav (Afaan Oromoo)
    'nav.home': 'Fuula Duraa',
    'nav.menu': 'Baafata Nyaataa',
    'nav.reservation': 'Teessoo Qabadhaa',
    'nav.track': 'Ajaja Hordofaa',
    'nav.about': 'Waaʼee Keenya',
    'nav.contact': 'Nu Qunnamaa',
    'nav.cart': 'Goochannoo',
    'nav.signIn': 'Seensaa',
    'nav.admin': 'Bulchiinsa',
    'nav.hours': 'Guyyaa Hunda Banaadha: 1:00 WD – 5:30 WB',
    'nav.hotline': 'Sarara Hatattamaa',

    // Hero
    'hero.badge': 'Muuuxannoo Nyaata Qulqullina Olaanaa Finfinnee',
    'hero.location': 'Boolee Madihaanalam',
    'hero.title1': 'Nyaata Miʼaawaa,',
    'hero.title2': 'Haarawaan',
    'hero.title3': 'Dhaqqabsiifamu.',
    'hero.subtitle': 'Nyaata jaallattan filadhaatii daqiiqaa muraasa keessatti toora interneetiitiin ajajaa. Doro Wat aadaa fi Tibs dhangaggaawaa irraa hanga piizaa fi spriisii firii qabbanaawwaatti.',
    'hero.orderNow': 'Amma Ajajaa',
    'hero.exploreMenu': 'Baafata Ilaalaa',
    'hero.fastDelivery': 'Dhaqqabsiisa Ariifataa',
    'hero.fastDeliverySub': 'Kutaa Finfinnee Hunda',
    'hero.authenticKibe': 'Dhadhaa Qulqulluu',
    'hero.authenticKibeSub': 'Urgooftuu gaarreenii',
    'hero.safePay': 'Telebirr fi COD',
    'hero.safePaySub': 'Kaffaltii amansiisaa',

    // Categories
    'cat.heading': 'Gosoota Nyaataan Filadhaa',
    'cat.subheading': 'Filannoo Nyaata Qophaaʼee',
    'cat.viewAll': 'Baafata Guutuu Ilaalaa',

    // Popular
    'pop.heading': 'Nyaatawwan Filatamoofi Addaa',
    'pop.subheading': 'Aadaa Nyaata Biyyolessaatiin Qophaaʼe',
    'pop.desc': 'Ogeeyyii keenyaan dhadhaa qulqulluu fi qoricha aadaatiin miʼeeffamee kan dhihaatu.',
    'pop.all': 'Hunda Jaallatamaa',
    'pop.habesha': 'Nyaata Aadaa',
    'pop.chef': '👑 Addaa Ogeessaa',
    'pop.viewMore': 'Nyaatawwan 30+ Hunda Ilaalaa',

    // Why Choose Us
    'why.heading': 'Maaliif TALILE Filatu?',
    'why.subheading': 'Ulaagaa TALILE',
    'why.desc': 'Nyaanni qopheessinu hundi qulqullina, dhandhama gaarii fi simannaa kabajamaa agarsiisa.',

    // Testimonials
    'test.heading': 'Maamiltoota Jaallatamoo Keenya',
    'test.subheading': 'Yaada Maamiltootaa',

    // Cart
    'cart.title': 'Goochannoo Nyaataa',
    'cart.empty': 'Goochannoon keessan duwwaadha',
    'cart.emptyDesc': 'Nyaatawwan aadaa, piizaa fi burger miʼaawaa keenya daawwadhaatii ajajaa.',
    'cart.browse': 'Baafata Daawwadhaa',
    'cart.doorDelivery': 'Manatti Dhaqqabsiisuu',
    'cart.pickup': 'Booleetti Fudhadhaa (BILISA)',
    'cart.subtotal': 'Idaʼama',
    'cart.deliveryFee': 'Kaffaltii Dhaqqabsiisaa',
    'cart.discount': 'Hirʼifama',
    'cart.total': 'Idaʼama Waliigalaa',
    'cart.checkout': 'Kaffaltiitti Ceʼaa',
    'cart.viewFull': 'Goochannoo Guutuu',
    'cart.add': 'Goochannootti Dabalaa',
    'cart.added': 'Dabalameera!',

    // Common
    'common.price': 'Gatii',
    'common.prepTime': 'Qophii',
    'common.calories': 'Kcal',
    'common.orderViaWhatsApp': 'WhatsApp-iin Ajajaa',
    'common.reviews': 'Madaallii'
  },

  am: {
    // Nav (አማርኛ)
    'nav.home': 'ዋና ገጽ',
    'nav.menu': 'የምግብ ሜኑ',
    'nav.reservation': 'ቦታ ይያዙ',
    'nav.track': 'ትዕዛዝ መከታተያ',
    'nav.about': 'ስለ እኛ',
    'nav.contact': 'አግኙን',
    'nav.cart': 'ጋሪ',
    'nav.signIn': 'ይግቡ',
    'nav.admin': 'አስተዳዳሪ',
    'nav.hours': 'ሁሌም ክፍት፡ ከጠዋቱ 1:00 – ማታ 5:30',
    'nav.hotline': 'ቀጥታ መስመር',

    // Hero
    'hero.badge': 'የአዲስ አበባ ምርጥ የምግብ ተሞክሮ',
    'hero.location': 'ቦሌ መድኃኔዓለም',
    'hero.title1': 'ጣፋጭ ምግብ፣',
    'hero.title2': 'ትኩስ ሆኖ በታማኝነት',
    'hero.title3': 'እስከ ደጃፍዎ።',
    'hero.subtitle': 'የሚወዱትን ምግብ በጥቂት ጠቅታዎች ብቻ ይዘዙ። ከልዩ የሀበሻ ዶሮ ወጥ እና የሸክላ ጥብስ እስከ ፒዛ እና ትኩስ የተደራረበ ስፕሪስ ጭማቂ ድረስ።',
    'hero.orderNow': 'አሁን ይዘዙ',
    'hero.exploreMenu': 'ሜኑ ይመልከቱ',
    'hero.fastDelivery': 'ፈጣን ማድረስ',
    'hero.fastDeliverySub': 'መላው አዲስ አበባ',
    'hero.authenticKibe': 'ንፁህ ቅቤ',
    'hero.authenticKibeSub': 'የሀገር ባህል ቅመሞች',
    'hero.safePay': 'ቴሌብር እና ሲኦዲ',
    'hero.safePaySub': 'አስተማማኝ ክፍያ',

    // Categories
    'cat.heading': 'በምግብ ዘርፍ ይምረጡ',
    'cat.subheading': 'የተመረጡ ምግቦች',
    'cat.viewAll': 'ሙሉ ሜኑ ይመልከቱ',

    // Popular
    'pop.heading': 'ተወዳጅ እና የሼፍ ልዩ ምግቦች',
    'pop.subheading': 'በባህላዊ ጣዕም የተዘጋጁ',
    'pop.desc': 'በዋና ሼፎቻችን ንፁህ የሀበሻ ቅቤ እና ጥራት ያላቸው ጥሬ እቃዎች የተዘጋጁ።',
    'pop.all': 'ሁሉም ተወዳጆች',
    'pop.habesha': 'ባህላዊ ምግቦች',
    'pop.chef': '👑 የሼፍ ልዩ',
    'pop.viewMore': 'ሁሉንም 30+ ምግቦች ይመልከቱ',

    // Why Choose Us
    'why.heading': 'ለምን ታሊሌን ይመርጣሉ?',
    'why.subheading': 'የታሊሌ ጥራት መለኪያ',
    'why.desc': 'እያንዳንዱ የምናዘጋጀው ምግብ ለጥራት፣ ለጣዕም እና ለእንግዳ ተቀባይነት ያለንን ክብር ያሳያል።',

    // Testimonials
    'test.heading': 'የተከበሩ ደንበኞቻችን ምስክርነት',
    'test.subheading': 'የደንበኞች አስተያየት',

    // Cart
    'cart.title': 'የምግብ ቅርጫት',
    'cart.empty': 'ቅርጫትዎ ባዶ ነው',
    'cart.emptyDesc': 'ባህላዊ ምግቦቻችንን፣ ፒዛዎችን እና በርገሮችን ይመልከቱ እና ይዘዙ።',
    'cart.browse': 'ሜኑ ይመልከቱ',
    'cart.doorDelivery': 'ቤት ድረስ ማድረስ',
    'cart.pickup': 'ከቦሌ መውሰድ (ነፃ)',
    'cart.subtotal': 'ንዑስ ድምር',
    'cart.deliveryFee': 'የማድረሻ ክፍያ',
    'cart.discount': 'ቅናሽ',
    'cart.total': 'ጠቅላላ ድምር',
    'cart.checkout': 'ወደ ክፍያ ይቀጥሉ',
    'cart.viewFull': 'ሙሉ ቅርጫት ይመልከቱ',
    'cart.add': 'ወደ ቅርጫት ጨምር',
    'cart.added': 'ተጨምሯል!',

    // Common
    'common.price': 'ዋጋ',
    'common.prepTime': 'ዝግጅት',
    'common.calories': 'ካሎሪ',
    'common.orderViaWhatsApp': 'በዋትስአፕ ይዘዙ',
    'common.reviews': 'ግምገማዎች'
  }
};

const LANG_STORAGE_KEY = 'talile_language_v1';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY) as Language;
      return saved && (saved === 'en' || saved === 'om' || saved === 'am') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) {
      console.error(e);
    }
  };

  const t = (key: string): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
