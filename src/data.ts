import { MenuItem } from './types';
import injeraImage from './assets/images/injera_platter_1779481045904.png';
import coffeeImage from './assets/images/coffee_ceremony_1779481068249.png';

export const MENU_ITEMS: MenuItem[] = [
  // Meat Lovers
  {
    id: 'm1',
    name: 'Sizzling Beef Tibs',
    price: 22.00,
    description: 'Tender beef cubes sautéed at high heat with red onions, garlic, fresh rosemary, and green jalapeños. Served sizzling on a hot iron plate with custom Awaze dipping sauce.',
    category: 'meat',
    tags: ['Gluten-Free', 'House Special'],
    spicyLevel: 1
  },
  {
    id: 'm2',
    name: 'Abyssinia Signature Kitfo',
    price: 24.00,
    description: 'Extra-lean minced beef seasoned with herbed clarified butter (Niter Kibbeh) and the fiery Mitmita spice blend. Traditionally served warm/rare with fresh cottage cheese (Ayibe).',
    category: 'meat',
    tags: ['Gluten-Free', 'Traditional'],
    spicyLevel: 3
  },
  {
    id: 'm3',
    name: 'Key Beef Wot',
    price: 21.00,
    description: 'Tender beef morsels slow-simmered for hours in an aromatic Berbere sauce crafted from sun-dried chilies, garlic, cardamon, and over a dozen hand-milled spices.',
    category: 'meat',
    tags: ['Gluten-Free'],
    spicyLevel: 2
  },
  {
    id: 'm4',
    name: 'Celebration Doro Wot',
    price: 25.00,
    description: 'The standard of Ethiopian hospitality. Tender chicken legs slow-cooked in a caramelized red onion stew and Berbere, served with a spiced hard-boiled egg.',
    category: 'meat',
    tags: ['Gluten-Free', 'Highly Demanded'],
    spicyLevel: 2
  },

  // Vegan / Vegetarian Delights
  {
    id: 'v1',
    name: 'Ye-Misir Wot',
    price: 18.00,
    description: 'Split red lentils simmered in a rich, slow-cooked red onion and Berbere infusion. Deeply savory, comforting, and packed with complex spicy undertones.',
    category: 'vegan',
    tags: ['Vegan', 'Gluten-Free'],
    spicyLevel: 2
  },
  {
    id: 'v2',
    name: 'Ye-Shiro Wot',
    price: 19.00,
    description: 'Finely ground roasted chickpeas simmered with onions, garlic, and traditional spices. Thick, velvety, and served bubbling hot in an authentic clay pot.',
    category: 'vegan',
    tags: ['Vegan', 'Gluten-Free'],
    spicyLevel: 1
  },
  {
    id: 'v3',
    name: 'Gomen & Kik Alicha',
    price: 18.00,
    description: 'Dual pairing of chopped collard greens sautéed with garlic, ginger, and cumin (Gomen) alongside split yellow peas slow-simmered in a mild turmeric sauce (Alicha).',
    category: 'vegan',
    tags: ['Vegan', 'Gluten-Free'],
    spicyLevel: 0
  },
  {
    id: 'v4',
    name: 'Grand Vegan Feast (Beyaynetu)',
    price: 26.00,
    description: 'The ultimate colorful platters to share. A dynamic arrangement of Misir Wot, Shiro, Gomen, Kik Alicha, Key Sir (beets), and potato-carrot salad on 100% Teff Injera.',
    category: 'vegan',
    tags: ['Vegan', 'Gluten-Free', 'Perfect for Sharing'],
    spicyLevel: 1
  },

  // Traditional Drinks & Coffee
  {
    id: 'd1',
    name: 'Traditional Coffee Ceremony (Buna)',
    price: 12.00,
    description: 'A complete sensory ritual. Fresh green coffee beans are pan-roasted table-side until shiny, hand-ground, and slow-brewed in a clay Jebena. Served with fresh popcorn and incense.',
    category: 'drinks',
    tags: ['Vegan', 'Gluten-Free', 'Cultural Experience'],
    spicyLevel: 0
  },
  {
    id: 'd2',
    name: 'Authentic House Tej',
    price: 9.00,
    description: 'A traditional crystalline wine naturally brewed from pure honey, water, and wild gesho leaves (buckthorn). Semi-sweet, velvety, and beautifully golden.',
    category: 'drinks',
    tags: ['Gluten-Free'],
    spicyLevel: 0
  },
  {
    id: 'd3',
    name: 'Abyssinia Spiced Tea',
    price: 5.00,
    description: 'Robust black tea brewed with a warm house blend of cardamom, cloves, fresh ginger and cinnamon bark. Deeply soothing.',
    category: 'drinks',
    tags: ['Vegan', 'Gluten-Free'],
    spicyLevel: 0
  }
];

export const CULTURAL_STORIES = [
  {
    id: 'gursha',
    title: 'The Art of Gursha',
    subtitle: 'A gesture of love, respect, and deep hospitality.',
    content: 'In Ethiopian tradition, food is never eaten in isolation. Eating together from a single large platter (a Ge’beta) lined with sourdough Injera represents a shared bond. "Gursha" is the intimate ritual where you wrap a perfect, flavorful bite in Injera and gently place it into the mouth of a friend, relative, or honored guest. It is an expression of deep affection and a beautiful reminder that our table belongs to everyone.'
  },
  {
    id: 'spices',
    title: 'Warm Spices & Magic Blends',
    subtitle: 'Crafted with history, dried in the African sun.',
    content: 'Our kitchen breathes life through authentic spices flown directly from Ethiopia. Our core blend, Berbere, is a complex sun-dried mixture of over sixteen spices including chili peppers, fenugreek, garlic, ginger, basil, and rue. For a sharper heat, we use Mitmita—a fiery powder of orange chilies, cardamom, and cloves. These spices are balanced with Niter Kibbeh, our house-clarified butter simmered with wild herbs.'
  },
  {
    id: 'buna',
    title: 'The Sacred Coffee Ceremony',
    subtitle: 'Where time slows down and relations spark.',
    content: 'Ethiopia is the birthplace of Arabica coffee (Buna). To us, coffee is not just a morning standard, but a social ceremony that lasts up to two hours. The hostess roasts green beans in a flat pan, passes them to guests to inhale the fragrant smoke, grinds them, and boils the coffee in a clay pot called a Jebena. Served in three slow, deliberate rounds—Abol, Tona, and Bereka—it is an ultimate sign of welcome.'
  }
];

export const GALLERY_IMAGES = {
  injera: injeraImage,
  coffee: coffeeImage,
};
