import { NasaFormatEnum } from '../enums/nasa-format.enum';
import { NasaStylesEnum } from '../enums/nasa-styles.enum';

export type BBox = readonly [number, number, number, number]; // [minLon, minLat, maxLon, maxLat]

export interface BuildWmsUrlOptions {
  layer: string;
  time: string;
  bbox?: BBox;
  width?: number;
  height?: number;
  format?: NasaFormatEnum;
  transparent?: boolean;
  styles?: NasaStylesEnum | string;
}
