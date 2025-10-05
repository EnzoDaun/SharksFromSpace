import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NasaVersionEnum } from '../../nasa/enums/nasa-version.enum';
import { NasaCrsEnum } from '../../nasa/enums/nasa-crs.enum';
import { NasaFormatEnum } from '../../nasa/enums/nasa-format.enum';

@Injectable()
export class NasaConfigService {
  constructor(private readonly config: ConfigService) {}

  get baseUrl(): string {
    return this.config.get<string>('NASA_WMS_BASE', 'https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi');
  }

  get version(): NasaVersionEnum {
    return this.config.get<NasaVersionEnum>('NASA_WMS_VERSION', NasaVersionEnum.V1_3_0);
  }

  get crs(): NasaCrsEnum {
    return this.config.get<NasaCrsEnum>('NASA_WMS_CRS', NasaCrsEnum.EPSG_4326);
  }

  get defaultFormat(): NasaFormatEnum {
    return this.config.get<NasaFormatEnum>('NASA_DEFAULT_FORMAT', NasaFormatEnum.PNG);
  }

  get chlorophyllLayer(): string {
    return this.config.get<string>('NASA_LAYER_CHLA', 'OCI_PACE_Chlorophyll_a');
  }

  get sstLayer(): string {
    return this.config.get<string>('NASA_LAYER_SST', 'GHRSST_L4_MUR_Sea_Surface_Temperature');
  }
}
