import type { Config } from 'tailwindcss'

const config = {
  darkMode: 'class',   // class tabanlı dark mode
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // PREMIUM UI: CSS değişkenlerini kullanarak dinamik tema yönetimi
        brand: {
          50:  'hsl(var(--brand-50) / <alpha-value>)',
          500: 'hsl(var(--brand-500) / <alpha-value>)',
          600: 'hsl(var(--brand-600) / <alpha-value>)',
        }
      },
      fontFamily: {
        // PREMIUM UI: Modern tipografi için özel fontlar
        sans: ['var(--font-inter)', 'system-ui'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '2xl': '1rem', // Varsayılan premium kart köşesi
      },
      animation: {
        // PREMIUM UI: Framer Motion ile kullanılacak özel animasyonlar
        'fade-up':   'fadeUp 0.4s ease both',
        'fade-in':   'fadeIn 0.3s ease both',
        'slide-in':  'slideIn 0.35s cubic-bezier(0.16,1,0.3,1) both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      }
    }
  },
  plugins: [],
}

export default config
