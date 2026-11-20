import { FoodItem, Category, RestaurantSettings, Review, Order, TableReservation } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-ethiopian',
    name: 'Traditional Ethiopian Food',
    slug: 'traditional-ethiopian',
    amharicName: 'ባህላዊ የኢትዮጵያ ምግቦች',
    oromoName: 'Nyaata Aadaa Itoophiyaa',
    description: 'Authentic slow-cooked stews, tender sauteed meats, and pure teff injera with rich Ethiopian butter (kibe) and organic spices.',
    imageUrl: '/images/dishes/shekla-tibs.jpg',
    icon: 'Flame'
  },
  {
    id: 'cat-breakfast',
    name: 'Breakfast',
    slug: 'breakfast',
    amharicName: 'ቁርስ',
    oromoName: 'Nyaata Ganamaa (Ciree)',
    description: 'Hearty traditional morning delights from honey-glazed Chechebsa to hot Ful Mudammas and freshly scrambled eggs.',
    imageUrl: '/images/dishes/chechebsa.png',
    icon: 'Sun'
  },
  {
    id: 'cat-lunch-dinner',
    name: 'Lunch and Dinner',
    slug: 'lunch-dinner',
    amharicName: 'ምሳ እና እራት',
    oromoName: 'Nyaata Guyyaa fi Galgalaa',
    description: 'Chef-crafted prime steaks, rosemary lamb racks, herb-roasted poultry, and fresh Italian pastas.',
    imageUrl: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
    icon: 'Utensils'
  },
  {
    id: 'cat-pizza-burgers',
    name: 'Pizza and Burgers',
    slug: 'pizza-burgers',
    amharicName: 'ፒዛ እና በርገር',
    oromoName: 'Piizaa fi Baargarii',
    description: 'Wood-fired sourdough artisan pizzas and juicy double-smashed gourmet burgers with house secret sauces.',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    icon: 'Pizza'
  },
  {
    id: 'cat-snacks-desserts',
    name: 'Snacks and Desserts',
    slug: 'snacks-desserts',
    amharicName: 'ጣፋጭ እና መክሰስ',
    oromoName: 'Mimmiltoo fi Miʼaawaa',
    description: 'Crisp golden sambusas, pistachio-crusted baklava, decadent chocolate lava cake, and honey pastries.',
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    icon: 'Cake'
  },
  {
    id: 'cat-drinks-juices',
    name: 'Drinks and Fresh Juices',
    slug: 'drinks-juices',
    amharicName: 'መጠጦች እና ትኩስ ጭማቂዎች',
    oromoName: 'Dhugaatii fi Cuunfaa Firii',
    description: 'Famous layered Ethiopian Spris juice, ceremonial spiced coffee, artisan macchiato, and refreshing mocktails.',
    imageUrl: '/images/dishes/coffee-ceremony.jpg',
    icon: 'Coffee'
  }
];

export const INITIAL_FOOD_ITEMS: FoodItem[] = [
  // Traditional Ethiopian Food
  {
    id: 'eth-01',
    name: 'TALILE Royal Doro Wat',
    amharicName: 'ታሊሌ ልዩ የሀበሻ ዶሮ ወጥ',
    oromoName: 'Kukkuubee Doro Wat Addaa',
    description: 'Slow-simmered tender chicken drumstick and thigh braised in caramelized shallots, authentic berbere spice blend, spiced clarified butter (nitir kibe), and boiled egg. Served with 2 freshly made teff injera.',
    price: 680,
    category: 'cat-ethiopian',
    imageUrl: '/images/dishes/doro-wat.jpg',
    isAvailable: true,
    isPopular: true,
    isChefSpecial: true,
    preparationTime: '25-35 mins',
    calories: 740,
    dietaryTags: ['Chef Special', 'Popular', 'Halal'],
    spiceLevel: 'Hot Berbere',
    portions: [
      { name: 'Single Serving (1 Drumstick + 1 Egg + 2 Injera)', priceDelta: 0 },
      { name: 'Double Feast (2 Drumsticks + 2 Eggs + 4 Injera)', priceDelta: 420 },
      { name: 'Family Platter (Whole Chicken Stew + 5 Injera + Ayeb)', priceDelta: 950 }
    ],
    ingredients: ['Free-range chicken', 'Organic berbere', 'Nitir kibe (clarified spiced butter)', 'Slow-cooked red onions', 'Boiled farm egg', 'Cardamom & garlic', 'Teff injera'],
    rating: 4.9,
    reviewCount: 142
  },
  {
    id: 'eth-02',
    name: 'Special Shekla Tibs',
    amharicName: 'ልዩ የሸክላ ጥብስ',
    oromoName: 'Tibs Shaklaa Addaa',
    description: 'Tender cubed prime beef tenderloin pan-seared with rosemary, sweet onions, green chili peppers, and seasoned Ethiopian butter. Served sizzling in a traditional clay pot over glowing charcoal with awaze and mitmita.',
    price: 590,
    category: 'cat-ethiopian',
    imageUrl: '/images/dishes/shekla-tibs.jpg',
    isAvailable: true,
    isPopular: true,
    isChefSpecial: true,
    preparationTime: '20-25 mins',
    calories: 680,
    dietaryTags: ['Popular', 'Chef Special', 'Halal'],
    spiceLevel: 'Medium',
    portions: [
      { name: 'Regular Portion (350g)', priceDelta: 0 },
      { name: 'Large Sharing (550g)', priceDelta: 320 }
    ],
    ingredients: ['Prime beef tenderloin', 'Fresh rosemary sprigs', 'Nitir kibe', 'Awaze pepper paste', 'Red onions', 'Green jalapeño'],
    rating: 4.8,
    reviewCount: 98
  },
  {
    id: 'eth-03',
    name: 'TALILE Grand Beyaynetu (Fasting Platter)',
    amharicName: 'ልዩ የበያይነቱ የጾም ማዕድ',
    oromoName: 'Wannyooma Beyaynetu Tsoomii',
    description: 'A colorful vegetarian rainbow feast featuring creamy Shiro, spicy Misir Wat (red lentils), Kik Alicha (yellow split peas), Gomen (collard greens), Atakilt Wat (cabbage & carrots), and fresh beet salad over soft teff injera.',
    price: 440,
    category: 'cat-ethiopian',
    imageUrl: '/images/dishes/beyaynetu.jpg',
    isAvailable: true,
    isPopular: true,
    isChefSpecial: false,
    preparationTime: '15-20 mins',
    calories: 520,
    dietaryTags: ['Vegan / Fasting (Tsom)', 'Vegetarian', 'Gluten-Free Teff', 'Popular'],
    spiceLevel: 'Medium',
    portions: [
      { name: 'Single Tray (7 Stew Varieties)', priceDelta: 0 },
      { name: 'Double Sharing Platter (9 Stew Varieties)', priceDelta: 280 }
    ],
    ingredients: ['Shiro', 'Misir lentils', 'Kik split peas', 'Sautéed collard greens', 'Spiced cabbage', 'Beetroot salad', 'Teff injera'],
    rating: 4.9,
    reviewCount: 167
  },
  {
    id: 'eth-04',
    name: 'Special Gurage Kitfo',
    amharicName: 'ልዩ የጉራጌ ክትፎ',
    oromoName: 'Kitfoo Guraggee Addaa',
    description: 'Freshly minced prime lean beef blended with authentic smoked mitmita and pure herbed nitir kibe (clarified butter). Served Lebleb (lightly warmed) or well-done, accompanied by Ayeb (herbed cottage cheese) and seasoned Gomen.',
    price: 640,
    category: 'cat-ethiopian',
    imageUrl: '/images/dishes/kitfo.jpg',
    isAvailable: true,
    isPopular: true,
    isChefSpecial: true,
    preparationTime: '15-20 mins',
    calories: 610,
    dietaryTags: ['Chef Special', 'Popular', 'Halal'],
    spiceLevel: 'Hot Berbere',
    portions: [
      { name: 'Regular Kitfo with Ayeb & Gomen', priceDelta: 0 },
      { name: 'Special Double Butter with Kocho & Injera', priceDelta: 220 }
    ],
    ingredients: ['Prime fresh beef sirloin', 'Pure nitir kibe', 'Authentic Gurage mitmita', 'House-made fresh ayeb', 'Collard greens', 'Fresh Kocho bread'],
    rating: 4.9,
    reviewCount: 115
  },
  {
    id: 'eth-05',
    name: 'Shiro Tegabino with Kibe',
    amharicName: 'ሽሮ ተጋቢኖ በቅቤ',
    description: 'Clay pot bubbling organic chickpea stew enriched with garlic, ginger, and spiced butter. Deeply aromatic, rich, and comforting.',
    price: 360,
    category: 'cat-ethiopian',
    imageUrl: '/images/dishes/shiro.jpg',
    isAvailable: true,
    isPopular: false,
    isChefSpecial: false,
    preparationTime: '15 mins',
    calories: 460,
    dietaryTags: ['Vegetarian', 'Gluten-Free Teff'],
    spiceLevel: 'Medium',
    portions: [
      { name: 'Traditional Clay Pot', priceDelta: 0 },
      { name: 'With Extra Spiced Butter (Kibe)', priceDelta: 60 }
    ],
    ingredients: ['Roasted spiced chickpea flour', 'Red onions', 'Garlic', 'Cardamom', 'Nitir kibe', 'Green chili'],
    rating: 4.7,
    reviewCount: 73
  },
  {
    id: 'eth-06',
    name: 'Zilzil Tibs (Ribbon Beef)',
    amharicName: 'ዝልዝል ጥብስ',
    description: 'Long ribbon-cut strips of tender marinated beef pan-roasted with caramelized shallots, fragrant rosemary, and fresh green chilies.',
    price: 610,
    category: 'cat-ethiopian',
    imageUrl: '/images/dishes/zilzil-tibs.jpg',
    isAvailable: true,
    isPopular: false,
    isChefSpecial: false,
    preparationTime: '20 mins',
    calories: 670,
    dietaryTags: ['Halal'],
    spiceLevel: 'Mild',
    portions: [
      { name: 'Regular Platter', priceDelta: 0 },
      { name: 'Large Platter', priceDelta: 250 }
    ],
    ingredients: ['Ribbon strip beef', 'Rosemary', 'Butter', 'Garlic', 'Jalapeno'],
    rating: 4.6,
    reviewCount: 52
  },

  // Breakfast
  {
    id: 'brk-01',
    name: 'Chechebsa with Pure Honey & Kibe (Kita Firfir)',
    amharicName: 'ጨጨብሳ በማር እና በቅቤ',
    oromoName: 'Caccabsaa Dhadhaa fi Dammaan',
    description: 'Freshly griddled shredded flatbread sautéed in rich Ethiopian spiced butter (nitir kibe) and gentle berbere, drizzled with pure Wenchi highland honey and served with chilled plain yogurt.',
    price: 350,
    category: 'cat-breakfast',
    imageUrl: '/images/dishes/chechebsa.png',
    isAvailable: true,
    isPopular: true,
    isChefSpecial: true,
    preparationTime: '15 mins',
    calories: 580,
    dietaryTags: ['Vegetarian', 'Popular', 'Chef Special'],
    spiceLevel: 'Mild',
    portions: [
      { name: 'Standard Bowl with Yogurt', priceDelta: 0 },
      { name: 'Special with 2 Farm Eggs & Double Honey', priceDelta: 120 }
    ],
    ingredients: ['Stone-ground wheat flour', 'Highland honey', 'Nitir kibe', 'Berbere spice', 'Natural curd yogurt'],
    rating: 4.9,
    reviewCount: 89
  },
  {
    id: 'brk-02',
    name: 'Special Ful Mudammas',
    amharicName: 'ልዩ ፉል በቅቤ እና በእንቁላል',
    oromoName: 'Fuulii Addaa Hanqaaquu fi Dhadhaan',
    description: 'Crushed fava beans simmered with cumin and olive oil or nitir kibe, garnished with diced tomatoes, red onions, jalapeños, feta-style ayeb cheese, hard-boiled egg, and warm crusty French bread.',
    price: 290,
    category: 'cat-breakfast',
    imageUrl: '/images/dishes/ful.jpg',
    isAvailable: true,
    isPopular: true,
    isChefSpecial: false,
    preparationTime: '12 mins',
    calories: 490,
    dietaryTags: ['Vegetarian', 'Popular'],
    spiceLevel: 'Mild',
    portions: [
      { name: 'Single Bowl with 2 Breads', priceDelta: 0 },
      { name: 'Special Ful (with Egg & Meat Tibs)', priceDelta: 140 }
    ],
    ingredients: ['Fava beans', 'Tomatoes', 'Red onion', 'Green chili', 'Boiled egg', 'Fresh cottage cheese', 'Crusty roll'],
    rating: 4.8,
    reviewCount: 76
  },
  {
    id: 'brk-03',
    name: 'TALILE Morning Scramble & Doro Tibs',
    amharicName: 'የጥዋት እንቁላል ፍርፍር በዶሮ ጥብስ',
    description: 'Three pasture-raised eggs scrambled with diced peppers, sweet red onions, and tender sautéed chicken morsels. Served with warm toasted bread.',
    price: 320,
    category: 'cat-breakfast',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isPopular: false,
    isChefSpecial: false,
    preparationTime: '15 mins',
    calories: 430,
    dietaryTags: ['Halal'],
    spiceLevel: 'Non-Spicy',
    portions: [
      { name: 'Standard Plate', priceDelta: 0 }
    ],
    ingredients: ['Farm eggs', 'Chicken breast', 'Sweet peppers', 'Herb butter', 'Toast'],
    rating: 4.7,
    reviewCount: 45
  },

  // Lunch and Dinner
  {
    id: 'ld-01',
    name: 'TALILE Prime Grilled Ribeye Steak',
    amharicName: 'ፕራይም ግሪልድ ሪባይ ስቴክ',
    description: '350g tender dry-aged ribeye steak grilled to perfection over charcoal, glazed with rosemary garlic herb butter. Served with roasted rosemary potatoes and seasonal grilled greens.',
    price: 880,
    category: 'cat-lunch-dinner',
    imageUrl: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isPopular: true,
    isChefSpecial: true,
    preparationTime: '25 mins',
    calories: 820,
    dietaryTags: ['Chef Special', 'Popular', 'Halal'],
    spiceLevel: 'Non-Spicy',
    portions: [
      { name: 'Regular 350g', priceDelta: 0 },
      { name: 'Bone-in Cowboy Cut 500g', priceDelta: 420 }
    ],
    ingredients: ['Aged prime beef ribeye', 'Fresh rosemary', 'Roasted garlic', 'Golden fingerling potatoes', 'Black peppercorn glaze'],
    rating: 4.9,
    reviewCount: 94
  },
  {
    id: 'ld-02',
    name: 'Herb-Crusted Lake Tana Fish Fillet',
    amharicName: 'የጣና ሀይቅ አሳ ፊሌ',
    description: 'Pan-seared Nile perch fillet with a crispy herb and lemon zest crust, accompanied by a light garlic butter cream sauce and jasmine rice.',
    price: 640,
    category: 'cat-lunch-dinner',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isPopular: false,
    isChefSpecial: false,
    preparationTime: '20 mins',
    calories: 510,
    dietaryTags: ['Halal'],
    spiceLevel: 'Non-Spicy',
    portions: [
      { name: 'Single Fillet with Rice', priceDelta: 0 }
    ],
    ingredients: ['Fresh Nile perch', 'Lemon zest', 'Parsley', 'Garlic butter', 'Steamed rice'],
    rating: 4.7,
    reviewCount: 48
  },
  {
    id: 'ld-03',
    name: 'Creamy Truffle & Mushroom Tagliatelle',
    amharicName: 'ክሬሚ ማሽሩም ፓስታ',
    description: 'Handmade Italian tagliatelle tossed in a rich wild porcini mushroom reduction, aromatic white truffle essence, and aged Parmesan shavings.',
    price: 520,
    category: 'cat-lunch-dinner',
    imageUrl: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isPopular: true,
    isChefSpecial: false,
    preparationTime: '20 mins',
    calories: 630,
    dietaryTags: ['Vegetarian'],
    spiceLevel: 'Non-Spicy',
    portions: [
      { name: 'Regular Bowl', priceDelta: 0 },
      { name: 'With Grilled Chicken Breast', priceDelta: 160 }
    ],
    ingredients: ['Handmade tagliatelle', 'Wild mushrooms', 'Heavy cream', 'White truffle oil', 'Parmigiano-Reggiano'],
    rating: 4.8,
    reviewCount: 63
  },

  // Pizza and Burgers
  {
    id: 'pb-01',
    name: 'TALILE Signature Smashed Truffle Burger',
    amharicName: 'ታሊሌ ስፔሻል ትረፍል በርገር',
    description: 'Two 120g 100% prime beef patties smashed crisp on the flattop, melted aged cheddar, caramelized balsamic onions, arugula, and black truffle mayo on a buttered brioche bun. Served with seasoned French fries.',
    price: 490,
    category: 'cat-pizza-burgers',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isPopular: true,
    isChefSpecial: true,
    preparationTime: '15-20 mins',
    calories: 780,
    dietaryTags: ['Popular', 'Chef Special', 'Halal'],
    spiceLevel: 'Non-Spicy',
    portions: [
      { name: 'Single Burger + Crispy Fries', priceDelta: 0 },
      { name: 'Triple Patty Monster Burger + Fries & Soda', priceDelta: 210 }
    ],
    ingredients: ['Prime minced beef', 'Aged cheddar', 'Balsamic onions', 'Truffle aioli', 'Brioche bun', 'Hand-cut fries'],
    rating: 4.9,
    reviewCount: 138
  },
  {
    id: 'pb-02',
    name: 'Wood-Fired Doro & Mozzarella Pizza',
    amharicName: 'የዶሮ እና ሞዛሬላ እንጨት ፒዛ',
    description: 'Authentic 48-hour fermented sourdough crust baked at 450°C in our stone oven. Topped with spiced Doro Wat reduction, pulled chicken breast, fresh buffalo mozzarella, and sweet red onions.',
    price: 560,
    category: 'cat-pizza-burgers',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isPopular: true,
    isChefSpecial: true,
    preparationTime: '15 mins',
    calories: 890,
    dietaryTags: ['Chef Special', 'Halal', 'Popular'],
    spiceLevel: 'Medium',
    portions: [
      { name: 'Medium (10 inch, 6 slices)', priceDelta: 0 },
      { name: 'Large (14 inch, 8 slices)', priceDelta: 260 }
    ],
    ingredients: ['Sourdough crust', 'San Marzano tomatoes', 'Fresh mozzarella', 'Shredded spiced chicken', 'Basil', 'Extra virgin olive oil'],
    rating: 4.8,
    reviewCount: 112
  },
  {
    id: 'pb-03',
    name: 'Classic Margherita Bufala Pizza',
    amharicName: 'ማርገሪታ ቡፋላ ፒዛ',
    description: 'Italian crushed San Marzano tomato sauce, fresh buffalo mozzarella, aromatic sweet basil leaves, and a drizzle of cold-pressed olive oil on our crispy sourdough crust.',
    price: 450,
    category: 'cat-pizza-burgers',
    imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isPopular: false,
    isChefSpecial: false,
    preparationTime: '12 mins',
    calories: 720,
    dietaryTags: ['Vegetarian'],
    spiceLevel: 'Non-Spicy',
    portions: [
      { name: 'Medium 10 inch', priceDelta: 0 },
      { name: 'Large 14 inch', priceDelta: 240 }
    ],
    ingredients: ['Crushed tomato sauce', 'Buffalo mozzarella', 'Fresh basil', 'Olive oil'],
    rating: 4.7,
    reviewCount: 65
  },

  // Snacks and Desserts
  {
    id: 'sd-01',
    name: 'Crispy Sambusa Trio (Beef & Lentil)',
    amharicName: 'ልዩ ሳምቡሳ (የስጋ እና የምስር)',
    description: 'Crispy pastry pockets fried golden brown. 2 filled with seasoned spiced minced beef and 2 with fragrant green lentil and jalapeño filling. Served with spicy dipping sauce.',
    price: 240,
    category: 'cat-snacks-desserts',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isPopular: true,
    isChefSpecial: false,
    preparationTime: '10 mins',
    calories: 320,
    dietaryTags: ['Popular', 'Halal'],
    spiceLevel: 'Mild',
    portions: [
      { name: '4 Pieces (2 Beef, 2 Lentil)', priceDelta: 0 },
      { name: '8 Pieces Party Plate', priceDelta: 190 }
    ],
    ingredients: ['Crispy phyllo wrap', 'Seasoned beef', 'Brown lentils', 'Onion', 'Garlic', 'Green chili'],
    rating: 4.8,
    reviewCount: 91
  },
  {
    id: 'sd-02',
    name: 'Molten Belgian Chocolate Lava Cake',
    amharicName: 'ሞልተን ቸኮሌት ኬክ',
    description: 'Warm rich dark chocolate cake with a luscious flowing molten center. Served with a scoop of artisanal vanilla bean gelato and fresh strawberry garnish.',
    price: 340,
    category: 'cat-snacks-desserts',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isPopular: true,
    isChefSpecial: true,
    preparationTime: '12 mins',
    calories: 520,
    dietaryTags: ['Vegetarian', 'Chef Special'],
    spiceLevel: 'Non-Spicy',
    portions: [
      { name: 'Individual Cake with 1 Scoop Gelato', priceDelta: 0 }
    ],
    ingredients: ['70% Belgian chocolate', 'Butter', 'Farm eggs', 'Cane sugar', 'Vanilla bean gelato'],
    rating: 4.9,
    reviewCount: 84
  },
  {
    id: 'sd-03',
    name: 'Pistachio Baklava with Highland Honey',
    amharicName: 'ባክላቫ በፒስታቺዮ እና ማር',
    description: 'Flaky layers of buttery crisp phyllo dough stuffed with roasted emerald pistachios and soaked in fragrant honey syrup with a hint of rose water.',
    price: 260,
    category: 'cat-snacks-desserts',
    imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isPopular: false,
    isChefSpecial: false,
    preparationTime: '5 mins',
    calories: 380,
    dietaryTags: ['Vegetarian'],
    spiceLevel: 'Non-Spicy',
    portions: [
      { name: '3 Pieces', priceDelta: 0 },
      { name: '6 Pieces Gift Box', priceDelta: 220 }
    ],
    ingredients: ['Phyllo pastry', 'Highland honey', 'Crushed pistachios', 'Clarified butter', 'Cardamom hint'],
    rating: 4.7,
    reviewCount: 57
  },

  // Drinks and Fresh Juices
  {
    id: 'drk-01',
    name: 'Addis Special Spris (Layered Trio Juice)',
    amharicName: 'ልዩ ስፕሪስ ጭማቂ (አቮካዶ፣ ማንጎ፣ ፓፓያ)',
    oromoName: 'Cuunfaa Ispiriisii (Abukaadoo, Maangoo, Phaaphaayyaa)',
    description: 'Addis Ababa’s famous layered fresh fruit puree: rich creamy avocado, sweet tropical mango, and ripe papaya. Served chilled with fresh lime squeeze and sweetened condensed drizzle.',
    price: 190,
    category: 'cat-drinks-juices',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isPopular: true,
    isChefSpecial: true,
    preparationTime: '5 mins',
    calories: 280,
    dietaryTags: ['Vegan / Fasting (Tsom)', 'Vegetarian', 'Popular', 'Chef Special'],
    spiceLevel: 'Non-Spicy',
    portions: [
      { name: 'Regular Glass (450ml)', priceDelta: 0 },
      { name: 'Large Mega Glass (650ml)', priceDelta: 70 }
    ],
    ingredients: ['Ripe Hass avocado', 'Fresh mango puree', 'Sweet papaya', 'Fresh lime wedge'],
    rating: 5.0,
    reviewCount: 210
  },
  {
    id: 'drk-02',
    name: 'Traditional Ethiopian Spiced Coffee Ceremony',
    amharicName: 'ባህላዊ የጀበና ቡና',
    oromoName: 'Buna Aadaa Jebenaa fi Qoloo',
    description: 'Freshly roasted Yirgacheffe organic single-origin coffee beans ground and brewed in a clay Jebena pot. Infused with aromatic cardamom and served with traditional roasted barley (kolo) and smoking frankincense.',
    price: 150,
    category: 'cat-drinks-juices',
    imageUrl: '/images/dishes/coffee-ceremony.jpg',
    isAvailable: true,
    isPopular: true,
    isChefSpecial: true,
    preparationTime: '10 mins',
    calories: 15,
    dietaryTags: ['Popular', 'Chef Special', 'Vegan / Fasting (Tsom)'],
    spiceLevel: 'Non-Spicy',
    portions: [
      { name: 'Single Fini Cup + Kolo Snack', priceDelta: 0 },
      { name: 'Full Jebena Pot (Serves 4)', priceDelta: 240 }
    ],
    ingredients: ['Yirgacheffe Arabica beans', 'Cardamom pods', 'Roasted barley (kolo)', 'Natural sugar'],
    rating: 5.0,
    reviewCount: 178
  },
  {
    id: 'drk-03',
    name: 'Addis Double Shot Macchiato',
    amharicName: 'ማኪያቶ',
    description: 'Rich dark espresso shot stained with velvety steamed whole milk froth. The undisputed favorite of Addis Ababa cafes.',
    price: 120,
    category: 'cat-drinks-juices',
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isPopular: true,
    isChefSpecial: false,
    preparationTime: '5 mins',
    calories: 90,
    dietaryTags: ['Vegetarian', 'Popular'],
    spiceLevel: 'Non-Spicy',
    portions: [
      { name: 'Standard Cup', priceDelta: 0 },
      { name: 'With Extra Double Shot', priceDelta: 40 }
    ],
    ingredients: ['Ethiopian Sidama espresso', 'Steamed fresh milk'],
    rating: 4.9,
    reviewCount: 132
  },
  {
    id: 'drk-04',
    name: 'Fresh Mint Limeade Cooler',
    amharicName: 'ትኩስ ናና ሎሚ ጭማቂ',
    description: 'Freshly squeezed limes muddled with garden mint leaves, pure cane syrup, and crushed sparkling ice. Crisp, tart, and deeply refreshing.',
    price: 160,
    category: 'cat-drinks-juices',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isPopular: false,
    isChefSpecial: false,
    preparationTime: '5 mins',
    calories: 120,
    dietaryTags: ['Vegan / Fasting (Tsom)'],
    spiceLevel: 'Non-Spicy',
    portions: [
      { name: 'Chilled Tall Glass', priceDelta: 0 }
    ],
    ingredients: ['Fresh limes', 'Mint leaves', 'Cane syrup', 'Sparkling water'],
    rating: 4.8,
    reviewCount: 46
  }
];

export const ADDIS_SUB_CITIES = [
  { name: 'Bole (Medhanialem / Atlas / Rwanda)', deliveryFee: 100, estimatedMinutes: '25-35 mins' },
  { name: 'Kazanchis & Kirkos', deliveryFee: 130, estimatedMinutes: '30-40 mins' },
  { name: 'Piassa & Arada', deliveryFee: 160, estimatedMinutes: '35-45 mins' },
  { name: 'Sarbet & Old Airport (Lideta)', deliveryFee: 140, estimatedMinutes: '30-40 mins' },
  { name: 'CMC & Ayat (Yeka)', deliveryFee: 180, estimatedMinutes: '40-50 mins' },
  { name: 'Gerji & Jackros', deliveryFee: 140, estimatedMinutes: '30-40 mins' },
  { name: 'Lebu & Jemo (Nifas Silk)', deliveryFee: 190, estimatedMinutes: '45-55 mins' },
  { name: 'Megenagna & Signal', deliveryFee: 130, estimatedMinutes: '25-35 mins' },
  { name: 'Gurd Shola & Salite Mehret', deliveryFee: 160, estimatedMinutes: '35-45 mins' },
  { name: 'Kolfe Keranio & Tor Hailoch', deliveryFee: 180, estimatedMinutes: '40-50 mins' },
  { name: 'Akaki Kality', deliveryFee: 220, estimatedMinutes: '50-60 mins' }
];

export const INITIAL_SETTINGS: RestaurantSettings = {
  name: 'TALILE Restaurant & Lounge',
  tagline: 'Modern Ethiopian Culinary Excellence & Online Food Ordering',
  phone1: '+251 911 234 567',
  phone2: '+251 922 890 123',
  whatsappNumber: '+251911234567',
  email: 'orders@talilerestaurant.com',
  address: 'Camerun Street, Near Bole Medhanialem Cathedral, Next to Edna Mall',
  subCity: 'Bole',
  city: 'Addis Ababa',
  country: 'Ethiopia',
  currency: 'ETB',
  openingHoursWeekday: '7:00 AM – 11:30 PM',
  openingHoursWeekend: '7:00 AM – 12:30 AM',
  isAcceptingOrders: true,
  baseDeliveryFee: 120,
  freeDeliveryThreshold: 2000,
  estimatedDeliveryMinutes: 35,
  telebirrMerchantId: '928471',
  telebirrAccountName: 'TALILE RESTAURANT PLC',
  cbeAccountNumber: '100029384756',
  cbeAccountName: 'TALILE CATERING & RESTAURANT SERVICES',
  announcement: '🎉 Fast delivery across all Addis Ababa sub-cities! Use code TALILE10 for 10% off your first online order.'
};

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: 'Dawit Alene',
    rating: 5,
    date: 'Yesterday',
    comment: 'The Royal Doro Wat was incredible! Deep authentic flavor, genuine nitir kibe fragrance, and came boiling hot to our apartment in Bole within 30 minutes. The Telebirr checkout was seamless.',
    dishName: 'TALILE Royal Doro Wat',
    location: 'Bole Rwanda, Addis Ababa',
    verifiedOrder: true
  },
  {
    id: 'rev-02',
    author: 'Selamawit Kebede',
    rating: 5,
    date: '3 days ago',
    comment: 'Ordered the Grand Beyaynetu for fasting day with my colleagues. The variety was generous and beautifully packed in sustainable trays with extra teff injera. 10/10 dining experience!',
    dishName: 'TALILE Grand Beyaynetu',
    location: 'Kazanchis, Addis Ababa',
    verifiedOrder: true
  },
  {
    id: 'rev-03',
    author: 'Michael Tadesse',
    rating: 5,
    date: '1 week ago',
    comment: 'Best smashed truffle burger in Addis by far. Double patty was juicy with perfect crispy edges, and the fresh avocado-mango spris juice is heavenly. Highly recommended!',
    dishName: 'TALILE Signature Smashed Truffle Burger',
    location: 'Old Airport, Addis Ababa',
    verifiedOrder: true
  },
  {
    id: 'rev-04',
    author: 'Bethlehem Haile',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The Shekla Tibs served sizzling on clay is unmatched. We regularly order for family Sunday dinners. Their delivery driver called politely and reached right at our gate.',
    dishName: 'Special Shekla Tibs',
    location: 'CMC Michael, Addis Ababa',
    verifiedOrder: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'TAL-89421',
    orderNumber: 'TAL-89421',
    createdAt: new Date(Date.now() - 1000 * 60 * 22).toISOString(), // 22 mins ago
    orderType: 'Delivery',
    items: [
      {
        id: 'cart-init-1',
        foodItem: INITIAL_FOOD_ITEMS[0], // Royal Doro Wat
        quantity: 1,
        selectedPortion: 'Single Serving (1 Drumstick + 1 Egg + 2 Injera)',
        selectedSpiceLevel: 'Hot Berbere',
        unitPrice: 680,
        specialInstructions: 'Please include extra awaze pepper on the side.'
      },
      {
        id: 'cart-init-2',
        foodItem: INITIAL_FOOD_ITEMS[14], // Addis Special Spris
        quantity: 2,
        selectedPortion: 'Regular Glass (450ml)',
        selectedSpiceLevel: 'Non-Spicy',
        unitPrice: 190
      }
    ],
    subtotal: 1060,
    deliveryFee: 100,
    discount: 0,
    tax: 0,
    total: 1160,
    customer: {
      fullName: 'Abebe Mengistu',
      phoneNumber: '+251 912 345 678',
      email: 'abebe.m@gmail.com',
      subCity: 'Bole (Medhanialem / Atlas / Rwanda)',
      deliveryAddress: 'Atlas Road, Bldg 4, Apt 3B',
      landmark: 'Behind Edna Mall',
      orderNotes: 'Call upon arrival at the security gate.'
    },
    paymentMethod: 'Telebirr',
    paymentStatus: 'Paid',
    paymentReference: 'TB-928471940',
    orderStatus: 'Out for Delivery',
    estimatedDeliveryTime: '15-20 mins',
    driverInfo: {
      name: 'Ermias Bekele',
      phone: '+251 944 112 233',
      vehicle: 'Motorcycle (Plate 3-78921 AA)'
    }
  },
  {
    id: 'TAL-89310',
    orderNumber: 'TAL-89310',
    createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    orderType: 'Delivery',
    items: [
      {
        id: 'cart-init-3',
        foodItem: INITIAL_FOOD_ITEMS[1], // Shekla Tibs
        quantity: 2,
        selectedPortion: 'Regular Portion (350g)',
        selectedSpiceLevel: 'Medium',
        unitPrice: 590
      }
    ],
    subtotal: 1180,
    deliveryFee: 130,
    discount: 118,
    couponCode: 'TALILE10',
    tax: 0,
    total: 1192,
    customer: {
      fullName: 'Helen Girma',
      phoneNumber: '+251 920 887 766',
      email: 'helen.girma@yahoo.com',
      subCity: 'Kazanchis & Kirkos',
      deliveryAddress: 'Kazanchis, UN-ECA Quarter',
      landmark: 'Near Interluxury Hotel'
    },
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    orderStatus: 'Delivered',
    estimatedDeliveryTime: 'Delivered'
  }
];

export const INITIAL_RESERVATIONS: TableReservation[] = [
  {
    id: 'res-01',
    fullName: 'Dr. Gemechu Daba',
    phoneNumber: '+251 911 445 566',
    date: '2026-10-26',
    time: '19:30',
    guests: '5-8 Persons (VIP Area)',
    specialNotes: 'Celebrating family graduation. Please reserve private VIP booth and prepare Buna ceremony.',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString()
  },
  {
    id: 'res-02',
    fullName: 'Lensa Tolosa',
    phoneNumber: '+251 922 778 899',
    date: '2026-10-26',
    time: '20:00',
    guests: '2 Persons',
    specialNotes: 'Anniversary dinner. Outdoor terrace table requested.',
    status: 'Pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
  }
];
