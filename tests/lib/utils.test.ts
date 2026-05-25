import { cn } from '@/lib/utils';

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('bg-red-500', 'text-white', 'p-4')
    expect(result).toBe('bg-red-500 text-white p-4')
  })

  it('handles conditional classes', () => {
    const result = cn(
      'bg-red-500',
      true && 'text-white',
      false && 'text-black',
      undefined && 'text-gray-500'
    )
    expect(result).toBe('bg-red-500 text-white')
  })

  it('handles array of classes', () => {
    const result = cn(['bg-red-500', 'text-white', 'p-4'])
    expect(result).toBe('bg-red-500 text-white p-4')
  })

  it('handles Tailwind merge conflicts', () => {
    const result = cn('p-4', 'p-2')
    expect(result).toBe('p-2')
  })

  it('handles empty inputs', () => {
    expect(cn()).toBe('')
    expect(cn(undefined)).toBe('')
    expect(cn(null)).toBe('')
  })
})
