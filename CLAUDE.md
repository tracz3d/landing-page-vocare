# CLAUDE.md — Landing Page Vocare / ARK

## Repositório
- GitHub: `tracz3d/landing-page-vocare`
- Branch principal: `main`
- Deploy feito a partir de `main`

## Fluxo obrigatório para qualquer alteração de código

**Nunca commitar diretamente em `main`.** Todo trabalho segue este fluxo:

1. Criar branch a partir de `main` com nome descritivo: `feat/`, `fix/` ou `chore/` como prefixo
   - Exemplos: `feat/campo-nome-empresa`, `fix/form-validacao`, `chore/atualiza-deps`
2. Fazer as alterações na branch criada
3. Commitar com mensagem em português descrevendo o que mudou e por quê
4. Push da branch para o remote
5. Abrir PR com `gh pr create` apontando para `main`
6. Retornar a URL do PR ao usuário

### Comandos de referência

```bash
# Criar e mudar para nova branch
git checkout -b feat/nome-da-mudanca

# Commit
git add <arquivos>
git commit -m "Descrição clara da mudança"

# Push e criação do PR
git push -u origin feat/nome-da-mudanca
gh pr create --title "Título do PR" --base main --body "..."
```

## Stack
- React + Vite
- Tailwind CSS
- GSAP (animações)
- Integração com RD Station via API v2 (`api.rd.services/platform/conversions`)

## Integração RD Station
- API Key configurada diretamente no código (variável visível em `src/App.jsx`)
- `conversion_identifier`: `lp-ark-google`
- Campos custom usam prefixo `cf_`
- Campos atuais enviados no payload: `name`, `email`, `mobile_phone`, `cf_nome_da_empresa`, `cf_qual_o_regime_tributario_da_sua_empresa`, `cf_quantos_funcionarios_sua_empresa_possui`, `cf_url_da_pagina`

## Observações
- `gh` CLI instalado em `C:\Program Files\GitHub CLI` — já está no PATH do usuário
- Conta autenticada: `tracz3d`
