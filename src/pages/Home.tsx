import { PageContainer } from '@/components/layout/PageContainer';
import { motion } from 'framer-motion';
import { useStore } from '@/core/store';
import React from 'react'; // React importu eklendi

// PREMIUM UI: Orjinal içeriği premium bir UI elementine dönüştürdük.
// PREMIUM UI: Framer Motion ile kart giriş animasyonu eklendi.
export default function Home() {
  const { theme } = useStore();

  return (
    <PageContainer title="Welcome to Lovestory" description="A Cinematic Narrative Experience for premium users.">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
        className={`flex flex-col items-center justify-center p-8 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${theme === 'dark' ? 'glass-card' : 'glass-morphism'}`}
      >
        <h1 className="text-4xl font-extrabold text-[var(--text-primary)] mb-4 font-outfit text-center">
          Lovestory: A Cinematic Narrative Experience
        </h1>
        <p className="text-lg text-[var(--text-muted)] font-inter text-center">
          Uygulama başarıyla oluşturuldu ve premium seviyeye yükseltildi!
        </p>
        <p className="text-sm text-[var(--text-muted)] mt-4 font-inter text-center">
          <a href="https://github.com/lovable-ai/lovestory" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">
            Visit our GitHub
          </a> to learn more.
        </p>
      </motion.div>
    </PageContainer>
  );
}