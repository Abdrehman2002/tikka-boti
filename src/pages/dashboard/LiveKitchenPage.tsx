import React from 'react';
import { motion } from 'framer-motion';
import {
  ChefHat,
  Clock,
  Flame,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { useOrdersStore, Platform } from '@/stores/ordersStore';

const platformConfig: Record<Platform, { label: string; color: string }> = {
  uber_eats: { label: 'Uber', color: 'bg-platform-uber' },
  glovo: { label: 'Glovo', color: 'bg-platform-glovo' },
  bolt_food: { label: 'Bolt', color: 'bg-platform-bolt' },
};

const LiveKitchenPage: React.FC = () => {
  const { acceptedOrders, prepTime } = useOrdersStore();

  const kitchenLoad = Math.min((acceptedOrders.length / 10) * 100, 100);
  const loadStatus =
    kitchenLoad >= 70 ? 'critical' : kitchenLoad >= 40 ? 'busy' : 'normal';

  return (
    <div className="space-y-6">
      {/* Kitchen Status Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="stat-card"
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-xl ${
                loadStatus === 'critical'
                  ? 'bg-destructive/20'
                  : loadStatus === 'busy'
                  ? 'bg-warning/20'
                  : 'bg-success/20'
              }`}
            >
              <Flame
                className={`h-6 w-6 ${
                  loadStatus === 'critical'
                    ? 'text-destructive'
                    : loadStatus === 'busy'
                    ? 'text-warning'
                    : 'text-success'
                }`}
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kitchen Load</p>
              <p className="text-2xl font-bold font-display">{Math.round(kitchenLoad)}%</p>
            </div>
          </div>
          <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${kitchenLoad}%` }}
              className={`h-full rounded-full ${
                loadStatus === 'critical'
                  ? 'bg-destructive'
                  : loadStatus === 'busy'
                  ? 'bg-warning'
                  : 'bg-success'
              }`}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="stat-card"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/20">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Prep Time</p>
              <p className="text-2xl font-bold font-display">{prepTime} min</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-success" />
            Synced to all platforms
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-accent/20">
              <ChefHat className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Orders</p>
              <p className="text-2xl font-bold font-display">{acceptedOrders.length}</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            In kitchen queue
          </p>
        </motion.div>
      </div>

      {/* Kitchen Queue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl p-6"
      >
        <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
          <ChefHat className="h-5 w-5 text-primary" />
          Kitchen Queue
        </h2>

        {acceptedOrders.length === 0 ? (
          <div className="text-center py-12">
            <ChefHat className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">Kitchen is ready for orders</p>
            <p className="text-xs text-muted-foreground mt-1">
              Accept orders to see them here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {acceptedOrders.map((order, index) => {
              const platform = platformConfig[order.platform];
              const estimatedTime = prepTime - Math.floor(index * 2);

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-secondary/50 rounded-xl p-4 relative overflow-hidden"
                >
                  {index === 0 && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-bl-lg">
                      PREPARING
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-2 h-2 rounded-full ${platform.color}`} />
                    <span className="text-xs font-medium">{platform.label}</span>
                    <span className="text-xs text-muted-foreground font-mono ml-auto">
                      #{order.id.slice(0, 6)}
                    </span>
                  </div>

                  <div className="space-y-1 mb-3">
                    {order.items.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="text-sm">
                        {item.quantity}x {item.name}
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{order.items.length - 2} more items
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{order.customerName}</span>
                    <span className="flex items-center gap-1 text-primary font-medium">
                      <Clock className="h-3 w-3" />
                      ~{Math.max(estimatedTime, 5)} min
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Dynamic Prep Time Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-xl p-6 border-l-4 border-l-primary"
      >
        <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-primary" />
          Dynamic Prep Time Intelligence
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-success/10 rounded-lg p-4">
            <p className="font-medium text-success">1-3 Orders</p>
            <p className="text-2xl font-bold font-display mt-1">15 min</p>
            <p className="text-xs text-muted-foreground mt-1">Base prep time</p>
          </div>
          <div className="bg-warning/10 rounded-lg p-4">
            <p className="font-medium text-warning">4-6 Orders</p>
            <p className="text-2xl font-bold font-display mt-1">20 min</p>
            <p className="text-xs text-muted-foreground mt-1">+5 min adjustment</p>
          </div>
          <div className="bg-destructive/10 rounded-lg p-4">
            <p className="font-medium text-destructive">7+ Orders</p>
            <p className="text-2xl font-bold font-display mt-1">30 min</p>
            <p className="text-xs text-muted-foreground mt-1">High capacity mode</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Prep times are automatically calculated and pushed to Uber Eats, Glovo, and Bolt Food in real-time to optimize customer expectations and reduce cancellations.
        </p>
      </motion.div>
    </div>
  );
};

export default LiveKitchenPage;
