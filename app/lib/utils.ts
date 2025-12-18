import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAvatarInitials(name: string, max = 2) {
  return name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .slice(0, max)
    .join('')
    .toUpperCase();
}
