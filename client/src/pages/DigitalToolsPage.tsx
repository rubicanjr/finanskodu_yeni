import { useI18n } from '@/contexts/I18nContext';
import { Helmet } from 'react-helmet-async';
import { Brain, BookOpen, TrendingUp, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AudioPlayerButton from '@/components/AudioPlayerButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Product {
  id: string;
  icon: typeof Brain;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  featuresKey: string[];
  faqKeys: { questionKey: string; answerKey: string }[];
  purchaseLink: string;
  consultationLink?: string; // Optional for Pro product
}

const products: Product[] = [
  {
    id: 'ai-prompt-library',
    icon: Brain,
    titleKey: 'digitalTools.aiPromptLibrary.title',
    subtitleKey: 'digitalTools.aiPromptLibrary.subtitle',
    descriptionKey: 'digitalTools.aiPromptLibrary.description',
    featuresKey: [
      'digitalTools.aiPromptLibrary.feature1',
      'digitalTools.aiPromptLibrary.feature2',
      'digitalTools.aiPromptLibrary.feature3',
      'digitalTools.aiPromptLibrary.feature4',
      'digitalTools.aiPromptLibrary.feature5',
      'digitalTools.aiPromptLibrary.feature6',
    ],
    faqKeys: [
      {
        questionKey: 'digitalTools.aiPromptLibrary.faq1Question',
        answerKey: 'digitalTools.aiPromptLibrary.faq1Answer',
      },
      {
        questionKey: 'digitalTools.aiPromptLibrary.faq2Question',
        answerKey: 'digitalTools.aiPromptLibrary.faq2Answer',
      },
      {
        questionKey: 'digitalTools.aiPromptLibrary.faq3Question',
        answerKey: 'digitalTools.aiPromptLibrary.faq3Answer',
      },
      {
        questionKey: 'digitalTools.aiPromptLibrary.faq4Question',
        answerKey: 'digitalTools.aiPromptLibrary.faq4Answer',
      },
      {
        questionKey: 'digitalTools.aiPromptLibrary.faq5Question',
        answerKey: 'digitalTools.aiPromptLibrary.faq5Answer',
      },
    ],
    purchaseLink: 'https://hikie.space/link/checkout/j9p0eW1ITmovb8v0xE752kmcTTjyPZ3zSLnAuQlm',
  },
  {
    id: 'finans-kodu',
    icon: BookOpen,
    titleKey: 'digitalTools.finansKodu.title',
    subtitleKey: 'digitalTools.finansKodu.subtitle',
    descriptionKey: 'digitalTools.finansKodu.description',
    featuresKey: [
      'digitalTools.finansKodu.feature1',
      'digitalTools.finansKodu.feature2',
      'digitalTools.finansKodu.feature3',
      'digitalTools.finansKodu.feature4',
      'digitalTools.finansKodu.feature5',
      'digitalTools.finansKodu.feature6',
    ],
    faqKeys: [
      {
        questionKey: 'digitalTools.finansKodu.faq1Question',
        answerKey: 'digitalTools.finansKodu.faq1Answer',
      },
      {
        questionKey: 'digitalTools.finansKodu.faq2Question',
        answerKey: 'digitalTools.finansKodu.faq2Answer',
      },
      {
        questionKey: 'digitalTools.finansKodu.faq3Question',
        answerKey: 'digitalTools.finansKodu.faq3Answer',
      },
      {
        questionKey: 'digitalTools.finansKodu.faq4Question',
        answerKey: 'digitalTools.finansKodu.faq4Answer',
      },
      {
        questionKey: 'digitalTools.finansKodu.faq5Question',
        answerKey: 'digitalTools.finansKodu.faq5Answer',
      },
    ],
    purchaseLink: 'https://hikie.space/link/checkout/dzxB5G6fSEOYxRYgC2xkpcKJ3C1no8jHiPOl6iCY',
  },
  {
    id: 'pro-bulletin',
    icon: TrendingUp,
    titleKey: 'digitalTools.proBulletin.title',
    subtitleKey: 'digitalTools.proBulletin.subtitle',
    descriptionKey: 'digitalTools.proBulletin.description',
    featuresKey: [
      'digitalTools.proBulletin.feature1',
      'digitalTools.proBulletin.feature2',
      'digitalTools.proBulletin.feature3',
      'digitalTools.proBulletin.feature4',
      'digitalTools.proBulletin.feature5',
      'digitalTools.proBulletin.feature6',
      'digitalTools.proBulletin.feature7',
      'digitalTools.proBulletin.feature8',
    ],
    faqKeys: [
      {
        questionKey: 'digitalTools.proBulletin.faq1Question',
        answerKey: 'digitalTools.proBulletin.faq1Answer',
      },
      {
        questionKey: 'digitalTools.proBulletin.faq2Question',
        answerKey: 'digitalTools.proBulletin.faq2Answer',
      },
      {
        questionKey: 'digitalTools.proBulletin.faq3Question',
        answerKey: 'digitalTools.proBulletin.faq3Answer',
      },
      {
        questionKey: 'digitalTools.proBulletin.faq4Question',
        answerKey: 'digitalTools.proBulletin.faq4Answer',
      },
      {
        questionKey: 'digitalTools.proBulletin.faq5Question',
        answerKey: 'digitalTools.proBulletin.faq5Answer',
      },
      {
        questionKey: 'digitalTools.proBulletin.faq6Question',
        answerKey: 'digitalTools.proBulletin.faq6Answer',
      },
      {
        questionKey: 'digitalTools.proBulletin.faq7Question',
        answerKey: 'digitalTools.proBulletin.faq7Answer',
      },
    ],
    purchaseLink: 'https://hikie.space/link/checkout/dzxB5G6fSEOYxRYgC2xkpcKJ3C1no8jHiPOl6iCY',
    consultationLink: 'https://cal.com/rubi-can',
  },
];

export default function DigitalToolsPage() {
  const { t } = useI18n();


  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Finans Kodu Dijital Araçlar",
    "description": "Finans profesyonelleri için yapay zeka destekli dijital araçlar, prompt kütüphanesi ve algoritmik strateji bülteni.",
    "url": "https://finanskodu.com/dijital-araclar",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "AI Prompt Kütüphanesi",
        "description": "100+ profesyonel finansal analiz komutu. Finans profesyonelleri için özel olarak tasarlanmış yapay zeka prompt koleksiyonu.",
        "url": "https://finanskodu.com/dijital-araclar/ai-prompt-kutuphanesi"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "FİNANS KODU: Kaos İçinde Düzen",
        "description": "Finansal operasyonlarınızı dönüştürecek kapsamlı metodoloji ve araç seti.",
        "url": "https://finanskodu.com/dijital-araclar/finans-kodu-kaos-icinde-duzen"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Pro - Algoritmik Strateji ve Analiz Bülteni",
        "description": "Piyasa yönü, makro analizler ve algoritmik sinyaller içeren kapsamlı aylık bülten.",
        "url": "https://finanskodu.com/dijital-araclar/pro-algoritmik-strateji-ve-analiz-bulteni"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dijital Araçlar: AI Prompt, Finans Metodolojisi ve Strateji Bülteni | Finans Kodu</title>
        <meta name="description" content="Finans profesyonelleri için 100+ AI prompt, kapsamlı finansal metodoloji rehberi ve aylık algoritmik strateji bülteni. Yapay zeka ile finansal verimliliğinizi artırın." />
        <meta name="keywords" content="finans AI prompt, finansal analiz araçları, algoritmik strateji bülteni, finans metodolojisi, yapay zeka finans" />
        <link rel="canonical" href="https://finanskodu.com/dijital-araclar" />
        <meta property="og:title" content="Dijital Araçlar: AI Prompt, Finans Metodolojisi ve Strateji Bülteni | Finans Kodu" />
        <meta property="og:description" content="Finans profesyonelleri için 100+ AI prompt, kapsamlı finansal metodoloji rehberi ve aylık algoritmik strateji bülteni." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://finanskodu.com/dijital-araclar" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('digitalTools.hero.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('digitalTools.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 px-4">
        <div className="container max-w-6xl mx-auto space-y-16">
          {products.map((product, index) => {
            const Icon = product.icon;
            const productText = [
              t(product.titleKey),
              t(product.subtitleKey),
              t(product.descriptionKey),
              ...product.featuresKey.map(key => t(key)),
            ].join('. ');

            return (
              <Card key={product.id} className="overflow-hidden">
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl md:text-3xl mb-2">
                          {t(product.titleKey)}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {t(product.subtitleKey)}
                        </CardDescription>
                      </div>
                    </div>
                    <AudioPlayerButton
                      text={productText}
                      duration="~2 dk"
                    />
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Description */}
                  <p className="text-base leading-relaxed">
                    {t(product.descriptionKey)}
                  </p>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      {t('digitalTools.featuresTitle')}
                    </h3>
                    <ul className="space-y-2">
                      {product.featuresKey.map((featureKey, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">✓</span>
                          <span className="text-sm">{t(featureKey)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* FAQ */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      {t('digitalTools.faqTitle')}
                    </h3>
                    <Accordion type="single" collapsible className="w-full">
                      {product.faqKeys.map((faq, idx) => (
                        <AccordionItem key={idx} value={`item-${idx}`}>
                          <AccordionTrigger className="text-left">
                            {t(faq.questionKey)}
                          </AccordionTrigger>
                          <AccordionContent>
                            {t(faq.answerKey)}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      asChild
                      size="lg"
                      className="flex-1"
                    >
                      <a
                        href={product.purchaseLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2"
                      >
                        {t('digitalTools.purchaseButton')}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>

                    {product.consultationLink && (
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="flex-1"
                      >
                        <a
                          href={product.consultationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2"
                        >
                          {t('digitalTools.consultationButton')}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
