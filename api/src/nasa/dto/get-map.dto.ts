import { Type, Transform } from 'class-transformer';
import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsEnum,
  IsBoolean,
  Matches,
} from 'class-validator';
import { NasaFormatEnum } from '../enums/nasa-format.enum';
import {
  BuildWmsUrlOptions,
  BBox,
} from '../interfaces/nasa-map-request.interface';
import { DATE_REGEX } from '../constants/nasa.constants';

/**
 * DTO for WMS queries. Used in /nasa/maps and specific endpoints.
 */
export class GetMapDto {
  /** Date in ISO format (YYYY-MM-DD) */
  @Matches(DATE_REGEX, {
    message: 'time deve estar no formato YYYY-MM-DD',
  })
  time!: string;

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
  @IsEnum(NasaFormatEnum)
  format?: NasaFormatEnum;

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

  toPartialBuildOptions(): Omit<BuildWmsUrlOptions, 'layer' | 'time'> {
    const partial: Omit<BuildWmsUrlOptions, 'layer' | 'time'> = {};
    const bboxTuple = this.toBBox();
    if (bboxTuple) partial.bbox = bboxTuple;
    if (typeof this.width === 'number') partial.width = this.width;
    if (typeof this.height === 'number') partial.height = this.height;
    if (this.format) partial.format = this.format;
    if (typeof this.transparent === 'boolean')
      partial.transparent = this.transparent;
    return partial;
  }
}
