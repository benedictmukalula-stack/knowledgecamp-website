import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import FloatingWidgets from "./components/FloatingWidgets";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CourseCalendarPage from "./pages/CourseCalendarPage";
import VenuesPage from "./pages/VenuesPage";
import PartnershipPage from "./pages/PartnershipPage";
import RegisterPage from "./pages/RegisterPage";
import EnterpriseRegistrationPage from "./pages/EnterpriseRegistrationPage";
import CheckoutPage from "./pages/CheckoutPage";
import DashboardPage from "./pages/DashboardPage";
import LMSPage from "./pages/LMSPage";
import PartnerDashboardPage from "./pages/PartnerDashboardPage";
import SponsorPage from "./pages/SponsorPage";
import PricingPage from "./pages/PricingPage";
import OnlineHybridPage from "./pages/OnlineHybridPage";
import HubPage from "./pages/HubPage";
import InHousePage from "./pages/InHousePage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="min-h-[40vh] flex items-center justify-center text-sm text-muted-foreground">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/calendar" element={<CourseCalendarPage />} />
            <Route path="/venues" element={<VenuesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/online-hybrid" element={<OnlineHybridPage />} />
            <Route path="/hubs/:hub" element={<HubPage />} />
            <Route path="/partnerships" element={<PartnershipPage />} />
            <Route path="/in-house" element={<InHousePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/register-enterprise" element={<EnterpriseRegistrationPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/partner-dashboard" element={<PartnerDashboardPage />} />
            <Route path="/sponsors" element={<SponsorPage />} />
            <Route path="/lms" element={<LMSPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Suspense fallback={null}>
          <FloatingWidgets />
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
