import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { GetChlorophyllMapUseCase } from './usecases/get-chlorophyll-map.usecase';
import { GetSstMapUseCase } from './usecases/get-sst-map.usecase';

@Controller('nasa')
export class NasaController {
  constructor(
    private readonly getChla: GetChlorophyllMapUseCase,
    private readonly getSst: GetSstMapUseCase,
  ) {}

  /**
   * Retorna em uma única resposta os dois mapas (clorofila e SST),
   * com as imagens em base64 e as URLs usadas.
   *
   * Ex.: GET /nasa/maps?time=2025-10-04
   */
  @Get('maps')
  async getBothMaps(@Query('time') time: string) {
    const [chla, sst] = await Promise.all([
      this.getChla.execute(time),
      this.getSst.execute(time),
    ]);

    const chlaBase64 = chla.buffer.toString('base64');
    const sstBase64 = sst.buffer.toString('base64');

    return {
      time,
      chlorophyll: {
        url: chla.url,
        contentType: chla.contentType,
        base64: chlaBase64,
        dataUrl: `data:${chla.contentType};base64,${chlaBase64}`,
      },
      sst: {
        url: sst.url,
        contentType: sst.contentType,
        base64: sstBase64,
        dataUrl: `data:${sst.contentType};base64,${sstBase64}`,
      },
    };
  }

  /**
   * Retorna apenas a imagem de clorofila em PNG (stream).
   * Ex.: GET /nasa/chlorophyll.png?time=2025-10-04
   */
  @Get('chlorophyll.png')
  async getChlaPng(@Query('time') time: string, @Res({ passthrough: false }) res: Response) {
    const { buffer } = await this.getChla.execute(time);
    res.type('image/png').send(buffer);
  }

  /**
   * Retorna apenas a imagem de SST em PNG (stream).
   * Ex.: GET /nasa/sst.png?time=2025-10-04
   */
  @Get('sst.png')
  async getSstPng(@Query('time') time: string, @Res({ passthrough: false }) res: Response) {
    const { buffer } = await this.getSst.execute(time);
    res.type('image/png').send(buffer);
  }
}
