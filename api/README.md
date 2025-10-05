````markdown
# Sharks From Space - API

API NestJS para análise de dados oceanográficos e predição de atividade de tubarões.

## Desenvolvimento Local

```bash
# Instalar dependências
$ npm install

# Desenvolvimento
$ npm run start:dev

# Produção local
$ npm run build
$ npm run start:prod
```

## Deploy na Vercel (Serverless)

### Configuração do Projeto na Vercel

**Root Directory**: `api`  
**Framework Preset**: `Other`  
**Build Command**: `npm run build`  
**Output Directory**: (deixar vazio)

### Environment Variables

Configure na Vercel (Settings > Environment Variables):

```bash
# NASA API Configuration (obrigatórias)
NASA_WMS_BASE=https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi
NASA_WMS_VERSION=1.1.1
NASA_WMS_CRS=EPSG:4326
NASA_LAYER_CHLA=MODIS_Aqua_Chlorophyll_A
NASA_LAYER_SST=MODIS_Aqua_Sea_Surface_Temperature
NASA_DEFAULT_FORMAT=image/png

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4

# Performance (opcionais)
HTTP_TIMEOUT_MS=30000
HTTP_RETRY=3
NODE_ENV=production
```

### Endpoints Disponíveis

- `GET /` - Status da API
- `GET /nasa/chlorophyll.png?time=YYYY-MM-DD` - Imagem de clorofila
- `GET /nasa/sst.png?time=YYYY-MM-DD` - Imagem de temperatura
- `GET /nasa/maps?time=YYYY-MM-DD` - Ambas imagens em JSON
- `GET /openai/analyze?time=YYYY-MM-DD` - Análise de probabilidade

### Exemplo de Teste

```bash
# Teste básico
curl https://seu-projeto.vercel.app/

# Imagens NASA
curl https://seu-projeto.vercel.app/nasa/chlorophyll.png?time=2024-05-15
curl https://seu-projeto.vercel.app/nasa/sst.png?time=2024-05-15

# Análise OpenAI
curl https://seu-projeto.vercel.app/openai/analyze?time=2024-05-15
```

## Arquitetura

- **Framework**: NestJS + TypeScript
- **Deploy**: Serverless na Vercel
- **Entrypoint**: `serverless.ts` (handler usando @vendia/serverless-express)
- **CORS**: Habilitado para domínios `*.vercel.app`

## Troubleshooting

**404 Error**: Verifique Root Directory e se `serverless.ts` está commitado  
**500 Error**: Verifique logs na Vercel e environment variables  
**Logs**: Vercel > Functions > serverless.ts

---

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

````

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
