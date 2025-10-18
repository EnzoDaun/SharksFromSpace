# Sharks From Space - API# Sharks From Space - API````markdown



![CI Status](https://github.com/EnzoDaun/SharksFromSpace/workflows/CI%20-%20Build%20and%20Test/badge.svg)# Sharks From Space - API



API NestJS para análise de dados oceanográficos e predição de atividade de tubarões usando dados de satélite da NASA (Clorofila-a e Temperatura da Superfície do Mar) e análise de IA.![CI Status](https://github.com/EnzoDaun/SharksFromSpace/workflows/CI%20-%20Build%20and%20Test/badge.svg)



## 🚀 FeaturesAPI NestJS para análise de dados oceanográficos e predição de atividade de tubarões.



- ✅ Integração com NASA GIBS (Global Imagery Browse Services)API NestJS para análise de dados oceanográficos e predição de atividade de tubarões usando dados de satélite da NASA (Clorofila-a e Temperatura da Superfície do Mar) e análise de IA.

- ✅ Análise de IA via OpenAI Assistant

- ✅ Documentação interativa com Swagger## Desenvolvimento Local

- ✅ CI/CD com GitHub Actions

- ✅ Deploy no Render## 🚀 Features

- ✅ Validação automática de requisições

- ✅ CORS habilitado```bash



## 📚 Documentação- ✅ Integração com NASA GIBS (Global Imagery Browse Services)# Instalar dependências



### Swagger (API Docs)- ✅ Análise de IA via OpenAI Assistant$ npm install

- **Local**: http://localhost:3000/api

- **Produção**: https://sharksfromspace-api.onrender.com/api- ✅ Documentação interativa com Swagger



Veja [SWAGGER.md](./SWAGGER.md) para mais detalhes.- ✅ CI/CD com GitHub Actions# Desenvolvimento



### CI/CD- ✅ Deploy no Render$ npm run start:dev

O projeto usa GitHub Actions para testes automatizados em cada Pull Request.

- ✅ Validação automática de requisições

Veja [CI.md](./CI.md) para mais detalhes.

- ✅ CORS habilitado# Produção local

### Deploy

Deploy configurado para Render.$ npm run build



Veja [DEPLOY.md](./DEPLOY.md) e [RENDER_DEPLOY.md](./RENDER_DEPLOY.md) para instruções completas.## 📚 Documentação$ npm run start:prod



## 🛠️ Desenvolvimento Local```



```bash### Swagger (API Docs)

# Instalar dependências

npm install- **Local**: http://localhost:3000/api## Deploy na Vercel (Serverless)



# Desenvolvimento (com hot-reload)- **Produção**: https://sharks-from-space-api.onrender.com/api

npm run start:dev

### Configuração do Projeto na Vercel

# Build

npm run buildVeja [SWAGGER.md](./SWAGGER.md) para mais detalhes.



# Produção local**Root Directory**: `api`  

npm run start:prod

```### CI/CD**Framework Preset**: `Other`  



Após iniciar, acesse:O projeto usa GitHub Actions para testes automatizados em cada Pull Request.**Build Command**: `npm run build`  

- **API**: http://localhost:3000

- **Swagger**: http://localhost:3000/api**Output Directory**: (deixar vazio)



## 🧪 TestesVeja [CI.md](./CI.md) para mais detalhes.



```bash### Environment Variables

# Testes unitários

npm run test### Deploy



# Testes E2EDeploy configurado para Render.Configure na Vercel (Settings > Environment Variables):

npm run test:e2e



# Coverage

npm run test:covVeja [DEPLOY.md](./DEPLOY.md) e [RENDER_DEPLOY.md](./RENDER_DEPLOY.md) para instruções completas.```bash



# Lint# NASA API Configuration (obrigatórias)

npm run lint

```## 🛠️ Desenvolvimento LocalNASA_WMS_BASE=https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi



## 📡 As 3 Rotas da APINASA_WMS_VERSION=1.1.1



### 1️⃣ Imagem de Clorofila-a```bashNASA_WMS_CRS=EPSG:4326



```bash# Instalar dependênciasNASA_LAYER_CHLA=MODIS_Aqua_Chlorophyll_A

curl --location 'https://sharksfromspace-api.onrender.com/nasa/chlorophyll.png?time=2024-05-15'

```npm installNASA_LAYER_SST=MODIS_Aqua_Sea_Surface_Temperature



- **Endpoint**: `GET /nasa/chlorophyll.png`NASA_DEFAULT_FORMAT=image/png

- **Parâmetro**: `time` (formato: YYYY-MM-DD)

- **Resposta**: Imagem PNG de Clorofila-a# Copiar .env.example para .env e configurar



### 2️⃣ Imagem de Temperatura da Superfície do Mar (SST)cp .env.example .env# OpenAI Configuration



```bashOPENAI_API_KEY=your_openai_api_key_here

curl --location 'https://sharksfromspace-api.onrender.com/nasa/sst.png?time=2024-05-15'

```# Desenvolvimento (com hot-reload)OPENAI_BASE_URL=https://api.openai.com/v1



- **Endpoint**: `GET /nasa/sst.png`npm run start:devOPENAI_MODEL=gpt-4

- **Parâmetro**: `time` (formato: YYYY-MM-DD)

- **Resposta**: Imagem PNG de SST



### 3️⃣ Análise de IA sobre Probabilidade de Tubarões# Build# Performance (opcionais)



```bashnpm run buildHTTP_TIMEOUT_MS=30000

curl --location 'https://sharksfromspace-api.onrender.com/openai/analyze?time=2024-05-15' \

--header 'Accept: text/html'HTTP_RETRY=3

```

# Produção localNODE_ENV=production

- **Endpoint**: `GET /openai/analyze`

- **Parâmetro**: `time` (formato: YYYY-MM-DD)npm run start:prod```

- **Resposta**: JSON com campo `html` contendo análise detalhada

```

**Exemplo de resposta:**

```json### Endpoints Disponíveis

{

  "html": "<html><body><h1>Análise de Probabilidade de Tubarões</h1><p>Baseado nos dados de 2024-05-15...</p></body></html>"Após iniciar, acesse:

}

```- API: http://localhost:3000- `GET /` - Status da API



## 🔧 Environment Variables- Swagger: http://localhost:3000/api- `GET /nasa/chlorophyll.png?time=YYYY-MM-DD` - Imagem de clorofila



Configure no `.env` local ou no dashboard do Render:- `GET /nasa/sst.png?time=YYYY-MM-DD` - Imagem de temperatura



```bash## 🧪 Testes- `GET /nasa/maps?time=YYYY-MM-DD` - Ambas imagens em JSON

# Node

NODE_ENV=production- `GET /openai/analyze?time=YYYY-MM-DD` - Análise de probabilidade

PORT=3000

```bash

# NASA API

NASA_WMS_BASE=https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi# Testes unitários### Exemplo de Teste

NASA_WMS_VERSION=1.3.0

NASA_WMS_CRS=EPSG:4326npm run test

NASA_LAYER_CHLA=OCI_PACE_Chlorophyll_a

NASA_LAYER_SST=GHRSST_L4_MUR_Sea_Surface_Temperature```bash

NASA_DEFAULT_FORMAT=image/png

# Testes E2E# Teste básico

# HTTP

HTTP_TIMEOUT_MS=10000npm run test:e2ecurl https://seu-projeto.vercel.app/

HTTP_RETRY=2



# OpenAI

OPENAI_API_KEY=your_key_here# Coverage# Imagens NASA

OPENAI_MODEL=gpt-4o

OPENAI_BASE_URL=https://api.openai.com/v1npm run test:covcurl https://seu-projeto.vercel.app/nasa/chlorophyll.png?time=2024-05-15

OPENAI_ASSISTANT_ID=your_assistant_id

```curl https://seu-projeto.vercel.app/nasa/sst.png?time=2024-05-15



## 🏗️ Arquitetura# Lint



```npm run lint# Análise OpenAI

src/

├── main.ts                 # Bootstrap + Swagger configcurl https://seu-projeto.vercel.app/openai/analyze?time=2024-05-15

├── app.module.ts           # Módulo raiz

├── common/# Lint com auto-fix```

│   ├── config/            # Configuração e validação de env

│   └── utils/             # Utilitários (bbox, date)npm run lint -- --fix

├── nasa/

│   ├── nasa.controller.ts # 2 endpoints: chlorophyll.png e sst.png```## Arquitetura

│   ├── usecases/          # Lógica de negócio

│   ├── integration/       # Integração com NASA GIBS

│   ├── dto/               # Data Transfer Objects

│   └── enums/             # Enums (layers, formats, etc)## 📡 Endpoints Principais- **Framework**: NestJS + TypeScript

└── openai/

    ├── openai.controller.ts # 1 endpoint: analyze- **Deploy**: Serverless na Vercel

    ├── usecases/            # Lógica de análise

    ├── integration/         # Integração com OpenAI### NASA Satellite Data- **Entrypoint**: `serverless.ts` (handler usando @vendia/serverless-express)

    └── dto/                 # Data Transfer Objects

```- **CORS**: Habilitado para domínios `*.vercel.app`



## 🔄 CI/CD Pipeline- `GET /nasa/maps?time=YYYY-MM-DD` - Ambos os mapas (Clorofila e SST) em JSON



O projeto usa GitHub Actions para:- `GET /nasa/chlorophyll.png?time=YYYY-MM-DD` - Imagem PNG de Clorofila-a## Troubleshooting

- ✅ Lint do código

- ✅ Build da aplicação- `GET /nasa/sst.png?time=YYYY-MM-DD` - Imagem PNG de SST

- ✅ Testes unitários

- ✅ Verificação de artefatos**404 Error**: Verifique Root Directory e se `serverless.ts` está commitado  



O CI roda automaticamente em:**Parâmetros opcionais:****500 Error**: Verifique logs na Vercel e environment variables  

- Pull Requests para `main` ou `develop`

- Push nas branches `main` ou `develop`- `bbox`: Bounding box (minLon,minLat,maxLon,maxLat)**Logs**: Vercel > Functions > serverless.ts



## 📦 Deploy no Render- `width`: Largura da imagem (px)



**Build Command**: `npm install && npm run build`  - `height`: Altura da imagem (px)---

**Start Command**: `npm run start:prod`  

**Root Directory**: `api`- `transparent`: Fundo transparente (true/false)



Veja [DEPLOY.md](./DEPLOY.md) para instruções detalhadas.## Description



## 🤝 Contribuindo### OpenAI Analysis



1. Crie uma branch: `git checkout -b feature/minha-feature`[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

2. Commit: `git commit -m 'feat: Adiciona minha feature'`

3. Push: `git push origin feature/minha-feature`- `GET /openai/analyze?time=YYYY-MM-DD` - Análise de probabilidade de tubarões

4. Abra um Pull Request

## Run tests

O CI rodará automaticamente e verificará se o build passa.

**Parâmetros:**

## 📝 License

- `time`: Data (obrigatório)```bash

Este projeto é [MIT licensed](LICENSE).

- `regionHint`: Dica da região (opcional)# unit tests

## 🔗 Links Úteis

- `bbox`: Bounding box (opcional)$ npm run test

- [NestJS Documentation](https://docs.nestjs.com)

- [NASA GIBS API](https://wiki.earthdata.nasa.gov/display/GIBS)

- [OpenAI API](https://platform.openai.com/docs)

- [Swagger/OpenAPI](https://swagger.io/)### Health Check# e2e tests

- [Render Documentation](https://render.com/docs)

$ npm run test:e2e

- `GET /` - Retorna mensagem de boas-vindas

# test coverage

## 🔧 Environment Variables$ npm run test:cov

```

Configure no `.env` ou no dashboard do Render:

## Resources

```bash

# NodeCheck out a few resources that may come in handy when working with NestJS:

NODE_ENV=production

PORT=3000- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.

- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).

# NASA API

NASA_WMS_BASE=https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi## License

NASA_WMS_VERSION=1.3.0

NASA_WMS_CRS=EPSG:4326Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

NASA_LAYER_CHLA=OCI_PACE_Chlorophyll_a

NASA_LAYER_SST=GHRSST_L4_MUR_Sea_Surface_Temperature````

NASA_DEFAULT_FORMAT=image/png

## Description

# HTTP

HTTP_TIMEOUT_MS=10000[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

HTTP_RETRY=2

## Project setup

# OpenAI

OPENAI_API_KEY=your_key_here```bash

OPENAI_MODEL=gpt-4o$ npm install

OPENAI_BASE_URL=https://api.openai.com/v1```

OPENAI_ASSISTANT_ID=your_assistant_id

```## Compile and run the project



## 🏗️ Arquitetura```bash

# development

```$ npm run start

src/

├── app.module.ts           # Módulo raiz# watch mode

├── main.ts                 # Bootstrap + Swagger config$ npm run start:dev

├── common/

│   ├── config/            # Configuração e validação de env# production mode

│   └── utils/             # Utilitários (bbox, date)$ npm run start:prod

├── nasa/```

│   ├── controllers/       # Endpoints NASA

│   ├── usecases/         # Lógica de negócio## Run tests

│   ├── integration/      # Integração com NASA GIBS

│   ├── dto/              # Data Transfer Objects```bash

│   └── enums/            # Enums (layers, formats, etc)# unit tests

└── openai/$ npm run test

    ├── controllers/       # Endpoints OpenAI

    ├── usecases/         # Lógica de análise# e2e tests

    ├── integration/      # Integração com OpenAI$ npm run test:e2e

    └── dto/              # Data Transfer Objects

```# test coverage

$ npm run test:cov

## 🔄 CI/CD Pipeline```



O projeto usa GitHub Actions para:## Deployment

- ✅ Lint do código

- ✅ Build da aplicaçãoWhen you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

- ✅ Testes unitários

- ✅ Verificação de artefatosIf you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:



O CI roda automaticamente em:```bash

- Pull Requests para `main` ou `develop`$ npm install -g @nestjs/mau

- Push nas branches `main` ou `develop`$ mau deploy

```

## 📦 Deploy

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

O projeto está configurado para deploy no **Render**.

## Resources

```bash

# Build commandCheck out a few resources that may come in handy when working with NestJS:

npm install && npm run build

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.

# Start command- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).

npm run start:prod- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).

```- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.

- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).

Veja [DEPLOY.md](./DEPLOY.md) para instruções detalhadas.- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).

- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).

## 🤝 Contribuindo- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).



1. Crie uma branch: `git checkout -b feature/minha-feature`## Support

2. Commit: `git commit -m 'feat: Adiciona minha feature'`

3. Push: `git push origin feature/minha-feature`Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

4. Abra um Pull Request

## Stay in touch

O CI rodará automaticamente e verificará se o build passa.

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)

## 📝 License- Website - [https://nestjs.com](https://nestjs.com/)

- Twitter - [@nestframework](https://twitter.com/nestframework)

Este projeto é [MIT licensed](LICENSE).

## License

## 🔗 Links Úteis

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

- [NestJS Documentation](https://docs.nestjs.com)
- [NASA GIBS API](https://wiki.earthdata.nasa.gov/display/GIBS)
- [OpenAI API](https://platform.openai.com/docs)
- [Swagger/OpenAPI](https://swagger.io/)
- [Render Documentation](https://render.com/docs)
