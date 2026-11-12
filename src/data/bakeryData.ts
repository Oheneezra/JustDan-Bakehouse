import { BreadProduct, KioskLocation, ReviewItem } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_sourdough_crust_1794307625728.jpg';
export const FOCACCIA_IMAGE = '/src/assets/images/product_truffle_focaccia_1794307592028.jpg';
export const BRIOCHE_IMAGE = '/src/assets/images/product_brioche_challah_1794307591760.jpg';
export const KIOSK_MACHINE_IMAGE = '/src/assets/images/bakery_station_kiosk_1794307592296.jpg';
export const PASTRIES_IMAGE = '/src/assets/images/product_artisan_pastries_1794445054354.jpg';
export const DRINKS_IMAGE = '/src/assets/images/product_bakery_drinks_1794445054696.jpg';

export const BRAND_NAME = 'JustDan Bakehouse';
export const BRAND_SHORT = 'JustDan';

export const PRODUCTS: BreadProduct[] = [
  // --- BREADS ---
  {
    id: 'country-wild-sourdough',
    name: 'Heritage Wild Sourdough Boule',
    category: 'breads',
    description: '72-hour cold fermented wild sourdough with blistered mahogany crust and an open honeycomb crumb.',
    longDescription: 'Our flagship loaf. Crafted from organic heritage wheat flour and our 8-year-old sourdough mother. Naturally fermented for 72 hours, then flashed on stone hearth at 285°C to create an audibly crisp crackle and tender custard crumb with balanced lactic acidity.',
    price: 48,
    bakeTimeMinutes: 3,
    crustType: 'Blistered & Crusty',
    volumeOrWeight: '750g Boule',
    ingredients: ['Stoneground Wheat Flour', 'Wild Sourdough Starter', 'Sea Salt', 'Filtered Spring Water'],
    allergens: ['Gluten (Wheat)'],
    image: HERO_IMAGE,
    calories: 210,
    isPopular: true,
    flavorNotes: ['Toasted hazelnut', 'Lactic tang', 'Smoked caramel crust'],
    dietary: ['vegan', 'organic']
  },
  {
    id: 'truffle-rosemary-focaccia',
    name: 'Roasted Garlic & Rosemary Focaccia',
    category: 'breads',
    description: 'Cloud-soft olive oil crumb blistered with slow-roasted garlic confit, fresh rosemary, and Maldon salt.',
    longDescription: 'Drenched in extra virgin olive oil and fermented to maximum aerated bubbling. Dimpled by hand with confit garlic cloves, blistered heirloom cherry tomatoes, mountain rosemary, and flaky sea salt. Crispy fried bottom with pillow-soft interior.',
    price: 52,
    bakeTimeMinutes: 3,
    crustType: 'Golden & Tender',
    volumeOrWeight: '600g Slab',
    ingredients: ['Tipo 00 Flour', 'Extra Virgin Olive Oil', 'Confit Garlic', 'Fresh Rosemary', 'Flaky Maldon Salt', 'Yeast'],
    allergens: ['Gluten (Wheat)'],
    image: FOCACCIA_IMAGE,
    calories: 260,
    isPopular: true,
    isNew: true,
    flavorNotes: ['Roasted sweet allium', 'Fruity olive oil', 'Herbaceous pine'],
    dietary: ['vegan']
  },
  {
    id: 'golden-honey-brioche',
    name: 'Braided Golden Honey Brioche',
    category: 'breads',
    description: 'French butter braided brioche glazed with raw forest honey and toasted golden sesame seeds.',
    longDescription: 'Enriched with 38% cultured grass-fed butter and pasture-raised eggs. Gently braided and brushed with wild Volta forest honey before undergoing a rapid hot stone flash that gives it a lacquered amber sheen with feather-light pull-apart layers.',
    price: 45,
    bakeTimeMinutes: 2,
    crustType: 'Pillowy Soft',
    volumeOrWeight: '550g Loaf',
    ingredients: ['Heritage Bread Flour', 'Cultured Butter (82% fat)', 'Egg Yolks', 'Raw Forest Honey', 'Toasted Sesame', 'Cane Sugar', 'Sea Salt'],
    allergens: ['Gluten (Wheat)', 'Dairy (Butter)', 'Eggs', 'Sesame'],
    image: BRIOCHE_IMAGE,
    calories: 290,
    isPopular: true,
    flavorNotes: ['Sweet cream butter', 'Warm blossom honey', 'Nutty sesame'],
    dietary: ['vegetarian']
  },
  {
    id: 'jalapeno-sharp-cheddar',
    name: 'Blistered Jalapeño & Smoked Cheddar Loaf',
    category: 'breads',
    description: 'Rustic sourdough folded with aged cheddar pockets and fire-charred jalapeños that crisp on the crust.',
    longDescription: 'Chunks of 18-month aged cheddar cheese melt inside the crumb and caramelize into crunchy crispy frico skirts around the blistered crust. Balanced with the smoky warmth of green jalapeños and cracked black pepper.',
    price: 56,
    bakeTimeMinutes: 3,
    crustType: 'Blistered & Crusty',
    volumeOrWeight: '700g Loaf',
    ingredients: ['Bread Flour', 'Wild Sourdough Culture', 'Aged Cheddar Cheese', 'Charred Jalapeños', 'Sea Salt', 'Black Pepper'],
    allergens: ['Gluten (Wheat)', 'Dairy (Milk/Cheese)'],
    image: HERO_IMAGE,
    calories: 280,
    flavorNotes: ['Sharp caramelized cheese', 'Mild jalapeño heat', 'Woodfire crunch'],
    dietary: ['vegetarian']
  },
  {
    id: 'kalamata-rosemary-ciabatta',
    name: 'Kalamata Olive & Thyme Ciabatta Slipper',
    category: 'breads',
    description: 'High hydration Italian ciabatta studded with Greek Kalamata olives and garden thyme.',
    longDescription: 'An 85% hydration dough resulting in immense translucent air pockets. Each bite brings briny bursts of whole pitted Kalamata olives, crushed coriander, and garden thyme with a delicate, wafer-thin crackly crust.',
    price: 42,
    bakeTimeMinutes: 3,
    crustType: 'Blistered & Crusty',
    volumeOrWeight: '500g Slipper',
    ingredients: ['Italian Wheat Flour', 'Kalamata Olives', 'Fresh Thyme', 'Extra Virgin Olive Oil', 'Sea Salt', 'Levain'],
    allergens: ['Gluten (Wheat)'],
    image: FOCACCIA_IMAGE,
    calories: 220,
    flavorNotes: ['Briny olive punch', 'Aromatic thyme', 'Toasted grain'],
    dietary: ['vegan']
  },

  // --- PASTRIES ---
  {
    id: 'french-butter-croissant',
    name: 'Artisan French Butter Croissant',
    category: 'pastries',
    description: '36 laminated flaky layers of grass-fed Normandy butter, honeycomb interior, and delicate golden shatter.',
    longDescription: 'Our bakers laminate French Normandy butter through delicate sourdough-enriched brioche dough over 3 days. Baked to an iridescent amber gold with paper-thin crisp flakes outside and an ethereal honeycomb lattice within.',
    price: 28,
    bakeTimeMinutes: 2,
    crustType: 'Ultra-Flaky Shatter',
    volumeOrWeight: 'Pack of 2',
    ingredients: ['T55 French Flour', 'Normandy AOP Butter (84%)', 'Whole Milk', 'Brown Cane Sugar', 'Sea Salt', 'Yeast'],
    allergens: ['Gluten (Wheat)', 'Dairy (Butter)', 'Milk'],
    image: PASTRIES_IMAGE,
    calories: 240,
    isPopular: true,
    flavorNotes: ['Rich caramelized butter', 'Subtle sweetness', 'Nutty toasted crust'],
    dietary: ['vegetarian']
  },
  {
    id: 'pain-au-chocolat',
    name: 'Valrhona Double Pain au Chocolat',
    category: 'pastries',
    description: 'Golden laminated puff pastry packed with two generous batons of 70% dark Valrhona French chocolate.',
    longDescription: 'A classic Viennoiserie masterpiece. Flaky butter layers wrap around two molten bars of bittersweet Valrhona chocolate that gently melt when reheated in the 285°C flash oven for 90 seconds.',
    price: 32,
    bakeTimeMinutes: 2,
    crustType: 'Ultra-Flaky Shatter',
    volumeOrWeight: 'Pack of 2',
    ingredients: ['French Flour', 'Cultured Butter', 'Valrhona 70% Dark Chocolate', 'Organic Milk', 'Sea Salt', 'Sugar'],
    allergens: ['Gluten (Wheat)', 'Dairy (Butter)', 'Milk'],
    image: PASTRIES_IMAGE,
    calories: 290,
    isPopular: true,
    isNew: true,
    flavorNotes: ['Bittersweet cocoa', 'Warm molten fudge', 'Crisp butter layers'],
    dietary: ['vegetarian']
  },
  {
    id: 'cardamom-cinnamon-bun',
    name: 'Cardamom & Brown Butter Morning Bun',
    category: 'pastries',
    description: 'Swirled croissant dough rolled in freshly ground green cardamom, cinnamon sugar, and pearl crystals.',
    longDescription: 'Inspired by Scandinavian fika bakeries. Caramelized edges dusted with crunchy Swedish pearl sugar, infused with crushed fragrant cardamom and cinnamon brown butter syrup.',
    price: 30,
    bakeTimeMinutes: 2,
    crustType: 'Caramelized Crispy Edge',
    volumeOrWeight: 'Single Jumbo Bun',
    ingredients: ['Flour', 'Butter', 'Green Cardamom', 'Ceylon Cinnamon', 'Brown Sugar', 'Swedish Pearl Sugar', 'Sea Salt'],
    allergens: ['Gluten (Wheat)', 'Dairy (Butter)'],
    image: PASTRIES_IMAGE,
    calories: 310,
    flavorNotes: ['Floral cardamom warmth', 'Toffee cinnamon', 'Crunchy pearl sugar'],
    dietary: ['vegetarian']
  },
  {
    id: 'chocolate-cardamom-babka',
    name: 'Valrhona Dark Chocolate Babka Twist',
    category: 'pastries',
    description: 'Swirled laminated brioche packed with 70% dark Valrhona chocolate ganache and crushed cardamom.',
    longDescription: 'Ribbons of deeply bittersweet single-origin chocolate folded twelve times through buttery enriched brioche dough, dusted with vanilla bean sugar crumble and scented with freshly crushed cardamom pods.',
    price: 50,
    bakeTimeMinutes: 2,
    crustType: 'Pillowy Soft',
    volumeOrWeight: 'Half Loaf (450g)',
    ingredients: ['Enriched Wheat Flour', 'Cultured Butter', 'Valrhona 70% Dark Chocolate', 'Green Cardamom', 'Organic Eggs', 'Brown Sugar'],
    allergens: ['Gluten (Wheat)', 'Dairy (Butter)', 'Eggs'],
    image: BRIOCHE_IMAGE,
    calories: 320,
    flavorNotes: ['Deep cocoa fudge', 'Cardamom spice', 'Golden butter crust'],
    dietary: ['vegetarian']
  },

  // --- DRINKS ---
  {
    id: 'madagascar-vanilla-cold-brew',
    name: 'Madagascar Vanilla Cold Brew',
    category: 'drinks',
    description: '18-hour cold steeped single-origin Ethiopian coffee topped with sweet vanilla bean cream cascade.',
    longDescription: 'Steeped for 18 hours in filtered ice water to eliminate harsh acidity and highlight smooth notes of blueberry and milk chocolate. Poured over artisan ice with a generous float of house-whipped Madagascar vanilla cream.',
    price: 34,
    bakeTimeMinutes: 0,
    crustType: 'Chilled Ice',
    volumeOrWeight: '450ml Glass',
    ingredients: ['Ethiopian Yirgacheffe Coffee', 'Filtered Mountain Water', 'Organic Cream', 'Madagascar Vanilla Bean', 'Cane Sugar'],
    allergens: ['Dairy (Cream)'],
    image: DRINKS_IMAGE,
    calories: 120,
    isPopular: true,
    flavorNotes: ['Smooth dark cocoa', 'Sweet vanilla cream', 'Wild blueberry notes'],
    dietary: ['vegetarian']
  },
  {
    id: 'hibiscus-mint-botanical-spritz',
    name: 'Chilled Hibiscus & Mint Botanical Spritz',
    category: 'drinks',
    description: 'Cold-brewed organic Ghanaian hibiscus (Bissap), fresh mint, Valencia orange slice, and sparkling water.',
    longDescription: 'Ruby red, refreshing, and deeply thirst-quenching. Brewed from sun-dried northern Ghanaian hibiscus calyces, steeped with bruised garden mint leaves, ginger essence, and topped with crisp effervescent mineral water.',
    price: 28,
    bakeTimeMinutes: 0,
    crustType: 'Chilled Effervescent',
    volumeOrWeight: '500ml Bottle',
    ingredients: ['Sun-dried Hibiscus Calyces', 'Fresh Garden Mint', 'Cold-Pressed Ginger', 'Valencia Orange Slice', 'Sparkling Spring Water', 'Agave'],
    allergens: [],
    image: DRINKS_IMAGE,
    calories: 65,
    isPopular: true,
    isNew: true,
    flavorNotes: ['Tart cranberry notes', 'Fresh cool mint', 'Zesty citrus sparkle'],
    dietary: ['vegan', 'organic']
  },
  {
    id: 'iced-ceremonial-matcha-latte',
    name: 'Iced Ceremonial Matcha Oat Latte',
    category: 'drinks',
    description: 'First-harvest Uji ceremonial grade green tea whisked over chilled barista oat milk and blossom honey.',
    longDescription: 'Stone-ground first-flush Japanese ceremonial matcha with an intense emerald hue and umami sweetness. Whisked traditionally with a bamboo chasen and layered over creamy oat milk.',
    price: 38,
    bakeTimeMinutes: 0,
    crustType: 'Velvet Iced',
    volumeOrWeight: '450ml Glass',
    ingredients: ['Uji Ceremonial Grade Matcha', 'Barista Oat Milk', 'Wild Honey', 'Filtered Spring Water'],
    allergens: ['Oats'],
    image: DRINKS_IMAGE,
    calories: 110,
    flavorNotes: ['Sweet grassy umami', 'Creamy oat finish', 'Subtle honey blossom'],
    dietary: ['vegan', 'dairy-free']
  },
  {
    id: 'cold-pressed-golden-citrus',
    name: 'Cold-Pressed Golden Citrus Tonic',
    category: 'drinks',
    description: 'Freshly pressed coastal pineapple, Valencia sweet oranges, turmeric root, and lemon zest.',
    longDescription: 'Raw, unpasteurized, and pressed fresh every morning in our juice lab. High vitamin C burst with anti-inflammatory ginger and turmeric kick.',
    price: 30,
    bakeTimeMinutes: 0,
    crustType: 'Chilled Raw',
    volumeOrWeight: '400ml Bottle',
    ingredients: ['Ghanaian Sugarloaf Pineapple', 'Valencia Orange', 'Raw Turmeric', 'Lemon', 'Ginger'],
    allergens: [],
    image: DRINKS_IMAGE,
    calories: 95,
    flavorNotes: ['Sweet golden pineapple', 'Bright lemon acidity', 'Warming ginger zing'],
    dietary: ['vegan', 'organic']
  },

  // --- SPREADS & DIPS ---
  {
    id: 'whipped-truffle-honey-butter',
    name: 'Whipped Truffle Wild Honey Butter',
    category: 'spreads',
    description: 'Slow-churned cultured Ghanaian butter whipped with summer truffle carpaccio and raw forest honey.',
    longDescription: 'The ultimate warm bread accompaniment. Salted cultured butter aerated until cloud-like, swirled with Italian black summer truffle oil, minced black truffles, and golden forest honey.',
    price: 22,
    bakeTimeMinutes: 0,
    crustType: 'Velvety Whipped',
    volumeOrWeight: '120g Jar',
    ingredients: ['Cultured Grass-fed Butter', 'Black Summer Truffle', 'Raw Honey', 'Fleur de Sel'],
    allergens: ['Dairy (Butter)'],
    image: BRIOCHE_IMAGE,
    calories: 140,
    flavorNotes: ['Earthy black truffle', 'Floral honey', 'Cultured cream'],
    dietary: ['vegetarian']
  },
  {
    id: 'roasted-garlic-chive-dip',
    name: 'Slow Confit Garlic & Chive Butter Spread',
    category: 'spreads',
    description: 'Whole garlic heads roasted in thyme oil for 3 hours, blended into aerated sea-salt butter.',
    longDescription: 'Sweet, buttery caramelized garlic cloves whipped with fresh chives, crushed pink peppercorn, and flake sea salt. Melts instantly over hot stone-baked crust.',
    price: 18,
    bakeTimeMinutes: 0,
    crustType: 'Velvety Whipped',
    volumeOrWeight: '120g Jar',
    ingredients: ['Cultured Butter', 'Confit Garlic', 'Fresh Chives', 'Pink Peppercorn', 'Sea Salt'],
    allergens: ['Dairy (Butter)'],
    image: FOCACCIA_IMAGE,
    calories: 130,
    flavorNotes: ['Sweet roasted allium', 'Fresh herbal chive', 'Rich butter'],
    dietary: ['vegetarian']
  }
];

export const KIOSK_LOCATIONS: KioskLocation[] = [
  {
    id: 'kiosk-accra-mall',
    name: 'Accra Mall Plaza Kiosk',
    area: 'Tetteh Quarshie Interchange',
    city: 'Accra',
    address: 'Main Entrance North Forecourt, Accra Mall',
    coordinates: { lat: 5.6219, lng: -0.1746 },
    status: 'online',
    ovenTempC: 286,
    loavesReady: 14,
    approxWaitMins: 3,
    hours: '24 Hours / 7 Days a Week',
    features: ['Touchscreen Ordering', 'MoMo & Card Accepted', 'Hot Dispense in 3 Mins', 'Live Dough Camera']
  },
  {
    id: 'kiosk-airport-city',
    name: 'Airport City Express Hub',
    area: 'Airport City (Stanbic Heights Forecourt)',
    city: 'Accra',
    address: 'Independence Ave & Marina Way, Airport Commercial Center',
    coordinates: { lat: 5.5998, lng: -0.1812 },
    status: 'online',
    ovenTempC: 284,
    loavesReady: 22,
    approxWaitMins: 2,
    hours: '24 Hours / 7 Days a Week',
    features: ['Touchscreen & App Scan', 'Contactless MoMo / Apple Pay', 'Curbside Pickup Lane', 'Insulated Kraft Bags']
  },
  {
    id: 'kiosk-east-legon',
    name: 'East Legon Lagos Avenue Station',
    area: 'East Legon',
    city: 'Accra',
    address: 'Lagos Avenue, Opposite Mendies Kitchen & Shell',
    coordinates: { lat: 5.6372, lng: -0.1554 },
    status: 'baking_rush',
    ovenTempC: 288,
    loavesReady: 8,
    approxWaitMins: 4,
    hours: '24 Hours / 7 Days a Week',
    features: ['Late Night Hub', 'Fresh Batch Every 15 Min', 'MoMo, Cash & Cards', 'Outdoor Seating Benches']
  },
  {
    id: 'kiosk-osu-oxford',
    name: 'Osu Oxford Street Kiosk',
    area: 'Osu',
    city: 'Accra',
    address: 'Oxford Street, Near Woodin Flagship Entrance',
    coordinates: { lat: 5.5562, lng: -0.1831 },
    status: 'online',
    ovenTempC: 285,
    loavesReady: 19,
    approxWaitMins: 3,
    hours: '24 Hours / 7 Days a Week',
    features: ['24/7 Night Owl Favorite', 'Dual Stone Hearth Oven', 'QR Mobile Checkout']
  },
  {
    id: 'kiosk-knust-campus',
    name: 'KNUST Tech Hub Station',
    area: 'University Campus',
    city: 'Kumasi',
    address: 'Commercial Area & Student Center Plaza, KNUST',
    coordinates: { lat: 6.6745, lng: -1.5716 },
    status: 'online',
    ovenTempC: 283,
    loavesReady: 16,
    approxWaitMins: 3,
    hours: '24 Hours / 7 Days a Week',
    features: ['Student Discount QR', 'Express Mobile Money', 'Warm Brioche Buns Always Loaded']
  },
  {
    id: 'kiosk-labone',
    name: 'Labone Coffee Walkway Kiosk',
    area: 'Labone',
    city: 'Accra',
    address: 'Ndabaningi Sithole Road, Corner of 6th Link',
    coordinates: { lat: 5.5684, lng: -0.1651 },
    status: 'online',
    ovenTempC: 285,
    loavesReady: 12,
    approxWaitMins: 3,
    hours: '24 Hours / 7 Days a Week',
    features: ['Artisan Loaves Sliced on Request', 'Butter Cup Dispenser', 'Walk-up & Drive-by']
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Kofi Boateng',
    handle: '@kofiboat_gh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: 'Yesterday at 11:42 PM',
    location: 'Airport City Kiosk',
    comment: 'Getting a steaming wild sourdough loaf and cold brew at 1 AM on my way home from the office was unbelievable. The crust was blistered and loud, and you could smell the yeast 20 meters away. JustDan changed bakery in Accra forever.',
    favoriteLoaf: 'Heritage Wild Sourdough',
    verifiedOrder: true
  },
  {
    id: 'rev-2',
    author: 'Ama Mensah-Bonsu',
    handle: '@ama.eats.accra',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '2 days ago',
    location: 'East Legon Station',
    comment: 'Ordered online for doorstep delivery in East Legon. The pain au chocolat arrived warm with molten Valrhona chocolate, and the hibiscus spritz was ice cold. Flawless e-commerce experience.',
    favoriteLoaf: 'Valrhona Double Pain au Chocolat',
    verifiedOrder: true
  },
  {
    id: 'rev-3',
    author: 'Dr. David Osei',
    handle: '@d_osei_md',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '3 days ago',
    location: 'Accra Mall Plaza',
    comment: 'I am extremely particular about sourdough fermentation. 72-hour slow cold ferment is real. The crumb structure has true artisanal honeycomb openness, not that dense commercial sponge. 10/10.',
    favoriteLoaf: 'Heritage Wild Sourdough Boule',
    verifiedOrder: true
  },
  {
    id: 'rev-4',
    author: 'Serwaa Appiah',
    handle: '@serwaa_lifestyle',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    date: '4 days ago',
    location: 'Osu Oxford St Kiosk',
    comment: 'The honey brioche with the whipped truffle butter and vanilla cold brew is insane. Warm, pull-apart pillowy soft, and delivered in 25 minutes flat.',
    favoriteLoaf: 'Braided Golden Honey Brioche',
    verifiedOrder: true
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Order Online or at Kiosk',
    description: 'Select your artisan sourdough, flaky French pastries, and handcrafted iced drinks online for doorstep delivery or 24/7 kiosk grab-and-go.',
    highlight: 'Instant Online & Mobile QR'
  },
  {
    step: '02',
    title: '180-Second Stone Flash Bake',
    description: 'Internal volcanic stone conveyors pull your loaves into the 285°C hearth chamber. High convection heat blossoms the crust and locks in steam.',
    highlight: '285°C Stone Hearth Heat'
  },
  {
    step: '03',
    title: 'Piping Hot to Doorstep or In Hand',
    description: 'Packed into thermal steam-vented kraft boxes with chilled whipped butter cups and cold bottled drinks. Enjoy bakery perfection anytime.',
    highlight: 'Doorstep Delivery & 24/7 Kiosks'
  }
];
