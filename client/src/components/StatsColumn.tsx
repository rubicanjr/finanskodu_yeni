/*
  STATS COLUMN: Left column for Hero section
  
  - Displays monthly statistics
  - "Bu Ay Rakamlar" heading
  - 1200+ Analiz, 500+ Kullanıcı
*/

import { motion } from "framer-motion";
import { TrendingUp, Users } from "lucide-react";

export default function StatsColumn() {
  const stats = [
    { icon: TrendingUp, label: "Analiz", value: "1200+", color: "#00D4FF" },
    { icon: Users, label: "Kullanıcı", value: "500+", color: "#A855F7" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="flex flex-col gap-6"
    >
      {/* Heading */}
      <h3 className="text-lg font-display font-semibold text-gray-300 mb-2">
        Bu Ay Rakamlar
      </h3>

      {/* Stats Cards */}
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
          className="glass rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
          style={{
            boxShadow: `0 0 20px ${stat.color}20`,
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{
                background: `${stat.color}20`,
                border: `1px solid ${stat.color}40`,
              }}
            >
              <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
            </div>
            <div>
              <p
                className="text-3xl font-bold font-display"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
