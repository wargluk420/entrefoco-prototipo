# EntreFoco — Protótipo V0.6

Protótipo estático de um portal informativo, acessível e acolhedor sobre TDAH ao longo da vida.

## Objetivo deste ciclo

Adicionar a página editorial completa **TDAH na vida adulta** e ligar corretamente a sequência entre jovens adultos, vida adulta e o mapa das fases da vida.

## Alterações da V0.6

- cartão **Vida adulta** convertido em link real;
- criação de `fases/vida-adulta.html`;
- conteúdo sobre trabalho, casa, finanças, relações, saúde e custo das estratégias de compensação;
- explicação da avaliação, diagnóstico tardio e critérios diagnósticos em adultos;
- seção sobre impactos acumulados e diferenciação entre explicação e retirada de responsabilidade;
- estratégias práticas para projetos, família, dinheiro e rotina;
- explicação geral sobre modificações ambientais, intervenções psicológicas, medicamentos e acompanhamento;
- checklist próprio para preparar uma consulta;
- ligação **Jovens adultos → Vida adulta**;
- inclusão do PCDT brasileiro do Ministério da Saúde entre as fontes;
- identificação da versão V0.6 padronizada em todas as páginas.

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
    ├── jovens-adultos.html
    └── vida-adulta.html
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
Página inicial → Fases da vida → Vida adulta
Jovens adultos → Ir para vida adulta
Vida adulta → Voltar a jovens adultos
```

## Publicar com GitHub Pages

Envie todos os arquivos e a pasta `fases` para a raiz do repositório. O endereço da nova página seguirá este formato:

```text
https://SEU-USUARIO.github.io/SEU-REPOSITORIO/fases/vida-adulta.html
```

## Teste manual recomendado

- clique em **Vida adulta** e confirme que a página abre;
- use os atalhos internos da página;
- teste tema, tamanho do texto e Modo foco;
- use `Esc` para sair do Modo foco e fechar painéis;
- marque itens do checklist e teste a impressão;
- navegue somente com teclado;
- teste em largura inferior a 620 px;
- confirme os caminhos entre jovens adultos e vida adulta;
- confirme que as fontes externas abrem em outra guia.

## Estado editorial

Os conteúdos das quatro fases publicadas foram fundamentados em fontes institucionais atuais, mas permanecem marcados como **revisão clínica externa pendente** antes da publicação oficial.

## Limites atuais

- meia-idade e envelhecimento permanecem em preparação;
- não houve teste formal com usuários;
- não houve auditoria completa com leitor de tela;
- não há banco de dados, login ou sistema de publicação.
