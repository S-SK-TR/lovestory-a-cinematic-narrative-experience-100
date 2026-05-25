import '@testing-library/jest-dom/vitest';

// Gerekirse global test kurulumları veya mock'lar burada tanımlanabilir.
// Örneğin, global bir Zustand store'u resetlemek için:
// beforeEach(() => { useStore.setState(initialState, true); });

// jsdom ortamında framer-motion'ın `matchMedia`'yı tanıması için basit bir mock
// Bu, özellikle animate={{ opacity: 1, y: 0 }} gibi animasyonların testlerde hata vermemesi için önemlidir.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});
