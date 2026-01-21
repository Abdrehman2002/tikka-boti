import { Platform, OrderItem } from '@/stores/ordersStore';

export const menuItems = [
  { name: 'Masala Dosa', price: 12.99 },
  { name: 'Plain Dosa', price: 9.99 },
  { name: 'Paneer Dosa', price: 14.99 },
  { name: 'Mysore Masala Dosa', price: 13.99 },
  { name: 'Rava Dosa', price: 11.99 },
  { name: 'Onion Dosa', price: 12.49 },
  { name: 'Paper Dosa', price: 11.49 },
  { name: 'Cheese Dosa', price: 15.99 },
  { name: 'Butter Chicken Dosa', price: 16.99 },
  { name: 'Shrimp Bowl', price: 18.99 },
  { name: 'Idli Sambar', price: 8.99 },
  { name: 'Vada', price: 7.99 },
  { name: 'Uttapam', price: 11.99 },
  { name: 'Chole Bhature', price: 13.99 },
];

export const modifiers = [
  'Extra Spicy',
  'No Onions',
  'Extra Chutney',
  'Add Ghee',
  'Less Salt',
  'Vegan',
  'Gluten-Free',
];

export const customerNames = [
  'John D.',
  'Sarah M.',
  'Michael R.',
  'Emily K.',
  'David L.',
  'Jessica P.',
  'Chris B.',
  'Amanda W.',
  'Robert T.',
  'Laura S.',
];

export const platforms: Platform[] = ['uber_eats', 'glovo', 'bolt_food'];

export function generateRandomOrder(): { platform: Platform; items: OrderItem[]; customerName: string; total: number } {
  const platform = platforms[Math.floor(Math.random() * platforms.length)];
  const numItems = Math.floor(Math.random() * 3) + 1;
  const items: OrderItem[] = [];
  let total = 0;

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
  }

  const customerName = customerNames[Math.floor(Math.random() * customerNames.length)];

  return { platform, items, customerName, total: Math.round(total * 100) / 100 };
}

// Analytics mock data
export const dailyRevenue = [
  { day: 'Mon', uber: 1200, glovo: 800, bolt: 600 },
  { day: 'Tue', uber: 1400, glovo: 900, bolt: 700 },
  { day: 'Wed', uber: 1100, glovo: 750, bolt: 550 },
  { day: 'Thu', uber: 1600, glovo: 1100, bolt: 800 },
  { day: 'Fri', uber: 2200, glovo: 1500, bolt: 1100 },
  { day: 'Sat', uber: 2500, glovo: 1800, bolt: 1300 },
  { day: 'Sun', uber: 1900, glovo: 1300, bolt: 950 },
];

export const hourlyOrders = [
  { hour: '10AM', orders: 5 },
  { hour: '11AM', orders: 12 },
  { hour: '12PM', orders: 28 },
  { hour: '1PM', orders: 35 },
  { hour: '2PM', orders: 22 },
  { hour: '3PM', orders: 15 },
  { hour: '4PM', orders: 10 },
  { hour: '5PM', orders: 18 },
  { hour: '6PM', orders: 32 },
  { hour: '7PM', orders: 45 },
  { hour: '8PM', orders: 52 },
  { hour: '9PM', orders: 38 },
  { hour: '10PM', orders: 20 },
];

export const menuPerformance = [
  { name: 'Masala Dosa', orders: 245, revenue: 3182, trend: 12 },
  { name: 'Butter Chicken Dosa', orders: 189, revenue: 3210, trend: 8 },
  { name: 'Shrimp Bowl', orders: 156, revenue: 2962, trend: 32 },
  { name: 'Cheese Dosa', orders: 142, revenue: 2270, trend: 5 },
  { name: 'Mysore Masala', orders: 128, revenue: 1791, trend: -3 },
  { name: 'Paneer Dosa', orders: 98, revenue: 1469, trend: -8 },
  { name: 'Plain Dosa', orders: 67, revenue: 669, trend: -15 },
  { name: 'Vada', orders: 45, revenue: 360, trend: -22 },
];

export const staffingData = [
  { day: 'Mon', '10AM': 2, '11AM': 3, '12PM': 5, '1PM': 6, '2PM': 4, '3PM': 3, '4PM': 2, '5PM': 4, '6PM': 6, '7PM': 8, '8PM': 9, '9PM': 6, '10PM': 3 },
  { day: 'Tue', '10AM': 2, '11AM': 4, '12PM': 6, '1PM': 7, '2PM': 4, '3PM': 3, '4PM': 2, '5PM': 4, '6PM': 7, '7PM': 8, '8PM': 8, '9PM': 5, '10PM': 3 },
  { day: 'Wed', '10AM': 2, '11AM': 3, '12PM': 5, '1PM': 5, '2PM': 3, '3PM': 2, '4PM': 2, '5PM': 3, '6PM': 5, '7PM': 7, '8PM': 7, '9PM': 5, '10PM': 2 },
  { day: 'Thu', '10AM': 3, '11AM': 4, '12PM': 6, '1PM': 7, '2PM': 5, '3PM': 3, '4PM': 3, '5PM': 5, '6PM': 7, '7PM': 9, '8PM': 10, '9PM': 7, '10PM': 4 },
  { day: 'Fri', '10AM': 3, '11AM': 5, '12PM': 8, '1PM': 9, '2PM': 6, '3PM': 4, '4PM': 4, '5PM': 6, '6PM': 9, '7PM': 12, '8PM': 14, '9PM': 10, '10PM': 5 },
  { day: 'Sat', '10AM': 4, '11AM': 6, '12PM': 9, '1PM': 10, '2PM': 7, '3PM': 5, '4PM': 5, '5PM': 7, '6PM': 10, '7PM': 14, '8PM': 16, '9PM': 11, '10PM': 6 },
  { day: 'Sun', '10AM': 3, '11AM': 5, '12PM': 7, '1PM': 8, '2PM': 5, '3PM': 4, '4PM': 4, '5PM': 5, '6PM': 8, '7PM': 10, '8PM': 12, '9PM': 8, '10PM': 4 },
];

export const inventoryData = [
  { ingredient: 'Rice Batter', current: 45, needed: 60, unit: 'kg', trend: 'stable' },
  { ingredient: 'Potato Masala', current: 20, needed: 35, unit: 'kg', trend: 'increasing' },
  { ingredient: 'Coconut Chutney', current: 15, needed: 25, unit: 'liters', trend: 'stable' },
  { ingredient: 'Shrimp', current: 8, needed: 15, unit: 'kg', trend: 'critical' },
  { ingredient: 'Paneer', current: 12, needed: 20, unit: 'kg', trend: 'stable' },
  { ingredient: 'Ghee', current: 10, needed: 15, unit: 'liters', trend: 'stable' },
  { ingredient: 'Sambar', current: 25, needed: 40, unit: 'liters', trend: 'increasing' },
];

export const aiInsights = [
  {
    type: 'opportunity',
    title: 'Shrimp Bowl Demand Surge',
    description: 'Shrimp Bowl demand increases by 32% on Fridays. Recommend restocking shrimp inventory by Thursday evening.',
    impact: 'high',
  },
  {
    type: 'optimization',
    title: 'Staff Scheduling Opportunity',
    description: 'Kitchen is underutilized weekdays 2-4 PM. Consider prep work during this window to reduce peak hour bottlenecks.',
    impact: 'medium',
  },
  {
    type: 'warning',
    title: 'Menu Item Alert',
    description: 'Plain Dosa and Vada showing 15%+ decline in orders. Consider promotional pricing or menu repositioning.',
    impact: 'medium',
  },
  {
    type: 'opportunity',
    title: 'Peak Hours Staffing',
    description: 'Increase staff by 2 on Fridays and Saturdays 7-10 PM. Current capacity causing 8-minute avg delay increase.',
    impact: 'high',
  },
  {
    type: 'success',
    title: 'Cancellation Reduction',
    description: 'Dynamic prep time adjustment has reduced order cancellations by 23% this month.',
    impact: 'high',
  },
];
