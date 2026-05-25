import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import { AppShell } from '@/components/layout/AppShell';

// AppShell bileşeninin mock'lanması. Gerçek router ve navlink testleri için bu önemli.
vi.mock('@/components/layout/AppShell', () => ({
  AppShell: vi.fn(({ children }) => <div data-testid="mock-app-shell">{children}</div>),
}));

// Home bileşeninin mock'lanması.
vi.mock('@/pages/Home', () => ({
  default: vi.fn(() => <div data-testid="mock-home-page">Home Content</div>),
}));

describe('App', () => {
  // TEST 1: App bileşeninin doğru şekilde render edildiğini kontrol et.
  // BrowserRouter ve temel layout yapısının varlığını doğrular.
  test('renders App component with BrowserRouter and AppShell', () => {
    render(
      <MemoryRouter initialEntries={['/']}> {/* MemoryRouter ile izole test ortamı */}
        <App />
      </MemoryRouter>
    );

    // Mock AppShell'in render edildiğini doğrula.
    expect(screen.getByTestId('mock-app-shell')).toBeInTheDocument();

    // Home sayfasının içeriğinin AppShell içinde render edildiğini doğrula.
    // `mock-home-page` AppShell'in içinde bir çocuk olarak render edildiği için,
    // AppShell'in kendisi değil, onun içindeki children kısmında aranır.
    expect(screen.getByTestId('mock-home-page')).toBeInTheDocument();

    // PREMIUM UI: AppShell'in title'ı gibi premium öğelerin varlığını kontrol edilebilir
    // Örneğin, 'Dashboard' metnini aramak AppShell mock'landığı için doğrudan mümkün olmayabilir,
    // ancak eğer mock AppShell içinde de title olsaydı kontrol edilebilirdi.
  });

  // TEST 2: Bilinmeyen bir rota için 404 sayfasının render edildiğini kontrol et.
  test('renders 404 page for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('mock-app-shell')).toBeInTheDocument();
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-home-page')).not.toBeInTheDocument();
  });

  // Not: Zustand store'ları bu projede henüz kullanılmadığı için, store action testleri atlanmıştır.
  // Eğer bir Zustand store entegre edilmiş olsaydı (örneğin tema değiştirme veya veri yönetimi için),
  // bu kısma store'un başlangıç durumu, action çağrıları ve state güncellemelerini test eden senaryolar eklenirdi.
});
