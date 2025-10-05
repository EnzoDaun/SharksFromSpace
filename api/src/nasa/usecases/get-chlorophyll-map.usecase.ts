import { Injectable } from '@nestjs/common';
import { NasaIntegration } from '../integration/nasa.integration';
import { BuildWmsUrlOptions } from '../interfaces/nasa-map-request.interface';
import { NasaImageResult } from '../interfaces/nasa-map-response.interface';

@Injectable()
export class GetChlorophyllMapUseCase {
  constructor(private readonly nasa: NasaIntegration) {}

  /**
   * Retorna a imagem (PNG) de clorofila-a (fitoplâncton) para a data informada.
   * O formato é forçado para image/png dentro da integration.
   */
  async execute(
    time: string,
    opts?: Omit<BuildWmsUrlOptions, 'layer' | 'time' | 'format'>,
  ): Promise<NasaImageResult> {
    return this.nasa.getChlorophyllPng(time, opts);
  }
}
