export interface NasaImageResult {
  url: string;
  contentType: 'image/png' | 'image/jpeg';
  buffer: Buffer;
}