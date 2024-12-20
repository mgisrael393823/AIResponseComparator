import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImagePath(path: string): string {
  // For Vite, we use the /public directory as the root
  return path.startsWith('./') ? path.slice(2) : path;
}