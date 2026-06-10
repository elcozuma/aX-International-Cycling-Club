import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { CookieConsent } from "@/components/CookieConsent";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Events from "@/pages/Events";
import FAQ from "@/pages/FAQ";
import Morocco from "@/pages/Morocco";
import NotFound from "@/pages/not-found";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/events" component={Events} />
      <Route path="/faq" component={FAQ} />
      <Route path="/morocco" component={Morocco} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");
  return (
    <>
      {!isAdmin && <AnalyticsProvider />}
      <Router />
      {!isAdmin && <CookieConsent />}
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AppContent />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;
