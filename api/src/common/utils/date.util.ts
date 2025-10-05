import { DATE_REGEX } from '../../nasa/constants/nasa.constants';

export function isValidIsoDate(dateString: string): boolean {
  if (!DATE_REGEX.test(dateString)) return false;

  const date = new Date(dateString + 'T00:00:00Z');
  if (Number.isNaN(date.valueOf())) return false;

  return date.toISOString().slice(0, 10) === dateString;
}

export function toIsoDateString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function getCurrentIsoDate(): string {
  return toIsoDateString(new Date());
}
