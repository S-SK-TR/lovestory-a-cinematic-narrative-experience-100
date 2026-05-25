import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// PREMIUM UI: Tailwind sınıflarını koşullu olarak birleştirmek için utility fonksiyonu
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
