/* ============================================================
   BITES — Data Layer
   Structured product, menu, and location data
   ============================================================ */

const BITES_PRODUCTS = [
  {
    id: 'butter-croissant',
    name: 'Butter Croissant',
    desc: 'Flaky, golden, deeply laminated',
    category: 'pastries',
    price: '₹120',
    image: 'assets/products/croissant.png',
    alt: 'Golden butter croissant with flaky layers',
    dietary: ['veg']
  },
  {
    id: 'chocolate-pastry',
    name: 'Chocolate Pastry',
    desc: 'Rich ganache, airy sponge',
    category: 'pastries',
    price: '₹180',
    image: 'assets/products/cake-slice.png',
    alt: 'Decadent chocolate pastry with ganache drizzle',
    dietary: ['veg']
  },
  {
    id: 'cinnamon-roll',
    name: 'Cinnamon Roll',
    desc: 'Warm spice, cream cheese glaze',
    category: 'pastries',
    price: '₹160',
    image: 'assets/products/cinnamon-roll.png',
    alt: 'Freshly baked cinnamon roll with white glaze',
    dietary: ['veg']
  },
  {
    id: 'glazed-doughnut',
    name: 'Glazed Doughnut',
    desc: 'Light, pillowy, perfectly sweet',
    category: 'pastries',
    price: '₹90',
    image: 'assets/products/doughnut.png',
    alt: 'Classic glazed doughnut with shiny coating',
    dietary: ['veg']
  },
  {
    id: 'smash-burger',
    name: 'Smash Burger',
    desc: 'Double patty, cheddar, house sauce',
    category: 'burgers',
    price: '₹280',
    image: 'assets/products/burger.png',
    alt: 'Double smash burger with melted cheese',
    dietary: []
  },
  {
    id: 'margherita-pizza',
    name: 'Margherita Pizza',
    desc: 'San Marzano, fresh basil, fior di latte',
    category: 'pizza',
    price: '₹350',
    image: 'assets/products/pizza.png',
    alt: 'Wood-fired margherita pizza with fresh basil',
    dietary: ['veg']
  },
  {
    id: 'celebration-cake',
    name: 'Celebration Cake',
    desc: 'Three layers, vanilla bean, seasonal fruit',
    category: 'cakes',
    price: '₹1200',
    image: 'assets/products/cake.png',
    alt: 'Decorated three-layer celebration cake',
    dietary: ['veg']
  },
  {
    id: 'cake-slice',
    name: 'Cake Slice',
    desc: 'Red velvet, cream cheese frosting',
    category: 'cakes',
    price: '₹180',
    image: 'assets/products/cake-slice.png',
    alt: 'Slice of red velvet cake with cream cheese frosting',
    dietary: ['veg']
  },
  {
    id: 'chicken-roll',
    name: 'Chicken Roll',
    desc: 'Spiced chicken, pickled onion, herb mayo',
    category: 'savory',
    price: '₹220',
    image: 'assets/products/chicken-roll.png',
    alt: 'Grilled chicken roll wrap with fresh herbs',
    dietary: []
  },
  {
    id: 'paneer-roll',
    name: 'Paneer Roll',
    desc: 'Tandoori paneer, mint chutney, slaw',
    category: 'savory',
    price: '₹200',
    image: 'assets/products/paneer-roll.png',
    alt: 'Tandoori paneer roll with colorful vegetables',
    dietary: ['veg']
  },
  {
    id: 'sourdough-loaf',
    name: 'Sourdough Loaf',
    desc: '72-hour ferment, wild culture',
    category: 'pastries',
    price: '₹280',
    image: 'assets/products/sourdough.png',
    alt: 'Artisan sourdough bread loaf with scoring pattern',
    dietary: ['veg']
  },
  {
    id: 'chocolate-cookie',
    name: 'Choc Chunk Cookie',
    desc: 'Sea salt, brown butter, dark chocolate',
    category: 'pastries',
    price: '₹100',
    image: 'assets/products/cookie.png',
    alt: 'Chunky chocolate chip cookie with sea salt',
    dietary: ['veg']
  },
  {
    id: 'club-sandwich',
    name: 'Club Sandwich',
    desc: 'Triple-decker, grilled chicken, egg',
    category: 'savory',
    price: '₹260',
    image: 'assets/products/sandwich.png',
    alt: 'Triple-layer club sandwich with toothpick',
    dietary: []
  },
  {
    id: 'savory-puff',
    name: 'Savory Puff',
    desc: 'Puff pastry, spiced potato, peas',
    category: 'savory',
    price: '₹80',
    image: 'assets/products/puff.png',
    alt: 'Golden savory puff pastry with filling',
    dietary: ['veg']
  }
];

const BITES_MENU = [
  // Pastries
  { ...BITES_PRODUCTS[0] },   // Butter Croissant
  { ...BITES_PRODUCTS[1] },   // Chocolate Pastry
  { ...BITES_PRODUCTS[2] },   // Cinnamon Roll
  { ...BITES_PRODUCTS[3] },   // Glazed Doughnut
  { ...BITES_PRODUCTS[11] },  // Choc Chunk Cookie
  { ...BITES_PRODUCTS[10] },  // Sourdough Loaf
  // Savory
  { ...BITES_PRODUCTS[8] },   // Chicken Roll
  { ...BITES_PRODUCTS[9] },   // Paneer Roll
  { ...BITES_PRODUCTS[12] },  // Club Sandwich
  { ...BITES_PRODUCTS[13] },  // Savory Puff
  // Burgers
  { ...BITES_PRODUCTS[4] },   // Smash Burger
  {
    id: 'veggie-burger',
    name: 'Veggie Burger',
    desc: 'Beetroot patty, avocado, chipotle aioli',
    category: 'burgers',
    price: '₹250',
    image: 'assets/products/burger.png',
    alt: 'Veggie burger with beetroot patty',
    dietary: ['veg']
  },
  // Pizza
  { ...BITES_PRODUCTS[5] },   // Margherita Pizza
  {
    id: 'pepperoni-pizza',
    name: 'Pepperoni Pizza',
    desc: 'Spicy pepperoni, mozzarella, chili oil',
    category: 'pizza',
    price: '₹400',
    image: 'assets/products/pizza.png',
    alt: 'Pepperoni pizza with chili oil drizzle',
    dietary: ['spicy']
  },
  // Cakes
  { ...BITES_PRODUCTS[6] },   // Celebration Cake
  { ...BITES_PRODUCTS[7] },   // Cake Slice
  {
    id: 'chocolate-truffle',
    name: 'Chocolate Truffle',
    desc: 'Dark Belgian chocolate, hazelnut praline',
    category: 'cakes',
    price: '₹220',
    image: 'assets/products/chocolate-pastry.png',
    alt: 'Rich chocolate truffle cake',
    dietary: ['veg']
  },
  // Drinks
  {
    id: 'flat-white',
    name: 'Flat White',
    desc: 'Double ristretto, silky steamed milk',
    category: 'drinks',
    price: '₹180',
    image: 'assets/products/cookie.png',
    alt: 'Flat white coffee with latte art',
    dietary: ['veg']
  },
  {
    id: 'fresh-juice',
    name: 'Fresh Orange Juice',
    desc: 'Cold-pressed, no sugar added',
    category: 'drinks',
    price: '₹140',
    image: 'assets/products/cookie.png',
    alt: 'Glass of fresh orange juice',
    dietary: ['veg']
  }
];

const BITES_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'pastries', label: 'Pastries' },
  { id: 'savory', label: 'Savory' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'cakes', label: 'Cakes' },
  { id: 'drinks', label: 'Drinks' }
];

const BITES_LOCATIONS = [
  {
    id: 'loc-downtown',
    name: 'Downtown Studio',
    address: '42 Baker Street, City Center',
    hours: 'Mon–Sat 7:00 AM – 9:00 PM  •  Sun 8:00 AM – 6:00 PM',
    mapUrl: '#',
    image: 'assets/hero/hero-poster.jpg'
  },
  {
    id: 'loc-garden',
    name: 'Garden District',
    address: '118 Greenway Boulevard, Park Side',
    hours: 'Daily 7:30 AM – 8:30 PM',
    mapUrl: '#',
    image: 'assets/hero/hero-poster.jpg'
  },
  {
    id: 'loc-market',
    name: 'Old Market Hall',
    address: '7 Heritage Lane, Market Quarter',
    hours: 'Mon–Fri 6:30 AM – 7:00 PM  •  Weekends 8:00 AM – 5:00 PM',
    mapUrl: '#',
    image: 'assets/hero/hero-poster.jpg'
  }
];
