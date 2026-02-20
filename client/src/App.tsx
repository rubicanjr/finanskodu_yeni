import { ThemeProvider } from '@/contexts/ThemeContext';
import { I18nProvider } from '@/contexts/I18nContext';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from '@/components/Sidebar';
import TradingViewTickerTape from '@/components/TradingViewTickerTape';
import { Route, Switch, useLocation } from 'wouter';
import { useEffect } from 'react';
import { trackPageView } from '@/lib/analytics';
import ErrorBoundary from './components/ErrorBoundary';
import DualPersonaWidget from './components/DualPersonaWidget';

// Sayfaları import et
import Home from '@/pages/Home';
import AnalysisPage from '@/pages/AnalysisPage';
import BlogListPage from '@/pages/BlogListPage';
import BlogDetailPage from '@/pages/BlogDetailPage';
import KodOdasiNew from '@/pages/KodOdasiNew';
import NotFound from '@/pages/NotFound';

function Router() {
  const [location] = useLocation();

  // Automatic pageview tracking on route change
  useEffect(() => {
    trackPageView(location);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/analiz" component={AnalysisPage} />
      <Route path="/blog" component={BlogListPage} />
      <Route path="/blog/:slug" component={BlogDetailPage} />
      <Route path="/kod-odasi" component={KodOdasiNew} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <I18nProvider>
            <TooltipProvider>
              <Toaster />
              <div className="min-h-screen bg-background text-foreground">
                {/* TradingView Ticker Tape - Fixed at top, hidden on mobile */}
                <div
                  className="hidden md:block fixed top-0 left-0 right-0 lg:left-[220px]"
                  style={{
                    zIndex: 100,
                    background: 'var(--background)',
                    borderBottom: '1px solid var(--border)',
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
                      background: 'linear-gradient(to bottom, var(--background), transparent)',
                      pointerEvents: 'none',
                      zIndex: 101,
                    }}
                  />
                </div>
                
                {/* Sidebar Navigation */}
                <Sidebar />
                
                {/* Main Content Area - offset for sidebar on desktop and ticker tape */}
                <main className="lg:ml-[220px] pt-[46px]">
                  <Router />
                </main>
                
                {/* Dual Persona Widget */}
                <DualPersonaWidget />
              </div>
            </TooltipProvider>
          </I18nProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
