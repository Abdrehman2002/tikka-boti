import React from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  Sparkles,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { inventoryData } from '@/data/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const InventoryAIPage: React.FC = () => {
  const lowStockItems = inventoryData.filter(
    (item) => item.current < item.needed * 0.5
  );

  const forecasts = [
    {
      ingredient: 'Chicken (Boneless)',
      alert: 'Demand Surge Expected',
      description: 'Weekend Tikka Boti Special and Chicken Boneless Handi orders surge 38%. Current stock will run out by Friday 8 PM. Restock by Thursday evening.',
      urgency: 'critical',
      action: 'Restock immediately',
    },
    {
      ingredient: 'Tikka Masala Spices Mix',
      alert: 'Critical Stock Level',
      description: 'At current usage rate, spice mix depletes in 1.5 days. Essential for all Tikka Boti Special items. Weekend rush requires immediate restocking.',
      urgency: 'critical',
      action: 'Order today',
    },
    {
      ingredient: 'Prawns (Fresh)',
      alert: 'Weekend Premium Demand',
      description: 'Prawns Masala orders increase 32% on weekends. Current stock insufficient for Friday-Sunday. Order fresh batch by Thursday EOD.',
      urgency: 'critical',
      action: 'Restock by Thursday',
    },
    {
      ingredient: 'Rice (Basmati)',
      alert: 'Biryani Peak Demand',
      description: 'Biryani orders peak 7-9 PM daily. Rice consumption up 22% this week. Stock depletes in 3 days without replenishment.',
      urgency: 'warning',
      action: 'Order by Wednesday',
    },
    {
      ingredient: 'Beef (Raw)',
      alert: 'Increasing Consumption',
      description: 'Beef Seekh Kebab and Beef Reshmi Karahi usage up 15% due to Mix Platter popularity. Adjust weekly order quantity.',
      urgency: 'info',
      action: 'Increase order by 10kg',
    },
  ];

  const chartData = inventoryData.map((item) => ({
    name: item.ingredient,
    current: item.current,
    needed: item.needed,
  }));

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {lowStockItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-center gap-4"
        >
          <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0" />
          <div>
            <p className="font-semibold">Low Stock Alert</p>
            <p className="text-sm text-muted-foreground">
              {lowStockItems.length} ingredient(s) below 50% capacity:{' '}
              {lowStockItems.map((item) => item.ingredient).join(', ')}
            </p>
          </div>
        </motion.div>
      )}

      {/* Inventory Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Current Inventory Levels
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="current" name="Current" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              <Bar dataKey="needed" name="Needed" fill="hsl(var(--muted))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary" />
            <span className="text-sm text-muted-foreground">Current Stock</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-muted" />
            <span className="text-sm text-muted-foreground">Required Level</span>
          </div>
        </div>
      </motion.div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {inventoryData.map((item, index) => {
          const percentage = (item.current / item.needed) * 100;
          const status =
            percentage < 50 ? 'critical' : percentage < 75 ? 'warning' : 'good';

          return (
            <motion.div
              key={item.ingredient}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">{item.ingredient}</span>
                {status === 'critical' ? (
                  <XCircle className="h-5 w-5 text-destructive" />
                ) : status === 'warning' ? (
                  <AlertTriangle className="h-5 w-5 text-warning" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-success" />
                )}
              </div>

              <div className="flex items-end gap-1 mb-2">
                <span className="text-2xl font-bold font-display">{item.current}</span>
                <span className="text-muted-foreground text-sm">/ {item.needed} {item.unit}</span>
              </div>

              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(percentage, 100)}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`h-full rounded-full ${
                    status === 'critical'
                      ? 'bg-destructive'
                      : status === 'warning'
                      ? 'bg-warning'
                      : 'bg-success'
                  }`}
                />
              </div>

              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                {item.trend === 'increasing' ? (
                  <>
                    <TrendingUp className="h-3 w-3 text-warning" />
                    <span>Usage increasing</span>
                  </>
                ) : item.trend === 'critical' ? (
                  <>
                    <AlertTriangle className="h-3 w-3 text-destructive" />
                    <span>Critical level</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-3 w-3 text-success" />
                    <span>Stable</span>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* AI Forecasts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Inventory Forecasts
        </h3>
        <div className="space-y-4">
          {forecasts.map((forecast, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`p-4 rounded-xl border-l-4 ${
                forecast.urgency === 'critical'
                  ? 'bg-destructive/5 border-l-destructive'
                  : forecast.urgency === 'warning'
                  ? 'bg-warning/5 border-l-warning'
                  : 'bg-primary/5 border-l-primary'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{forecast.ingredient}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        forecast.urgency === 'critical'
                          ? 'bg-destructive/10 text-destructive'
                          : forecast.urgency === 'warning'
                          ? 'bg-warning/10 text-warning'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {forecast.alert}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{forecast.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <span
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg ${
                      forecast.urgency === 'critical'
                        ? 'bg-destructive text-destructive-foreground'
                        : forecast.urgency === 'warning'
                        ? 'bg-warning text-warning-foreground'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    {forecast.action}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default InventoryAIPage;
