import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  DollarSign,
  Clock,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
} from 'lucide-react';
import { useOrdersStore } from '@/stores/ordersStore';
import { dailyRevenue, aiInsights } from '@/data/mockData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const AnimatedCounter: React.FC<{ value: number; prefix?: string; suffix?: string }> = ({
  value,
  prefix = '',
  suffix = '',
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="counter-animate">
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};

const DashboardHome: React.FC = () => {
  const { orders, acceptedOrders, prepTime } = useOrdersStore();
  const todayOrders = acceptedOrders.length + orders.length;
  const todayRevenue = acceptedOrders.reduce((sum, order) => sum + order.total, 0);

  const stats = [
    {
      label: 'Total Orders Today',
      value: todayOrders + 47,
      change: 12,
      positive: true,
      icon: ShoppingBag,
      color: 'text-primary',
    },
    {
      label: 'Revenue Today',
      value: Math.round(todayRevenue + 2847),
      prefix: '$',
      change: 8,
      positive: true,
      icon: DollarSign,
      color: 'text-success',
    },
    {
      label: 'Avg Prep Time',
      value: prepTime,
      suffix: ' min',
      change: -15,
      positive: true,
      icon: Clock,
      color: 'text-accent',
    },
    {
      label: 'Cancellation Rate',
      value: 2.3,
      suffix: '%',
      change: -23,
      positive: true,
      icon: TrendingDown,
      color: 'text-warning',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-muted-foreground text-sm">{stat.label}</span>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold font-display">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </span>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.positive ? 'text-success' : 'text-destructive'
                  }`}
                >
                  {stat.positive ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  <span>{Math.abs(stat.change)}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="font-display font-semibold text-lg mb-4">Revenue by Platform</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyRevenue}>
                <defs>
                  <linearGradient id="colorUber" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(6, 100%, 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(6, 100%, 50%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorGlovo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(45, 100%, 51%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(45, 100%, 51%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorBolt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(166, 100%, 37%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(166, 100%, 37%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="uber"
                  stroke="hsl(6, 100%, 50%)"
                  fillOpacity={1}
                  fill="url(#colorUber)"
                />
                <Area
                  type="monotone"
                  dataKey="glovo"
                  stroke="hsl(45, 100%, 51%)"
                  fillOpacity={1}
                  fill="url(#colorGlovo)"
                />
                <Area
                  type="monotone"
                  dataKey="bolt"
                  stroke="hsl(166, 100%, 37%)"
                  fillOpacity={1}
                  fill="url(#colorBolt)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-platform-uber" />
              <span className="text-sm text-muted-foreground">Uber Eats</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-platform-glovo" />
              <span className="text-sm text-muted-foreground">Glovo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-platform-bolt" />
              <span className="text-sm text-muted-foreground">Bolt Food</span>
            </div>
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="font-display font-semibold text-lg">AI Insights</h3>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {aiInsights.slice(0, 4).map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`ai-insight-card ${
                  insight.impact === 'high'
                    ? 'border-l-primary'
                    : 'border-l-muted-foreground'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {insight.description}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      insight.type === 'opportunity'
                        ? 'bg-success/10 text-success'
                        : insight.type === 'warning'
                        ? 'bg-warning/10 text-warning'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {insight.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Prep Time Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-lg">Kitchen Load Status</h3>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
            </span>
            <span className="text-sm text-muted-foreground">Synced with platforms</span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Current Load</span>
              <span className="text-sm font-medium">{acceptedOrders.length} active orders</span>
            </div>
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((acceptedOrders.length / 10) * 100, 100)}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full rounded-full ${
                  acceptedOrders.length >= 7
                    ? 'bg-destructive'
                    : acceptedOrders.length >= 4
                    ? 'bg-warning'
                    : 'bg-success'
                }`}
              />
            </div>
          </div>
          <div className="text-center px-6 py-3 bg-primary/10 rounded-xl">
            <div className="text-3xl font-bold font-display text-primary">{prepTime}</div>
            <div className="text-xs text-muted-foreground">min prep time</div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
          <Zap className="h-3 w-3 text-primary" />
          Prep time automatically adjusts based on kitchen capacity and syncs with all delivery platforms
        </p>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
