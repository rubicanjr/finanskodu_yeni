import { ThemeProvider } from '@/contexts/ThemeContext';
import { I18nProvider } from '@/contexts/I18nContext';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from '@/components/Sidebar';
import MarqueeTicker from '@/components/MarqueeTicker';
import { Route, Switch, useLocation } from 'wouter';
import { useEffect, lazy, Suspense } from 'react';
import { trackPageView } from '@/lib/analytics';
import ErrorBoundary from './components/ErrorBoundary';
import DualPersonaWidget from './components/DualPersonaWidget';

// Route-based code splitting: Lazy load pages
const Home = lazy(() => import('@/pages/Home'));
const DigitalToolsPage = lazy(() => import('@/pages/DigitalToolsPage'));
const AIPromptLibraryPage = lazy(() => import('@/pages/AIPromptLibraryPage'));
const FinansKoduPage = lazy(() => import('@/pages/FinansKoduPage'));
const ProBultenPage = lazy(() => import('@/pages/ProBultenPage'));
const AnalysisPage = lazy(() => import('@/pages/AnalysisPage'));
const BlogListPage = lazy(() => import('@/pages/BlogListPage'));
const BlogDetailPage = lazy(() => import('@/pages/BlogDetailPage'));
const KodOdasiNew = lazy(() => import('@/pages/KodOdasiNew'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground">Yükleniyor...</p>
      </div>
    </div>
  );
}

function Router() {
  const [location] = useLocation();

  // Automatic pageview tracking on route change
  useEffect(() => {
    trackPageView(location);
  }, [location]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dijital-araclar" component={DigitalToolsPage} />
        <Route path="/dijital-araclar/ai-prompt-kutuphanesi" component={AIPromptLibraryPage} />
        <Route path="/dijital-araclar/finans-kodu-kaos-icinde-duzen" component={FinansKoduPage} />
        <Route path="/dijital-araclar/pro-algoritmik-strateji-ve-analiz-bulteni" component={ProBultenPage} />
        <Route path="/analiz" component={AnalysisPage} />
        <Route path="/blog" component={BlogListPage} />
        <Route path="/blog/:slug" component={BlogDetailPage} />
        <Route path="/kod-odasi" component={KodOdasiNew} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
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
                  <MarqueeTicker />
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
