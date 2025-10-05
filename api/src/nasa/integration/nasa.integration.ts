import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { NasaParser } from '../parser/nasa.parser';
import { BuildWmsUrlOptions } from '../interfaces/nasa-map-request.interface';
import { NasaImageResult } from '../interfaces/nasa-map-response.interface';
import { NasaFormatEnum } from '../enums/nasa-format.enum';
import { NasaStylesEnum } from '../enums/nasa-styles.enum';
import { DEFAULT_ACCEPT_HEADER_PNG, DEFAULT_UA } from '../../common/constants/nasa.constants';

/**
 * Responsável por chamar o endpoint WMS da NASA e retornar PNG como Buffer.
 * Requer Node 18+ (fetch nativo). Você já está em Node 22.
 */
@Injectable()
export class NasaIntegration {
  constructor(private readonly parser: NasaParser) {}

  /**
   * Clorofila-a (fitoplâncton) — retorna PNG.
   */
  async getChlorophyllPng(
    time: string,
    partial?: Omit<BuildWmsUrlOptions, 'layer' | 'time' | 'format'>,
  ): Promise<NasaImageResult> {
    const url = this.parser.buildChlorophyllGetMapUrl(time, {
      ...partial,
      format: NasaFormatEnum.PNG,
      transparent: partial?.transparent ?? true, // Clorofila: manter transparência
      styles: partial?.styles || NasaStylesEnum.DEFAULT, // garantir styles default
    });
    return this.fetchPng(url);
  }

  /**
   * Temperatura da Superfície do Mar (SST) — retorna PNG.
   */
  async getSstPng(
    time: string,
    partial?: Omit<BuildWmsUrlOptions, 'layer' | 'time' | 'format'>,
  ): Promise<NasaImageResult> {
    const url = this.parser.buildSstGetMapUrl(time, {
      ...partial,
      format: NasaFormatEnum.PNG,
      transparent: partial?.transparent ?? false, // SST: evitar transparência por default
      styles: partial?.styles || NasaStylesEnum.DEFAULT, // garantir styles default
    });
    return this.fetchPng(url);
  }

  /**
   * Genérico para qualquer layer (se precisar).
   */
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

  // -------------------
  // Internals
  // -------------------

  private async fetchPng(url: string): Promise<NasaImageResult> {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        // Garante PNG. (O servidor pode responder com XML de erro; checamos abaixo.)
        Accept: DEFAULT_ACCEPT_HEADER_PNG,
        'User-Agent': DEFAULT_UA,
      },
    });

    const contentType = res.headers.get('content-type') || '';

    // NASA WMS pode retornar erro como XML (às vezes até com 200)
    if (!res.ok || contentType.includes('xml')) {
      const txt = await res.text();
      const wmsMsg = this.extractWmsError(txt);
      throw new BadRequestException(
        `Falha WMS (status=${res.status}). ${wmsMsg ? `Detalhe: ${wmsMsg}` : 'Sem detalhe.'} | url=${url}`,
      );
    }

    if (!contentType.startsWith('image/png')) {
      // Por contrato, esperamos PNG.
      throw new InternalServerErrorException(
        `Resposta não é PNG (content-type=${contentType}). URL=${url}`,
      );
    }

    const ab = await res.arrayBuffer();
    return { 
      url, 
      contentType: contentType as 'image/png', 
      buffer: Buffer.from(ab) 
    };
  }

  private extractWmsError(xmlOrText: string): string | null {
    // Tenta extrair <ServiceException>...</ServiceException>
    const m = xmlOrText.match(/<ServiceException[^>]*>([\s\S]*?)<\/ServiceException>/i);
    if (m?.[1]) return m[1].trim();

    // fallback: tenta <ServiceExceptionReport> inteiro ou <title>
    const t = xmlOrText.match(/<title>([\s\S]*?)<\/title>/i);
    if (t?.[1]) return t[1].trim();

    return null;
  }
}
