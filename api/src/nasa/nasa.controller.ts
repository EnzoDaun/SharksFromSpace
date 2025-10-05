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

  /** Returns both maps (chlorophyll and SST) with base64 images and URLs */
  @Get('maps')
  async getBothMaps(
    @Query(new ValidationPipe({ transform: true })) dto: GetMapDto,
  ) {
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

  /** Returns chlorophyll image as PNG stream */
  @Get('chlorophyll.png')
  async getChlaPng(
    @Query(new ValidationPipe({ transform: true })) dto: GetMapDto,
    @Res({ passthrough: false }) res: Response,
  ) {
    const { buffer } = await this.getChla.execute(
      dto.time,
      dto.toPartialBuildOptions(),
    );
    res
      .type('image/png')
      .set('Cache-Control', 'public, max-age=3600')
      .send(buffer);
  }

  /** Returns SST image as PNG stream */
  @Get('sst.png')
  async getSstPng(
    @Query(new ValidationPipe({ transform: true })) dto: GetMapDto,
    @Res({ passthrough: false }) res: Response,
  ) {
    const { buffer } = await this.getSst.execute(
      dto.time,
      dto.toPartialBuildOptions(),
    );
    res
      .type('image/png')
      .set('Cache-Control', 'public, max-age=3600')
      .send(buffer);
  }
}
