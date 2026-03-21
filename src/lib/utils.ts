export const encodeEmail = (email: string): string => {
  return btoa(email.split('').reverse().join(''));
};

export const decodeEmail = (encoded: string): string => {
  return atob(encoded).split('').reverse().join('');
};

export const formatEmail = (email: string): string => {
  return `mailto:${email}`;
};

export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const randomBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};