// bbox order in EPSG:4326 is [minLon, minLat, maxLon, maxLat]
export const DEFAULT_WORLD_BBOX = [-180, -90, 180, 90] as const;

export const DEFAULT_WIDTH = 1920;

// Maximum pixels limit (width * height)
export const MAX_PIXELS = 20_000_000;

export const DEFAULT_ACCEPT_HEADER_PNG = 'image/png,image/*;q=0.8,*/*;q=0.5';
export const DEFAULT_UA = 'SharksFromSpace/1.0 (+server-side NestJS)';

// ISO date validation regex (YYYY-MM-DD)
export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
