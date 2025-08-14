import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyMobile from "./pages/VerifyMobile";
import ProfileSetup from "./pages/ProfileSetup";
import ConfigureAlerts from "./pages/ConfigureAlerts";
import Dashboard from "./pages/Dashboard";
import ManageSubscription from "./pages/ManageSubscription";
import ActionConfirmation from "./pages/ActionConfirmation";
import Analytics from "./pages/Analytics";
import DeadSpendDetector from "./pages/DeadSpendDetector";
import CancellationInstructions from "./pages/CancellationInstructions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-mobile" element={<VerifyMobile />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/configure-alerts" element={<ConfigureAlerts />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subscription/:id" element={<ManageSubscription />} />
          <Route path="/action-confirmation" element={<ActionConfirmation />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/dead-spend-detector" element={<DeadSpendDetector />} />
          <Route path="/cancellation-instructions/:id" element={<CancellationInstructions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
