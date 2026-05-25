import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

// PREMIUM UI: Custom 404 sayfası, kaybolmuşluk hissini sinematik bir dille ifade eder.
// PREMIUM UI: Framer Motion ile giriş animasyonu ve premium kart tasarımı.
export default function NotFound() {
  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center justify-center p-8 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 glass-card text-center"
      >
        <HelpCircle size={48} className="text-red-500 mb-4" />
        <h1 className="text-5xl font-extrabold text-[var(--text-primary)] mb-4 font-outfit">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-[var(--text-muted)] font-inter mb-6">
          The cinematic journey you seek is not found. Perhaps it's a forgotten scene in time...
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                     bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-500/20 h-10 px-4 text-sm"
        >
          Return to Lovestory Home
        </Link>
      </motion.div>
    </PageContainer>
  );
}