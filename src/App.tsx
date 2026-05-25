import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import Home from './pages/Home';
import { PageTransition } from './components/layout/PageTransition';

// PREMIUM UI: BrowserRouter ile temiz ve yönetilebilir router yapısı
// PREMIUM UI: AppShell ile tutarlı layout (sidebar, topbar, mobile nav)
// PREMIUM UI: PageTransition ile akıcı sayfa geçiş animasyonları
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          {/* Ana sayfa içeriği için PageTransition kullanıyoruz */}
          <Route index element={<PageTransition><Home /></PageTransition>} />
          {/* Gelecekte eklenecek diğer rotalar için buraya eklemeler yapılabilir */}
          <Route path="*" element={<PageTransition><div className="p-4 text-center text-[var(--text-muted)]">404 - Page Not Found</div></PageTransition>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
