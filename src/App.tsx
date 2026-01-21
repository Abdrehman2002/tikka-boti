import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import OrdersPage from "./pages/dashboard/OrdersPage";
import LiveKitchenPage from "./pages/dashboard/LiveKitchenPage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";
import MenuIntelligencePage from "./pages/dashboard/MenuIntelligencePage";
import StaffingHeatmapPage from "./pages/dashboard/StaffingHeatmapPage";
import InventoryAIPage from "./pages/dashboard/InventoryAIPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="kitchen" element={<LiveKitchenPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="menu" element={<MenuIntelligencePage />} />
            <Route path="staffing" element={<StaffingHeatmapPage />} />
            <Route path="inventory" element={<InventoryAIPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
