import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Clock,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Lightbulb,
} from 'lucide-react';
import { staffingData } from '@/data/mockData';

const hours = ['10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM'];

const getHeatColor = (value: number): string => {
  if (value >= 14) return 'bg-destructive/80';
  if (value >= 10) return 'bg-destructive/60';
  if (value >= 7) return 'bg-warning/80';
  if (value >= 5) return 'bg-warning/50';
  if (value >= 3) return 'bg-success/50';
  return 'bg-success/20';
};

const StaffingHeatmapPage: React.FC = () => {
  const staffingRecommendations = [
    {
      type: 'increase',
      title: 'Increase Staff: Friday 7-10 PM',
      description: 'Peak demand period with 12-14 concurrent orders. Add 2 kitchen staff to maintain 15-min prep time.',
      priority: 'high',
    },
    {
      type: 'increase',
      title: 'Increase Staff: Saturday Evenings',
      description: 'Highest volume day of the week. Consider adding 3 extra staff from 6 PM onwards.',
      priority: 'high',
    },
    {
      type: 'optimize',
      title: 'Prep Window: 2-4 PM Weekdays',
      description: 'Low order volume period. Use for ingredient prep to reduce bottlenecks during dinner rush.',
      priority: 'medium',
    },
    {
      type: 'reduce',
      title: 'Optimize Morning Shift',
      description: 'Consistent low volume 10-11 AM. Consider delayed opening or reduced staff during this window.',
      priority: 'low',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="stat-card"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/20">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Peak Hours</p>
              <p className="text-xl font-bold font-display">7-9 PM</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="stat-card"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-warning/20">
              <Calendar className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Busiest Day</p>
              <p className="text-xl font-bold font-display">Saturday</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-success/20">
              <Users className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Staff Efficiency</p>
              <p className="text-xl font-bold font-display">87%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Weekly Order Heatmap
        </h3>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="flex mb-2">
              <div className="w-16"></div>
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="flex-1 text-center text-xs text-muted-foreground font-medium"
                >
                  {hour}
                </div>
              ))}
            </div>

            {/* Rows */}
            {staffingData.map((row, rowIndex) => (
              <motion.div
                key={row.day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + rowIndex * 0.05 }}
                className="flex mb-1"
              >
                <div className="w-16 flex items-center text-sm font-medium">
                  {row.day}
                </div>
                {hours.map((hour) => {
                  const value = row[hour as keyof typeof row] as number;
                  return (
                    <div
                      key={`${row.day}-${hour}`}
                      className={`flex-1 mx-0.5 h-10 rounded-md ${getHeatColor(value)} heatmap-cell flex items-center justify-center`}
                      title={`${row.day} ${hour}: ${value} orders`}
                    >
                      <span className="text-xs font-medium opacity-80">{value}</span>
                    </div>
                  );
                })}
              </motion.div>
            ))}

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <span className="text-xs text-muted-foreground">Low</span>
              <div className="flex gap-1">
                <div className="w-8 h-4 rounded bg-success/20" />
                <div className="w-8 h-4 rounded bg-success/50" />
                <div className="w-8 h-4 rounded bg-warning/50" />
                <div className="w-8 h-4 rounded bg-warning/80" />
                <div className="w-8 h-4 rounded bg-destructive/60" />
                <div className="w-8 h-4 rounded bg-destructive/80" />
              </div>
              <span className="text-xs text-muted-foreground">High</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Staffing Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {staffingRecommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className={`ai-insight-card ${
                rec.priority === 'high'
                  ? 'border-l-destructive'
                  : rec.priority === 'medium'
                  ? 'border-l-warning'
                  : 'border-l-muted-foreground'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-medium text-sm">{rec.title}</h4>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    rec.type === 'increase'
                      ? 'bg-destructive/10 text-destructive'
                      : rec.type === 'reduce'
                      ? 'bg-success/10 text-success'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  {rec.type}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{rec.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default StaffingHeatmapPage;
