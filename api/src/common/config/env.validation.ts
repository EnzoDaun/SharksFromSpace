import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().integer().min(1).max(65535).default(3000),

  // HTTP (para integrações externas)
  HTTP_TIMEOUT_MS: Joi.number().integer().min(1000).default(10000),
  HTTP_RETRY: Joi.number().integer().min(0).default(2),

  // NASA GIBS WMS
  NASA_WMS_BASE: Joi.string()
    .uri()
    .default('https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi'),
  NASA_WMS_VERSION: Joi.string().valid('1.3.0', '1.1.1').default('1.3.0'),
  NASA_WMS_CRS: Joi.string().default('EPSG:4326'),
  NASA_LAYER_CHLA: Joi.string().default('OCI_PACE_Chlorophyll_a'),
  NASA_LAYER_SST: Joi.string().default('GHRSST_L4_MUR_Sea_Surface_Temperature'),
  NASA_DEFAULT_FORMAT: Joi.string().valid('image/png', 'image/jpeg').default('image/png'),
});
