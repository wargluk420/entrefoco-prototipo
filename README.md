# EntreFoco — Protótipo V0.11

Portal informativo e acolhedor sobre TDAH ao longo da vida.

## Alteração deste ciclo

- página **Envelhecimento** adicionada seguindo exatamente o padrão visual e estrutural aprovado;
- cartão Envelhecimento ativado na página inicial;
- navegação Meia-idade → Envelhecimento adicionada;
- ciclo das seis fases da vida concluído;
- nenhum estilo, comportamento ou conteúdo anterior foi redesenhado;
- CSS e JavaScript permanecem os mesmos da V0.9; apenas o parâmetro de versão foi atualizado para evitar cache antigo.

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
    ├── meia-idade.html
    └── envelhecimento.html
```

## Publicação no GitHub Pages

Publique a raiz do repositório pela branch `main`, pasta `/ (root)`. Envie todos os arquivos do pacote para manter HTML, CSS e JavaScript sincronizados.

## Estado editorial

O conteúdo é educativo e não substitui avaliação profissional. Todas as páginas científicas permanecem com revisão clínica externa pendente.


## Correção V0.11

- O alvo `#topo` foi movido do cabeçalho fixo para o elemento `<body>` em todas as páginas.
- Os links “Voltar ao início” e o logotipo agora apontam para o início real do documento.
- Nenhum estilo, conteúdo clínico ou comportamento compartilhado foi alterado.

## Padronização da navegação entre fases

- **Infância:** Ver todas as fases → Próxima Fase (Adolescência).
- **Adolescência:** fase anterior → Ver todas as fases → Próxima Fase (Jovens adultos).
- **Jovens adultos:** fase anterior → Ver todas as fases → Próxima Fase (Vida adulta).
- **Vida adulta:** fase anterior → Ver todas as fases → Próxima Fase (Meia-idade).
- **Meia-idade:** fase anterior → Ver todas as fases → Próxima Fase (Envelhecimento).
- **Envelhecimento:** fase anterior → Ver todas as fases; não há botão Próxima Fase porque esta é a última etapa.

Nenhum CSS, JavaScript ou conteúdo clínico foi alterado neste ciclo.
