import { useState } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { Volume2, VolumeX, Package, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Product {
  id: string;
  icon: typeof Package;
  titleKey: string;
  descriptionKey: string;
  featuresKey: string[];
  priceKey: string;
  ctaKey: string;
}

const products: Product[] = [
  {
    id: 'finansal-performans',
    icon: TrendingUp,
    titleKey: 'products.finansalPerformans.title',
    descriptionKey: 'products.finansalPerformans.description',
    featuresKey: [
      'products.finansalPerformans.feature1',
      'products.finansalPerformans.feature2',
      'products.finansalPerformans.feature3',
      'products.finansalPerformans.feature4',
    ],
    priceKey: 'products.finansalPerformans.price',
    ctaKey: 'products.finansalPerformans.cta',
  },
  {
    id: 'yapay-zeka-asistan',
    icon: Sparkles,
    titleKey: 'products.yapayZekaAsistan.title',
    descriptionKey: 'products.yapayZekaAsistan.description',
    featuresKey: [
      'products.yapayZekaAsistan.feature1',
      'products.yapayZekaAsistan.feature2',
      'products.yapayZekaAsistan.feature3',
      'products.yapayZekaAsistan.feature4',
    ],
    priceKey: 'products.yapayZekaAsistan.price',
    ctaKey: 'products.yapayZekaAsistan.cta',
  },
  {
    id: 'kurumsal-cozumler',
    icon: Users,
    titleKey: 'products.kurumsalCozumler.title',
    descriptionKey: 'products.kurumsalCozumler.description',
    featuresKey: [
      'products.kurumsalCozumler.feature1',
      'products.kurumsalCozumler.feature2',
      'products.kurumsalCozumler.feature3',
      'products.kurumsalCozumler.feature4',
    ],
    priceKey: 'products.kurumsalCozumler.price',
    ctaKey: 'products.kurumsalCozumler.cta',
  },
];

export default function DigitalToolsPage() {
  const { t } = useI18n();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeakingId, setCurrentSpeakingId] = useState<string | null>(null);

  const handleTextToSpeech = (text: string, productId: string) => {
    // Stop any ongoing speech
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentSpeakingId(null);
      return;
    }

    // Check if browser supports speech synthesis
    if (!('speechSynthesis' in window)) {
      alert(t('products.speechNotSupported') || 'Tarayıcınız sesli okuma özelliğini desteklemiyor.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR'; // Turkish language
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentSpeakingId(productId);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentSpeakingId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentSpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {t('products.hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            {t('products.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const Icon = product.icon;
            const description = t(product.descriptionKey);
            const isSpeakingThis = currentSpeakingId === product.id;

            return (
              <Card key={product.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleTextToSpeech(description, product.id)}
                      disabled={isSpeaking && !isSpeakingThis}
                      className="h-8 w-8"
                      aria-label={isSpeakingThis ? t('products.stopSpeech') : t('products.startSpeech')}
                    >
                      {isSpeakingThis ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <CardTitle className="text-2xl mb-2">{t(product.titleKey)}</CardTitle>
                  <CardDescription className="text-base">{description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2 mb-6 flex-1">
                    {product.featuresKey.map((featureKey, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-sm text-muted-foreground">{t(featureKey)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-primary">{t(product.priceKey)}</div>
                    <Button className="w-full" size="lg">
                      {t(product.ctaKey)}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('products.faq.title')}
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>{t('products.faq.q1')}</AccordionTrigger>
              <AccordionContent>{t('products.faq.a1')}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>{t('products.faq.q2')}</AccordionTrigger>
              <AccordionContent>{t('products.faq.a2')}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>{t('products.faq.q3')}</AccordionTrigger>
              <AccordionContent>{t('products.faq.a3')}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>{t('products.faq.q4')}</AccordionTrigger>
              <AccordionContent>{t('products.faq.a4')}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>{t('products.faq.q5')}</AccordionTrigger>
              <AccordionContent>{t('products.faq.a5')}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('products.cta.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('products.cta.subtitle')}
          </p>
          <Button size="lg" className="px-8">
            {t('products.cta.button')}
          </Button>
        </div>
      </section>
    </div>
  );
}
