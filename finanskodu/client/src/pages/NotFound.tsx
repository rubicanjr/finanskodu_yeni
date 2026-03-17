import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <>
      <Helmet>
        {/* noindex: 404 sayfaları arama motorları tarafından indekslenmemeli */}
        <meta name="robots" content="noindex, nofollow" />
        <title>Sayfa Bulunamadı (404) | Finans Kodu</title>
        <meta name="description" content="Aradığınız sayfa bulunamadı. Ana sayfaya dönün." />
      </Helmet>
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="w-full max-w-lg mx-4 text-center p-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/10 rounded-full animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-red-500" />
            </div>
          </div>

          <h1 className="text-6xl font-bold text-foreground mb-2 font-mono">404</h1>

          <h2 className="text-xl font-semibold text-foreground mb-4">
            Sayfa Bulunamadı
          </h2>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
            <br />
            Ana sayfaya dönerek devam edebilirsiniz.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleGoHome}
              className="px-6 py-2.5"
            >
              <Home className="w-4 h-4 mr-2" />
              Ana Sayfaya Dön
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
