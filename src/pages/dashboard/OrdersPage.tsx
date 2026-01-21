import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  X,
  Clock,
  Package,
  AlertCircle,
} from 'lucide-react';
import { useOrdersStore, Order, Platform } from '@/stores/ordersStore';
import { generateRandomOrder } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';

const platformConfig: Record<Platform, { label: string; className: string }> = {
  uber_eats: { label: 'Uber Eats', className: 'platform-uber' },
  glovo: { label: 'Glovo', className: 'platform-glovo' },
  bolt_food: { label: 'Bolt Food', className: 'platform-bolt' },
};

const OrderCard: React.FC<{ order: Order; onAccept: () => void; onReject: () => void }> = ({
  order,
  onAccept,
  onReject,
}) => {
  const platform = platformConfig[order.platform];
  const timeAgo = Math.floor((Date.now() - new Date(order.timestamp).getTime()) / 1000);
  const timeDisplay = timeAgo < 60 ? `${timeAgo}s ago` : `${Math.floor(timeAgo / 60)}m ago`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -50, scale: 0.95 }}
      layout
      className="order-card border-l-4 border-l-primary"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-bold px-2 py-1 rounded ${platform.className}`}>
              {platform.label}
            </span>
            <span className="text-xs text-muted-foreground font-mono">#{order.id.slice(0, 8)}</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeDisplay}
            </span>
          </div>

          <div className="space-y-1 mb-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-sm font-medium">
                  {item.quantity}x {item.name}
                </span>
                {item.modifiers && item.modifiers.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    ({item.modifiers.join(', ')})
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">{order.customerName}</span>
            <span className="font-semibold text-primary">${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            onClick={onAccept}
            size="sm"
            className="gradient-primary text-primary-foreground gap-1"
          >
            <Check className="h-4 w-4" />
            Accept
          </Button>
          <Button
            onClick={onReject}
            size="sm"
            variant="outline"
            className="text-destructive hover:bg-destructive hover:text-destructive-foreground gap-1"
          >
            <X className="h-4 w-4" />
            Reject
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const AcceptedOrderCard: React.FC<{ order: Order; index: number; prepTime: number }> = ({ order, index, prepTime }) => {
  const platform = platformConfig[order.platform];
  // Calculate estimated time based on position in queue
  // First order gets base prep time, each subsequent order adds time
  const estimatedTime = prepTime - Math.floor(index * 2);
  const displayTime = Math.max(estimatedTime, 5); // Minimum 5 minutes

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-lg p-3 border-l-4 border-l-success"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2 py-0.5 rounded ${platform.className}`}>
            {platform.label}
          </span>
          <span className="text-xs font-mono text-muted-foreground">#{order.id.slice(0, 6)}</span>
        </div>
        <div className="flex items-center gap-2">
          {index === 0 && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
              Preparing
            </span>
          )}
          <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full font-medium">
            Accepted
          </span>
        </div>
      </div>
      <div className="text-sm">
        {order.items.map((item, idx) => (
          <span key={idx}>
            {item.quantity}x {item.name}
            {idx < order.items.length - 1 ? ', ' : ''}
          </span>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          {order.customerName} • ${order.total.toFixed(2)}
        </span>
        <span className="flex items-center gap-1 text-primary font-medium">
          <Clock className="h-3 w-3" />
          ~{displayTime} min
        </span>
      </div>
    </motion.div>
  );
};

const OrdersPage: React.FC = () => {
  const { orders, acceptedOrders, prepTime, addOrder, acceptOrder, rejectOrder } = useOrdersStore();

  const generateNewOrder = useCallback(() => {
    const orderData = generateRandomOrder();
    const newOrder: Order = {
      id: uuidv4(),
      ...orderData,
      timestamp: new Date(),
      status: 'pending',
    };
    addOrder(newOrder);
  }, [addOrder]);

  // Simulate incoming orders
  useEffect(() => {
    const interval = setInterval(() => {
      if (orders.length < 8) {
        generateNewOrder();
      }
    }, 5000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, [generateNewOrder, orders.length]);

  // Generate initial orders
  useEffect(() => {
    if (orders.length === 0 && acceptedOrders.length === 0) {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => generateNewOrder(), i * 500);
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Prep Time Alert */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center justify-between p-4 rounded-xl ${
          prepTime >= 25
            ? 'bg-destructive/10 border border-destructive/20'
            : prepTime >= 20
            ? 'bg-warning/10 border border-warning/20'
            : 'bg-success/10 border border-success/20'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${
              prepTime >= 25 ? 'bg-destructive/20' : prepTime >= 20 ? 'bg-warning/20' : 'bg-success/20'
            }`}
          >
            <Clock
              className={`h-5 w-5 ${
                prepTime >= 25 ? 'text-destructive' : prepTime >= 20 ? 'text-warning' : 'text-success'
              }`}
            />
          </div>
          <div>
            <span className="font-semibold">Current Prep Time: {prepTime} minutes</span>
            <p className="text-xs text-muted-foreground">
              Automatically synced to Uber Eats, Glovo, and Bolt Food
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Orders */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Incoming Orders
              {orders.length > 0 && (
                <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full ml-2">
                  {orders.length}
                </span>
              )}
            </h2>
            <Button onClick={generateNewOrder} size="sm" variant="outline">
              Simulate Order
            </Button>
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {orders.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card rounded-xl p-8 text-center"
                >
                  <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No pending orders</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    New orders will appear here automatically
                  </p>
                </motion.div>
              ) : (
                orders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onAccept={() => acceptOrder(order.id)}
                    onReject={() => rejectOrder(order.id)}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Accepted Orders */}
        <div className="space-y-4">
          <h2 className="font-display font-semibold text-lg flex items-center gap-2">
            <Check className="h-5 w-5 text-success" />
            Accepted Orders
            <span className="text-sm text-muted-foreground font-normal">
              ({acceptedOrders.length})
            </span>
          </h2>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            <AnimatePresence>
              {acceptedOrders.length === 0 ? (
                <div className="glass-card rounded-xl p-6 text-center">
                  <p className="text-sm text-muted-foreground">No accepted orders yet</p>
                </div>
              ) : (
                acceptedOrders.map((order, index) => (
                  <AcceptedOrderCard key={order.id} order={order} index={index} prepTime={prepTime} />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
