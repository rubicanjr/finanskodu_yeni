import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FeedbackSection() {
  return (
    <section
      id="feedback"
      className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-slate-900/50"
      aria-label="Geri bildirim bölümü"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-start gap-4"
          >
            {/* Icon */}
            <div className="flex-shrink-0 mt-1">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500 dark:text-cyan-400" />
            </div>

            {/* Text Content */}
            <div>
              <p className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                Memnun kaldığınız noktaları veya iyileştirebileceğimiz alanları duymak isteriz. 
                Fikirleriniz, daha iyi websitesi kullanımı deneyimi ve daha mutlu ziyaretçiler için 
                bize yol gösteriyor.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
