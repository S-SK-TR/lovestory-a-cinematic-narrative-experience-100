import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Link bileşeni için MemoryRouter gerekli
import Home from '@/pages/Home';

describe('Home Page', () => {
  // TEST 1: Home bileşeninin ana başlık ve açıklama metinleriyle doğru şekilde render edildiğini kontrol et.
  test('renders Home page with title and description', () => {
    render(
      <MemoryRouter> {/* Link bileşeni kullandığımız için MemoryRouter gerekli */}
        <Home />
      </MemoryRouter>
    );

    // Ana başlığın render edildiğini doğrula
    expect(screen.getByRole('heading', { level: 1, name: /Lovestory: A Cinematic Narrative Experience/i })).toBeInTheDocument();

    // Açıklama paragrafının render edildiğini doğrula
    expect(screen.getByText(/Uygulama başarıyla oluşturuldu ve premium seviyeye yükseltildi!/i)).toBeInTheDocument();

    // PREMIUM UI: PageContainer'ın title ve description props'ları ile gönderilen metinleri kontrol et
    expect(screen.getByRole('heading', { level: 2, name: /Welcome to Lovestory/i })).toBeInTheDocument();
    expect(screen.getByText(/A Cinematic Narrative Experience for premium users./i)).toBeInTheDocument();

    // GitHub linkinin varlığını ve doğru attributelara sahip olduğunu doğrula
    const githubLink = screen.getByRole('link', { name: /Visit our GitHub/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/lovable-ai/lovestory');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  // TEST 2: Framer Motion animasyonları doğrudan DOM'da test etmek zor olduğundan,
  // animasyonun varlığını göstermek için render edilen elementin özelliklerini kontrol edebiliriz.
  // Ancak, Framer Motion'ın kendisi ayrı bir kütüphane olup, animasyonların görsel doğruluğu
  // genellikle e2e testler veya görsel regresyon testleri ile sağlanır.
  test('Home page content container has motion attributes', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const contentContainer = screen.getByText(/Uygulama başarıyla oluşturuldu/i).closest('div');
    expect(contentContainer).toBeInTheDocument();

    // motion.div tarafından eklenen 'data-framer-node' gibi attributelar Framer Motion'ın çalıştığını gösterir.
    // Bu daha çok bir 'sanity check'tir, animasyonun görsel doğruluğunu test etmez.
    expect(contentContainer).toHaveAttribute('data-framer-node', 'true');
  });

  // Not: Zustand store'ları bu bileşende doğrudan kullanılmadığı için, store action testleri atlanmıştır.
});
