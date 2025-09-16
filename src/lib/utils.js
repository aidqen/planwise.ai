import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatTime(time) {
  if (!time) return 'Not set';
  const [hours, minutes] = String(time).split(':');
  const hour = parseInt(hours, 10);
  if (Number.isNaN(hour)) return String(time);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes ?? '00'} ${ampm}`;
}
