import { Controller, Get, Query, Res, ValidationPipe } from '@nestjs/common';
import type { Response } from 'express';
import { GetChlorophyllMapUseCase } from './usecases/get-chlorophyll-map.usecase';
import { GetSstMapUseCase } from './usecases/get-sst-map.usecase';
import { GetMapDto } from './dto/get-map.dto';

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
   * Ex.: GET /nasa/maps?time=2025-10-04&width=1280
   */
  @Get('maps')
  async getBothMaps(@Query(new ValidationPipe({ transform: true })) dto: GetMapDto) {
    const partialOpts = dto.toPartialBuildOptions();
    
    const [chla, sst] = await Promise.all([
      this.getChla.execute(dto.time, partialOpts),
      this.getSst.execute(dto.time, partialOpts),
    ]);

    const chlaBase64 = chla.buffer.toString('base64');
    const sstBase64 = sst.buffer.toString('base64');

    return {
      time: dto.time,
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
   * Ex.: GET /nasa/chlorophyll.png?time=2025-10-04&bbox=-50,-30,-40,-20&width=1280
   */
  @Get('chlorophyll.png')
  async getChlaPng(@Query(new ValidationPipe({ transform: true })) dto: GetMapDto, @Res({ passthrough: false }) res: Response) {
    const { buffer } = await this.getChla.execute(dto.time, dto.toPartialBuildOptions());
    res.type('image/png')
       .set('Cache-Control', 'public, max-age=3600')
       .send(buffer);
  }

  /**
   * Retorna apenas a imagem de SST em PNG (stream).
   * Ex.: GET /nasa/sst.png?time=2025-10-04&bbox=-50,-30,-40,-20&width=1280
   */
  @Get('sst.png')
  async getSstPng(@Query(new ValidationPipe({ transform: true })) dto: GetMapDto, @Res({ passthrough: false }) res: Response) {
    const { buffer } = await this.getSst.execute(dto.time, dto.toPartialBuildOptions());
    res.type('image/png')
       .set('Cache-Control', 'public, max-age=3600')
       .send(buffer);
  }
}
