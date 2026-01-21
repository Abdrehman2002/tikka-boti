import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Clock,
  Percent,
} from 'lucide-react';
import { dailyRevenue, hourlyOrders } from '@/data/mockData';
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const platformShare = [
  { name: 'Uber Eats', value: 45, color: 'hsl(6, 100%, 50%)' },
  { name: 'Glovo', value: 32, color: 'hsl(45, 100%, 51%)' },
  { name: 'Bolt Food', value: 23, color: 'hsl(166, 100%, 37%)' },
];

const AnalyticsPage: React.FC = () => {
  const stats = [
    { label: 'Total Revenue', value: '$12,847', change: '+12.3%', positive: true, icon: DollarSign },
    { label: 'Total Orders', value: '347', change: '+8.7%', positive: true, icon: ShoppingBag },
    { label: 'Avg Prep Time', value: '18 min', change: '-15%', positive: true, icon: Clock },
    { label: 'Cancellation Rate', value: '2.3%', change: '-23%', positive: true, icon: Percent },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold font-display">{stat.value}</span>
              <span
                className={`flex items-center gap-1 text-sm font-medium ${
                  stat.positive ? 'text-success' : 'text-destructive'
                }`}
              >
                {stat.positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Weekly Revenue by Platform
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`$${value}`, '']}
                />
                <Bar dataKey="uber" name="Uber Eats" fill="hsl(6, 100%, 50%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="glovo" name="Glovo" fill="hsl(45, 100%, 51%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bolt" name="Bolt Food" fill="hsl(166, 100%, 37%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Platform Share */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="font-display font-semibold text-lg mb-4">Platform Market Share</h3>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformShare}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {platformShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`${value}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            {platformShare.map((platform) => (
              <div key={platform.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }} />
                <span className="text-sm text-muted-foreground">{platform.name}</span>
                <span className="text-sm font-medium">{platform.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Hourly Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="font-display font-semibold text-lg mb-4">Orders by Hour (Today)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourlyOrders}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
                dataKey="orders"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorOrders)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsPage;
