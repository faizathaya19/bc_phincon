import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Menggabungkan class Tailwind dengan aman, menangani konflik.
 * Umumnya digunakan dalam library komponen seperti shadcn/ui.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
