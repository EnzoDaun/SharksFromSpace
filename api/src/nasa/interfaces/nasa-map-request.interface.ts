export type BBox = [number, number, number, number]; // [minLon, minLat, maxLon, maxLat]
export type ImgFormat = 'image/png' | 'image/jpeg';

export interface BuildWmsUrlOptions {
  layer: string;
  time: string;                 // YYYY-MM-DD
  bbox?: BBox;                  // default: world
  width?: number;               // default: 1920
  height?: number;              // default: 960 (mantém proporção)
  format?: ImgFormat;           // default: config.defaultFormat
  transparent?: boolean;        // default: true
  styles?: string;              // default: ''
}