import React from 'react';
import { motion } from 'framer-motion';
import {
  Utensils,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Sparkles,
  Star,
  ThumbsDown,
} from 'lucide-react';
import { menuPerformance } from '@/data/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const MenuIntelligencePage: React.FC = () => {
  const topPerformers = menuPerformance.filter((item) => item.trend > 0).slice(0, 4);
  const lowPerformers = menuPerformance.filter((item) => item.trend < 0);

  const aiSuggestions = [
    {
      type: 'promote',
      title: 'Promote Shrimp Bowl',
      description: 'High margin (42%) and 32% demand increase. Consider featuring in platform banners.',
      impact: 'high',
    },
    {
      type: 'remove',
      title: 'Consider Removing Vada',
      description: 'Consistent 22% decline over 4 weeks. Low margin (18%) and minimal repeat orders.',
      impact: 'medium',
    },
    {
      type: 'bundle',
      title: 'Create Combo Deal',
      description: 'Masala Dosa + Butter Chicken Dosa ordered together 34% of the time. Bundle discount could increase order value.',
      impact: 'high',
    },
    {
      type: 'price',
      title: 'Price Optimization',
      description: 'Cheese Dosa has low price elasticity. A $1 increase would improve margins without affecting volume.',
      impact: 'medium',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top & Low Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Top Performing Items
          </h3>
          <div className="space-y-3">
            {topPerformers.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-success/5 rounded-lg border border-success/20"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-success">#{index + 1}</span>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.orders} orders • ${item.revenue} revenue
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-success">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium">+{item.trend}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Low Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
            <ThumbsDown className="h-5 w-5 text-warning" />
            Declining Items
          </h3>
          <div className="space-y-3">
            {lowPerformers.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-warning/5 rounded-lg border border-warning/20"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.orders} orders • ${item.revenue} revenue
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-destructive">
                  <TrendingDown className="h-4 w-4" />
                  <span className="font-medium">{item.trend}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
          <Utensils className="h-5 w-5 text-primary" />
          Menu Item Performance
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={menuPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number, name: string) => [
                  name === 'orders' ? `${value} orders` : `$${value}`,
                  name === 'orders' ? 'Orders' : 'Revenue',
                ]}
              />
              <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* AI Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Menu Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiSuggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`ai-insight-card ${
                suggestion.impact === 'high' ? 'border-l-primary' : 'border-l-muted-foreground'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-medium">{suggestion.title}</h4>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    suggestion.type === 'promote'
                      ? 'bg-success/10 text-success'
                      : suggestion.type === 'remove'
                      ? 'bg-destructive/10 text-destructive'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  {suggestion.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{suggestion.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MenuIntelligencePage;
