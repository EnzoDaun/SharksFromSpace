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
import { BuildWmsUrlOptions, BBox } from '../interfaces/nasa-map-request.interface';

/**
 * DTO genérico para consultas WMS. Pode ser usado em /nasa/maps ou endpoints específicos.
 * Exemplos:
 *  GET /nasa/chlorophyll.png?time=2025-10-04&bbox=-50,-30,-40,-20&width=1280
 *  GET /nasa/sst.png?time=2025-10-04
 */
export class GetMapDto {
  /**
   * Data ISO curta (YYYY-MM-DD). Ex.: 2025-10-04
   */
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'time deve estar no formato YYYY-MM-DD',
  })
  time!: string;

  /**
   * BBox no formato "minLon,minLat,maxLon,maxLat".
   * Ex.: -50,-30,-40,-20
   */
  @IsOptional()
  @Matches(
    // quatro números com sinais opcionais e decimais, separados por vírgula
    /^-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?$/,
    { message: 'bbox deve ser "minLon,minLat,maxLon,maxLat"' },
  )
  bbox?: string;

  /**
   * Largura da imagem em pixels (opcional). Se ausente, calculamos a proporção no parser.
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
   * Formato da imagem. Mantemos flexível (PNG/JPEG), embora o fluxo atual use PNG.
   */
  @IsOptional()
  @IsEnum(NasaFormatEnum)
  format?: NasaFormatEnum;

  /**
   * Fundo transparente (default true). Em PNG, permite sobreposição no front.
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
   * Constrói o "partial" para BuildWmsUrlOptions (sem layer/time).
   * Útil para passar direto ao parser/integration.
   */
  toPartialBuildOptions(): Omit<BuildWmsUrlOptions, 'layer' | 'time'> {
    const partial: Omit<BuildWmsUrlOptions, 'layer' | 'time'> = {};
    const bboxTuple = this.toBBox();
    if (bboxTuple) partial.bbox = bboxTuple;
    if (typeof this.width === 'number') partial.width = this.width;
    if (typeof this.height === 'number') partial.height = this.height;
    if (this.format) partial.format = this.format;
    if (typeof this.transparent === 'boolean') partial.transparent = this.transparent;
    return partial;
  }
}
