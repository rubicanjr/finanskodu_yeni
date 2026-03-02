import { motion } from "framer-motion";
import { Mail, ExternalLink } from "lucide-react";

export default function SponsorshipSection() {
  return (
    <section 
      id="sponsorship" 
      className="py-24"
      style={{ background: 'var(--background)' }}
      aria-label="Sponsorluk bölümü"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs font-mono tracking-[0.2em] text-primary mb-4 block">
              // SPONSORUMUZ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Sponsorumuz
            </h2>
          </motion.div>

          {/* SalaryInsights Sponsor Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-xl border border-[var(--border)] p-8 sm:p-10 md:p-12"
            style={{ background: 'var(--card)' }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a 
                  href="https://salaryinsights.com.tr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity"
                >
                  <img 
                    src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663094430864/eWIpFzMiHsfytxtR.jfif"
                    alt="SalaryInsights Logo"
                    className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-xl object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              </div>

              {/* Description */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground font-sans">
                    SalaryInsights
                  </h3>
                  <a 
                    href="https://salaryinsights.com.tr/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                <blockquote className="text-muted-foreground text-base sm:text-lg leading-relaxed font-sans italic border-l-2 border-primary pl-4 md:pl-6">
                  "SalaryInsights, Finans Kodu topluluğuna sponsor oldu çünkü ikimiz de aynı şeye inanıyoruz: finansal kararlar veri ile verilir, tahminle değil. Onlar maaş şeffaflığı sağlıyor, biz yatırım şeffaflığı. Farklı sorular, aynı felsefe."
                </blockquote>
              </div>
            </div>
          </motion.div>

          {/* Become a Sponsor CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-muted-foreground text-sm font-mono">
              Sponsor olmak ister misiniz?{" "}
              <a
                href="mailto:info@finanskodu.com"
                className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                <Mail className="w-3.5 h-3.5" />
                info@finanskodu.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
