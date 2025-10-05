import { Injectable } from '@nestjs/common';
import { NasaParser } from '../parser/nasa.parser';
import { BuildWmsUrlOptions } from '../interfaces/nasa-map-request.interface';
import { NasaConfigService } from '../../common/config/nasa.config';

@Injectable()
export class BuildWmsUrlUseCase {
  constructor(
    private readonly parser: NasaParser,
    private readonly nasaCfg: NasaConfigService,
  ) {}

  /**
   * Constrói URL WMS para a camada informada (genérico).
   * Útil para logs, debug, ou se você quiser retornar { url } para o front baixar direto.
   */
  buildUrl(opts: BuildWmsUrlOptions): string {
    return this.parser.buildGetMapUrl(opts);
  }

  /** URL da clorofila-a (fitoplâncton) */
  chlorophyllUrl(
    time: string,
    partial?: Omit<BuildWmsUrlOptions, 'layer' | 'time'>,
  ): string {
    return this.parser.buildGetMapUrl({
      layer: this.nasaCfg.chlorophyllLayer,
      time,
      ...partial,
    });
  }

  /** URL da SST (Temperatura da Superfície do Mar) */
  sstUrl(
    time: string,
    partial?: Omit<BuildWmsUrlOptions, 'layer' | 'time'>,
  ): string {
    return this.parser.buildGetMapUrl({
      layer: this.nasaCfg.sstLayer,
      time,
      ...partial,
    });
  }
}
