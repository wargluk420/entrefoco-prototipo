# EntreFoco — Protótipo V0.5

Protótipo estático de um portal informativo, acessível e acolhedor sobre TDAH ao longo da vida.

## Objetivo deste ciclo

Adicionar a página editorial completa **TDAH em jovens adultos** e ligar corretamente a sequência entre infância, adolescência, jovens adultos e o mapa das fases da vida.

## Alterações da V0.5

- cartão **Jovens adultos** convertido em link real;
- criação de `fases/jovens-adultos.html`;
- conteúdo sobre independência, estudos, trabalho, rotina, finanças, relações e cuidado em saúde;
- explicação da avaliação e do diagnóstico em adultos;
- seção sobre transição estruturada para serviços adultos;
- estratégias práticas e checklist próprio para preparar a consulta;
- ligação **Adolescência → Jovens adultos**;
- fontes institucionais e diretrizes clínicas registradas;
- versão do projeto atualizada para V0.5.

## Estrutura

```text
portal-tdah-prototipo/
├── index.html
├── styles.css
├── app.js
├── README.md
├── .nojekyll
└── fases/
    ├── infancia.html
    ├── adolescencia.html
    └── jovens-adultos.html
```

## Executar localmente

Na pasta do projeto:

```bash
python -m http.server 8000
```

Acesse:

```text
http://localhost:8000
```

Teste a navegação:

```text
Página inicial → Fases da vida → Jovens adultos
Adolescência → Ir para jovens adultos
Jovens adultos → Voltar à adolescência
```

## Publicar com GitHub Pages

Envie todos os arquivos e a pasta `fases` para a raiz do repositório. O endereço da nova página seguirá este formato:

```text
https://SEU-USUARIO.github.io/SEU-REPOSITORIO/fases/jovens-adultos.html
```

## Teste manual recomendado

- clique em **Jovens adultos** e confirme que a página abre;
- use os atalhos internos da página;
- teste tema, tamanho do texto e Modo foco;
- use `Esc` para sair do Modo foco e fechar painéis;
- marque itens do checklist e teste a impressão;
- navegue somente com teclado;
- teste em largura inferior a 620 px;
- confirme os caminhos entre adolescência e jovens adultos.

## Estado editorial

Os conteúdos de infância, adolescência e jovens adultos foram fundamentados em fontes institucionais atuais, mas permanecem marcados como **revisão clínica externa pendente** antes da publicação oficial.

## Limites atuais

- vida adulta, meia-idade e envelhecimento permanecem em preparação;
- não houve teste formal com usuários;
- não houve auditoria completa com leitor de tela;
- não há banco de dados, login ou sistema de publicação.
