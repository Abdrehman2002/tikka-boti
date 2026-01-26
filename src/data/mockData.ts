import { Platform, OrderItem } from '@/stores/ordersStore';

// Menu categories with prep times
export const menuCategories = {
  TIKKA_BOTI_SPECIAL: 'Tikka Boti Special',
  BREAKFAST: 'Breakfast',
  STARTER: 'Starter',
  TANDOORI: 'Tandoori Grill / Kebab',
  CURRIES: 'Curries',
  VEGETARIAN: 'Vegetarian',
  NAAN_ROTI: 'Naan Roti / Pratha',
  RICE_BIRYANI: 'Rice & Biryani',
  SALAD_RAITA: 'Salad / Raita',
  DRINKS_DESSERT: 'Drinks / Dessert / Tea',
};

// All menu items with categories and prep times
export const menuItems = [
  // TIKKA BOTI SPECIAL (30 min prep time)
  { name: 'Tikka Boti Special Karahi', price: 20.00, category: menuCategories.TIKKA_BOTI_SPECIAL, prepTime: 30 },
  { name: 'Tikka Boti Special White Karahi', price: 20.00, category: menuCategories.TIKKA_BOTI_SPECIAL, prepTime: 30 },
  { name: 'Chicken Boneless Handi', price: 22.00, category: menuCategories.TIKKA_BOTI_SPECIAL, prepTime: 30 },
  { name: 'Beef Reshmi Karahi', price: 20.00, category: menuCategories.TIKKA_BOTI_SPECIAL, prepTime: 30 },
  { name: 'Chicken Dum Kebab Karahi', price: 19.00, category: menuCategories.TIKKA_BOTI_SPECIAL, prepTime: 30 },
  { name: 'Chicken Green Karahi', price: 18.00, category: menuCategories.TIKKA_BOTI_SPECIAL, prepTime: 30 },
  { name: 'Chicken Shashlik', price: 18.00, category: menuCategories.TIKKA_BOTI_SPECIAL, prepTime: 30 },
  { name: 'Chicken Chilli', price: 22.00, category: menuCategories.TIKKA_BOTI_SPECIAL, prepTime: 30 },
  { name: 'Chicken Manchurian', price: 18.00, category: menuCategories.TIKKA_BOTI_SPECIAL, prepTime: 30 },

  // BREAKFAST (15 min prep time)
  { name: 'Pratha', price: 2.00, category: menuCategories.BREAKFAST, prepTime: 15 },
  { name: 'Aloo Pratha', price: 2.50, category: menuCategories.BREAKFAST, prepTime: 15 },
  { name: 'Aloo Cheese Pratha', price: 3.50, category: menuCategories.BREAKFAST, prepTime: 15 },
  { name: 'Saag Special', price: 4.99, category: menuCategories.BREAKFAST, prepTime: 20 },
  { name: 'Plain Naan', price: 1.50, category: menuCategories.BREAKFAST, prepTime: 10 },
  { name: 'Roghni Naan', price: 1.99, category: menuCategories.BREAKFAST, prepTime: 10 },
  { name: 'Lahori Channa with Egg', price: 4.50, category: menuCategories.BREAKFAST, prepTime: 15 },
  { name: 'Omelete', price: 2.50, category: menuCategories.BREAKFAST, prepTime: 10 },
  { name: 'Fry Egg', price: 1.50, category: menuCategories.BREAKFAST, prepTime: 5 },
  { name: 'Beef Paye (Plate)', price: 5.00, category: menuCategories.BREAKFAST, prepTime: 20 },
  { name: 'Beef Nihari (Plate)', price: 5.00, category: menuCategories.BREAKFAST, prepTime: 20 },
  { name: 'Milk Tea', price: 1.00, category: menuCategories.BREAKFAST, prepTime: 5 },

  // STARTERS (10-15 min prep time)
  { name: 'Samosa 4 pcs', price: 3.00, category: menuCategories.STARTER, prepTime: 10 },
  { name: 'Spring Roll 4 pcs', price: 3.00, category: menuCategories.STARTER, prepTime: 10 },
  { name: 'Fries', price: 2.50, category: menuCategories.STARTER, prepTime: 10 },
  { name: 'Chicken Wings 5 pcs', price: 3.50, category: menuCategories.STARTER, prepTime: 15 },
  { name: 'Nuggets 6 pcs', price: 3.50, category: menuCategories.STARTER, prepTime: 10 },
  { name: 'Pani Puri Plate', price: 5.00, category: menuCategories.STARTER, prepTime: 10 },
  { name: 'Special Gol Gappe Plate', price: 8.00, category: menuCategories.STARTER, prepTime: 15 },
  { name: 'Starter Deal (Fries + Wings 3 pcs + Nuggets 3 pcs)', price: 5.00, category: menuCategories.STARTER, prepTime: 15 },

  // TANDOORI GRILL / KEBAB (15-20 min prep time)
  { name: 'Tandoori Chicken 1 Piece', price: 3.00, category: menuCategories.TANDOORI, prepTime: 20 },
  { name: 'Beef Seekh Kebab 1 Piece', price: 2.50, category: menuCategories.TANDOORI, prepTime: 15 },
  { name: 'Chicken Tikka 4 Pcs', price: 3.00, category: menuCategories.TANDOORI, prepTime: 20 },
  { name: 'Chicken Malai Boti 4 Pcs', price: 3.50, category: menuCategories.TANDOORI, prepTime: 20 },
  { name: 'Chicken Seekh Kebab 1 Piece', price: 2.50, category: menuCategories.TANDOORI, prepTime: 15 },
  { name: 'Beef Chapli Kebab 1 Piece', price: 2.50, category: menuCategories.TANDOORI, prepTime: 15 },
  { name: 'Chicken Shami Kebab 1 Piece', price: 2.00, category: menuCategories.TANDOORI, prepTime: 15 },
  { name: 'Mix Platter', price: 19.00, category: menuCategories.TANDOORI, prepTime: 25 },

  // CURRIES (20-25 min prep time)
  { name: 'Chicken Channa', price: 5.00, category: menuCategories.CURRIES, prepTime: 20 },
  { name: 'Kofta Channa', price: 6.00, category: menuCategories.CURRIES, prepTime: 20 },
  { name: 'Chicken Korma', price: 5.00, category: menuCategories.CURRIES, prepTime: 20 },
  { name: 'Prawns Masala Plate', price: 7.00, category: menuCategories.CURRIES, prepTime: 20 },
  { name: 'Beef Paye Plate', price: 5.00, category: menuCategories.CURRIES, prepTime: 20 },
  { name: 'Beef Nihari Plate', price: 5.00, category: menuCategories.CURRIES, prepTime: 20 },
  { name: 'Qeema Aloo Plate', price: 5.00, category: menuCategories.CURRIES, prepTime: 20 },
  { name: 'Chicken Karahi (Plate)', price: 5.00, category: menuCategories.CURRIES, prepTime: 20 },
  { name: 'Chicken Karahi (Half)', price: 9.00, category: menuCategories.CURRIES, prepTime: 25 },
  { name: 'Chicken Karahi (Full)', price: 16.00, category: menuCategories.CURRIES, prepTime: 30 },
  { name: 'Chicken Tikka Masala (Plate)', price: 6.00, category: menuCategories.CURRIES, prepTime: 20 },
  { name: 'Chicken Tikka Masala (Half)', price: 10.00, category: menuCategories.CURRIES, prepTime: 25 },
  { name: 'Chicken Tikka Masala (Full)', price: 18.00, category: menuCategories.CURRIES, prepTime: 30 },
  { name: 'Mutton Karahi (Plate)', price: 6.00, category: menuCategories.CURRIES, prepTime: 25 },
  { name: 'Mutton Karahi (Half)', price: 10.00, category: menuCategories.CURRIES, prepTime: 30 },
  { name: 'Mutton Karahi (Full)', price: 18.00, category: menuCategories.CURRIES, prepTime: 35 },
  { name: 'Butter Chicken (Plate)', price: 6.00, category: menuCategories.CURRIES, prepTime: 20 },
  { name: 'Butter Chicken (Half)', price: 10.00, category: menuCategories.CURRIES, prepTime: 25 },
  { name: 'Butter Chicken (Full)', price: 18.00, category: menuCategories.CURRIES, prepTime: 30 },

  // VEGETARIAN (15-20 min prep time)
  { name: 'Daal Tarka', price: 4.50, category: menuCategories.VEGETARIAN, prepTime: 15 },
  { name: 'Daal Mash', price: 4.50, category: menuCategories.VEGETARIAN, prepTime: 15 },
  { name: 'Lahori Channa with Egg (Veg)', price: 4.50, category: menuCategories.VEGETARIAN, prepTime: 15 },
  { name: 'Mix Vegetable', price: 4.50, category: menuCategories.VEGETARIAN, prepTime: 15 },
  { name: 'Palak Paneer', price: 4.99, category: menuCategories.VEGETARIAN, prepTime: 20 },
  { name: 'Saag Special (Veg)', price: 4.99, category: menuCategories.VEGETARIAN, prepTime: 20 },
  { name: 'Butter Paneer', price: 6.50, category: menuCategories.VEGETARIAN, prepTime: 20 },
  { name: 'Mattar Paneer', price: 6.00, category: menuCategories.VEGETARIAN, prepTime: 20 },

  // NAAN ROTI / PRATHA (5-10 min prep time)
  { name: 'Plain Naan (Roti)', price: 1.50, category: menuCategories.NAAN_ROTI, prepTime: 10 },
  { name: 'Roghni Naan (Roti)', price: 1.99, category: menuCategories.NAAN_ROTI, prepTime: 10 },
  { name: 'Cheese Naan', price: 3.00, category: menuCategories.NAAN_ROTI, prepTime: 10 },
  { name: 'Garlic Cheese Naan', price: 3.50, category: menuCategories.NAAN_ROTI, prepTime: 10 },
  { name: 'Garlic Naan', price: 2.50, category: menuCategories.NAAN_ROTI, prepTime: 10 },
  { name: 'Tandoori Roti', price: 1.00, category: menuCategories.NAAN_ROTI, prepTime: 10 },

  // RICE & BIRYANI (20-30 min prep time)
  { name: 'Chicken Biryani', price: 6.00, category: menuCategories.RICE_BIRYANI, prepTime: 25 },
  { name: 'Mutton Biryani', price: 8.00, category: menuCategories.RICE_BIRYANI, prepTime: 30 },
  { name: 'Vegetables Pulao', price: 5.00, category: menuCategories.RICE_BIRYANI, prepTime: 20 },
  { name: 'Eggs Fried Rice', price: 5.00, category: menuCategories.RICE_BIRYANI, prepTime: 15 },
  { name: 'Zeera Rice', price: 3.50, category: menuCategories.RICE_BIRYANI, prepTime: 15 },
  { name: 'Plain Rice', price: 2.00, category: menuCategories.RICE_BIRYANI, prepTime: 15 },
  { name: 'Chicken Fried Rice', price: 6.00, category: menuCategories.RICE_BIRYANI, prepTime: 20 },
  { name: 'Prawn Fried Rice', price: 7.00, category: menuCategories.RICE_BIRYANI, prepTime: 20 },
  { name: 'Vegetable Fried Rice', price: 7.00, category: menuCategories.RICE_BIRYANI, prepTime: 15 },

  // SALAD / RAITA (5 min prep time)
  { name: 'Mix Salad', price: 2.50, category: menuCategories.SALAD_RAITA, prepTime: 5 },
  { name: 'Cucumber Tomato Salad', price: 3.00, category: menuCategories.SALAD_RAITA, prepTime: 5 },
  { name: 'Cucumber Onion Salad', price: 3.00, category: menuCategories.SALAD_RAITA, prepTime: 5 },
  { name: 'Special Raita', price: 3.00, category: menuCategories.SALAD_RAITA, prepTime: 5 },
  { name: 'Greek Salad', price: 4.00, category: menuCategories.SALAD_RAITA, prepTime: 10 },
  { name: 'Mix Raita', price: 1.00, category: menuCategories.SALAD_RAITA, prepTime: 5 },
  { name: 'Zeera Raita', price: 2.00, category: menuCategories.SALAD_RAITA, prepTime: 5 },
  { name: 'Mint Raita', price: 2.00, category: menuCategories.SALAD_RAITA, prepTime: 5 },

  // DRINKS / DESSERT / TEA (5 min prep time)
  { name: 'Soft Drink 33ml', price: 1.50, category: menuCategories.DRINKS_DESSERT, prepTime: 2 },
  { name: 'Soft Drink 1.5lt', price: 2.50, category: menuCategories.DRINKS_DESSERT, prepTime: 2 },
  { name: 'Water 1.50lt', price: 1.50, category: menuCategories.DRINKS_DESSERT, prepTime: 2 },
  { name: 'Water 0.5lt', price: 0.70, category: menuCategories.DRINKS_DESSERT, prepTime: 2 },
  { name: 'Regular Lassi (Glass)', price: 2.50, category: menuCategories.DRINKS_DESSERT, prepTime: 5 },
  { name: 'Regular Lassi (Jug)', price: 7.00, category: menuCategories.DRINKS_DESSERT, prepTime: 10 },
  { name: 'Mango Lassi (Glass)', price: 3.00, category: menuCategories.DRINKS_DESSERT, prepTime: 5 },
  { name: 'Mango Lassi (Jug)', price: 8.50, category: menuCategories.DRINKS_DESSERT, prepTime: 10 },
  { name: 'Sparkling Water', price: 1.50, category: menuCategories.DRINKS_DESSERT, prepTime: 2 },
  { name: 'Energy Drinks', price: 2.00, category: menuCategories.DRINKS_DESSERT, prepTime: 2 },
  { name: 'Gajar Halwa', price: 3.00, category: menuCategories.DRINKS_DESSERT, prepTime: 5 },
  { name: 'Kheer Special', price: 2.50, category: menuCategories.DRINKS_DESSERT, prepTime: 5 },
  { name: 'Sweets / Mathai', price: 1.00, category: menuCategories.DRINKS_DESSERT, prepTime: 2 },
  { name: 'Baklawa', price: 2.50, category: menuCategories.DRINKS_DESSERT, prepTime: 5 },
  { name: 'Milk Tea (Dessert)', price: 1.00, category: menuCategories.DRINKS_DESSERT, prepTime: 5 },
];

// Weekend special offers (11 AM to 2 PM)
export const weekendOffers = [
  { name: 'Beef Paye + 2 Naan', price: 6.00, category: 'Weekend Offer', prepTime: 20 },
  { name: 'Beef Nihari + 2 Naan', price: 6.00, category: 'Weekend Offer', prepTime: 20 },
  { name: 'Anda Chana + 2 Naan', price: 6.00, category: 'Weekend Offer', prepTime: 15 },
  { name: 'Alu Pratha + 1 Glass Lassi', price: 5.00, category: 'Weekend Offer', prepTime: 15 },
  { name: 'Saag + 1 Pratha', price: 5.00, category: 'Weekend Offer', prepTime: 20 },
  { name: 'Halwapuri Portion + Tea', price: 5.00, category: 'Weekend Offer', prepTime: 15 },
];

export const modifiers = [
  'Extra Spicy',
  'Medium Spicy',
  'Mild',
  'No Onions',
  'Extra Chutney',
  'Add Ghee',
  'Less Salt',
  'Extra Raita',
  'Well Done',
  'Less Oil',
];

export const customerNames = [
  'Ahmed K.',
  'Fatima S.',
  'Hassan M.',
  'Aisha R.',
  'Omar T.',
  'Zainab L.',
  'Ali B.',
  'Sara W.',
  'Ibrahim D.',
  'Maryam P.',
  'Usman A.',
  'Hina N.',
];

export const platforms: Platform[] = ['uber_eats', 'glovo', 'bolt_food'];

export function generateRandomOrder(): { platform: Platform; items: OrderItem[]; customerName: string; total: number; estimatedPrepTime: number } {
  const platform = platforms[Math.floor(Math.random() * platforms.length)];
  const numItems = Math.floor(Math.random() * 3) + 1;
  const items: OrderItem[] = [];
  let total = 0;
  let maxPrepTime = 0;

  for (let i = 0; i < numItems; i++) {
    const menuItem = menuItems[Math.floor(Math.random() * menuItems.length)];
    const quantity = Math.floor(Math.random() * 2) + 1;
    const hasModifiers = Math.random() > 0.5;
    const itemModifiers = hasModifiers
      ? [modifiers[Math.floor(Math.random() * modifiers.length)]]
      : undefined;

    items.push({
      name: menuItem.name,
      quantity,
      modifiers: itemModifiers,
      price: menuItem.price,
    });

    total += menuItem.price * quantity;
    maxPrepTime = Math.max(maxPrepTime, menuItem.prepTime);
  }

  const customerName = customerNames[Math.floor(Math.random() * customerNames.length)];

  return {
    platform,
    items,
    customerName,
    total: Math.round(total * 100) / 100,
    estimatedPrepTime: maxPrepTime
  };
}

// Analytics mock data
export const dailyRevenue = [
  { day: 'Mon', uber: 1500, glovo: 1000, bolt: 800 },
  { day: 'Tue', uber: 1700, glovo: 1100, bolt: 900 },
  { day: 'Wed', uber: 1400, glovo: 950, bolt: 750 },
  { day: 'Thu', uber: 1900, glovo: 1300, bolt: 1000 },
  { day: 'Fri', uber: 2800, glovo: 1900, bolt: 1400 },
  { day: 'Sat', uber: 3200, glovo: 2300, bolt: 1700 },
  { day: 'Sun', uber: 2400, glovo: 1600, bolt: 1200 },
];

export const hourlyOrders = [
  { hour: '11AM', orders: 15 },
  { hour: '12PM', orders: 32 },
  { hour: '1PM', orders: 42 },
  { hour: '2PM', orders: 28 },
  { hour: '3PM', orders: 18 },
  { hour: '4PM', orders: 12 },
  { hour: '5PM', orders: 22 },
  { hour: '6PM', orders: 38 },
  { hour: '7PM', orders: 55 },
  { hour: '8PM', orders: 62 },
  { hour: '9PM', orders: 48 },
  { hour: '10PM', orders: 28 },
];

export const menuPerformance = [
  { name: 'Tikka Boti Special Karahi', orders: 289, revenue: 5780, trend: 18 },
  { name: 'Chicken Biryani', orders: 267, revenue: 1602, trend: 15 },
  { name: 'Butter Chicken (Full)', orders: 198, revenue: 3564, trend: 12 },
  { name: 'Chicken Boneless Handi', orders: 176, revenue: 3872, trend: 22 },
  { name: 'Mix Platter', orders: 145, revenue: 2755, trend: 8 },
  { name: 'Chicken Tikka Masala (Full)', orders: 132, revenue: 2376, trend: 5 },
  { name: 'Mutton Karahi (Full)', orders: 98, revenue: 1764, trend: -2 },
  { name: 'Beef Seekh Kebab', orders: 87, revenue: 218, trend: -5 },
];

export const staffingData = [
  { day: 'Mon', '11AM': 3, '12PM': 5, '1PM': 6, '2PM': 4, '3PM': 3, '4PM': 2, '5PM': 4, '6PM': 6, '7PM': 8, '8PM': 9, '9PM': 7, '10PM': 4 },
  { day: 'Tue', '11AM': 4, '12PM': 6, '1PM': 7, '2PM': 5, '3PM': 3, '4PM': 3, '5PM': 5, '6PM': 7, '7PM': 9, '8PM': 10, '9PM': 7, '10PM': 4 },
  { day: 'Wed', '11AM': 3, '12PM': 5, '1PM': 6, '2PM': 4, '3PM': 2, '4PM': 2, '5PM': 4, '6PM': 6, '7PM': 8, '8PM': 8, '9PM': 6, '10PM': 3 },
  { day: 'Thu', '11AM': 4, '12PM': 6, '1PM': 8, '2PM': 5, '3PM': 3, '4PM': 3, '5PM': 5, '6PM': 8, '7PM': 10, '8PM': 11, '9PM': 8, '10PM': 5 },
  { day: 'Fri', '11AM': 5, '12PM': 8, '1PM': 10, '2PM': 7, '3PM': 4, '4PM': 4, '5PM': 7, '6PM': 10, '7PM': 14, '8PM': 16, '9PM': 12, '10PM': 6 },
  { day: 'Sat', '11AM': 6, '12PM': 9, '1PM': 12, '2PM': 8, '3PM': 5, '4PM': 5, '5PM': 8, '6PM': 12, '7PM': 16, '8PM': 18, '9PM': 14, '10PM': 7 },
  { day: 'Sun', '11AM': 5, '12PM': 8, '1PM': 10, '2PM': 6, '3PM': 4, '4PM': 4, '5PM': 6, '6PM': 10, '7PM': 12, '8PM': 14, '9PM': 10, '10PM': 5 },
];

export const inventoryData = [
  // Critical - Need immediate restocking
  { ingredient: 'Chicken (Boneless)', current: 12, needed: 35, unit: 'kg', trend: 'critical' },
  { ingredient: 'Tikka Masala Spices Mix', current: 3, needed: 12, unit: 'kg', trend: 'critical' },
  { ingredient: 'Prawns (Fresh)', current: 4, needed: 15, unit: 'kg', trend: 'critical' },

  // Increasing demand - Restock soon
  { ingredient: 'Beef (Raw)', current: 18, needed: 35, unit: 'kg', trend: 'increasing' },
  { ingredient: 'Mutton', current: 8, needed: 20, unit: 'kg', trend: 'increasing' },
  { ingredient: 'Yogurt (Plain)', current: 15, needed: 30, unit: 'liters', trend: 'increasing' },
  { ingredient: 'Rice (Basmati)', current: 45, needed: 80, unit: 'kg', trend: 'increasing' },

  // Stable inventory
  { ingredient: 'Cooking Oil', current: 28, needed: 45, unit: 'liters', trend: 'stable' },
  { ingredient: 'Naan Flour (Atta)', current: 50, needed: 70, unit: 'kg', trend: 'stable' },
  { ingredient: 'Paneer', current: 12, needed: 20, unit: 'kg', trend: 'stable' },
  { ingredient: 'Green Chillies', current: 8, needed: 15, unit: 'kg', trend: 'stable' },
  { ingredient: 'Onions', current: 35, needed: 50, unit: 'kg', trend: 'stable' },
  { ingredient: 'Tomatoes', current: 30, needed: 45, unit: 'kg', trend: 'stable' },
  { ingredient: 'Ghee', current: 18, needed: 25, unit: 'kg', trend: 'stable' },
  { ingredient: 'Ginger-Garlic Paste', current: 8, needed: 12, unit: 'kg', trend: 'stable' },
  { ingredient: 'Cumin Seeds (Zeera)', current: 5, needed: 8, unit: 'kg', trend: 'stable' },
  { ingredient: 'Coriander Powder', current: 6, needed: 10, unit: 'kg', trend: 'stable' },
  { ingredient: 'Red Chilli Powder', current: 7, needed: 12, unit: 'kg', trend: 'stable' },
  { ingredient: 'Turmeric Powder', current: 4, needed: 6, unit: 'kg', trend: 'stable' },
  { ingredient: 'Lentils (Daal)', current: 20, needed: 30, unit: 'kg', trend: 'stable' },
  { ingredient: 'Potatoes', current: 40, needed: 60, unit: 'kg', trend: 'stable' },
  { ingredient: 'Eggs', current: 80, needed: 120, unit: 'pieces', trend: 'stable' },
  { ingredient: 'Mint (Fresh)', current: 3, needed: 5, unit: 'kg', trend: 'stable' },
  { ingredient: 'Cream', current: 10, needed: 18, unit: 'liters', trend: 'stable' },
];

export const aiInsights = [
  {
    type: 'warning',
    title: 'Critical Ingredient Shortage',
    description: 'Boneless chicken, tikka masala spices, and prawns critically low. Chicken Boneless Handi and Tikka Boti Special orders at risk. Order immediately for weekend rush.',
    impact: 'high',
  },
  {
    type: 'opportunity',
    title: 'Tikka Boti Special Weekend Surge',
    description: 'Tikka Boti Special Karahi and Chicken Boneless Handi orders increase 38% on Fri-Sun. Boost chicken inventory by Thursday evening to maximize revenue.',
    impact: 'high',
  },
  {
    type: 'opportunity',
    title: 'Weekend Breakfast Offer Success',
    description: 'Weekend offers (Beef Paye + 2 Naan, Halwapuri + Tea) generate 45% more morning revenue. Consider extending 11 AM-2 PM window to 11 AM-3 PM.',
    impact: 'high',
  },
  {
    type: 'optimization',
    title: 'Biryani Pre-Prep Strategy',
    description: 'Chicken and Mutton Biryani peak at 7-9 PM. Pre-cook rice and prepare masala base during 3-5 PM slow hours to cut peak prep time by 40%.',
    impact: 'high',
  },
  {
    type: 'opportunity',
    title: 'Mix Platter Upsell Potential',
    description: 'Mix Platter orders 25% higher when suggested with main curries. Train staff to recommend as add-on for Karahi orders - potential €2,800/month revenue boost.',
    impact: 'medium',
  },
  {
    type: 'success',
    title: 'Dynamic Prep Time Working',
    description: 'Prep time accuracy system reduced cancellations by 31%. Tikka Boti Special 30-min prep time now syncs across all platforms, improving customer satisfaction.',
    impact: 'high',
  },
  {
    type: 'optimization',
    title: 'Tandoori Items Batch Cooking',
    description: 'Beef Seekh Kebab, Chicken Tikka, and Malai Boti ordered together 60% of time. Batch-grill these items to save 12 minutes per order during peak hours.',
    impact: 'medium',
  },
  {
    type: 'opportunity',
    title: 'Peak Staffing Adjustment',
    description: 'Friday/Saturday 7-10 PM show 18-minute average prep delays with current 16-18 staff. Add 2 kitchen staff to maintain 30-min Tikka Boti Special prep time.',
    impact: 'high',
  },
  {
    type: 'warning',
    title: 'Butter Chicken Trending Down',
    description: 'Butter Chicken (Full) orders dropped 8% this month. Consider promotional pricing (€16 → €15) or combo with Garlic Naan to boost sales.',
    impact: 'medium',
  },
  {
    type: 'optimization',
    title: 'Aloo Pratha Morning Rush',
    description: 'Aloo Pratha orders peak 11:30 AM-12:30 PM. Pre-cook 20 parathas by 11 AM on weekends to reduce wait time from 15 min to 5 min.',
    impact: 'medium',
  },
  {
    type: 'success',
    title: 'Prawns Masala Premium Item',
    description: 'Prawns Masala Plate generates highest profit margin (68%) despite limited orders. Promote as premium weekend special to boost high-margin sales.',
    impact: 'medium',
  },
  {
    type: 'opportunity',
    title: 'Naan Combo Optimization',
    description: '78% of curry orders include naan. Create "Curry + 2 Naan" combos at €1 discount to speed ordering and increase average order value by 12%.',
    impact: 'medium',
  },
];
