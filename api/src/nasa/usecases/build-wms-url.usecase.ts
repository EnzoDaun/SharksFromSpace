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

  buildUrl(opts: BuildWmsUrlOptions): string {
    return this.parser.buildGetMapUrl(opts);
  }

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
