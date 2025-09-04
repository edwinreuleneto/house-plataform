# Cadastro de Usuário (Frontend)

Este documento descreve o fluxo de cadastro de usuário no frontend (Next.js), incluindo validações, chamadas à API e persistência de sessão.

**Visão Geral**
- Página de cadastro: `src/app/(auth)/signup`
- Formulário: `src/app/(auth)/signup/_components/Form/index.tsx`
- Validações (Zod): `src/app/(auth)/signup/_components/Form/schema.ts`
- Serviço de autenticação: `src/services/auth/index.ts`
- Contexto de autenticação (cookies/sessão): `src/context/auth/index.tsx`
- Chaves de cookies (.env): `TAG_COOKIE_TOKEN`, `TAG_COOKIE_USER`

**Campos do Formulário**
- Nome: obrigatório (`name`)
- E-mail: obrigatório e válido (`email`)
- Senha: obrigatório, mínimo 6 caracteres (`password`)

Validação Zod: `schema.ts`
- `name`: `z.string().min(1)`
- `email`: `z.string().email()`
- `password`: `z.string().min(6)`

**Payload de Cadastro**
Enviado para `POST /auth/signup` via `SignUpUser`.
- Arquivo: `src/services/auth/auth.props.ts`
- Tipo: `SignUpDTO`

Exemplo:
- Body JSON: `{ name, email, password, phone?, threadId?, provider?, msToken? }`

Resposta esperada: objeto de sessão do usuário compatível com `UserSessionProps`.
- Arquivo: `src/services/users/users.props.ts`
- Shape esperado (resumo):
  - `user: { id, name, email, access_token }`
  - `access_level`
  - `access_token`
  - `role`

**Fluxo do Cadastro (Happy Path)**
1) Usuário preenche Nome, E-mail e Senha.
2) Submit chama `SignUpUser(data)` (`src/services/auth/index.ts`).
3) Sucesso: `onSuccess` do `useMutation` chama `login(data)` (`AuthContext`).
4) `login` salva cookies e redireciona para `/plataform`.

Detalhes de sessão (`AuthContext`):
- Salva `access_token` no cookie `${TAG_COOKIE_TOKEN}`.
- Salva `user` (JSON) no cookie `${TAG_COOKIE_USER}`.
- Redireciona para `/plataform`.

Headers automáticos (`api.ts`):
- Em requisições autenticadas, injeta:
  - `Authorization: Bearer <token>` (do `${TAG_COOKIE_TOKEN}`)
  - `<TAG_COOKIE_USER>: <user.id>` (id do usuário dos cookies)
  - `x-tenant-id` (fixo para o tenant atual)

**Validação de Sessão no Load**
- No mount do app, `AuthContext` tenta:
  - `POST /auth/validate` com o token do cookie.
  - `POST /auth/login` para obter dados atualizados do usuário.
  - Em caso de falha, efetua `logout()` e limpa cookies.

**Tratamento de Erros**
- Erro no cadastro: exibe notificação “Erro ao criar conta”.
- Erro na validação/login automático: `logout` e retorno para `/`.

**Cadastro com Microsoft (Opcional)**
- Implementado em `src/services/firebase/index.ts` (função `signUpWithMicrosoft`).
- Fluxo (comentado no form atualmente):
  - Inicia `signInWithPopup` (Microsoft OAuth).
  - Obtém `idToken` do Firebase.
  - Chama `LoginUser({ token })` e em seguida `login(data)` para persistir a sessão.

**Rotas de API Utilizadas**
- `POST /auth/signup`: cria o usuário e retorna sessão.
- `POST /auth/validate`: valida o token atual.
- `POST /auth/login`: retorna dados da sessão (refresca informações do usuário).

**Ambiente (.env)**
- `TAG_COOKIE_TOKEN=houser.token`
- `TAG_COOKIE_USER=houser.user`
- `API_URL=http://localhost:4001`

Observação: As chaves acima já estão definidas no projeto. Ajuste conforme necessário no ambiente.

**Arquivos Relevantes**
- `src/app/(auth)/signup/_components/Form/index.tsx`
- `src/app/(auth)/signup/_components/Form/schema.ts`
- `src/services/auth/auth.props.ts`
- `src/services/auth/index.ts`
- `src/context/auth/index.tsx`
- `src/services/api.ts`
