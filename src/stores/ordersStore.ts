import { create } from 'zustand';

export type Platform = 'uber_eats' | 'glovo' | 'bolt_food';
export type OrderStatus = 'pending' | 'accepted' | 'rejected';

export interface OrderItem {
  name: string;
  quantity: number;
  modifiers?: string[];
  price: number;
}

export interface Order {
  id: string;
  platform: Platform;
  items: OrderItem[];
  timestamp: Date;
  status: OrderStatus;
  customerName: string;
  total: number;
  estimatedPrepTime?: number;
}

interface OrdersState {
  orders: Order[];
  acceptedOrders: Order[];
  rejectedOrders: Order[];
  prepTime: number;
  basePrepTime: number;
  addOrder: (order: Order) => void;
  acceptOrder: (orderId: string) => void;
  rejectOrder: (orderId: string) => void;
  calculatePrepTime: () => number;
}

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],
  acceptedOrders: [],
  rejectedOrders: [],
  prepTime: 15,
  basePrepTime: 15,
  
  addOrder: (order) => {
    set((state) => ({
      orders: [order, ...state.orders],
    }));
  },
  
  acceptOrder: (orderId) => {
    set((state) => {
      const order = state.orders.find((o) => o.id === orderId);
      if (!order) return state;

      const updatedOrder = { ...order, status: 'accepted' as OrderStatus };
      const newAccepted = [updatedOrder, ...state.acceptedOrders];
      const newPending = state.orders.filter((o) => o.id !== orderId);

      // Calculate new prep time based on:
      // 1. Base prep time from the order items (estimatedPrepTime)
      // 2. Kitchen load multiplier based on number of accepted orders
      const basePrepTime = order.estimatedPrepTime || 15;
      let prepTime = basePrepTime;

      // Add kitchen load factor
      if (newAccepted.length >= 10) {
        prepTime = Math.min(basePrepTime + 20, 45); // Max 45 min
      } else if (newAccepted.length >= 7) {
        prepTime = basePrepTime + 15;
      } else if (newAccepted.length >= 4) {
        prepTime = basePrepTime + 10;
      } else if (newAccepted.length >= 2) {
        prepTime = basePrepTime + 5;
      }

      return {
        orders: newPending,
        acceptedOrders: newAccepted,
        prepTime,
      };
    });
  },
  
  rejectOrder: (orderId) => {
    set((state) => {
      const order = state.orders.find((o) => o.id === orderId);
      if (!order) return state;
      
      const updatedOrder = { ...order, status: 'rejected' as OrderStatus };
      
      return {
        orders: state.orders.filter((o) => o.id !== orderId),
        rejectedOrders: [updatedOrder, ...state.rejectedOrders],
      };
    });
  },
  
  calculatePrepTime: () => {
    const { acceptedOrders, basePrepTime } = get();
    const count = acceptedOrders.length;

    // If no orders, return base time
    if (count === 0) return basePrepTime;

    // Get the highest prep time from current orders
    const maxOrderPrepTime = Math.max(...acceptedOrders.map(o => o.estimatedPrepTime || 15));

    // Add kitchen load factor
    if (count >= 10) return Math.min(maxOrderPrepTime + 20, 45);
    if (count >= 7) return maxOrderPrepTime + 15;
    if (count >= 4) return maxOrderPrepTime + 10;
    if (count >= 2) return maxOrderPrepTime + 5;
    return Math.max(maxOrderPrepTime, basePrepTime);
  },
}));
