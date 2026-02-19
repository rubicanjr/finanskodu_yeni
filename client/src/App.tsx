import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { I18nProvider } from "./contexts/I18nContext";
import Home from "./pages/Home";
import AnalysisPage from "./pages/AnalysisPage";
import BlogListPage from "./pages/BlogListPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import KodOdasiNew from "./pages/KodOdasiNew";
import DualPersonaWidget from "./components/DualPersonaWidget";
import Sidebar from "./components/Sidebar";
import TradingViewTickerTape from "./components/TradingViewTickerTape";
import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

function Router() {
  const [location] = useLocation();

  // Automatic pageview tracking on route change
  useEffect(() => {
    trackPageView(location);
  }, [location]);

  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/analiz"} component={AnalysisPage} />
      <Route path={"/blog"} component={BlogListPage} />
      <Route path={"/blog/:slug"} component={BlogDetailPage} />
      <Route path={"/kod-odasi"} component={KodOdasiNew} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <I18nProvider defaultLanguage="tr">
        <ThemeProvider defaultTheme="dark" switchable={true}>
          <TooltipProvider>
          <Toaster />
          {/* TradingView Ticker Tape - Fixed at top */}
          <div 
            className="fixed top-0 left-0 right-0 lg:left-[220px]"
            style={{
              zIndex: 100,
              background: '#0D1117',
              borderBottom: '1px solid #1E2D3D',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <TradingViewTickerTape />
            {/* Gradient shadow below ticker */}
            <div 
              style={{
                position: 'absolute',
                bottom: '-12px',
                left: 0,
                right: 0,
                height: '12px',
                background: 'linear-gradient(to bottom, #0D1117, transparent)',
                pointerEvents: 'none',
                zIndex: 101,
              }}
            />
          </div>
          {/* Sidebar Navigation */}
          <Sidebar />
          {/* Main Content Area - offset for sidebar on desktop and ticker tape */}
          <div className="lg:ml-[220px] pt-[46px]">
            <Router />
          </div>
          {/* Dual Persona Widget */}
          <DualPersonaWidget />
          </TooltipProvider>
        </ThemeProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
}

export default App;
