# API Deployment Guide - Vercel

## Deploy na Vercel

### 1. Configurações no projeto Vercel

**Root Directory**: `api`
**Framework Preset**: Other
**Build Command**: `npm run build`  
**Output Directory**: (deixar vazio)

### 2. Environment Variables (obrigatórias)

Adicione estas variáveis na Vercel (Settings > Environment Variables):

```bash
# NASA API Configuration
NASA_WMS_BASE=https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi
NASA_WMS_VERSION=1.1.1
NASA_WMS_CRS=EPSG:4326
NASA_LAYER_CHLA=MODIS_Aqua_Chlorophyll_A
NASA_LAYER_SST=MODIS_Aqua_Sea_Surface_Temperature
NASA_DEFAULT_FORMAT=image/png

# Optional Performance Settings
HTTP_TIMEOUT_MS=30000
HTTP_RETRY=3
NODE_ENV=production

# OpenAI (opcional - só para rota /openai/analyze)
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4
```

### 3. Rotas disponíveis

Após o deploy, teste estas URLs:

- `GET /` - Hello World
- `GET /nasa/chlorophyll.png?time=2024-05-15` - Imagem PNG de clorofila
- `GET /nasa/sst.png?time=2024-05-15` - Imagem PNG de temperatura
- `GET /nasa/maps?time=2024-05-15` - Ambas imagens em JSON com base64
- `GET /openai/analyze?time=2024-05-15` - Análise HTML (requer OpenAI key)

### 4. Troubleshooting

**Se receber 404:**
1. Verifique se o Root Directory está como `api`
2. Confirme que `serverless.ts` e `vercel.json` estão commitados
3. Verifique os logs da função na Vercel

**Se receber 500:**
1. Verifique os logs da função na Vercel
2. Confirme que as environment variables estão configuradas
3. Teste a rota `/test` primeiro para verificar se a API está funcionando

### 5. Logs e Debug

Para ver os logs:
1. Vá para o projeto na Vercel
2. Acesse a aba "Functions" 
3. Clique na função `serverless.ts`
4. Veja os logs em tempo real

Os logs incluem:
- Requisições recebidas (`GET /nasa/chlorophyll.png`)
- Inicialização da aplicação
- Erros detalhados se houver