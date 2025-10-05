import {
  Matches,
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { BBox } from '../../nasa/interfaces/nasa-map-request.interface';
import { DATE_REGEX } from '../../nasa/constants/nasa.constants';

export class AnalyzePredictionDto {
  @Matches(DATE_REGEX, {
    message: 'time deve estar no formato YYYY-MM-DD',
  })
  time!: string;

  @IsOptional()
  @IsString()
  regionHint?: string;

  /** bbox format: "minLon,minLat,maxLon,maxLat" */
  @IsOptional()
  @Matches(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?$/, {
    message: 'bbox deve ser "minLon,minLat,maxLon,maxLat"',
  })
  bbox?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10000)
  width?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10000)
  height?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.toLowerCase() === 'true';
    return undefined;
  })
  @IsBoolean()
  transparent?: boolean;

  toBBox(): BBox | undefined {
    if (!this.bbox) return undefined;
    const parts = this.bbox.split(',').map((n) => Number(n.trim()));
    if (parts.length !== 4) return undefined;
    return parts as unknown as BBox;
  }

  toWmsOptions(): any {
    const opts: any = {};
    const bboxTuple = this.toBBox();
    if (bboxTuple) opts.bbox = bboxTuple;
    if (typeof this.width === 'number') opts.width = this.width;
    if (typeof this.height === 'number') opts.height = this.height;
    if (typeof this.transparent === 'boolean')
      opts.transparent = this.transparent;
    return opts;
  }
}
