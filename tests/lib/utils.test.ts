import { cn } from '@/lib/utils';

vi.mock('clsx', () => ({
  clsx: (...inputs: any[]) => inputs.flat().filter(Boolean).join(' ')
}));

vi.mock('tailwind-merge', () => ({
  twMerge: (input: string) => input
}));

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('bg-red-500', 'text-white', 'p-4');
    expect(result).toBe('bg-red-500 text-white p-4');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const result = cn(
      'bg-red-500',
      isActive && 'bg-blue-500',
      'text-white'
    );
    expect(result).toBe('bg-blue-500 text-white');
  });

  it('handles array of classes', () => {
    const result = cn(['bg-red-500', 'text-white']);
    expect(result).toBe('bg-red-500 text-white');
  });
});