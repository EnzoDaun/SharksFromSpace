# API Deployment Guide - Render

## Deploy no Render

### 1. Métodos de Deploy

#### Opção A: Via Dashboard do Render (Mais simples)

1. Faça login no [Render Dashboard](https://dashboard.render.com)
2. Clique em "New +" → "Web Service"
3. Conecte seu repositório Git (GitHub/GitLab/Bitbucket)
4. Configure:
   - **Name**: sharks-from-space-api (ou nome de sua preferência)
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Plan**: Free (ou outro plano)

#### Opção B: Via Blueprint (render.yaml)

1. O arquivo `render.yaml` já está na raiz do projeto
2. No Render Dashboard, clique em "New +" → "Blueprint"
3. Conecte seu repositório
4. O Render detectará o `render.yaml` automaticamente

### 2. Environment Variables (obrigatórias)

Adicione estas variáveis no Render (Dashboard > Environment):

```bash
# Node Environment
NODE_ENV=production

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

# OpenAI (opcional - só para rota /openai/analyze)
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4
```

### 3. Rotas disponíveis

Após o deploy, sua URL será algo como: `https://sharks-from-space-api.onrender.com`

Rotas disponíveis:

- `GET /` - Hello World
- `GET /nasa/chlorophyll.png?time=2024-05-15` - Imagem PNG de clorofila
- `GET /nasa/sst.png?time=2024-05-15` - Imagem PNG de temperatura
- `GET /nasa/maps?time=2024-05-15` - Ambas imagens em JSON com base64
- `GET /openai/analyze?time=2024-05-15` - Análise HTML (requer OpenAI key)

### 4. Troubleshooting

**Se o deploy falhar:**
1. Verifique os logs de build no dashboard do Render
2. Confirme que a versão do Node está correta (22+)
3. Verifique se todas as dependências estão no `package.json`

**Se receber 503 (Service Unavailable):**
1. O plano gratuito hiberna após 15 minutos de inatividade
2. A primeira requisição pode demorar 30-60 segundos para "acordar"
3. Considere upgrade para plano pago se precisar disponibilidade 24/7

**Se receber erros de runtime:**
1. Verifique os logs em tempo real no dashboard
2. Confirme que as environment variables estão configuradas
3. Verifique se a porta está sendo lida do `process.env.PORT`

### 5. Logs e Monitoramento

Para ver os logs:
1. Acesse o dashboard do Render
2. Clique no seu serviço
3. Vá para a aba "Logs"
4. Veja logs em tempo real com auto-refresh

Os logs incluem:
- Inicialização da aplicação
- Requisições recebidas
- Erros detalhados com stack traces
- Performance e health checks

### 6. Funcionalidades Automáticas do Render

- ✅ **Auto-deploy**: Deploy automático a cada push na branch principal
- ✅ **HTTPS gratuito**: Certificado SSL/TLS automático
- ✅ **Health checks**: Monitoramento automático
- ✅ **Rollback**: Fácil reverter para versões anteriores
- ✅ **Preview deploys**: Branches podem gerar URLs de preview

Para mais detalhes, consulte `RENDER_DEPLOY.md`.