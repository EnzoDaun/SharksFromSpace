# 📸 Galeria do Projeto - Instruções

## Como adicionar novas imagens à galeria

### 1. Localização das imagens
Coloque todas as imagens na pasta:
```
WEB/src/frontend/assets/gallery/
```

### 2. Formatos suportados
- `.jpg` / `.jpeg`
- `.png`
- `.webp`

### 3. Nomeação recomendada
Use o padrão: `evento-descrição-numeracao.extensao`

Exemplos:
- `team-coding-01.jpg`
- `presentation-nasa-02.png`
- `workspace-setup-03.jpg`
- `hackathon-final-04.webp`

### 4. Carregamento automático
As imagens são carregadas automaticamente pelo componente `GalleryGrid.jsx` usando `import.meta.glob` do Vite.

**Não é necessário modificar código** - apenas adicione as imagens na pasta e elas aparecerão na galeria.

### 5. Texto alternativo
O componente gera automaticamente o texto alternativo (alt) baseado no nome do arquivo:
- `team-coding-01.jpg` → "Foto do projeto - Team Coding 01"

### 6. Características técnicas
- **Aspect ratio fixo**: 1:1 (quadrado) para homogeneidade visual
- **Object-fit**: cover (sem distorção)
- **Loading**: lazy (carregamento otimizado)
- **Responsivo**: grid adaptável (6 colunas xs, 4 sm, 3 md)
- **Hover effects**: seguindo padrão do projeto

### 7. Fallback
Se não houver imagens na pasta, será exibida a mensagem:
"Galeria em construção - adicione imagens na pasta assets/gallery/"