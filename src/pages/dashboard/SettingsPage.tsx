import React from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Bell,
  Globe,
  Palette,
  Shield,
  Database,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const SettingsPage: React.FC = () => {
  const settingsGroups = [
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        { label: 'New order alerts', description: 'Get notified when new orders arrive', enabled: true },
        { label: 'Prep time warnings', description: 'Alert when prep time exceeds threshold', enabled: true },
        { label: 'Low inventory alerts', description: 'Notify when stock runs low', enabled: true },
        { label: 'Daily summary', description: 'Receive end-of-day performance report', enabled: false },
      ],
    },
    {
      title: 'Platform Integrations',
      icon: Globe,
      settings: [
        { label: 'Uber Eats', description: 'Connected and syncing', enabled: true },
        { label: 'Glovo', description: 'Connected and syncing', enabled: true },
        { label: 'Bolt Food', description: 'Connected and syncing', enabled: true },
      ],
    },
    {
      title: 'AI Features',
      icon: Zap,
      settings: [
        { label: 'Auto prep time adjustment', description: 'Automatically update prep times based on load', enabled: true },
        { label: 'Smart inventory alerts', description: 'AI-powered restock predictions', enabled: true },
        { label: 'Menu optimization', description: 'Get AI suggestions for menu changes', enabled: true },
      ],
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-6"
      >
        <h2 className="font-display font-semibold text-lg mb-2 flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Settings
        </h2>
        <p className="text-sm text-muted-foreground">
          Configure your dashboard preferences and integrations
        </p>
      </motion.div>

      {settingsGroups.map((group, groupIndex) => (
        <motion.div
          key={group.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (groupIndex + 1) * 0.1 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="font-display font-medium mb-4 flex items-center gap-2">
            <group.icon className="h-5 w-5 text-primary" />
            {group.title}
          </h3>
          <div className="space-y-4">
            {group.settings.map((setting, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium text-sm">{setting.label}</p>
                  <p className="text-xs text-muted-foreground">{setting.description}</p>
                </div>
                <Switch defaultChecked={setting.enabled} />
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="font-display font-medium mb-4 flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Data & Storage
        </h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between py-3 px-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Export Analytics Data</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="w-full flex items-center justify-between py-3 px-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors">
            <div className="flex items-center gap-3">
              <Palette className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Appearance Settings</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center text-xs text-muted-foreground py-4"
      >
        <p>Indian Dosa Dashboard v1.0.0</p>
        <p className="mt-1">Demo Mode - No actual backend connected</p>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
