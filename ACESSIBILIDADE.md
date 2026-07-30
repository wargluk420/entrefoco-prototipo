# Auditoria de acessibilidade — EntreFoco V0.14

Data da auditoria: 30 de julho de 2026.

## Escopo

Páginas verificadas: página inicial, registro de evidências e as seis fases da vida.

## Verificações automatizadas concluídas

- idioma `pt-BR`;
- título individual em cada página;
- exatamente um conteúdo principal (`main`) e um `h1`;
- IDs únicos;
- destinos de `aria-controls`, `aria-labelledby` e `aria-describedby` existentes;
- nome acessível para botões e links;
- rótulo associado ao seletor de velocidade;
- ausência de `tabindex` positivo;
- `rel="noopener noreferrer"` em links externos abertos em nova guia;
- link “Pular para o conteúdo” e alvo existente;
- controles de áudio presentes em todas as páginas;
- região de estado com `aria-live="polite"`;
- sintaxe do JavaScript;
- rotas e arquivos locais.

## Recursos implementados

- leitura iniciada somente por ação do usuário;
- seleção automática de voz em português, priorizando `pt-BR`;
- leitura em blocos curtos para reduzir falhas em textos extensos;
- iniciar/reiniciar, pausar/continuar e parar;
- velocidades 0,75×, 1×, 1,25× e 1,5×;
- estado anunciado por região viva;
- destaque visual discreto do bloco atual;
- cancelamento ao sair da página;
- mensagem clara quando a API não está disponível;
- menus, sumários, botões e links de referência repetitivos são ignorados pela narração.

## Limitações conhecidas

- as vozes dependem do navegador e do sistema operacional;
- a Web Speech API não substitui um leitor de tela;
- a auditoria automatizada não confirma a experiência real com voz sintetizada ou braille;
- é obrigatório realizar testes manuais com tecnologias assistivas.

## Matriz de testes manuais recomendada

| Ambiente | Teste mínimo |
|---|---|
| Windows + NVDA + Firefox | landmarks, títulos, links, botões, estado do áudio e ordem de foco |
| Windows + NVDA + Chrome/Edge | mesmos testes e coexistência entre leitor de tela e leitura em voz alta |
| macOS/iPhone + VoiceOver + Safari | rotor de títulos/links, controles e pausa da narração |
| Android + TalkBack + Chrome | exploração por toque, controles de leitura e menu móvel |
| Somente teclado | Tab, Shift+Tab, Enter, Espaço e Escape |
| Zoom 200% e 400% | ausência de corte, sobreposição e rolagem horizontal indevida |

## Resultado

A estrutura está preparada para leitores de tela e a leitura em voz alta foi implementada como apoio opcional. A conformidade WCAG completa não deve ser declarada antes dos testes manuais acima com usuários e tecnologias assistivas reais.
