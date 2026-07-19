/* ============================================================
   BITES — Data Layer
   Structured product, menu, and location data
   ============================================================ */

const BITES_PRODUCTS = [
  {
    id: 'butter-croissant',
    name: 'Butter Croissant',
    desc: 'Flaky, golden, deeply laminated',
    made: 'Laminated with premium butter, cold-proved for 24 hours, and baked at high heat for a perfect shatter-crisp flake.',
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
    made: 'Light chocolate sponge layered with rich dark chocolate ganache, finished with a glossy cocoa glaze.',
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
    made: 'Soft brioche dough rolled with sweet cinnamon sugar, baked golden and topped with cream cheese icing.',
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
    made: 'Yeast-raised brioche dough, fried to a pillowy golden brown and dipped in our classic warm sugar glaze.',
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
    made: 'Double beef patties smashed sear-crisp on a hot flat-top, topped with melted cheddar on a toasted house bun.',
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
    made: 'Slow-fermented Neapolitan dough stretched by hand, topped with San Marzano tomatoes, fresh mozzarella, and baked at 450°C.',
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
    made: 'Three tiers of sponge cake frosted with vanilla bean buttercream and decorated with fresh seasonal fruits.',
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
    made: 'Velvety red velvet sponge layered with smooth cream cheese frosting, finished with fine cake crumbs.',
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
    made: 'Spiced grilled chicken wrapped in a warm flatbread with pickled red onions and garlic herb mayonnaise.',
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
    made: 'Tandoori-spiced cottage cheese cubes charred in the oven, wrapped with fresh mint chutney and crunchy cabbage slaw.',
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
    made: 'Naturally leavened with our wild starter, fermented for 72 hours, and baked in a steam-infused stone deck oven.',
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
    made: 'Brown butter dough mixed with generous dark chocolate chunks, baked soft-center and sprinkled with sea salt flakes.',
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
    made: 'Triple decker toasted white bread layered with grilled chicken breast, fried egg, crisp lettuce, tomato, and light mayo.',
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
    made: 'Golden flaky puff pastry filled with a savory mixture of spiced potatoes, green peas, and traditional aromatic herbs.',
    category: 'savory',
    price: '₹80',
    image: 'assets/products/puff.png',
    alt: 'Golden savory puff pastry with filling',
    dietary: ['veg']
  },
  {
    id: 'veggie-burger',
    name: 'Veggie Burger',
    desc: 'Beetroot patty, avocado, chipotle aioli',
    made: 'House-made beetroot and quinoa patty, pan-seared and layered with fresh avocado, lettuce, and spicy chipotle aioli on a toasted brioche bun.',
    category: 'burgers',
    price: '₹250',
    image: 'assets/products/burger.png',
    alt: 'Veggie burger with beetroot patty',
    dietary: ['veg']
  },
  {
    id: 'pepperoni-pizza',
    name: 'Pepperoni Pizza',
    desc: 'Spicy pepperoni, mozzarella, chili oil',
    made: 'Hand-stretched sourdough crust topped with San Marzano tomato sauce, spicy Italian pepperoni, fresh mozzarella, and a drizzle of hot chili oil.',
    category: 'pizza',
    price: '₹400',
    image: 'assets/products/pizza.png',
    alt: 'Pepperoni pizza with chili oil drizzle',
    dietary: ['spicy']
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    desc: 'Double ristretto, silky steamed milk',
    made: 'Expertly pulled double shot of espresso ristretto blended with velvety hot micro-foam milk.',
    category: 'drinks',
    price: '₹180',
    image: 'assets/products/cookie.png',
    alt: 'Flat white coffee with latte art',
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
  { ...BITES_PRODUCTS[14] },  // Veggie Burger
  // Pizza
  { ...BITES_PRODUCTS[5] },   // Margherita Pizza
  { ...BITES_PRODUCTS[15] },  // Pepperoni Pizza
  // Cakes
  { ...BITES_PRODUCTS[6] },   // Celebration Cake
  { ...BITES_PRODUCTS[7] }    // Cake Slice
];

const BITES_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'pastries', label: 'Pastries' },
  { id: 'savory', label: 'Savory' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'cakes', label: 'Cakes' }
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
