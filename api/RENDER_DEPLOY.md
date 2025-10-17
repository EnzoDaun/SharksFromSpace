# Deploy no Render

Este documento descreve como fazer o deploy da API no Render.

## Pré-requisitos

1. Conta no [Render](https://render.com)
2. Repositório Git (GitHub, GitLab ou Bitbucket)

## Métodos de Deploy

### Opção 1: Deploy Automático via Dashboard (Recomendado)

1. Faça login no [Render Dashboard](https://dashboard.render.com)
2. Clique em "New +" e selecione "Web Service"
3. Conecte seu repositório Git
4. Configure o serviço:
   - **Name**: sharks-from-space-api (ou o nome que preferir)
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Plan**: Free (ou outro plano)

5. Configure as variáveis de ambiente necessárias:
   - `NODE_ENV`: production
   - `PORT`: 10000 (ou deixe em branco para usar o padrão do Render)
   - Adicione outras variáveis de ambiente específicas da sua aplicação (API keys, etc.)

6. Clique em "Create Web Service"

### Opção 2: Deploy via render.yaml (Blueprint)

1. O arquivo `render.yaml` já está configurado na raiz do projeto
2. Faça login no [Render Dashboard](https://dashboard.render.com)
3. Clique em "New +" e selecione "Blueprint"
4. Conecte seu repositório Git
5. O Render detectará automaticamente o arquivo `render.yaml` e configurará o serviço

**Nota**: Você precisará configurar as variáveis de ambiente sensíveis (como API keys) através do dashboard após a criação do serviço.

## Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no dashboard do Render:

- `NODE_ENV`: production
- `PORT`: (opcional, o Render define automaticamente)
- Adicione outras variáveis específicas da sua aplicação

## Verificação do Deploy

Após o deploy:

1. O Render fornecerá uma URL como: `https://sharks-from-space-api.onrender.com`
2. Acesse a URL para verificar se a API está funcionando
3. Verifique os logs no dashboard para identificar possíveis erros

## Funcionalidades do Render

- ✅ **Auto-deploy**: Deploy automático a cada push na branch principal
- ✅ **HTTPS**: Certificado SSL/TLS gratuito
- ✅ **Logs em tempo real**: Visualize logs da aplicação no dashboard
- ✅ **Health checks**: Monitoramento automático do status da aplicação
- ✅ **Escalabilidade**: Fácil upgrade de plano quando necessário

## Troubleshooting

### A aplicação não inicia

1. Verifique os logs no dashboard do Render
2. Certifique-se de que todas as variáveis de ambiente estão configuradas
3. Verifique se o `package.json` contém o script `start:prod`

### Erros de build

1. Verifique se a versão do Node está correta (definida em `.node-version`)
2. Certifique-se de que todas as dependências estão listadas no `package.json`
3. Verifique os logs de build para identificar o erro específico

### Timeout ou slow start

- O plano gratuito do Render "hiberna" após 15 minutos de inatividade
- A primeira requisição após hibernação pode demorar 30-60 segundos
- Considere fazer upgrade para um plano pago se precisar de disponibilidade constante

## Suporte

Para mais informações, consulte a [documentação oficial do Render](https://render.com/docs).
