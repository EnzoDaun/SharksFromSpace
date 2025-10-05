import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { NasaParser } from '../parser/nasa.parser';
import { BuildWmsUrlOptions } from '../interfaces/nasa-map-request.interface';
import { NasaImageResult } from '../interfaces/nasa-map-response.interface';
import { NasaFormatEnum } from '../enums/nasa-format.enum';
import { NasaStylesEnum } from '../enums/nasa-styles.enum';
import {
  DEFAULT_ACCEPT_HEADER_PNG,
  DEFAULT_UA,
} from '../constants/nasa.constants';

/**
 * Handles WMS requests to NASA GIBS and returns PNG as Buffer.
 * Requires Node 18+ (native fetch).
 */
@Injectable()
export class NasaIntegration {
  constructor(private readonly parser: NasaParser) {}

  /** Chlorophyll-a (phytoplankton) data as PNG */
  async getChlorophyllPng(
    time: string,
    partial?: Omit<BuildWmsUrlOptions, 'layer' | 'time' | 'format'>,
  ): Promise<NasaImageResult> {
    const url = this.parser.buildChlorophyllGetMapUrl(time, {
      ...partial,
      format: NasaFormatEnum.PNG,
      transparent: partial?.transparent ?? true,
      styles: partial?.styles || NasaStylesEnum.DEFAULT,
    });
    return this.fetchPng(url);
  }

  /** Sea Surface Temperature (SST) data as PNG */
  async getSstPng(
    time: string,
    partial?: Omit<BuildWmsUrlOptions, 'layer' | 'time' | 'format'>,
  ): Promise<NasaImageResult> {
    const url = this.parser.buildSstGetMapUrl(time, {
      ...partial,
      format: NasaFormatEnum.PNG,
      transparent: partial?.transparent ?? false,
      styles: partial?.styles || NasaStylesEnum.DEFAULT,
    });
    return this.fetchPng(url);
  }

  async getLayerPng(
    layer: string,
    time: string,
    partial?: Omit<BuildWmsUrlOptions, 'layer' | 'time' | 'format'>,
  ): Promise<NasaImageResult> {
    const url = this.parser.buildGetMapUrl({
      layer,
      time,
      ...partial,
      format: NasaFormatEnum.PNG,
      transparent: partial?.transparent ?? true,
    });
    return this.fetchPng(url);
  }

  private async fetchPng(url: string): Promise<NasaImageResult> {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: DEFAULT_ACCEPT_HEADER_PNG,
        'User-Agent': DEFAULT_UA,
      },
    });

    const contentType = res.headers.get('content-type') || '';

    // NASA WMS may return XML error (sometimes with 200 status)
    if (!res.ok || contentType.includes('xml')) {
      const txt = await res.text();
      const wmsMsg = this.extractWmsError(txt);
      throw new BadRequestException(
        `Falha WMS (status=${res.status}). ${wmsMsg ? `Detalhe: ${wmsMsg}` : 'Sem detalhe.'} | url=${url}`,
      );
    }

    if (!contentType.startsWith('image/png')) {
      throw new InternalServerErrorException(
        `Resposta não é PNG (content-type=${contentType}). URL=${url}`,
      );
    }

    const ab = await res.arrayBuffer();
    return {
      url,
      contentType: contentType as 'image/png',
      buffer: Buffer.from(ab),
    };
  }

  private extractWmsError(xmlOrText: string): string | null {
    const m = xmlOrText.match(
      /<ServiceException[^>]*>([\s\S]*?)<\/ServiceException>/i,
    );
    if (m?.[1]) return m[1].trim();

    const t = xmlOrText.match(/<title>([\s\S]*?)<\/title>/i);
    if (t?.[1]) return t[1].trim();

    return null;
  }
}
