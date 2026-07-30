# EntreFoco — Protótipo V0.9

Portal informativo e acolhedor sobre TDAH ao longo da vida.

## O que foi corrigido nesta versão

- restauração da base visual completa usada pelas páginas internas;
- restauração do JavaScript defensivo e compatível com a página inicial e os artigos;
- padronização dos cartões de todas as fases disponíveis;
- correção das ferramentas de leitura, tema, tamanho do texto e restauração de preferências;
- Modo foco temporário, reversível pelo botão ou pela tecla `Esc`;
- correção do retorno de foco após fechar uma estratégia;
- preenchimento completo dos metadados das estratégias da página inicial;
- impressão dos checklists nas páginas internas;
- padronização das faixas editoriais;
- proteção contra cache antigo por meio do parâmetro `?v=0.8`;
- estilos adicionados para o quadro de critérios da página Infância.

## Estrutura

```text
portal-tdah-prototipo/
├── .nojekyll
├── README.md
├── app.js
├── index.html
├── styles.css
└── fases/
    ├── infancia.html
    ├── adolescencia.html
    ├── jovens-adultos.html
    ├── vida-adulta.html
    └── meia-idade.html
```

## Publicação no GitHub Pages

Publique a raiz do repositório pela branch `main`, pasta `/ (root)`. Ao substituir uma versão anterior, envie **todos** os arquivos do pacote para impedir combinações entre HTML novo e CSS/JavaScript antigos.

## Estado editorial

O conteúdo é educativo e não substitui avaliação profissional. A revisão clínica externa permanece pendente. A página Envelhecimento ainda está em preparação.


## Ajuste visual V0.9

- Página inicial mantida como fonte de verdade visual.
- Páginas internas usam as mesmas cores, cartões, bordas, sombras e tipografia.
- Fundo padrão permanece azul-acinzentado claro; tema escuro continua opcional.
- Artigos receberam largura, entrelinha e títulos mais confortáveis para leitura prolongada.
- Versão de CSS/JS atualizada para `?v=0.9` para evitar cache antigo.
