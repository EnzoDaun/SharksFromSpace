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
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { BBox } from '../../nasa/interfaces/nasa-map-request.interface';
import { DATE_REGEX } from '../../nasa/constants/nasa.constants';

export class AnalyzePredictionDto {
  @ApiProperty({
    description: 'Data no formato ISO (YYYY-MM-DD)',
    example: '2024-05-15',
    required: true,
  })
  @Matches(DATE_REGEX, {
    message: 'time deve estar no formato YYYY-MM-DD',
  })
  time!: string;

  @ApiHideProperty()
  @IsOptional()
  @IsString()
  regionHint?: string;

  @ApiHideProperty()
  @IsOptional()
  @Matches(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?$/, {
    message: 'bbox deve ser "minLon,minLat,maxLon,maxLat"',
  })
  bbox?: string;

  @ApiHideProperty()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10000)
  width?: number;

  @ApiHideProperty()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10000)
  height?: number;

  @ApiHideProperty()
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
