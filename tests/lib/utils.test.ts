import { cn } from '@/lib/utils';
import { describe, it, expect } from 'vitest';

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    expect(cn('class1', false && 'class2', true && 'class3')).toBe('class1 class3');
  });

  it('resolves Tailwind conflicts', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });
});