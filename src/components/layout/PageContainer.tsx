import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react'; // React importu eklendi

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

// PREMIUM UI: Tutarlı sayfa düzeni ve giriş animasyonları için kapsayıcı bileşen
export function PageContainer({ children, className, title, description, actions }: PageContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("p-4 md:p-6 max-w-7xl mx-auto w-full", className)}
    >
      {(title || actions) && (
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            {title && <h2 className="text-xl font-bold text-[var(--text-primary)] font-outfit">{title}</h2>}
            {description && <p className="text-sm text-[var(--text-muted)] mt-0.5 font-inter">{description}</p>}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}
      {children}
    </motion.div>
  );
}
