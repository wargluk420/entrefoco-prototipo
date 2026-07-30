# EntreFoco — Protótipo V0.14

Portal estático sobre TDAH ao longo da vida.

## Aviso

O conteúdo é educativo. A dupla-checagem bibliográfica foi concluída em 30 de julho de 2026, mas a revisão clínica externa permanece pendente.


## V0.14 — leitura em voz alta e auditoria

- leitura em voz alta em todas as páginas;
- voz em português selecionada automaticamente;
- pausar, continuar, parar e controlar velocidade;
- destaque do trecho atual;
- região de estado acessível;
- auditoria estática reproduzível em `tools/audit_accessibility.py`;
- relatório e matriz de testes manuais em `ACESSIBILIDADE.md`.

Execute a auditoria com:

```bash
python3 tools/audit_accessibility.py
```
