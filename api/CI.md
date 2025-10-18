# 🔄 GitHub Actions - CI/CD

Este projeto utiliza GitHub Actions para Integração Contínua (CI).

## 🎯 O que o CI faz?

O workflow de CI é executado automaticamente em:
- ✅ Pull Requests para `main` ou `develop`
- ✅ Push direto nas branches `main` ou `develop`

### Etapas do CI:

1. **Checkout do código**
2. **Setup do Node.js 22.x**
3. **Instalação de dependências** (`npm ci`)
4. **Lint do código** (`npm run lint`)
5. **Build da aplicação** (`npm run build`)
6. **Verificação do build** (checa se `dist/main.js` existe)
7. **Testes unitários** (`npm test`)

## 📁 Arquivo de Configuração

Localização: `.github/workflows/ci.yml`

## ✅ Status do Build

O status do build aparece:
- No Pull Request como check obrigatório
- Na aba "Actions" do repositório
- No README (se adicionar badge)

## 🚫 O que impede o Merge?

O merge de um PR será bloqueado se:
- ❌ Build falhar
- ❌ Verificação de `dist/main.js` falhar

**Nota:** Lint e testes não bloqueiam o merge (`continue-on-error: true`), mas você pode ver os erros nos logs.

## 🔧 Como Configurar Branch Protection

Para exigir que o CI passe antes do merge:

1. Vá em **Settings** → **Branches**
2. Adicione uma regra para a branch `main`
3. Habilite:
   - ✅ "Require status checks to pass before merging"
   - ✅ Selecione "Build and Test API"
   - ✅ "Require branches to be up to date before merging"

## 📊 Ver Resultados do CI

### No Pull Request:
- Aparecerá um check ✅ ou ❌
- Clique em "Details" para ver os logs

### Na aba Actions:
1. Vá na aba "Actions" do repositório
2. Clique no workflow "CI - Build and Test"
3. Veja o histórico de execuções

## 🐛 Troubleshooting

### Build falha localmente mas passa no CI
```bash
# Limpe e reconstrua
rm -rf node_modules dist
npm ci
npm run build
```

### Build passa localmente mas falha no CI
- Verifique se todas as dependências estão no `package.json`
- Certifique-se de que não há dependências de sistema operacional específicas

### Lint falhando
```bash
# Execute localmente
npm run lint

# Auto-fix
npm run lint -- --fix
```

## 🚀 Adicionar Badge no README

Adicione ao `README.md`:

```markdown
![CI Status](https://github.com/EnzoDaun/SharksFromSpace/workflows/CI%20-%20Build%20and%20Test/badge.svg)
```

## 📝 Modificar o Workflow

Para modificar o CI, edite `.github/workflows/ci.yml`:

### Adicionar mais versões do Node:
```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]
```

### Adicionar testes E2E:
```yaml
- name: Run E2E tests
  run: npm run test:e2e
```

### Adicionar Coverage:
```yaml
- name: Test Coverage
  run: npm run test:cov

- name: Upload Coverage
  uses: codecov/codecov-action@v3
  with:
    directory: ./api/coverage
```

## 🔒 Segredos e Variáveis de Ambiente

Se o build precisar de variáveis de ambiente:

1. Vá em **Settings** → **Secrets and variables** → **Actions**
2. Adicione secrets necessários
3. Use no workflow:
```yaml
env:
  OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

## 📈 Próximos Passos

- [ ] Adicionar testes E2E ao CI
- [ ] Adicionar coverage reports
- [ ] Configurar Dependabot para atualizações
- [ ] Adicionar deploy automático no Render após merge na main
