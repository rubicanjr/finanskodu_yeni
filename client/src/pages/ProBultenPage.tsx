import { Helmet } from 'react-helmet-async';
import { useI18n } from '@/contexts/I18nContext';
import { TrendingUp, ExternalLink, AlertCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AudioPlayerButton from '@/components/AudioPlayerButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ProBultenPage() {
  const { t } = useI18n();

  return (
    <>
      <Helmet>
        <title>Pro - Algoritmik Strateji ve Analiz Bülteni | Finans Kodu</title>
        <meta name="description" content="Altın algoritması, akıllı fon sepetleri, haftalık sesli brifing, kanıtlanmış model, yüksek veri isabeti, 1:1 finansal check-up." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="container py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
              <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                {t('digitalTools.proBulletin.subtitle')}
              </span>
            </div>
            
            <Badge variant="outline" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-lg px-4 py-1">
              Pro
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {t('digitalTools.proBulletin.title')}
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('digitalTools.proBulletin.description')}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
              <Button size="lg" asChild className="bg-amber-600 hover:bg-amber-700 text-white">
                <a href="https://www.hikie.space/finanskodu/algoritmik-strateji-ve-analiz" target="_blank" rel="noopener noreferrer">
                  Satın Al (1 Aylık Erişim)
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://cal.com/rubi-can" target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 w-4 h-4" />
                  Ücretsiz Danışma
                </a>
              </Button>
              <AudioPlayerButton
                text={`${t('digitalTools.proBulletin.title')}. ${t('digitalTools.proBulletin.subtitle')}. ${t('digitalTools.proBulletin.description')}. Özellikler: ${['feature1','feature2','feature3','feature4','feature5','feature6','feature7','feature8'].map(k => t('digitalTools.proBulletin.' + k)).join('. ')}`}
                duration="~3 dk"
              />
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Özellikler</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🥇', text: t('digitalTools.proBulletin.feature1') },
                { icon: '📈', text: t('digitalTools.proBulletin.feature2') },
                { icon: '🎙️', text: t('digitalTools.proBulletin.feature3') },
                { icon: '🚀', text: t('digitalTools.proBulletin.feature4') },
                { icon: '🎯', text: t('digitalTools.proBulletin.feature5') },
                { icon: '🔍', text: t('digitalTools.proBulletin.feature6') },
                { icon: '🛣️', text: t('digitalTools.proBulletin.feature7') },
                { icon: '📲', text: t('digitalTools.proBulletin.feature8') },
              ].map((feature, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center gap-3">
                      <span className="text-3xl">{feature.icon}</span>
                      <p className="text-sm text-muted-foreground">{feature.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="container py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Bültene Dahil Olanlar</h2>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {[
                    'Haftalık algoritmik altın alım-satım sinyalleri',
                    'Akıllı fon sepeti önerileri (hisse senedi, tahvil, emtia)',
                    'Sesli brifing (Vera ve Sarp tarafından hazırlanmış)',
                    'Kanıtlanmış model ile yüksek veri isabeti',
                    'Aylık 1:1 finansal check-up görüşmesi',
                    'Kişisel finansal reçete ve strateji önerileri',
                    'VIP iletişim hattı (WhatsApp/Telegram)',
                    'Özel raporlar ve piyasa analizleri',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-amber-600 dark:text-amber-400 mt-1">✓</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Sıkça Sorulan Sorular</h2>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {[
                    {
                      q: t('digitalTools.proBulletin.faq1Question'),
                      a: t('digitalTools.proBulletin.faq1Answer'),
                    },
                    {
                      q: t('digitalTools.proBulletin.faq2Question'),
                      a: t('digitalTools.proBulletin.faq2Answer'),
                    },
                    {
                      q: t('digitalTools.proBulletin.faq3Question'),
                      a: t('digitalTools.proBulletin.faq3Answer'),
                    },
                    {
                      q: t('digitalTools.proBulletin.faq4Question'),
                      a: t('digitalTools.proBulletin.faq4Answer'),
                    },
                    {
                      q: t('digitalTools.proBulletin.faq5Question'),
                      a: t('digitalTools.proBulletin.faq5Answer'),
                    },
                  ].map((faq, index) => (
                    <div key={index} className="border-b border-border last:border-0 pb-4 last:pb-0">
                      <h3 className="font-semibold text-foreground mb-2 flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                        {faq.q}
                      </h3>
                      <p className="text-muted-foreground text-sm pl-7">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
              <CardContent className="pt-12 pb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Pro Seviyeye Geçin
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Algoritmik strateji ve kişisel danışmanlıkla finansal hedeflerinize ulaşın.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" asChild className="bg-amber-600 hover:bg-amber-700 text-white">
                    <a href="https://www.hikie.space/finanskodu/algoritmik-strateji-ve-analiz" target="_blank" rel="noopener noreferrer">
                      Satın Al (1 Aylık Erişim)
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="https://cal.com/rubi-can" target="_blank" rel="noopener noreferrer">
                      <Calendar className="mr-2 w-4 h-4" />
                      Ücretsiz Danışma
                    </a>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Ücretsiz · Bağlayıcı değil · 30 dakika
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
