import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import React from 'react' 

const variants = {
  initial:  { opacity: 0, x: 10 },
  animate:  { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  exit:     { opacity: 0, x: -10, transition: { duration: 0.15 } }
}

// PREMIUM UI: Sayfalar arası geçişlerde akıcı animasyonlar sağlar.
export function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} variants={variants} initial="initial" animate="animate" exit="exit" className="h-full">
        {children}
      </motion.div>
    </AnimatePresence>
  )
}