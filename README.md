# EntreFoco — Protótipo inicial

Protótipo estático de uma página inicial para um portal informativo e acolhedor sobre TDAH ao longo da vida.

## Objetivo deste ciclo

Testar se uma pessoa consegue:

1. entender rapidamente a proposta do site;
2. encontrar uma ajuda prática;
3. navegar por fases da vida;
4. controlar a carga visual e o tamanho do texto;
5. interromper a leitura sem perder o contexto.

## Recursos do protótipo

- layout responsivo;
- navegação sem dependências externas;
- modo foco;
- tema claro e escuro;
- ajuste de tamanho do texto;
- progresso de leitura;
- cartões de estratégias imediatas;
- preferências salvas localmente no navegador;
- conteúdo científico claramente marcado como demonstrativo.

## Estrutura

```text
portal-tdah-prototipo/
├── index.html
├── styles.css
├── app.js
├── README.md
└── .nojekyll
```

## Testar localmente

Opção simples: abra `index.html` no navegador.

Opção recomendada, com Python instalado:

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000`.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie os cinco arquivos para a raiz do repositório.
3. Abra **Settings > Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/ (root)`.
6. Salve e aguarde a publicação.

O endereço normalmente seguirá o formato:

```text
https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/
```

## Estado do conteúdo

Os textos de estratégias são apenas exemplos de experiência e não substituem orientação clínica. Os cartões de pesquisas são modelos editoriais e ainda não contêm resultados científicos revisados.
