import { BBox } from '../../nasa/interfaces/nasa-map-request.interface';
import { DEFAULT_WORLD_BBOX } from '../../nasa/constants/nasa.constants';

export function isValidBBox(bbox: BBox): boolean {
  const [minLon, minLat, maxLon, maxLat] = bbox;
  return (
    isFinite(minLon) &&
    isFinite(minLat) &&
    isFinite(maxLon) &&
    isFinite(maxLat) &&
    minLon >= -180 &&
    maxLon <= 180 &&
    minLat >= -90 &&
    maxLat <= 90 &&
    minLon < maxLon &&
    minLat < maxLat
  );
}

export function getWorldBBox(): BBox {
  return [...DEFAULT_WORLD_BBOX];
}

export function calculateAspectRatio(bbox: BBox): number {
  const [minLon, minLat, maxLon, maxLat] = bbox;
  const lonSpan = Math.abs(maxLon - minLon);
  const latSpan = Math.abs(maxLat - minLat);
  return lonSpan > 0 && latSpan > 0 ? lonSpan / latSpan : 2;
}
