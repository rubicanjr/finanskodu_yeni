import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function SponsorshipSection() {
  return (
    <section 
      id="sponsorship" 
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
      aria-label="Sponsorluk bölümü"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              Sponsorlar
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Sponsorlukla ilgili detaylara{" "}
              <a
                href="mailto:finanskodu@gmail.com"
                className="font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
              >
                <Mail className="w-4 h-4" />
                finanskodu@gmail.com
              </a>
              {" "}e-posta adresine mail atarak ulaşabilirsiniz.
            </p>
          </motion.div>

          {/* Sponsor Logos Grid - Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {/* Placeholder Cards */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 flex items-center justify-center hover:border-cyan-400 dark:hover:border-cyan-400 transition-colors"
                >
                  <div className="text-center">
                    <div className="text-4xl font-bold text-slate-300 dark:text-slate-600 mb-2">
                      {index}
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Marka Logosu
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-12 p-6 sm:p-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
                Finans Kodu'nun büyüyen topluluğunun bir parçası olmak ve markanızı milyonlarca finansal karar verici ile tanıştırmak istiyorsanız,{" "}
                <a
                  href="mailto:finanskodu@gmail.com"
                  className="font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
                >
                  bizimle iletişime geçin
                </a>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
