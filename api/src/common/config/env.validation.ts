const Joi = require('joi');
import { NasaFormatEnum } from '../../nasa/enums/nasa-format.enum';
import { NasaVersionEnum } from '../../nasa/enums/nasa-version.enum';
import { NasaCrsEnum } from '../../nasa/enums/nasa-crs.enum';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('production'),
  PORT: Joi.number().integer().min(1).max(65535).default(3000),

  HTTP_TIMEOUT_MS: Joi.number().integer().min(1000).default(30000),
  HTTP_RETRY: Joi.number().integer().min(0).default(3),

  NASA_WMS_BASE: Joi.string()
    .uri()
    .default('https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi'),
  NASA_WMS_VERSION: Joi.string()
    .valid(...Object.values(NasaVersionEnum))
    .default(NasaVersionEnum.V1_1_1),
  NASA_WMS_CRS: Joi.string()
    .valid(...Object.values(NasaCrsEnum))
    .default(NasaCrsEnum.EPSG_4326),
  NASA_LAYER_CHLA: Joi.string().default('MODIS_Aqua_Chlorophyll_A'),
  NASA_LAYER_SST: Joi.string().default('MODIS_Aqua_Sea_Surface_Temperature'),
  NASA_DEFAULT_FORMAT: Joi.string()
    .valid(...Object.values(NasaFormatEnum))
    .default(NasaFormatEnum.PNG),

  // OpenAI variables (optional for basic functionality)
  OPENAI_API_KEY: Joi.string().optional(),
  OPENAI_BASE_URL: Joi.string().uri().optional().default('https://api.openai.com/v1'),
  OPENAI_MODEL: Joi.string().optional().default('gpt-4'),
}).unknown(true); // Allow unknown environment variables
