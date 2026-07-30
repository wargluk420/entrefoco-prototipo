# EntreFoco — Protótipo V0.4

Protótipo estático de um portal informativo, acessível e acolhedor sobre TDAH ao longo da vida.

## Objetivo deste ciclo

Adicionar a página editorial completa **TDAH na adolescência** e ligar corretamente a sequência entre infância, adolescência e o mapa das fases da vida.

## Alterações da V0.4

- cartão **Adolescência** convertido em link real;
- criação de `fases/adolescencia.html`;
- conteúdo sobre mudanças dos sintomas, avaliação, diagnóstico, condições coexistentes, estratégias, autonomia e segurança;
- participação direta do adolescente destacada no processo de avaliação e tratamento;
- checklist próprio para preparar a consulta;
- ligação **Infância → Adolescência**;
- fontes institucionais e diretrizes clínicas registradas;
- correção do JavaScript para funcionar de forma segura na página inicial e nas páginas internas;
- Modo foco não é mais salvo entre visitas;
- ferramentas de leitura, menu móvel, tema e tamanho do texto revisados;
- estilos completos para páginas editoriais e impressão do checklist;
- versão do projeto atualizada para V0.4.

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
    └── adolescencia.html
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
Página inicial → Fases da vida → Adolescência
Infância → Ir para adolescência
Adolescência → Voltar à infância
```

## Publicar com GitHub Pages

Envie todos os arquivos e a pasta `fases` para a raiz do repositório. O endereço da nova página seguirá este formato:

```text
https://SEU-USUARIO.github.io/SEU-REPOSITORIO/fases/adolescencia.html
```

## Teste manual recomendado

- clique em **Adolescência** e confirme que a página abre;
- use os atalhos internos da página;
- teste tema, tamanho do texto e Modo foco;
- use `Esc` para sair do Modo foco e fechar painéis;
- marque itens do checklist e teste a impressão;
- navegue somente com teclado;
- teste em largura inferior a 620 px;
- confirme os caminhos entre infância e adolescência.

## Estado editorial

Os conteúdos de infância e adolescência foram fundamentados em fontes institucionais atuais, mas permanecem marcados como **revisão clínica externa pendente** antes da publicação oficial.

## Limites atuais

- jovens adultos, vida adulta, meia-idade e envelhecimento permanecem em preparação;
- não houve teste formal com usuários;
- não houve auditoria completa com leitor de tela;
- não há banco de dados, login ou sistema de publicação.
