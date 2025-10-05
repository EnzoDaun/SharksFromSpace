import { DATE_REGEX } from '../constants/nasa.constants';

/**
 * Utilitários para manipulação de datas
 */

/**
 * Valida se uma string está no formato ISO de data (YYYY-MM-DD)
 */
export function isValidIsoDate(dateString: string): boolean {
  if (!DATE_REGEX.test(dateString)) return false;
  
  const date = new Date(dateString + 'T00:00:00Z');
  if (Number.isNaN(date.valueOf())) return false;
  
  return date.toISOString().slice(0, 10) === dateString;
}

/**
 * Converte uma data para o formato ISO (YYYY-MM-DD)
 */
export function toIsoDateString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Retorna a data atual no formato ISO (YYYY-MM-DD)
 */
export function getCurrentIsoDate(): string {
  return toIsoDateString(new Date());
}