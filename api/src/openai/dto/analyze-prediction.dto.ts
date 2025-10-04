import { Matches, IsOptional, IsString } from 'class-validator';

export class AnalyzePredictionDto {
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'time deve estar no formato YYYY-MM-DD',
  })
  time!: string;

  /** Opcional: dica textual da região (ex.: "Costa Sudeste BR") */
  @IsOptional()
  @IsString()
  regionHint?: string;
}
