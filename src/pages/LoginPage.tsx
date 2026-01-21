import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, AlertCircle, ChefHat } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { PixelTrail } from '@/components/ui/pixel-trail';
import { useScreenSize } from '@/hooks/use-screen-size';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const LoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const screenSize = useScreenSize();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = login(password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError(true);
      setPassword('');
    }
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#1a1a1a]">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90 z-0 pointer-events-none" />

      {/* PixelTrail Background */}
      <div className="absolute inset-0 z-[1]">
        <PixelTrail
          pixelSize={screenSize.lessThan('md') ? 48 : 80}
          fadeDuration={1500}
          delay={0}
          pixelClassName="rounded-full bg-primary/80"
        />
      </div>

      {/* Login Card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          <div className="glass-card rounded-2xl p-8 shadow-2xl border border-primary/20 pointer-events-auto">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mb-8 flex flex-col items-center"
            >
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary shadow-lg">
                <ChefHat className="h-10 w-10 text-primary-foreground" />
              </div>
              <h1 className="font-display text-3xl font-bold gradient-primary-text">
                Indian Dosa
              </h1>
              <p className="mt-2 text-muted-foreground text-sm">
                Restaurant Management System
              </p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">
                  Access Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                    placeholder="Enter password"
                    className={`pl-10 h-12 bg-secondary/50 border-border/50 focus:border-primary transition-all ${
                      error ? 'border-destructive animate-pulse-glow' : ''
                    }`}
                    autoFocus
                  />
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-destructive"
                  >
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      Incorrect password. Please try again.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                disabled={isLoading || !password}
                className="w-full h-12 gradient-primary text-primary-foreground font-semibold text-base shadow-lg hover:opacity-90 transition-opacity"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                ) : (
                  'Access Dashboard'
                )}
              </Button>
            </form>

            {/* Hint */}
            <p className="mt-6 text-center text-xs text-muted-foreground">
              Demo password: <span className="font-mono text-primary">dosa</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
