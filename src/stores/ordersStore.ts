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

      // Static prep time based on total accepted orders
      // 1-4 orders: 15 min
      // 5-8 orders: 20 min
      // 9-12 orders: 25 min
      // 13+ orders: 30 min
      let prepTime = 15;
      const orderCount = newAccepted.length;

      if (orderCount >= 13) {
        prepTime = 30;
      } else if (orderCount >= 9) {
        prepTime = 25;
      } else if (orderCount >= 5) {
        prepTime = 20;
      } else {
        prepTime = 15;
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

    // Static prep time based on total accepted orders
    // 1-4 orders: 15 min
    // 5-8 orders: 20 min
    // 9-12 orders: 25 min
    // 13+ orders: 30 min
    if (count === 0) return basePrepTime;
    if (count >= 13) return 30;
    if (count >= 9) return 25;
    if (count >= 5) return 20;
    return 15;
  },
}));
