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
      
      // Calculate new prep time based on accepted orders
      let prepTime = 15;
      if (newAccepted.length >= 7) {
        prepTime = 30;
      } else if (newAccepted.length >= 4) {
        prepTime = 20;
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
    
    if (count >= 7) return 30;
    if (count >= 4) return 20;
    return basePrepTime;
  },
}));
