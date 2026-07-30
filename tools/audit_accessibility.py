#!/usr/bin/env python3
"""Static accessibility checks for EntreFoco. No external dependencies."""
from html.parser import HTMLParser
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
FILES = [ROOT / 'index.html', ROOT / 'evidencias.html', *sorted((ROOT / 'fases').glob('*.html'))]

class AuditParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids=[]; self.headings=[]; self.tags=[]; self.refs=[]; self.buttons=[]; self.links=[]; self.controls=[]; self.labels={}; self.images=[]; self.title=''; self.lang=''; self.stack=[]; self.current_text=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs); self.tags.append(tag); frame=(tag,a,[]); self.stack.append(frame)
        if tag=='html': self.lang=a.get('lang','')
        if a.get('id'): self.ids.append(a['id'])
        for attr in ('aria-controls','aria-labelledby','aria-describedby'):
            if a.get(attr):
                for ref in a[attr].split(): self.refs.append((attr,ref))
        if tag in ('h1','h2','h3','h4','h5','h6'): self.headings.append([int(tag[1]),''])
        if tag=='button': self.buttons.append([a,frame[2]])
        if tag=='a': self.links.append([a,frame[2]])
        if tag in ('input','select','textarea'): self.controls.append(a)
        if tag=='label' and a.get('for'): self.labels[a['for']]=True
        if tag=='img': self.images.append(a)
    def handle_data(self,data):
        if not self.stack: return
        clean=' '.join(data.split())
        if not clean: return
        for i,(tag,a,texts) in enumerate(self.stack): texts.append(clean)
        if self.headings and self.stack[-1][0] in ('h1','h2','h3','h4','h5','h6'): self.headings[-1][1] += (' '+clean)
        if any(tag=='title' for tag,_,_ in self.stack): self.title += (' '+clean)
    def handle_endtag(self,tag):
        for i in range(len(self.stack)-1,-1,-1):
            if self.stack[i][0]==tag:
                self.stack=self.stack[:i]
                break

def name(attrs,text):
    rendered=' '.join(text) if isinstance(text,list) else str(text)
    return (attrs.get('aria-label') or attrs.get('title') or rendered).strip()

def audit(path):
    p=AuditParser(); p.feed(path.read_text(encoding='utf-8'))
    errors=[]; warnings=[]
    if p.lang.lower()!='pt-br': errors.append('html lang deve ser pt-BR')
    if not p.title.strip(): errors.append('title vazio')
    if p.tags.count('main')!=1: errors.append(f'esperado 1 main; encontrado {p.tags.count("main")}')
    if p.tags.count('h1')!=1: errors.append(f'esperado 1 h1; encontrado {p.tags.count("h1")}')
    if len(p.ids)!=len(set(p.ids)): errors.append('IDs duplicados')
    idset=set(p.ids)
    for attr,ref in p.refs:
        if ref not in idset: errors.append(f'{attr} aponta para ID inexistente: {ref}')
    last=0
    for level,text in p.headings:
        if last and level>last+1: warnings.append(f'salto de heading h{last}→h{level}: {text.strip()[:55]}')
        last=level
    for attrs,text in p.buttons:
        if not name(attrs,text): errors.append('botão sem nome acessível')
        tabindex=attrs.get('tabindex')
        if tabindex and tabindex.lstrip('+').isdigit() and int(tabindex)>0: errors.append('tabindex positivo em botão')
    for attrs,text in p.links:
        if not name(attrs,text): errors.append('link sem nome acessível')
        if attrs.get('target')=='_blank' and 'noopener' not in attrs.get('rel',''): errors.append('target=_blank sem rel=noopener')
    for attrs in p.controls:
        cid=attrs.get('id'); labelled=attrs.get('aria-label') or attrs.get('aria-labelledby') or (cid and p.labels.get(cid))
        if not labelled: errors.append(f'controle sem rótulo: {attrs.get("name") or cid or attrs.get("type") or "desconhecido"}')
    for attrs in p.images:
        if 'alt' not in attrs: errors.append('imagem sem atributo alt')
    required=('topo','conteudo','readingToolsToggle','readingToolsPanel','speechStart','speechPause','speechStop','speechRate','speechStatus')
    for rid in required:
        if rid not in idset: errors.append(f'controle/landmark obrigatório ausente: {rid}')
    return errors,warnings

failed=False
for path in FILES:
    errors,warnings=audit(path)
    print(f'[{"FAIL" if errors else "OK"}] {path.relative_to(ROOT)}')
    for item in errors: print('  ERRO:',item)
    for item in warnings: print('  AVISO:',item)
    failed |= bool(errors)
sys.exit(1 if failed else 0)
