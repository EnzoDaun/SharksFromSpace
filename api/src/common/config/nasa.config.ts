import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NasaConfigService {
  constructor(private readonly config: ConfigService) {}

  get baseUrl(): string {
    return this.config.get<string>('NASA_WMS_BASE', 'https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi');
  }

  get version(): '1.3.0' | '1.1.1' {
    return this.config.get<'1.3.0' | '1.1.1'>('NASA_WMS_VERSION', '1.3.0');
  }

  get crs(): string {
    return this.config.get<string>('NASA_WMS_CRS', 'EPSG:4326');
  }

  get defaultFormat(): 'image/png' | 'image/jpeg' {
    return this.config.get<'image/png' | 'image/jpeg'>('NASA_DEFAULT_FORMAT', 'image/png');
  }

  get chlorophyllLayer(): string {
    return this.config.get<string>('NASA_LAYER_CHLA', 'OCI_PACE_Chlorophyll_a');
  }

  get sstLayer(): string {
    return this.config.get<string>('NASA_LAYER_SST', 'GHRSST_L4_MUR_Sea_Surface_Temperature');
  }
}
