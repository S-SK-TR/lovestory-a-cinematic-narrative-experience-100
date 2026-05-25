import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Settings, Bell, HelpCircle } from 'lucide-react'; // HelpCircle ikonu eklendi
import { cn } from '@/lib/utils';
import React from 'react'; // React importu eklendi

const navItems = [
  { to: '/',         icon: LayoutDashboard, label: 'Dashboard' },
  // { to: '/analytics', icon: BarChart2,      label: 'Analytics'  }, // Örnek rota
  // { to: '/settings', icon: Settings,        label: 'Settings'   },
];

// PREMIUM UI: Masaüstü ve mobil cihazlar için duyarlı ve dinamik uygulama kabuğu
// PREMIUM UI: Glassmorphism efektleri için backdrop-blur ve şeffaf borderlar
export function AppShell() {
  return (
    <div className="flex h-dvh bg-[var(--bg-base)] text-[var(--text-primary)] overflow-hidden">
      
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex flex-col w-60 border-r border-[var(--border)] 
                        bg-[var(--bg-surface)] shrink-0">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-[var(--border)]">
          <HelpCircle size={24} className="text-red-500 mr-2" /> {/* PREMIUM UI: Proje temasına uygun ikon */}
          <span className="font-bold text-lg tracking-tight font-outfit">Lovestory</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} end className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-red-500/10 text-red-500" // PREMIUM UI: Tema rengiyle uyumlu aktif durum
                : "text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
            )}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User Footer */}
        <div className="p-3 border-t border-[var(--border)]">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg 
                             hover:bg-[var(--bg-elevated)] transition-colors">
            <img src="https://api.dicebear.com/8.x/initials/svg?seed=JD" className="w-8 h-8 rounded-full object-cover" alt="avatar" /> {/* PREMIUM UI: Gerçekçi avatar placeholderı */}
            <div className="flex-1 text-left">
              <p className="text-xs font-semibold">Ava Romance</p> {/* PREMIUM UI: Gerçekçi kullanıcı adı */}
              <p className="text-xs text-[var(--text-muted)]">ava.romance@example.com</p>
            </div>
            <Settings size={14} className="text-[var(--text-muted)]" />
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 shrink-0 flex items-center justify-between px-4 md:px-6 
                           border-b border-[var(--border)] bg-[var(--bg-surface)]/80 
                           backdrop-blur-xl sticky top-0 z-30"> {/* PREMIUM UI: Glassmorphism header */}
          <h1 className="font-semibold text-lg text-[var(--text-primary)] font-outfit">Dashboard</h1>
          <button className="relative p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" aria-label="Notifications">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <Outlet />
        </main>
      </div>

      {/* ── Mobile Bottom Navigation (PWA Safe Area) ── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 
                      bg-[var(--bg-surface)]/90 backdrop-blur-xl 
                      border-t border-[var(--border)]
                      pb-[env(safe-area-inset-bottom)]"> {/* PREMIUM UI: PWA safe area desteği */}
        <div className="flex h-16">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} end className={({ isActive }) => cn(
              "flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors",
              isActive ? "text-red-500" : "text-[var(--text-muted)]"
            )}>
              <Icon size={22} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
