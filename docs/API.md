# Documentação da API

Base URL local:

```text
http://127.0.0.1:3000
```

## Visão geral

Esta API permite gerenciar livros de uma biblioteca.

Funcionalidades atuais:

- listar livros;
- buscar livro por ID;
- cadastrar livro;
- atualizar livro;
- deletar livro;
- emprestar livro;
- devolver livro;
- filtrar livros por título, autor, gênero e disponibilidade.

---

## Rotas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/` | Verifica se a API está funcionando |
| GET | `/livros` | Lista livros |
| GET | `/livros/:id` | Busca um livro pelo ID |
| POST | `/livros` | Cadastra um livro |
| PUT | `/livros/:id` | Atualiza um livro |
| PATCH | `/livros/:id/emprestar` | Marca um livro como emprestado |
| PATCH | `/livros/:id/devolver` | Marca um livro como disponível |
| DELETE | `/livros/:id` | Deleta um livro |

---

# GET /

Verifica se a API está funcionando.

## Exemplo

```http
GET http://127.0.0.1:3000/
```

## Resposta esperada

```json
{
  "message": "API Biblioteca funcionando!"
}
```

---

# GET /livros

Lista todos os livros cadastrados.

Também permite filtros por query params.

## Exemplo

```http
GET http://127.0.0.1:3000/livros
```

## Resposta esperada

```json
{
  "message": "Livros listados com sucesso",
  "filters": {
    "titulo": null,
    "autor": null,
    "genero": null,
    "disponivel": null
  },
  "total": 1,
  "data": [
    {
      "id": 1,
      "titulo": "Dom Casmurro",
      "autor": "Machado de Assis",
      "ano_publicacao": 1899,
      "genero": "Romance",
      "disponivel": true,
      "criado_em": "2026-05-10T00:00:00.000Z",
      "atualizado_em": "2026-05-10T00:00:00.000Z"
    }
  ]
}
```

---

# Filtros em GET /livros

A rota `GET /livros` aceita filtros pela URL.

## Exemplos

```http
GET http://127.0.0.1:3000/livros?titulo=dom
GET http://127.0.0.1:3000/livros?autor=machado
GET http://127.0.0.1:3000/livros?genero=romance
GET http://127.0.0.1:3000/livros?disponivel=true
GET http://127.0.0.1:3000/livros?disponivel=false
GET http://127.0.0.1:3000/livros?genero=romance&disponivel=true
```

## Observação

O filtro `disponivel` aceita apenas:

```text
true
false
```

Se outro valor for enviado, a API retorna erro `400`.

## Exemplo de erro

```http
GET http://127.0.0.1:3000/livros?disponivel=sim
```

Resposta:

```json
{
  "message": "O filtro disponivel deve ser true ou false"
}
```

---

# GET /livros/:id

Busca um livro específico pelo ID.

## Exemplo

```http
GET http://127.0.0.1:3000/livros/1
```

## Resposta esperada

```json
{
  "message": "Livro encontrado com sucesso",
  "data": {
    "id": 1,
    "titulo": "Dom Casmurro",
    "autor": "Machado de Assis",
    "ano_publicacao": 1899,
    "genero": "Romance",
    "disponivel": true
  }
}
```

## Possíveis erros

### ID inválido

```json
{
  "message": "ID inválido"
}
```

### Livro não encontrado

```json
{
  "message": "Livro não encontrado"
}
```

---

# POST /livros

Cadastra um novo livro.

## Exemplo

```http
POST http://127.0.0.1:3000/livros
Content-Type: application/json
```

## Corpo da requisição

```json
{
  "titulo": "Capitães da Areia",
  "autor": "Jorge Amado",
  "ano_publicacao": 1937,
  "genero": "Romance"
}
```

## Resposta esperada

```json
{
  "message": "Livro cadastrado com sucesso",
  "data": {
    "id": 2,
    "titulo": "Capitães da Areia",
    "autor": "Jorge Amado",
    "ano_publicacao": 1937,
    "genero": "Romance",
    "disponivel": true
  }
}
```

## Validações atuais

- `titulo` é obrigatório;
- `autor` é obrigatório;
- `titulo` precisa ser texto;
- `autor` precisa ser texto;
- `titulo` precisa ter pelo menos 2 caracteres;
- `autor` precisa ter pelo menos 2 caracteres;
- `ano_publicacao`, se enviado, precisa ser número inteiro;
- `genero`, se enviado, precisa ser texto.

---

# PUT /livros/:id

Atualiza os dados principais de um livro.

## Exemplo

```http
PUT http://127.0.0.1:3000/livros/1
Content-Type: application/json
```

## Corpo da requisição

```json
{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis",
  "ano_publicacao": 1899,
  "genero": "Romance psicológico"
}
```

## Resposta esperada

```json
{
  "message": "Livro atualizado com sucesso",
  "data": {
    "id": 1,
    "titulo": "Dom Casmurro",
    "autor": "Machado de Assis",
    "ano_publicacao": 1899,
    "genero": "Romance psicológico",
    "disponivel": true
  }
}
```

---

# PATCH /livros/:id/emprestar

Marca um livro como emprestado.

Na prática, muda:

```json
{
  "disponivel": true
}
```

para:

```json
{
  "disponivel": false
}
```

## Exemplo

```http
PATCH http://127.0.0.1:3000/livros/1/emprestar
```

## Regra

Só é possível emprestar um livro que está disponível.

## Erro possível

```json
{
  "message": "Livro já está emprestado"
}
```

---

# PATCH /livros/:id/devolver

Marca um livro como disponível novamente.

Na prática, muda:

```json
{
  "disponivel": false
}
```

para:

```json
{
  "disponivel": true
}
```

## Exemplo

```http
PATCH http://127.0.0.1:3000/livros/1/devolver
```

## Regra

Só é possível devolver um livro que está emprestado.

## Erro possível

```json
{
  "message": "Livro já está disponível"
}
```

---

# DELETE /livros/:id

Remove um livro do banco.

## Exemplo

```http
DELETE http://127.0.0.1:3000/livros/1
```

## Resposta esperada

```json
{
  "message": "Livro deletado com sucesso",
  "data": {
    "id": 1,
    "titulo": "Dom Casmurro",
    "autor": "Machado de Assis",
    "ano_publicacao": 1899,
    "genero": "Romance",
    "disponivel": true
  }
}
```

---

# Rota não encontrada

Se uma rota inexistente for acessada:

```http
GET http://127.0.0.1:3000/rota-errada
```

Resposta:

```json
{
  "message": "Rota não encontrada"
}
```
