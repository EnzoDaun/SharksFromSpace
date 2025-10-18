# 📚 Documentação Swagger

Este projeto possui documentação interativa via Swagger/OpenAPI.

## 🌐 Acessar o Swagger

### Local (Desenvolvimento)
Após iniciar a aplicação localmente:
```bash
npm run start:dev
```

Acesse: **http://localhost:3000/api**

### Produção (Render)
Acesse: **https://sharksfromspace-api.onrender.com/api**

## 📖 O que você pode fazer no Swagger

1. **Ver todas as 3 rotas disponíveis** organizadas por tags:
   - `nasa` - Endpoints de mapas de satélite (chlorophyll.png e sst.png)
   - `openai` - Análise de IA (analyze)

2. **Testar as requisições diretamente** no navegador:
   - Clique em qualquer rota
   - Clique em "Try it out"
   - Preencha apenas o parâmetro `time` (ex: 2024-05-15)
   - Clique em "Execute"
   - Veja a resposta em tempo real

3. **Ver exemplos de requisição e resposta**
   - Schemas detalhados
   - Exemplos de valores
   - Tipos de dados esperados

## 🎯 Exemplos de Uso

### Testar rota `/nasa/chlorophyll.png`
1. Acesse `/api` no Swagger
2. Expanda `GET /nasa/chlorophyll.png`
3. Clique em "Try it out"
4. Preencha:
   - `time`: `2024-05-15`
5. Clique em "Execute"
6. Veja a imagem PNG de Clorofila-a

### Testar rota `/nasa/sst.png`
1. Expanda `GET /nasa/sst.png`
2. Clique em "Try it out"
3. Preencha:
   - `time`: `2024-05-15`
4. Clique em "Execute"
5. Veja a imagem PNG de SST

### Testar rota `/openai/analyze`
1. Expanda `GET /openai/analyze`
2. Clique em "Try it out"
3. Preencha:
   - `time`: `2024-05-15`
4. Clique em "Execute"
5. Veja o HTML com análise de IA

## 🔧 Desenvolvimento

### Adicionar nova rota ao Swagger

1. **No Controller**, adicione decorators:
```typescript
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('nome-da-tag')
@Controller('rota')
export class MeuController {
  
  @Get('endpoint')
  @ApiOperation({ summary: 'Descrição breve' })
  @ApiQuery({ name: 'param', required: true, example: 'exemplo' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  meuEndpoint() {
    // ...
  }
}
```

2. **No DTO**, adicione `@ApiProperty`:
```typescript
import { ApiProperty } from '@nestjs/swagger';

export class MeuDto {
  @ApiProperty({
    description: 'Descrição do campo',
    example: 'valor de exemplo',
    required: true,
  })
  campo!: string;
}
```

## 📋 Recursos do Swagger

- ✅ Documentação automática
- ✅ Interface interativa para testes
- ✅ Exemplos de requisição/resposta
- ✅ Validação de schemas
- ✅ Download da especificação OpenAPI (JSON/YAML)
- ✅ Suporte a múltiplos servidores (local/produção)

## 🔗 Links Úteis

- [NestJS Swagger Documentation](https://docs.nestjs.com/openapi/introduction)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)
