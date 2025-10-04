import { GetMapDto } from './get-map.dto';
import { IsEnum } from 'class-validator';
import { NasaLayerEnum } from '../enums/nasa-layer.enum';
import { BuildWmsUrlOptions } from '../interfaces/nasa-map-request.interface';

/**
 * DTO para endpoints genéricos que permitem escolher a camada explicitamente.
 * Ex.: GET /nasa/layer.png?layer=CHLA_PACE&time=2025-10-04
 */
export class GetLayerDto extends GetMapDto {
  @IsEnum(NasaLayerEnum, { message: 'layer inválido' })
  layer!: NasaLayerEnum;

  /**
   * Constrói o objeto BuildWmsUrlOptions completo.
   */
  toBuildOptions(): BuildWmsUrlOptions {
    const partial = this.toPartialBuildOptions();

    // Map enum -> identificador real do GIBS (valor do enum já é o ID)
    const layerId = this.layer as unknown as string;

    return {
      layer: layerId,
      time: this.time,
      ...partial,
    };
  }
}
