/**
 * Constantes para NASA WMS
 */

// Bounding box mundial em EPSG:4326 [minLon, minLat, maxLon, maxLat]
export const DEFAULT_WORLD_BBOX = [-180, -90, 180, 90] as const;

// Dimensões padrão da imagem
export const DEFAULT_WIDTH = 1920;

// Limite máximo de pixels (width * height)
export const MAX_PIXELS = 20_000_000;

// Headers HTTP padrão
export const DEFAULT_ACCEPT_HEADER_PNG = 'image/png,image/*;q=0.8,*/*;q=0.5';
export const DEFAULT_UA = 'SharksFromSpace/1.0 (+server-side NestJS)';

// Regex para validação de data ISO (YYYY-MM-DD)
export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;