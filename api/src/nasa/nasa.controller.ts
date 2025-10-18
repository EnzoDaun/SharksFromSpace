import { Controller, Get, Query, Res, ValidationPipe } from '@nestjs/common';
import type { Response } from 'express';
import { GetChlorophyllMapUseCase } from './usecases/get-chlorophyll-map.usecase';
import { GetSstMapUseCase } from './usecases/get-sst-map.usecase';
import { GetMapDto } from './dto/get-map.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiProduces,
} from '@nestjs/swagger';

@ApiTags('nasa')
@Controller('nasa')
export class NasaController {
  constructor(
    private readonly getChla: GetChlorophyllMapUseCase,
    private readonly getSst: GetSstMapUseCase,
  ) {}

  @Get('chlorophyll.png')
  @ApiOperation({
    summary: 'Obter imagem de Clorofila-a',
    description: 'Retorna a imagem de Clorofila-a em formato PNG para uma data específica',
  })
  @ApiProduces('image/png')
  @ApiQuery({
    name: 'time',
    required: true,
    description: 'Data no formato YYYY-MM-DD',
    example: '2024-05-15',
  })
  @ApiResponse({
    status: 200,
    description: 'Imagem PNG de Clorofila-a',
    content: {
      'image/png': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Data inválida ou parâmetros incorretos',
  })
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

  @Get('sst.png')
  @ApiOperation({
    summary: 'Obter imagem de Temperatura da Superfície do Mar (SST)',
    description: 'Retorna a imagem de Temperatura da Superfície do Mar em formato PNG para uma data específica',
  })
  @ApiProduces('image/png')
  @ApiQuery({
    name: 'time',
    required: true,
    description: 'Data no formato YYYY-MM-DD',
    example: '2024-05-15',
  })
  @ApiResponse({
    status: 200,
    description: 'Imagem PNG de SST',
    content: {
      'image/png': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Data inválida ou parâmetros incorretos',
  })
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
