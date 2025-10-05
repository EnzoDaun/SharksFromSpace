import { Matches, IsOptional, IsString, IsInt, Min, Max, IsBoolean } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { BBox } from '../../nasa/interfaces/nasa-map-request.interface';

export class AnalyzePredictionDto {
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'time deve estar no formato YYYY-MM-DD',
  })
  time!: string;

  /** Opcional: dica textual da região (ex.: "Costa Sudeste BR") */
  @IsOptional()
  @IsString()
  regionHint?: string;

  /**
   * BBox no formato "minLon,minLat,maxLon,maxLat".
   * Ex.: -50,-30,-40,-20
   */
  @IsOptional()
  @Matches(
    /^-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?$/,
    { message: 'bbox deve ser "minLon,minLat,maxLon,maxLat"' },
  )
  bbox?: string;

  /**
   * Largura da imagem em pixels (opcional).
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10000)
  width?: number;

  /**
   * Altura da imagem em pixels (opcional).
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10000)
  height?: number;

  /**
   * Fundo transparente (aceita para unificar com rotas NASA).
   */
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.toLowerCase() === 'true';
    return undefined;
  })
  @IsBoolean()
  transparent?: boolean;

  // -------------------
  // Helpers
  // -------------------

  /**
   * Converte a string bbox em tupla numérica.
   */
  toBBox(): BBox | undefined {
    if (!this.bbox) return undefined;
    const parts = this.bbox.split(',').map((n) => Number(n.trim()));
    return parts as BBox;
  }

  /**
   * Constrói opções parciais para as URLs WMS.
   */
  toWmsOptions() {
    const opts: any = {};
    const bboxTuple = this.toBBox();
    if (bboxTuple) opts.bbox = bboxTuple;
    if (typeof this.width === 'number') opts.width = this.width;
    if (typeof this.height === 'number') opts.height = this.height;
    if (typeof this.transparent === 'boolean') opts.transparent = this.transparent;
    return opts;
  }
}
