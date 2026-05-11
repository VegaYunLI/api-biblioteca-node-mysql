# Arquitetura do Projeto

Este documento explica a organização do projeto e a responsabilidade de cada parte.

---

## Visão geral

O projeto usa uma estrutura inspirada em MVC.

MVC significa:

- Model;
- View;
- Controller.

Como este projeto é uma API REST, não usamos uma View tradicional com páginas HTML.

O fluxo usado é:

```text
routes → controllers → models → database
```

---

## Fluxo de uma requisição

Exemplo:

```http
GET /livros
```

Fluxo interno:

```text
1. A requisição chega no Express
2. O app.js direciona para bookRoutes
3. bookRoutes identifica a rota
4. bookController executa a função correta
5. bookModel consulta o MySQL
6. O banco retorna os dados
7. O controller envia a resposta em JSON
```

---

## Estrutura de pastas

```text
api-biblioteca
├── database
│   ├── schema.sql
│   └── seed.sql
│
├── docs
│   ├── API.md
│   ├── ARQUITETURA.md
│   └── RECAP.md
│
├── src
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   └── bookController.js
│   │
│   ├── middlewares
│   │   ├── errorHandler.js
│   │   └── notFoundHandler.js
│   │
│   ├── models
│   │   └── bookModel.js
│   │
│   ├── routes
│   │   └── bookRoutes.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests
│   ├── livros.http
│   └── powershell
│       └── livros-crud.ps1
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

# Responsabilidade de cada pasta

## src/config

Guarda configurações do projeto.

Atualmente contém:

```text
db.js
```

Esse arquivo cria o pool de conexões com o MySQL.

---

## src/models

Guarda os Models.

Model é a camada responsável por acessar os dados.

Neste projeto, o arquivo `bookModel.js` contém funções como:

```js
findAllBooks()
findBookById()
createBook()
updateBook()
borrowBook()
returnBook()
deleteBook()
```

Essas funções conversam diretamente com o banco usando SQL.

---

## src/controllers

Guarda os Controllers.

Controller é a camada responsável por:

- receber dados da requisição;
- validar dados básicos;
- chamar o Model;
- decidir qual resposta HTTP enviar.

Exemplo:

```js
listBooks()
storeBook()
editBook()
removeBook()
```

O Controller não deve ter SQL diretamente.

---

## src/routes

Guarda as rotas da API.

As rotas ligam um método HTTP e um caminho a uma função do controller.

Exemplo:

```js
router.get('/', listBooks);
router.post('/', storeBook);
router.put('/:id', editBook);
```

---

## src/middlewares

Guarda middlewares.

Middleware é uma função que fica no meio do fluxo da requisição.

Atualmente existem:

```text
errorHandler.js
notFoundHandler.js
```

### errorHandler

Cuida de erros inesperados da aplicação.

### notFoundHandler

Responde com JSON quando uma rota não existe.

---

## database

Guarda arquivos SQL.

### schema.sql

Contém a estrutura do banco.

Usado para criar tabelas.

### seed.sql

Contém dados iniciais para teste.

---

## docs

Guarda documentação do projeto.

### API.md

Documenta as rotas.

### ARQUITETURA.md

Explica a organização do projeto.

### RECAP.md

Resume os conceitos aprendidos.

---

## tests

Guarda arquivos de teste manual.

### livros.http

Arquivo para testar requisições usando uma extensão como REST Client.

### powershell/livros-crud.ps1

Script PowerShell para executar um fluxo básico de teste da API.

---

# Separação de responsabilidades

A separação atual segue esta ideia:

```text
Routes não fazem regra de negócio.
Controllers não escrevem SQL.
Models não enviam resposta HTTP.
Banco não valida regra da API.
```

Essa separação deixa o projeto mais fácil de:

- entender;
- testar;
- corrigir;
- expandir;
- refatorar.

---

# Exemplo prático: listar livros

Rota:

```js
router.get('/', listBooks);
```

Controller:

```js
export async function listBooks(req, res, next) {
  // lê filtros
  // valida dados
  // chama findAllBooks()
  // responde em JSON
}
```

Model:

```js
export async function findAllBooks(filters = {}) {
  // monta SQL
  // consulta MySQL
  // retorna dados
}
```

Banco:

```sql
SELECT * FROM livros;
```

---

# Por que essa arquitetura é boa para estudo?

Porque ela mostra uma base realista sem usar abstrações avançadas cedo demais.

O projeto ainda é simples, mas já possui uma organização parecida com projetos profissionais.
