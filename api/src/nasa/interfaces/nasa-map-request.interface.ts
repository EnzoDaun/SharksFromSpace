import { NasaFormatEnum } from '../enums/nasa-format.enum';
import { NasaStylesEnum } from '../enums/nasa-styles.enum';

export type BBox = readonly [number, number, number, number]; // [minLon, minLat, maxLon, maxLat]

export interface BuildWmsUrlOptions {
  layer: string;
  time: string;                 // YYYY-MM-DD
  bbox?: BBox;                  // default: world
  width?: number;               // default: 1920
  height?: number;              // default: 960 (mantém proporção)
  format?: NasaFormatEnum;      // default: config.defaultFormat
  transparent?: boolean;        // default: true
  styles?: NasaStylesEnum | string; // default: 'default'
}