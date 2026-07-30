# EntreFoco — Protótipo V0.3

Protótipo estático de um portal informativo, acessível e acolhedor sobre TDAH ao longo da vida.

## Objetivo deste ciclo

Transformar a seção **TDAH ao longo da vida** em navegação real e validar a primeira página editorial completa: **TDAH na infância**.

## Alterações da V0.3

- cartão **Infância** convertido em link real;
- criação de `fases/infancia.html`;
- navegação interna por sinais, avaliação, diagnóstico, estratégias, consulta e fontes;
- conteúdo fundamentado em CDC, AAP e NICE;
- diferenciação entre observação, avaliação e diagnóstico;
- aviso de que não existe teste único para confirmar TDAH;
- orientações gerais para família e escola;
- checklist para preparar uma consulta;
- botão para imprimir o checklist;
- Modo foco adaptado para páginas de artigo;
- tema e tamanho do texto compartilhados entre a página inicial e a página de infância;
- cartões das demais fases mantidos como **Em preparação**, sem links falsos;
- melhorias de responsividade e quebra de textos longos.

## Estrutura

```text
portal-tdah-prototipo/
├── index.html
├── styles.css
├── app.js
├── README.md
├── .nojekyll
└── fases/
    └── infancia.html
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
Página inicial → Fases da vida → Infância
```

## Publicar com GitHub Pages

Envie todos os arquivos e a pasta `fases` para a raiz do repositório. O endereço da nova página seguirá este formato:

```text
https://SEU-USUARIO.github.io/SEU-REPOSITORIO/fases/infancia.html
```

## Teste manual recomendado

- Clique em **Infância** e confirme que a página interna é aberta.
- Use o botão voltar do navegador e confira se retorna à seção de fases.
- Teste todos os atalhos do início da página de infância.
- Ative e desative o Modo foco usando o botão e a tecla `Esc`.
- Altere tema e tamanho do texto; recarregue e confira se as preferências permanecem.
- Teste o checklist e a versão de impressão.
- Navegue usando somente `Tab`, `Shift + Tab`, `Enter` e `Esc`.
- Teste em uma largura inferior a 620 px.

## Estado editorial

O conteúdo da página de infância foi fundamentado em fontes institucionais atuais, mas ainda está marcado como **revisão clínica externa pendente** antes de publicação oficial.

## Limites atuais

- somente a página de infância está desenvolvida;
- adolescência, jovens adultos, vida adulta, meia-idade e envelhecimento permanecem em preparação;
- não houve teste formal com usuários;
- não houve auditoria completa com leitor de tela;
- não há banco de dados, login ou sistema de publicação.
