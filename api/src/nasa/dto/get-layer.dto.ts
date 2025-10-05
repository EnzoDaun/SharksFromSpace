import { GetMapDto } from './get-map.dto';
import { IsEnum } from 'class-validator';
import { NasaLayerEnum } from '../enums/nasa-layer.enum';
import { BuildWmsUrlOptions } from '../interfaces/nasa-map-request.interface';

export class GetLayerDto extends GetMapDto {
  @IsEnum(NasaLayerEnum, { message: 'layer inválido' })
  layer!: NasaLayerEnum;

  toBuildOptions(): BuildWmsUrlOptions {
    const partial = this.toPartialBuildOptions();

    const layerId = this.layer as unknown as string;

    return {
      layer: layerId,
      time: this.time,
      ...partial,
    };
  }
}
