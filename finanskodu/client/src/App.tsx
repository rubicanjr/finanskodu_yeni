import { ThemeProvider } from '@/contexts/ThemeContext';
import { I18nProvider } from '@/contexts/I18nContext';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from '@/components/Sidebar';
import { Route, Switch, useLocation } from 'wouter';
import { useEffect, lazy, Suspense, useState } from 'react';
import { trackPageView } from '@/lib/analytics';
import ErrorBoundary from './components/ErrorBoundary';
import CookieConsent from '@/components/CookieConsent';
import SwUpdateToast from '@/components/SwUpdateToast';

// Heavy components: lazy load to keep initial bundle small
const MarqueeTicker = lazy(() => import('@/components/MarqueeTicker'));
const DualPersonaWidget = lazy(() => import('./components/DualPersonaWidget'));

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
const KurucuStratejistPage = lazy(() => import('@/pages/KurucuStratejistPage'));
const KurumsalPage = lazy(() => import('@/pages/KurumsalPage'));
const OrtaklikPage = lazy(() => import('@/pages/OrtaklikPage'));
const IletisimPage = lazy(() => import('@/pages/IletisimPage'));
const ProjelerPage = lazy(() => import('@/pages/ProjelerPage'));
const KaynakKutuphanesiPage = lazy(() => import('@/pages/KaynakKutuphanesiPage'));
const KvkkPage = lazy(() => import('@/pages/KvkkPage'));
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
        <Route path="/kurucu-stratejist" component={KurucuStratejistPage} />
        <Route path="/kurumsal" component={KurumsalPage} />
        <Route path="/ortaklik" component={OrtaklikPage} />
        <Route path="/iletisim" component={IletisimPage} />
        <Route path="/projeler" component={ProjelerPage} />
        <Route path="/kaynak-kutuphanesi" component={KaynakKutuphanesiPage} />
        <Route path="/kvkk" component={KvkkPage} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// Mobil breakpoint hook — SSR-safe, sadece md+ ekranlarda ticker render edilir
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isDesktop;
}

function App() {
  const [location] = useLocation();
  // DualPersonaWidget sadece ana sayfada göster — diğer sayfalarda yükleme maliyeti sıfır
  const isHomePage = location === '/';
  // MarqueeTicker sadece desktop'ta DOM'a eklenir (mobil TBT azaltır)
  const isDesktop = useIsDesktop();

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <I18nProvider>
            <TooltipProvider>
              <Toaster />
              <div className="min-h-screen bg-background text-foreground">
                {/* MarqueeTicker: sadece desktop'ta DOM'a eklenir — mobilde render maliyeti sıfır */}
                {isDesktop && (
                  <div
                    className="fixed top-0 left-0 right-0 lg:left-[220px]"
                    style={{
                      zIndex: 100,
                      background: 'var(--background)',
                      borderBottom: '1px solid var(--border)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                    }}
                  >
                    <Suspense fallback={null}>
                      <MarqueeTicker />
                    </Suspense>
                  </div>
                )}
                
                {/* Sidebar Navigation */}
                <Sidebar />
                
                {/* Main Content Area - offset for sidebar on desktop and ticker tape */}
                {/* pt-12 on mobile to avoid hamburger button overlap, pt-[46px] on md for ticker tape */}
                <main className="lg:ml-[220px] pt-12 md:pt-[46px]">
                  <Router />
                </main>
                
                {/* Dual Persona Widget - only on home page, lazy loaded */}
                {isHomePage && (
                  <Suspense fallback={null}>
                    <DualPersonaWidget />
                  </Suspense>
                )}

                {/* KVKK/GDPR Çerez Onay Banner'ı - tüm sayfalarda göster */}
                <CookieConsent />

                {/* Service Worker Güncelleme Toast'u - yeni deploy algılandığında göster */}
                <SwUpdateToast />
              </div>
            </TooltipProvider>
          </I18nProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
