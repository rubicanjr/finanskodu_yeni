import { motion } from "framer-motion";
import { Mail, ExternalLink } from "lucide-react";

export default function SponsorshipSection() {
  return (
    <section 
      id="sponsorship" 
      className="py-16 sm:py-20 md:py-24"
      style={{ background: "#050810" }}
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
            <span className="text-xs font-mono tracking-[0.2em] text-[#0EA5E9] mb-4 block">
              // TRUSTED BY
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Sponsorumuz
            </h2>
          </motion.div>

          {/* SalaryInsights Sponsor Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-xl border border-[#1E2D3D] p-8 sm:p-10 md:p-12"
            style={{ background: "#0D1117" }}
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
                  />
                </a>
              </div>

              {/* Description */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                    SalaryInsights
                  </h3>
                  <a 
                    href="https://salaryinsights.com.tr/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#0EA5E9] hover:text-[#38BDF8] transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                <blockquote className="text-[#C8D6E5] text-base sm:text-lg leading-relaxed font-sans italic border-l-2 border-[#0EA5E9] pl-4 md:pl-6">
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
            <p className="text-[#8899AA] text-sm font-mono">
              Sponsor olmak ister misiniz?{" "}
              <a
                href="mailto:info@finanskodu.com"
                className="text-[#0EA5E9] hover:text-[#38BDF8] transition-colors inline-flex items-center gap-1"
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
