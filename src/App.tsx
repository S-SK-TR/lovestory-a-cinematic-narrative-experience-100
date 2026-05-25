import { Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import Home from './pages/Home';
import { PageTransition } from './components/layout/PageTransition';
import { useStore } from './core/store';
import NotFound from './features/not-found/NotFound';

// PREMIUM UI: Temiz ve yönetilebilir router yapısı (BrowserRouter main.tsx'e taşındı)
// PREMIUM UI: AppShell ile tutarlı layout (sidebar, topbar, mobile nav)
// PREMIUM UI: PageTransition ile akıcı sayfa geçiş animasyonları
export default function App() {
  const { theme } = useStore();

  return (
    <div className={theme}>
      <Routes>
        <Route path="/" element={<AppShell />}>
          {/* Ana sayfa içeriği için PageTransition kullanıyoruz */}
          <Route index element={<PageTransition><Home /></PageTransition>} />
          {/* Gelecekte eklenecek diğer rotalar için buraya eklemeler yapılabilir */}
          {/* PREMIUM UI: 404 sayfası, premium tasarımlı bir bileşenle ele alındı */}
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Route>
      </Routes>
    </div>
  );
}