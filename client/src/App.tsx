import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AnalysisPage from "./pages/AnalysisPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import DualPersonaWidget from "./components/DualPersonaWidget";
import MobileBottomNav from "./components/MobileBottomNav";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/analiz"} component={AnalysisPage} />
      <Route path={"/blog/:slug"} component={BlogDetailPage} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
          {/* Dual Persona Widget - Sarp (Desktop) / Vera (Mobile) */}
          <DualPersonaWidget />
          {/* Mobile Bottom Navigation */}
          <MobileBottomNav />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
