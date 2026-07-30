# EntreFoco — Protótipo V0.7

Protótipo estático de um portal informativo, acessível e acolhedor sobre TDAH ao longo da vida.

## Objetivo deste ciclo

Adicionar a página editorial completa **TDAH na meia-idade** e ligar corretamente a sequência entre vida adulta, meia-idade e o mapa das fases da vida.

## Alterações da V0.7

- cartão **Meia-idade** convertido em link real;
- criação de `fases/meia-idade.html`;
- conteúdo sobre carreira, cuidado familiar, carga mental, sono, saúde e mudanças nas estratégias de compensação;
- diferenciação entre padrão antigo de TDAH e piora cognitiva recente;
- explicação da avaliação e do diagnóstico tardio;
- seção específica sobre transições hormonais e sobreposição de sintomas;
- apresentação explícita de resultados científicos divergentes sobre TDAH e perimenopausa;
- estratégias para trabalho, família, saúde e continuidade do cuidado;
- monitoramento de eficácia, efeitos adversos, peso, pressão arterial, frequência cardíaca e sono;
- checklist próprio para preparar uma consulta;
- ligação **Vida adulta → Meia-idade**;
- identificação da versão V0.7 padronizada em todas as páginas.

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
    ├── vida-adulta.html
    └── meia-idade.html
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
Página inicial → Fases da vida → Meia-idade
Vida adulta → Ir para meia-idade
Meia-idade → Voltar à vida adulta
```

## Publicar com GitHub Pages

Envie todos os arquivos e a pasta `fases` para a raiz do repositório. O endereço da nova página seguirá este formato:

```text
https://SEU-USUARIO.github.io/SEU-REPOSITORIO/fases/meia-idade.html
```

## Teste manual recomendado

- clique em **Meia-idade** e confirme que a página abre;
- use os atalhos internos da página;
- teste tema, tamanho do texto e Modo foco;
- use `Esc` para sair do Modo foco e fechar painéis;
- marque itens do checklist e teste a impressão;
- navegue somente com teclado;
- teste em largura inferior a 620 px;
- confirme os caminhos entre vida adulta e meia-idade;
- confirme que as fontes externas abrem em outra guia.

## Estado editorial

Os conteúdos das cinco fases publicadas foram fundamentados em fontes institucionais atuais. A seção sobre transições hormonais identifica explicitamente que a evidência é emergente e apresenta estudos com resultados diferentes. Todo o conteúdo permanece marcado como **revisão clínica externa pendente** antes da publicação oficial.

## Limites atuais

- envelhecimento permanece em preparação;
- não houve teste formal com usuários;
- não houve auditoria completa com leitor de tela;
- não há banco de dados, login ou sistema de publicação.
