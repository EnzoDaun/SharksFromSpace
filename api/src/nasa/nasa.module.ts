import { Module } from '@nestjs/common';
import { NasaController } from './nasa.controller';
import { NasaParser } from './parser/nasa.parser';
import { NasaIntegration } from './integration/nasa.integration';
import { GetChlorophyllMapUseCase } from './usecases/get-chlorophyll-map.usecase';
import { GetSstMapUseCase } from './usecases/get-sst-map.usecase';
import { BuildWmsUrlUseCase } from './usecases/build-wms-url.usecase';

@Module({
  controllers: [NasaController],
  providers: [
    NasaParser,
    NasaIntegration,
    GetChlorophyllMapUseCase,
    GetSstMapUseCase,
    BuildWmsUrlUseCase,
  ],
  exports: [
    NasaParser,
    NasaIntegration,
    GetChlorophyllMapUseCase,
    GetSstMapUseCase,
    BuildWmsUrlUseCase,
  ],
})
export class NasaModule {}
