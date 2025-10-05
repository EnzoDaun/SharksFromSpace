import { Injectable, BadRequestException } from '@nestjs/common';
import { NasaConfigService } from '../../common/config/nasa.config';
import { BuildWmsUrlOptions, BBox, ImgFormat } from '../interfaces/nasa-map-request.interface';
import { NasaFormatEnum } from '../enums/nasa-format.enum';

@Injectable()
export class NasaParser {
  constructor(private readonly nasaCfg: NasaConfigService) {}

  /**
   * Monta uma URL WMS GetMap do GIBS para a camada desejada.
   * Observação: Em EPSG:4326, a ordem do BBOX é [minLon,minLat,maxLon,maxLat].
   */
  buildGetMapUrl(opts: BuildWmsUrlOptions): string {
    const layer = (opts.layer || '').trim();
    if (!layer) throw new BadRequestException('Layer inválido/ausente.');

    const time = (opts.time || '').trim();
    if (!this.isIsoDate(time)) {
      throw new BadRequestException('Parâmetro "time" deve estar no formato YYYY-MM-DD.');
    }

    const bbox = this.normalizeBBox(opts.bbox);
    const { width, height } = this.normalizeSize(opts.width, opts.height, bbox);

    const format: ImgFormat = NasaFormatEnum.PNG as ImgFormat;
    const transparent = opts.transparent ?? true;
    const styles = opts.styles ?? '';

    const qs = new URLSearchParams({
      service: 'WMS',
      version: this.nasaCfg.version,
      request: 'GetMap',
      layers: layer,
      styles,
      format,
      transparent: String(transparent),
      width: String(width),
      height: String(height),
      crs: this.nasaCfg.crs,
      bbox: bbox.join(','),
      time,
    });

    console.log('qs', qs.toString());

    return `${this.nasaCfg.baseUrl}?${qs.toString()}`;
  }

  /** Helpers para camadas padrão configuradas via env */
  buildChlorophyllGetMapUrl(time: string, partial?: Omit<BuildWmsUrlOptions, 'layer' | 'time'>): string {
    return this.buildGetMapUrl({
      layer: this.nasaCfg.chlorophyllLayer,
      time,
      ...partial,
    });
  }

  buildSstGetMapUrl(time: string, partial?: Omit<BuildWmsUrlOptions, 'layer' | 'time'>): string {
    return this.buildGetMapUrl({
      layer: this.nasaCfg.sstLayer,
      time,
      ...partial,
    });
  }

  // -------------------
  // Internals
  // -------------------

  private isIsoDate(s: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
    const d = new Date(s + 'T00:00:00Z');
    if (Number.isNaN(d.valueOf())) return false;
    return d.toISOString().slice(0, 10) === s;
  }

  private normalizeBBox(bbox?: BBox): BBox {
    const world: BBox = [-180, -90, 180, 90];
    if (!bbox) return world;

    const [minLon, minLat, maxLon, maxLat] = bbox.map(Number) as BBox;
    if (
      !this.inRange(minLon, -180, 180) ||
      !this.inRange(maxLon, -180, 180) ||
      !this.inRange(minLat, -90, 90) ||
      !this.inRange(maxLat, -90, 90) ||
      minLon >= maxLon ||
      minLat >= maxLat
    ) {
      throw new BadRequestException('BBox inválido. Esperado [minLon,minLat,maxLon,maxLat].');
    }
    return [minLon, minLat, maxLon, maxLat];
  }

  private normalizeSize(width?: number, height?: number, bbox?: BBox): { width: number; height: number } {
    const DEFAULT_W = 1920;
    const w = Math.max(1, Math.floor(width ?? DEFAULT_W));

    if (height && height > 0) {
      return { width: w, height: Math.floor(height) };
    }

    const [minLon, minLat, maxLon, maxLat] = bbox ?? [-180, -90, 180, 90];
    const lonSpan = Math.abs(maxLon - minLon);
    const latSpan = Math.abs(maxLat - minLat);
    const aspect = lonSpan > 0 && latSpan > 0 ? lonSpan / latSpan : 2; // fallback 2:1
    const h = Math.max(1, Math.round(w / aspect));

    if (w * h > 20_000_000) {
      throw new BadRequestException('Dimensões da imagem muito grandes. Reduza width/height.');
    }

    return { width: w, height: h };
  }

  private inRange(n: number, min: number, max: number): boolean {
    return Number.isFinite(n) && n >= min && n <= max;
  }
}
